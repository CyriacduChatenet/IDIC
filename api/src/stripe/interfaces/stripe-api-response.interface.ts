export interface StripeApiFindOneCustomer {
  id: string;
  object: 'customer';
  address: null | string;
  balance: number;
  created: number;
  currency: null | string;
  default_source: null | string;
  delinquent: boolean;
  description: null | string;
  discount: null;
  email: string;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: null;
    default_payment_method: null;
    footer: null;
    rendering_options: null;
  };
  livemode: boolean;
  metadata: object;
  name: string;
  phone: null | string;
  preferred_locales: [];
  shipping: null;
  tax_exempt: string;
  test_clock: null;
}
