import { api } from '@/src/services/axios'
import { getStripeJs } from '@/src/services/stripe-js'
import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'

export function SubscribeButton() {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      await signIn('github')
    }
    try {
      const response = await api.post('subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
      >
        Subscribe now
      </button>
    </>
  )
}
