import { signIn, signOut, useSession } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button
      className={styles.signInButtonContainer}
      type="button"
      onClick={() => signOut()}
    >
      <FaGithub color="var(--green-500)" />
      {session.user.name}
      <FiX className={styles.closeIcon} />
    </button>
  ) : (
    <button
      className={styles.signInButtonContainer}
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub color="var(--yellow-500)" />
      Sign in with Github
    </button>
  )
}
