// Buscar o usuário no banco do fauna pelo Id do Stripe (stripe_customer_id)
// Salvar os dados da subscription do usuário no banco de dados -> FaunaDB (na collection subscriptions)

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  console.log(subscriptionId, customerId)
}
