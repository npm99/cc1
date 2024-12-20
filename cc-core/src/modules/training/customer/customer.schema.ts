
import * as mongoose from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema, BaseSchemaFactory } from "@shopstack/cc-core-lib/core";

@Schema({ strict: false, timestamps: true })
export class Customer extends BaseSchema {

    @Prop({ required: true })
    customer_name: string;


    @Prop({ required: true })
    customer_email: string;


    @Prop({ required: true })
    customer_telephone: string;

}
export const CustomerSchema = BaseSchemaFactory.createForClass(Customer);


