export class UpdateStripetSubscriptionDto {
  cancel_at_period_end: boolean;
  items?: { id: string; price?: string }[];
}
