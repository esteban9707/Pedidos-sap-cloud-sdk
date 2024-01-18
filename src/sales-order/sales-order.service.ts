import { Injectable } from '@nestjs/common';
import { SalesOrder, salesOrderService } from 'services/sales-order-service';
const { salesOrderApi, salesOrderItemApi } = salesOrderService();


@Injectable()
export class SalesOrderService {
  async getAllSalesOrder(): Promise<SalesOrder[]> {
    return await salesOrderApi
      .requestBuilder()
      .getAll()
      .top(10)
      .addCustomHeaders({ Accept: 'application/json' })
      .execute({
        url: 'https://my405807-api.s4hana.cloud.sap',
        username: 'USER_ADMINISTRATOR_HBT',
        password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
      });
  }

  async getSalesOrderById(id: string): Promise<SalesOrder> {
    return await salesOrderApi
      .requestBuilder()
      .getByKey(id)
      .addCustomHeaders({ Accept: 'application/json' })
      .execute({
        url: 'https://my405807-api.s4hana.cloud.sap',
        username: 'USER_ADMINISTRATOR_HBT',
        password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
      });
  }

  async createSalesOrder(salesOrder: Record<string, any>) {
    const salesOrderItemsArray = salesOrder.to_Item.results;

    const salerOrderItems = salesOrderItemsArray.map((item) => {
      return salesOrderItemApi.entityBuilder().fromJson(item);
    });
    const salesOrderEntiy = salesOrderApi
      .entityBuilder()
      .toItem(salerOrderItems)
      .fromJson(salesOrder);

    return await salesOrderApi
      .requestBuilder()
      .create(salesOrderEntiy)
      .addCustomHeaders({ Accept: 'application/json' })
      .execute({
        url: 'https://my405807-api.s4hana.cloud.sap',
        username: 'USER_ADMINISTRATOR_HBT',
        password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
      });
  }

  async deleteSalesOrder(salesOrderId): Promise<void> {
    const response = await salesOrderApi
      .requestBuilder()
      .getByKey(salesOrderId)
      .addCustomHeaders({ Accept: 'application/json' })
      .execute({
        url: 'https://my405807-api.s4hana.cloud.sap',
        username: 'USER_ADMINISTRATOR_HBT',
        password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
      });

    return await salesOrderApi.requestBuilder().delete(response).execute({
      url: 'https://my405807-api.s4hana.cloud.sap',
      username: 'USER_ADMINISTRATOR_HBT',
      password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
    });
  }

  async updateSalesOrder(requestBody, salesOrderId): Promise<SalesOrder> {
    let response = await salesOrderApi
      .requestBuilder()
      .getByKey(salesOrderId)
      .addCustomHeaders({ Accept: 'application/json' })
      .execute({
        url: 'https://my405807-api.s4hana.cloud.sap',
        username: 'USER_ADMINISTRATOR_HBT',
        password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
      });

    Object.assign(response, requestBody);

    return await salesOrderApi.requestBuilder().update(response).execute({
      url: 'https://my405807-api.s4hana.cloud.sap',
      username: 'USER_ADMINISTRATOR_HBT',
      password: 'AHyGnbty8neBGTVtGtbgJmpyoV#VtibskwjUTUou',
    });
  }

  
}
