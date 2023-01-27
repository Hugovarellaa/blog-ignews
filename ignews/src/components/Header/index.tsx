import Image from 'next/image'
import { SignInButton } from '../SignInButton'
import styles from './Header.module.scss'

export function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headeContent}>
          <Image
            src="./images/logo.svg"
            alt="logo Ignews"
            width={108}
            height={30}
          />

          <nav>
            <a href="" className={styles.active}>
              Home
            </a>
            <a href="">Post</a>
          </nav>

          <SignInButton />
        </div>
      </header>
    </>
  )
}
