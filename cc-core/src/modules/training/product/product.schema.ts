import { Schema, Prop } from "@nestjs/mongoose";
import { BaseSchema, BaseSchemaFactory } from "@shopstack/cc-core-lib/core";
import * as mongoose from "mongoose";

@Schema({ strict: false, timestamps: true })
export class Product extends BaseSchema {

    @Prop({ required: true })
    product_name: string;


    @Prop({ required: true })
    product_detail: string;


    @Prop({ required: true, is_unique: true })
    product_code: string;


    @Prop({ type: mongoose.Schema.Types.Decimal128, decimal_length: 2, required: true })
    product_price: number;


    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "category", entities_title: "${ id }", requiredd: true })
    // category_id: any;

    // @Prop({ default: 0 })
    // stock_quantity: number;

}
export const ProductSchema = BaseSchemaFactory.createForClass(Product);