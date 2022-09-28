import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
  const isLog = true

  return isLog ? (
    <button className={styles.signInButtonContainer} type="button">
      <FaGithub color="var(--green-500)" />
      Hugo Alves Varella
      <FiX className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButtonContainer} type="button">
      <FaGithub color="var(--yellow-500)" />
      Sign in with Github
    </button>
  )
}
