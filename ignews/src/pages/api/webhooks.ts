/* eslint-disable no-case-declarations */
import { stripe } from '@/src/services/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { saveSubscription } from './_lib/managerSubscription'

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const buf = await buffer(request)
    const sig = request.headers['stripe-signature']
    const endpointSecret = process.env.WEBHOOK_ENDPOINT

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`)
    }

    const { type } = event

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true,
            )
            break
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
            )
            break
          default:
            throw new Error('Unhandled event')
        }
      } catch (error) {
        return response.status(400).json({ error: 'Webhook handler failed' })
      }
    }
    return response.status(200).end()
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).send('Method Not Allowed')
  }
}
