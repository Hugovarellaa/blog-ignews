import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.headerContent}>
        <img src="/images/logo.svg" alt="" />

        <nav>
          <a href="#" className={styles.active}>
            Home
          </a>
          <a href="#">Posts</a>
        </nav>
        <SignInButton />
      </header>
    </div>
  )
}
