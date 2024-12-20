
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as moduleConfig from "../module.json";

import { Injectable, Inject, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { EntitiesService, BaseService } from "@shopstack/cc-core-lib/core";
import { ClsService } from "nestjs-cls";
import { Category, CategorySchema } from "./category.schema";
import { TrainingCategoryLayout } from "./category.layout";

const { code, name } = moduleConfig;

@Injectable()
export class TrainingCategoryService extends BaseService<Category> {
    constructor(
        readonly cls: ClsService,
        private entitiesService: EntitiesService,
        @InjectModel("training_category")
        protected model: mongoose.Model<Category>
    ) {
        super(cls, model);
    }

    public async init(): Promise<string> {
        TrainingCategoryService.prefix = code;
        await this.entitiesService.refreshSystemSchema(TrainingCategoryService, this.model, Category, CategorySchema, {
            layouts: TrainingCategoryLayout,
        });
        return "[TRAINING MODULE] TrainingCategoryService";
    }

    async create(data: Category): Promise<Category> {
        console.log(data);
        return super.create(data)
    }
}

