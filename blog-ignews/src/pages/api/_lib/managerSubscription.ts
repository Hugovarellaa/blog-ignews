import { fauna } from "../../../services/faunadb";
import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  console.log(subscriptionId);
  console.log(customerId);
}
