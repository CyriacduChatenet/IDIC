import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { SubscriptionStripeService } from '../../services/subscription-stripe.service';
import { CreateStripeSubscriptionDto } from '../../dto/subscription/create-subscription.dto';
import { UpdateStripetSubscriptionDto } from 'src/stripe/dto/subscription/update-subscription.dto';

@Controller('stripe/subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionStripeService: SubscriptionStripeService,
  ) {}

  @Post()
  create(@Body() createStripeSubscriptionDto: CreateStripeSubscriptionDto) {
    return this.subscriptionStripeService.createSubscription(
      createStripeSubscriptionDto,
    );
  }

  @Get()
  findAll(@Query() limit: number) {
    return this.subscriptionStripeService.listSubscriptions(limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionStripeService.retrieveSubscription(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStripeSubscriptionDto: UpdateStripetSubscriptionDto,
  ) {
    return this.subscriptionStripeService.updateSubscription(
      id,
      updateStripeSubscriptionDto,
    );
  }

  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.subscriptionStripeService.cancelSubscription(id);
  }
}
