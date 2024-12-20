
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as moduleConfig from "../module.json";

import { Injectable, Inject, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { EntitiesService, BaseService } from "@shopstack/cc-core-lib/core";
import { ClsService } from "nestjs-cls";
import { Payment, PaymentSchema } from "./payment.schema";
import { TrainingPaymentLayout } from "./payment.layout";

const { code, name } = moduleConfig;

@Injectable()
export class TrainingPaymentService extends BaseService<Payment> {
    constructor(
        readonly cls: ClsService,
        private entitiesService: EntitiesService,
        @InjectModel("training_payment")
        protected model: mongoose.Model<Payment>
    ) {
        super(cls, model);
    }

    public async init(): Promise<string> {
        TrainingPaymentService.prefix = code;
        await this.entitiesService.refreshSystemSchema(TrainingPaymentService, this.model, Payment, PaymentSchema, {
            layouts: TrainingPaymentLayout,
        });
        return "[TRAINING MODULE] TrainingPaymentService";
    }

    async find(keywords: string, filters?: any, sort?: string, noTranslate?: boolean, fields?: Array<string>): Promise<Payment> {
        console.log('333');
        return super.find(keywords, filters, sort, noTranslate, fields)
    }

    async create(data: Payment): Promise<Payment> {
        return super.create(data)
    }

    public async createPayment(id, body) {
        const pay = await super.find(id);
        if (pay._id) {
            return super.update(pay._id, body)
        }
        return super.create({
            ...body,
            payment_status: 'pending'
        })
    }

    public async updatePaymentStatus(id, body) {
        return super.update(id, {
            ...body,
        })
    }
}

