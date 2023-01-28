import { stripe } from '@/src/services/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'

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

const relevantEvents = new Set(['checkout.session.completed'])

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
      console.log(event)
      console.log(`Event ${type} received `)
    }
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).send('Method Not Allowed')
  }
}
