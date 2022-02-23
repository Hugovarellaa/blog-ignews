import { loadStripe } from "@stripe/stripe-js";

export function getStripeJs() {
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC);
  return stripe;
}
