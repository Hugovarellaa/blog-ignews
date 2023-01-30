/* eslint-disable no-case-declarations */
import { stripe } from '@/src/services/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { saveSubscriptions } from './_lib/managerSubscription'

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

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const buf = await buffer(request)
    const secret = request.headers['stripe-signature']

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf, secret, endpointSecret)
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    const { type } = event

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            await saveSubscriptions(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
            )
            break
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            break
          default:
            throw new Error('Unhandled event')
        }
      } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`)
      }
    }
    return response.status(201).json({ message: 'Evento recebido' })
  } else {
    response.setHeader('Allow', 'POST')
    return response.status(405).send('Method not allowed')
  }
}
