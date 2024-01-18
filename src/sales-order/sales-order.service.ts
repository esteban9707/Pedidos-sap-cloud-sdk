import { Injectable } from '@nestjs/common';
import { SalesOrder, salesOrderService } from 'services/sales-order-service';
const { salesOrderApi, salesOrderItemApi } = salesOrderService();
import {
  defaultDeSerializers,
  entityDeserializer,
} from '@sap-cloud-sdk/odata-v2/internal';
import { entitySerializer } from '@sap-cloud-sdk/odata-common/';

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

  async createSalesOrder(salesOrder: Record<string, any>): Promise<SalesOrder> {
    const salesOrderEntiy = salesOrderApi.entityBuilder().fromJson(salesOrder);
    console.log(salesOrderEntiy);
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

  async createSalesOrder2(
    salesOrder: Record<string, any>,
  ): Promise<SalesOrder> {
    const salerOrderItem = salesOrderItemApi.entityBuilder().fromJson({
      Material: 'TG11',
      RequestedQuantity: '12',
      SalesOrderItem: '1',
      RequestedQuantityUnit: 'PC',
      ItemGrossWeight: '6.00',
      NetAmount: '89',
    });

    const salesOrderEntiy = salesOrderApi
      .entityBuilder()
      .toItem([salerOrderItem])
      .fromJson({
        salesOrder,
      });

    const deserialized = entitySerializer(defaultDeSerializers).serializeEntity(
      salesOrderEntiy,
      salesOrderApi,
    );

    console.log(JSON.stringify(deserialized, null, 2));
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
