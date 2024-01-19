import { Injectable } from '@nestjs/common';
import { SalesOrder, salesOrderService } from 'services/sales-order-service';
const { salesOrderApi, salesOrderItemApi } = salesOrderService();


@Injectable()
export class SalesOrderService {
  
  destination = {
    url: 'https://my405807-api.s4hana.cloud.sap',
    username: 'USER_ADMINISTRATOR_HBT',
    password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
  };

  async getAllSalesOrder(): Promise<SalesOrder[]> {
    try {
      return await salesOrderApi
        .requestBuilder()
        .getAll()
        .top(10)
        .addCustomHeaders({ Accept: 'application/json' })
        .execute(this.destination);
    } catch (error) {
      console.error('Error en getAllSalesOrder:', error);
      throw error; 
    }
  }
  
  async getSalesOrderById(id: string): Promise<SalesOrder> {
    try {
      return await salesOrderApi
        .requestBuilder()
        .getByKey(id)
        .addCustomHeaders({ Accept: 'application/json' })
        .execute(this.destination);
    } catch (error) {
      console.error('Error en getSalesOrderById:', error);
      throw error;
    }
  }
  
  async createSalesOrder(salesOrder: Record<string, any>) {
    try {
      const salesOrderItemsArray = salesOrder.to_Item.results;
  
      const salerOrderItems = salesOrderItemsArray.map((item) => {
        return salesOrderItemApi.entityBuilder().fromJson(item);
      });
      const salesOrderEntity = salesOrderApi
        .entityBuilder()
        .toItem(salerOrderItems)
        .fromJson(salesOrder);
  
      return await salesOrderApi
        .requestBuilder()
        .create(salesOrderEntity)
        .addCustomHeaders({ Accept: 'application/json' })
        .execute(this.destination);
    } catch (error) {
      console.error('Error en createSalesOrder:', error);
      throw error;
    }
  }
  
  async deleteSalesOrder(salesOrderId): Promise<void> {
    try {
      const response = await salesOrderApi
        .requestBuilder()
        .getByKey(salesOrderId)
        .addCustomHeaders({ Accept: 'application/json' })
        .execute(this.destination);
  
      return await salesOrderApi.requestBuilder().delete(response).execute(this.destination);
    } catch (error) {
      console.error('Error en deleteSalesOrder:', error);
      throw error;
    }
  }
  
  async updateSalesOrder(requestBody, salesOrderId): Promise<SalesOrder> {
    try {
      let response = await salesOrderApi
        .requestBuilder()
        .getByKey(salesOrderId)
        .addCustomHeaders({ Accept: 'application/json' })
        .execute(this.destination);
  
      Object.assign(response, requestBody);
  
      return await salesOrderApi.requestBuilder().update(response).execute(this.destination);
    } catch (error) {
      console.error('Error en updateSalesOrder:', error);
      throw error;
    }
  }

  
}
