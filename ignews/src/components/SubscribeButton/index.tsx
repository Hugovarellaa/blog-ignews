import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

export function SubscribeButton() {
  const { data: session } = useSession();
  async function handleSubscribe() {
    // Válida se o usuario esta logado
    if (!session) {
      signIn("github");
      return;
    }


    try {
      //criação checkout session (redirecionar o usuario para o pagamento)
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log({ error: error.message });
    }
  }
  
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscriber now
    </button>
  );
}
