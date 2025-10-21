import { InitStripe } from './init-stripe.service';

export class ProductStripe {
  private stripe: InitStripe;

  constructor() {
    this.stripe = new InitStripe();
  }

  public createProduct = async (name: string, description: string) => {
    return await this.stripe.getStripeInstance().products.create({
      name,
      description,
    });
  };

  public retrieveProduct = async (productId: string) => {
    return await this.stripe.getStripeInstance().products.retrieve(productId);
  };

  public updateProduct = async (
    productId: string,
    updates: { name?: string; description?: string },
  ) => {
    return await this.stripe
      .getStripeInstance()
      .products.update(productId, updates);
  };

  public deleteProduct = async (productId: string) => {
    return await this.stripe.getStripeInstance().products.del(productId);
  };

  public listProducts = async (limit: number = 10) => {
    return await this.stripe.getStripeInstance().products.list({ limit });
  };

  public searchProducts = async (query: string, limit: number = 10) => {
    return await this.stripe.getStripeInstance().products.search({
      query,
      limit,
    });
  };

  public listAllProducts = async () => {
    type StripeProduct = {
      id: string;
      [key: string]: any;
    };
    const products: StripeProduct[] = [];
    let hasMore = true;
    let startingAfter: string | undefined = undefined;

    while (hasMore) {
      const response: { data: StripeProduct[]; has_more: boolean } =
        await this.stripe.getStripeInstance().products.list({
          limit: 100,
          starting_after: startingAfter,
        });

      products.push(...response.data);
      hasMore = response.has_more;
      if (hasMore && response.data.length > 0) {
        startingAfter = response.data[response.data.length - 1].id;
      }
    }

    return products;
  };
}
