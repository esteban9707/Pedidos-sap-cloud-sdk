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

  //Obtener listado de pedidos 
  @Get()
  async getSalesOrder(): Promise<SalesOrder[]> {
    return await this.salesOrderService.getAllSalesOrder().catch((error) => {
      throw new HttpException(
        `Failed to get business partners - ${error.message}`,
        500,
      );
    });
  }

  //Obtener un pedido a traves de un id
  @Get('/:id')
  async getSalesOrderById(@Param('id') id: string): Promise<SalesOrder> {
    return await this.salesOrderService.getSalesOrderById(id).catch((error) => {
      throw new HttpException(
        `Failed to get sales order - ${error.message}`,
        500,
      );
    });
  }

  //Crear un pedido con sus líneas
  @Post('/salesOrder')
  @HttpCode(201)
  async createSalesOrder(
    @Body() requestBody: Record<string, any>,
  ): Promise<SalesOrder> {
    return await this.salesOrderService.createSalesOrder(requestBody);
  }

  //Eliminar un pedido por id
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

  //Editar un pedido
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

  // Crear una línea a un pedido
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

  //Obtener líneas de un pedido
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

  //Obtener detalles de una línea de un pedido
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
