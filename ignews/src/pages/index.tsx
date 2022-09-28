import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SuscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface Product {
  product: {
    priceId: string
    amount: string
  }
}

export default function Home({ product }: Product) {
  return (
    <>
      <Head>
        <title>Home | Ignews</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span> React </span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            <span> for {product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JsSzEH6aihmDxYbnis4Pjbe')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
  }
}
