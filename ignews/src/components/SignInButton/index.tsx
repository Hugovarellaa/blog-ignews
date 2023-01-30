import { signIn, signOut, useSession } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
  const { data: session } = useSession()

  return !session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="var(--yellow)" />
      Sing in with GitHub
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="var(--green)" />
      {session.user.name}
      <FiX className={styles.closeIcon} />
    </button>
  )
}
