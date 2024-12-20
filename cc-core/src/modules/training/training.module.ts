import * as _ from "lodash";
import { MongooseModule } from "@nestjs/mongoose";
import * as moduleConfig from "./module.json";

import { Module } from "@nestjs/common";
import { EntitiesModule, SettingModule } from "@shopstack/cc-core-lib/core";
import { ClsModule } from "nestjs-cls";
import { TrainingSettingService } from "./setting/setting.service";
import { ProductSchema } from "./product/product.schema";
import { TrainingProductService } from "./product/product.service";
import { TrainingOrderService } from "./order/order.service";
import { TrainingCategoryService } from "./category/category.service";
import { TrainingCustomerService } from "./customer/customer.service";
import { CustomerSchema } from "./customer/customer.schema";
import { CategorySchema } from "./category/category.schema";
import { OrderSchema } from "./order/order.schema";
import { TrainingProductController } from "./product/product.controller";
import { TrainingOrderDetailService } from "./order_detail/order_detail.service";
import { TrainingPaymentService } from "./payment/payment.service";
import { PaymentSchema } from "./payment/payment.schema";
import { OrderDetailSchema } from "./order_detail/order_detail.schema";
import { TrainingCustomerController } from "./customer/customer.controller";
import { TrainingPaymentController } from "./payment/payment.controller";

const { code } = moduleConfig;

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: `${code}_product`,
        useFactory: () => {
          return ProductSchema;
        }
      },
      {
        name: `${code}_customer`,
        useFactory: () => {
          return CustomerSchema;
        }
      },
      {
        name: `${code}_category`,
        useFactory: () => {
          return CategorySchema;
        }
      },
      {
        name: `${code}_order`,
        useFactory: () => {
          return OrderSchema;
        }
      },
      {
        name: `${code}_payment`,
        useFactory: () => {
          return PaymentSchema;
        }
      },
      {
        name: `${code}_order_detail`,
        useFactory: () => {
          return OrderDetailSchema;
        }
      }
    ]),
    ClsModule,
    EntitiesModule,
    SettingModule,
  ],
  controllers: [TrainingProductController, TrainingPaymentController],
  providers: [
    TrainingPaymentService,
    TrainingOrderDetailService,
    TrainingCustomerService,
    // TrainingCategoryService,
    TrainingOrderService,
    TrainingProductService,
    TrainingSettingService
  ],
})
export class TrainingModule { } 
