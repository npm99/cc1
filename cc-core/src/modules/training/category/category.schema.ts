
import * as mongoose from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema, BaseSchemaFactory } from "@shopstack/cc-core-lib/core";

@Schema({ strict: false, timestamps: true })
export class Category extends BaseSchema {

    @Prop({ required: true })
    category_name: string;

}
export const CategorySchema = BaseSchemaFactory.createForClass(Category);


