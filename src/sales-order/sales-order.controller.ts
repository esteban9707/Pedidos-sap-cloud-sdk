import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SalesOrderService } from './sales-order.service';
import { SalesOrder } from 'services/sales-order-service';
@Controller('sales-order')
export class SalesOrderController {
  constructor(private salesOrderService: SalesOrderService) {}
  @Get()
  async getSalesOrder(): Promise<SalesOrder[]> {
    return await this.salesOrderService.getAllSalesOrder().catch((error) => {
      throw new HttpException(
        `Failed to get business partners - ${error.message}`,
        500,
      );
    });
  }

  @Get('/:id')
  async getSalesOrderById(@Param('id') id: string): Promise<SalesOrder> {
    return await this.salesOrderService.getSalesOrderById(id).catch((error) => {
      throw new HttpException(
        `Failed to get sales order - ${error.message}`,
        500,
      );
    });
  }

  @Post('/salesOrder')
  @HttpCode(201)
  async createAddress(
    @Body() requestBody: Record<string, any>
  ): Promise<SalesOrder> {
    return await this.salesOrderService.createSalesOrder2(requestBody);
  }

  @Delete('/:salesOrderId')
  @HttpCode(204)
  async deleteSalesOrder(
    @Param('salesOrderId') salesOrderId: string,
  ): Promise<void> {
    return await this.salesOrderService
      .deleteSalesOrder(salesOrderId)
      .catch((error) => {
        throw new HttpException(
          `Failed to delete sales order - ${error.message}`,
          500,
        );
      });
  }

  @Put('/:salesOrderId')
  async updateSalesOrder(
    @Body() requestBody: Record<string, any>,
    @Param('salesOrderId') salesOrderId: string,
  ): Promise<SalesOrder> {
    return await this.salesOrderService.updateSalesOrder(
      requestBody,
      salesOrderId,
    );
  }
}
