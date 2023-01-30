import Head from 'next/head'
import Image from 'next/image'
import styles from './app.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.appContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for $9,90 month</span>
          </p>
        </section>
        <Image
          src="images/avatar.svg"
          alt="Girl coding"
          width={334}
          height={520}
        />
      </main>
    </>
  )
}
