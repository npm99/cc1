
import * as _ from "lodash";
import * as moduleConfig from "../module.json";

import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BaseController } from "@shopstack/cc-core-lib/core";
import { ApiTags } from "@nestjs/swagger";
import { TrainingCustomerService } from "./customer.service";

const { code, name } = moduleConfig;

@ApiTags("Training Module: Customer")
@Controller("training_customer")
export class TrainingCustomerController {
    constructor(protected service: TrainingCustomerService) { }

    // @Patch("/create_payment/:id")
    // async sampleMethod(@Param('id') id, @Body() body): Promise<any> {
    //     return this.service.createPayment(id, body);
    // }
}

