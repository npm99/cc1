
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as moduleConfig from "../module.json";

import { Injectable, Inject, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { EntitiesService, BaseService, callInternalModuleSetting, callFindInternalService, callUpdateInternalService, callBulkUpdateInternalService } from "@shopstack/cc-core-lib/core";
import { ClsService } from "nestjs-cls";
import { Order, OrderSchema } from "./order.schema";
import { TrainingOrderLayout } from "./order.layout";
import { TrainingOrderCustomAction } from "./order.custom_action";

const { code, name } = moduleConfig;

@Injectable()
export class TrainingOrderService extends BaseService<Order> {
    constructor(
        readonly cls: ClsService,
        private entitiesService: EntitiesService,
        @InjectModel("training_order")
        protected model: mongoose.Model<Order>
    ) {
        super(cls, model);
    }

    public async init(): Promise<string> {
        TrainingOrderService.prefix = code;
        await this.entitiesService.refreshSystemSchema(TrainingOrderService, this.model, Order, OrderSchema, {
            layouts: TrainingOrderLayout,
            custom_action: TrainingOrderCustomAction
        });
        return "[TRAINING MODULE] TrainingOrderService";
    }

    private async _updateStock(data, product) {
        product.stock_quantity += data.amount;
        // return await callUpdateInternalService('training_product', product)
    }

    async create(data: Order): Promise<Order> {
        const c = super.create(data)
        const product = await callFindInternalService('training_product', data.product_id)
        await this._updateStock(data, product)
        return c
    }


}

