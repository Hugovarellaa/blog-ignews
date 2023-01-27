import { api } from '@/src/services/axios'
import { getStripeJs } from '@/src/services/stripe-js'
import { signIn, useSession } from 'next-auth/react'
import styles from './SubscribeButton.module.scss'

export function SubscribeButton() {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const response = await api.post('subscribe')
      const { sessionId } = response.data

      const stripe = getStripeJs()
      await (await stripe).redirectToCheckout({ sessionId })
    } catch (error) {
      console.log('Erro:', error)
    }
  }
  return (
    <>
      <button
        type="button"
        className={styles.subscribeButtonContainer}
        onClick={handleSubscribe}
      >
        Subscribe now
      </button>
    </>
  )
}
