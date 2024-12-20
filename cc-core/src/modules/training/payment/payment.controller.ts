
import * as _ from "lodash";
import * as moduleConfig from "../module.json";

import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BaseController } from "@shopstack/cc-core-lib/core";
import { ApiTags } from "@nestjs/swagger";
import { TrainingPaymentService } from "./payment.service";

const { code, name } = moduleConfig;

@ApiTags("Training Module: Payment")
@Controller("training_payment")
export class TrainingPaymentController {
  constructor(protected service: TrainingPaymentService) {}

  // @Patch("/sample")
  // async sampleMethod(): Promise<any> {
  //   return this.service.sample();
  // }

  @Patch("/create_payment/:id")
  async sampleMethod(@Param('id') id, @Body() body): Promise<any> {
      return this.service.createPayment(id, body);
  }

  @Patch("/update_status/:id")
  async updatePaymentStatus(@Param('id') id, @Body() body): Promise<any> {
      return this.service.updatePaymentStatus(id, body);
  }
}

