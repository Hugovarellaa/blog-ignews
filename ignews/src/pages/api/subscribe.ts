/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import { stripe } from '@/src/services/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const success_url = process.env.STRIPE_SUCCESS_URL
const cancel_url = process.env.STRIPE_CANCEL_URL

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req })

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
    })

    const stripeChekckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [{ price: 'price_1JsSzEH6aihmDxYbnis4Pjbe', quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url,
      cancel_url,
    })

    return res.status(200).json({ customerId: stripeChekckoutSession.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not Allowed')
  }
}
