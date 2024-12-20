
import * as mongoose from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema, BaseSchemaFactory } from "@shopstack/cc-core-lib/core";

@Schema({ strict: false, timestamps: true })
export class OrderDetail extends BaseSchema {

    @Prop({ required: true })
    order_id: string;


    @Prop({ required: true })
    product_id: string;


    @Prop({ required: true })
    quantity: number;


    @Prop({ required: true })
    total_price: number;

}
export const OrderDetailSchema = BaseSchemaFactory.createForClass(OrderDetail);


