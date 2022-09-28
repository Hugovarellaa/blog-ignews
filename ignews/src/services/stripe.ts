import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_API_SECRET, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'Ignews',
    version: '^10.12.0-beta.1',
  },
})
