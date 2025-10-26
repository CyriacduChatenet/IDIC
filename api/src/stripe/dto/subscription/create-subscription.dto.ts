export class CreateStripeSubscriptionDto {
  customer: string;
  items: {
    price: string;
  }[];
  trial_period_days: number;
}
