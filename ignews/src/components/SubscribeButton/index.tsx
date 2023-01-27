import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'

export function SubscribeButton() {
  const { data: session } = useSession()
  function handleSubscribe() {
    if (!session) {
      return signIn('github')
    }
    // Criar checkout session stripe
  }

  return (
    <>
      <button className={styles.subscribeButton} onClick={handleSubscribe}>
        Subscribe now
      </button>
    </>
  )
}
