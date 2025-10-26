import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { IntentStripeService } from '../../services/intent-stripe.service';
import { CreateIntentDto } from '../../dto/intent/create-intent.dto';
import { UpdateIntentDto } from 'src/stripe/dto/intent/update-intent.dto';

@Controller('stripe/intent')
export class IntentController {
  constructor(private readonly intentStripeService: IntentStripeService) {}

  @Post()
  create(@Body() createIntentDto: CreateIntentDto) {
    return this.intentStripeService.createPaymentIntent(createIntentDto);
  }

  @Get(':id')
  retriveIntent(intentId: string) {
    return this.intentStripeService.retrievePaymentIntent(intentId);
  }

  @Put(':id')
  updateIntent(
    @Param('id') intentId: string,
    @Body() updateIntentDto: UpdateIntentDto,
  ) {
    return this.intentStripeService.updatePaymentIntent(
      intentId,
      updateIntentDto,
    );
  }

  @Post('confirm/:id')
  confirmIntent(@Param('id') intentId: string) {
    return this.intentStripeService.confirmPaymentIntent(intentId);
  }

  @Post('cancel/:id')
  cancelIntent(@Param('id') intentId: string) {
    return this.intentStripeService.cancelPaymentIntent(intentId);
  }
}
