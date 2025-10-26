import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { InvoiceStripeService } from '../../services/invoice-stripe.service';
import { CreateStripeInvoiceDto } from '../../dto/invoice/create-invoice.dto';

@Controller('stripe/invoice')
export class InvoiceController {
  constructor(private readonly invoiceStripeService: InvoiceStripeService) {}

  @Post()
  create(@Body() createStripeInvoiceDto: CreateStripeInvoiceDto) {
    return this.invoiceStripeService.createInvoice(createStripeInvoiceDto);
  }

  @Get('customer/:id')
  findAll(@Query() limit: number, @Param('id') customerId: string) {
    return this.invoiceStripeService.listInvoices(customerId, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceStripeService.retrieveInvoice(id);
  }

  @Post('finalize/:id')
  finalize(@Param('id') id: string) {
    return this.invoiceStripeService.finalizeInvoice(id);
  }

  @Post('pay/:id')
  pay(@Param('id') id: string) {
    return this.invoiceStripeService.payInvoice(id);
  }

  @Post('void/:id')
  void(@Param('id') id: string) {
    return this.invoiceStripeService.voidInvoice(id);
  }
}
