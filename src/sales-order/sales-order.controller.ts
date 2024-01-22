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
import { SalesOrder, SalesOrderItem } from 'services/sales-order-service';
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
  async createSalesOrder(
    @Body() requestBody: Record<string, any>,
  ): Promise<SalesOrder> {
    return await this.salesOrderService.createSalesOrder(requestBody);
  }

  @Delete('/:salesOrderId')
  async deleteSalesOrder(
    @Param('salesOrderId') salesOrderId: string,
  ): Promise<string> {
    try {
      await this.salesOrderService.deleteSalesOrder(salesOrderId);
      return 'La orden de venta se eliminó correctamente.';
    } catch (error) {
      throw new HttpException(
        `Failed to delete sales order - ${error.message}`,
        500,
      );
    }
  }

  @Put('/:salesOrderId')
  async updateSalesOrder(
    @Body() requestBody: Record<string, any>,
    @Param('salesOrderId') salesOrderId: string,
  ): Promise<SalesOrder> {
    return await this.salesOrderService
      .updateSalesOrder(requestBody, salesOrderId)
      .catch((error) => {
        throw new HttpException(
          `Failed to update sales order - ${error.message}`,
          500,
        );
      });
  }

  @Post('/:salesOrderId/to_Item')
  @HttpCode(201)
  async createSalesOrderItem(
    @Body() requestBody: Record<string, any>,
    @Param('salesOrderId') salesOrderId: string,
  ): Promise<SalesOrderItem> {
    return await this.salesOrderService.createSalesOrderItem(
      requestBody,
      salesOrderId,
    );
  }

  @Get('/:salesOrderId/to_Item')
  async getSalesOrderItem(
    @Param('salesOrderId') salesOrderId: string,
  ): Promise<SalesOrder> {
    return await this.salesOrderService
      .getSalesOrderItem(salesOrderId)
      .catch((error) => {
        throw new HttpException(
          `Failed to get sales order - ${error.message}`,
          500,
        );
      });
  }

  @Get('/:salesOrderId/to_Item/:salesOrderItemId')
  async getSalesOrderItemById(
    @Param('salesOrderId') salesOrderId: string,
    @Param('salesOrderItemId') salesOrderItemId: string,
  ): Promise<SalesOrderItem> {
    return await this.salesOrderService
      .getSalesOrderItemById(salesOrderId, salesOrderItemId)
      .catch((error) => {
        throw new HttpException(
          `Failed to get sales order - ${error.message}`,
          500,
        );
      });
  }
}
