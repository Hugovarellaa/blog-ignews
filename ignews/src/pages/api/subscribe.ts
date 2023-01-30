import { fauna } from '@/src/services/faunadb'
import { stripe } from '@/src/services/stripe'
import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const session = await getSession({ req: request })

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('users_by_email'), q.Casefold(session.user.email))),
    )

    let customerId = user.data.stripe_customer_id

    if (!customerId) {
      const stripeCustomerId = await stripe.customers.create({
        email: session.user.email,
      })

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            stripe_customer_id: stripeCustomerId.id,
          },
        }),
      )
      customerId = stripeCustomerId.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [{ price: 'price_1JsSzEH6aihmDxYbnis4Pjbe', quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return response.status(201).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader('Allow', 'POST')
    return response.status(405).send('Method not allowed')
  }
}
