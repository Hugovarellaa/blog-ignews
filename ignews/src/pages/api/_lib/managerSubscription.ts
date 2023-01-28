// Buscar o usuário no banco do fauna pelo Id do Stripe (stripe_customer_id)
// Salvar os dados da subscription do usuário no banco de dados -> FaunaDB (na collection subscriptions)

import { fauna } from '@/src/services/faunadb'
import { stripe } from '@/src/services/stripe'
import { query as q } from 'faunadb'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  const userRef = await fauna.query(
    q.Select('ref', q.Get(q.Match(q.Index('user_by_customer_id'), customerId))),
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
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
        {
          data: subscriptionData,
        },
      ),
    )
  }
}
