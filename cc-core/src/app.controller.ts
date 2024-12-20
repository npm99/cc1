import * as _ from "lodash";

import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";

import { Public, CONST } from "@shopstack/cc-core-lib/core";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get("/health_check")
  healthCheck(): boolean {
    return this.appService.healthCheck();
  }

  @Public()
  @Get("/health_check/init")
  init(): string {
    return this.appService.init();
  }

  @Get("/all_x_routes/:method/:entity")
  listAllRoutes(@Param() params: any): any {
    const { method, entity } = params;
    if (_.isEmpty(method)) {
      return [];
    }
    const result = CONST.ENDPOINT_PATHS.filter(
      p => p.method.toLowerCase() === method.toLowerCase()
    );
    if (_.isEmpty(entity) || entity === "undefined") {
      return result;
    }
    return result.filter(
      r => r.path.indexOf(entity) === 0 || r.path.indexOf(":entity") === 0
    );
  }
}
