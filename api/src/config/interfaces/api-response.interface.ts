export interface ApiRegisterResponse<T, U, V> {
  jwt: T;
  strapiUser: U;
  stripeCustomer: V;
}
