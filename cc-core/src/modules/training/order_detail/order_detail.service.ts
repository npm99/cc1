
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as moduleConfig from "../module.json";

import { Injectable, Inject, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { EntitiesService, BaseService } from "@shopstack/cc-core-lib/core";
import { ClsService } from "nestjs-cls";
import { OrderDetail, OrderDetailSchema } from "./order_detail.schema";
import { TrainingOrderDetailLayout } from "./order_detail.layout";

const { code, name } = moduleConfig;

@Injectable()
export class TrainingOrderDetailService extends BaseService<OrderDetail> {
    constructor(
        readonly cls: ClsService,
        private entitiesService: EntitiesService,
        @InjectModel("training_order_detail")
        protected model: mongoose.Model<OrderDetail>
    ) {
        super(cls, model);
    }

    public async init(): Promise<string> {
        TrainingOrderDetailService.prefix = code;
        await this.entitiesService.refreshSystemSchema(TrainingOrderDetailService, this.model, OrderDetail, OrderDetailSchema, {
            layouts: TrainingOrderDetailLayout,
        });
        return "[TRAINING MODULE] TrainingOrderDetailService";
    }
}

