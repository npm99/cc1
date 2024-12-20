
import * as _ from "lodash";
import * as moduleConfig from "../module.json";

import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BaseController } from "@shopstack/cc-core-lib/core";
import { ApiTags } from "@nestjs/swagger";
import { TrainingProductService } from "./product.service";

const { code, name } = moduleConfig;

@ApiTags("Training Module: Product")
@Controller("training_product")
export class TrainingProductController {
    constructor(protected service: TrainingProductService) { }

    @Patch("/update-stock/:id")
    async sampleMethod(@Param('id') id, @Body() body): Promise<any> {
        return this.service.updateStock(id, body);
    }
}

