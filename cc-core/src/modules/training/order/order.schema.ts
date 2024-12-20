
import * as mongoose from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema, BaseSchemaFactory } from "@shopstack/cc-core-lib/core";

@Schema({ strict: false, timestamps: true })
export class Order extends BaseSchema {

    @Prop({ type: mongoose.Schema.Types.Date, type_date: "datetime", required: true })
    order_date: Date;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "customer", entities_title: "${ id }" })
    @Prop({ required: true })
    customer_id: string;


    @Prop({ required: true })
    product_id: string;


    @Prop({ required: true })
    amount: number;


    @Prop({ type: [String], values: ['pending', 'success', 'cancle'], fields_options_type: "options", default: 'pending' })
    order_status: string[];

}
export const OrderSchema = BaseSchemaFactory.createForClass(Order);


