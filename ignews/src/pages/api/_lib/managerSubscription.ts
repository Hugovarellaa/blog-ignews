// 1ª - Buscar o usuário no banco do fauna com o ID stripe_customer_id
// 2ª - Salva os dados da subscription no FaunaDB na collection - subscriptions

import { fauna } from '@/src/services/faunadb'
import { stripe } from '@/src/services/stripe'
import { query as q } from 'faunadb'

export async function saveSubscriptions(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  // Query para buscar apenas a ref do usuário
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)),
    ),
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  }

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), {
        data: subscriptionData,
      }),
    )
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)),
        ),
        { data: subscriptionData },
      ),
    )
  }
}
