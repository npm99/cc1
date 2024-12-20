/***
 * This example structure when developer config custom module
 * const CUSTOM_MODULES = [
 * { module: CarriersModule, services: [CarrierCarrierService, CarrierLogService] },
 * { module: CustomersModule, services: [CustomerService, AddressService] },
 * { module: ProductsModule, services: [ProductService] },
 * { module: OrdersModule, services: [ChannelService, OrderService, OrderItemService] }
 * ];

export { CUSTOM_MODULES };

 */

import { TrainingCategoryService } from "./training/category/category.service";
import { TrainingCustomerService } from "./training/customer/customer.service";
import { TrainingOrderService } from "./training/order/order.service";
import { TrainingOrderDetailService } from "./training/order_detail/order_detail.service";
import { TrainingPaymentService } from "./training/payment/payment.service";
import { TrainingProductService } from "./training/product/product.service";
import { TrainingSettingService } from "./training/setting/setting.service";
import { TrainingModule } from "./training/training.module";

const CUSTOM_MODULES = [
    {
        module: TrainingModule,
        services: [
            TrainingPaymentService,
            TrainingOrderDetailService,
            TrainingCustomerService,
            // TrainingCategoryService,
            TrainingOrderService,
            TrainingProductService,
            TrainingSettingService
        ]
    },
];

export { CUSTOM_MODULES };
