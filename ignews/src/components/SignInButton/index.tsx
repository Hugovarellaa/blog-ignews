import { FaGithub } from 'react-icons/fa'
import styles from './styles.module.scss'

export function SignInButton() {
  const isLog = true
  return isLog ? (
    <button className={styles.signInButton}>
      <FaGithub color="var(--green-500)" />
      Hugo Alves Varella
    </button>
  ) : (
    <button className={styles.signInButton}>
      <FaGithub color="var(--yellow-500)" />
      Sing in with GitHub
    </button>
  )
}
