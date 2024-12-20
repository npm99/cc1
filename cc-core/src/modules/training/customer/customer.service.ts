
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as moduleConfig from "../module.json";

import { Injectable, Inject, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { EntitiesService, BaseService } from "@shopstack/cc-core-lib/core";
import { ClsService } from "nestjs-cls";
import { Customer, CustomerSchema } from "./customer.schema";
import { TrainingCustomerLayout } from "./customer.layout";
const { code, name } = moduleConfig;

@Injectable()
export class TrainingCustomerService extends BaseService<Customer> {
  constructor(
    readonly cls: ClsService,
    private entitiesService: EntitiesService,
    @InjectModel("training_customer")
    protected model: mongoose.Model<Customer>
  ) {
    super(cls, model);
  }

  public async init(): Promise<string> {
    TrainingCustomerService.prefix = code;
    await this.entitiesService.refreshSystemSchema(TrainingCustomerService, this.model, Customer, CustomerSchema, {
      layouts: TrainingCustomerLayout,
    });
    return "[TRAINING MODULE] TrainingCustomerService";
  }


  
}

