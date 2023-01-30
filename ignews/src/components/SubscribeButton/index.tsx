import { api } from '@/src/services/axios'
import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'

export function SubscribeButton() {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      await signIn('github')
    }
    try {
      await api.post('subscribe')
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
