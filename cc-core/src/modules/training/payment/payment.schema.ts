
import * as mongoose from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema, BaseSchemaFactory } from "@shopstack/cc-core-lib/core";

@Schema({ strict: false, timestamps: true })
export class Payment extends BaseSchema {

    @Prop({ required: true })
    order_id: string;


    @Prop({ required: true })
    payment_method: string;


    @Prop({ type: [String], values: ['pending', 'pay', 'cancle'], required: true, fields_options_type: "options" })
    payment_status: string[];


    @Prop({ required: true })
    payment_amount: number;


}
export const PaymentSchema = BaseSchemaFactory.createForClass(Payment);



