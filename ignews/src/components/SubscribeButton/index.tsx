import styles from './SubscribeButton.module.scss'

export function SubscribeButton() {
  return (
    <>
      <button type="button" className={styles.subscribeButtonContainer}>
        Subscribe now
      </button>
    </>
  )
}
