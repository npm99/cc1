
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as moduleConfig from "../module.json";

import { Injectable, Inject, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { EntitiesService, BaseService } from "@shopstack/cc-core-lib/core";
import { ClsService } from "nestjs-cls";
import { Product, ProductSchema } from "./product.schema";
import { TrainingProductLayout } from "./product.layout";
import { TrainingProductCustomAction } from "./product.custom_action";

const { code, name } = moduleConfig;

@Injectable()
export class TrainingProductService extends BaseService<Product> {
    constructor(
        readonly cls: ClsService,
        private entitiesService: EntitiesService,
        @InjectModel("training_product")
        protected model: mongoose.Model<Product>
    ) {
        super(cls, model);
    }

    public async init(): Promise<string> {
        TrainingProductService.prefix = code;
        await this.entitiesService.refreshSystemSchema(TrainingProductService, this.model, Product, ProductSchema, {
            layouts: TrainingProductLayout,
            custom_action: TrainingProductCustomAction
        });
        return "[TRAINING MODULE] TrainingProductService";
    }


    async create(data: Product): Promise<Product> {
        console.log(data);
        return super.create(data)
    }

    public async updateStock(id, data) {
        return super.update(id, data)
    }

}

