import * as _ from "lodash";

import {
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  Delete,
  Query,
  Controller
} from "@nestjs/common";
import {
  CoreLogService,
  CoreService,
  CoreSettingService
} from "./core.service";
import {
  Basic,
  SearchResultDto,
  convertFilter
} from '@shopstack/cc-core-lib/core'

@Controller()
export class CoreController {
  constructor(
    private readonly service: CoreService,
    private readonly serviceLog: CoreLogService,
    private readonly serviceSetting: CoreSettingService
  ) { }

  private _convertFields(fields: string) {
    return _.isEmpty(fields) ? undefined : fields.split(",");
  }

  @Get("/:entity/init")
  async init(@Param() params: any): Promise<string> {
    if (
      !["mail_setting"].includes(params.entity) &&
      params.entity.indexOf("_setting") !== -1
    ) {
      return "Not implement yet.";
    }
    return this.service.init(params.entity);
  }

  @Get("/:entity/init_data")
  async initData(@Param() params: any): Promise<void> {
    await this.service.initData(params.entity);
  }

  @Basic()
  @Get("/:entity")
  async search(
    @Param() params: any,
    @Query() query: any
  ): Promise<SearchResultDto> {
    if (
      !["mail_setting"].includes(params.entity) &&
      params.entity.indexOf("_setting") !== -1
    ) {
      return this.serviceSetting.getSetting(params.entity);
    } else {
      const { keywords, filters, page, page_size, sort, grouping, fields } = query;
      return this.service.search(
        params.entity,
        keywords,
        convertFilter(filters),
        page ? parseInt(page, 10) : 1,
        page_size ? parseInt(page_size, 10) : 10,
        sort,
        this._convertFields(grouping),
        false,
        this._convertFields(fields)
      );
    }
  }

  @Basic()
  @Get("/:entity/find")
  async find(@Param() params: any, @Query() query: any): Promise<any> {
    const { keywords, filters, sort, fields } = query;
    return this.service.find(
      params.entity,
      keywords,
      convertFilter(filters),
      sort,
      false,
      this._convertFields(fields)
    );
  }

  @Basic()
  @Get("/:entity/workflow/:id")
  workflowActions(@Param() params: any): Promise<any> {
    return this.service.workflowActions(params.entity, params.id);
  }

  @Basic()
  @Get("/:entity/aggregate")
  aggregate(@Param() params: any, @Query() query: any): any {
    return this.service.aggregate(params.entity, query.query);
  }

  @Basic()
  @Patch("/:entity/aggregate")
  aggregateBody(@Param() params: any, @Body() body: any): any {
    return this.service.aggregate(
      params.entity,
      JSON.stringify({ query: body })
    );
  }

  @Basic()
  @Get("/:entity/count")
  async count(@Param() params: any, @Query() query: any): Promise<any> {
    const { filters, keywords } = query;
    return this.service.count(params.entity, convertFilter(filters), keywords);
  }

  @Get("/:entity/:layout/find")
  async findWithLayout(
    @Query() query: any,
    @Param() params: any
  ): Promise<any> {
    const { keywords, filters, sort } = query;
    return this.service.findWithLayout(
      params.entity,
      params.layout,
      keywords,
      convertFilter(filters),
      sort
    );
  }

  @Get("/:entity/:layout/aggregate")
  aggregateWithLayout(@Param() params: any, @Query() query: any): any {
    return this.service.aggregate(params.entity, query.query);
  }

  @Get("/:entity/:layout/count")
  async countWithLayout(
    @Param() params: any,
    @Query() query: any
  ): Promise<any> {
    const { filters, keywords } = query;
    return this.service.count(params.entity, convertFilter(filters), keywords);
  }

  @Basic()
  @Get("/:entity/:key")
  async findOneOrSearchWithLayout(
    @Param() params: any,
    @Query() query: any
  ): Promise<any> {
    if (
      !["mail_setting"].includes(params.entity) &&
      params.entity.indexOf("_setting") !== -1
    ) {
      return this.serviceSetting.getSetting(params.entity, params.key);
    } else {
      if (/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(params.key)) {
        return this.service.findOne(
          params.entity,
          params.key,
          this._convertFields(query.fields)
        );
      }
      const { keywords, filters, page, page_size, sort, grouping } = query;
      return this.service.searchWithLayout(
        params.entity,
        params.key,
        keywords,
        convertFilter(filters),
        page ? parseInt(page, 10) : 1,
        page_size ? parseInt(page_size, 10) : 10,
        sort,
        this._convertFields(grouping)
      );
    }
  }

  @Basic()
  @Get("/:entity/ids")
  dataIdsSearch(@Param() params: any, @Query() query: any): any {
    const { keywords, filters, page, page_size, sort } = query;
    return this.service.searchIds(
      params.entity,
      keywords,
      convertFilter(filters),
      page ? parseInt(page, 10) : 1,
      page_size ? parseInt(page_size, 10) : 10,
      sort
    );
  }

  @Get("/:entity/:layout/:id")
  async searchWithLayout(@Param() params: any): Promise<any> {
    return this.service.findOneWithLayout(
      params.entity,
      params.layout,
      params.id
    );
  }

  @Basic()
  @Get("/:entity/find/translate/:locale")
  async findWithLocale(
    @Param() params: any,
    @Query() query: any
  ): Promise<any> {
    const { keywords, filters, sort } = query;
    return this.service.findWithLocale(
      params.entity,
      params.locale,
      keywords,
      convertFilter(filters),
      sort
    );
  }

  @Get("/:entity/:layout/:id/translate/:locale")
  async dataWithLocale(@Param() params: any): Promise<any> {
    return this.service.dataWithLocale(
      params.entity,
      params.layout,
      params.id,
      params.locale
    );
  }

  @Basic()
  @Post("/:entity")
  async create(@Param() params: any, @Body() data: any): Promise<any> {
    return this.service.create(params.entity, data);
  }

  @Basic()
  @Put("/:entity")
  async setSetting(@Param() params: any, @Body() body: any): Promise<any> {
    return this.serviceSetting.setSetting(params.entity, body);
  }

  @Basic()
  @Put("/:entity/:id")
  async update(@Param() params: any, @Body() data: any): Promise<any> {
    if (
      !["mail_setting"].includes(params.entity) &&
      params.entity.indexOf("_setting") !== -1
    ) {
      return this.serviceSetting.setSetting(params.entity, data, params.id);
    } else {
      return this.service.update(params.entity, params.id, data);
    }
  }

  @Basic()
  @Put("/:entity/:id/approve")
  async approve(@Param() params: any, @Body() data: any): Promise<any> {
    return this.service.approve(params.entity, params.id, data);
  }

  @Put("/:entity/:layout/:id/approve")
  async approveWithLayout(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.approve(params.entity, params.id, data);
  }

  @Put("/:entity/:layout/:id")
  async updateWithLayout(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.update(params.entity, params.id, data);
  }

  @Basic()
  @Put("/:entity/:id/translate/:locale")
  async setDataLocale(@Param() params: any, @Body() data: any): Promise<any> {
    return this.service.setDataLocale(
      params.entity,
      params.id,
      params.locale,
      data
    );
  }

  @Basic()
  @Delete("/:entity/:id")
  async delete(@Param() params: any): Promise<any> {
    return this.service.delete(params.entity, params.id);
  }

  @Delete("/:entity/:layout/:id")
  async deleteWithLayout(@Param() params: any): Promise<any> {
    return this.service.delete(params.entity, params.id);
  }

  @Basic()
  @Post("/:entity/bulk_create")
  async bulkCreate(@Param() params: any, @Body() body: any): Promise<any> {
    return this.service.bulkCreate(params.entity, body.data);
  }

  @Basic()
  @Post("/:entity/bulk_update")
  async bulkUpdate(@Param() params: any, @Body() body: any): Promise<any> {
    return this.service.bulkUpdate(params.entity, body.data);
  }

  @Basic()
  @Post("/:entity/bulk_delete")
  async bulkDelete(@Param() params: any, @Body() data: any): Promise<any> {
    return this.service.bulkDelete(params.entity, data.ids);
  }

  @Post("/:entity/:layout/bulk_update")
  async bulkUpdateWithLayout(
    @Param() params: any,
    @Body() body: any
  ): Promise<any> {
    return this.service.bulkUpdate(params.entity, body.data);
  }

  @Post("/:entity/:layout/bulk_delete")
  async bulkDeleteWithLayout(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.bulkDelete(params.entity, data.ids);
  }

  @Post("/:entity/:layout")
  async createWithLayout(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.create(params.entity, data);
  }

  @Basic()
  @Patch("/:entity/prepare_generate_data")
  async prepareGenerateData(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.prepareGenerateData(params.entity, data);
  }

  @Basic()
  @Patch("/:entity/generate_data")
  async generateData(
    @Param() params: any,
    @Body() data: any
  ): Promise<boolean> {
    return this.service.generateData(params.entity, data);
  }

  @Basic()
  @Patch("/:entity/progress_generate_data")
  async progressGenerateData(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.progressGenerateData(params.entity, data.ref_id);
  }

  @Basic()
  @Patch("/:entity/workflow/:id")
  async executeWorkflowAction(
    @Param() params: any,
    @Body() body: any
  ): Promise<boolean> {
    return this.service.executeWorkflowAction(params.entity, params.id, body);
  }

  @Patch("/:entity/:layout/generate_data")
  async generateDataWithLayout(@Param() params: any): Promise<boolean> {
    return this.service.generateData(params.entity);
  }

  @Basic()
  @Patch("/:entity/example_output_mapping")
  async exampleOutputMapping(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.exampleOutputMapping(params.entity, data);
  }

  @Basic()
  @Patch("/:entity/search")
  async searchText(
    @Param() params: any,
    @Body() data: any
  ): Promise<any> {
    return this.service.searchText(params.entity, data);
  }

  @Basic()
  @Patch("/:entity/purge_log")
  async purgeLog(@Param() params: any, @Body() body): Promise<boolean> {
    return this.serviceLog.purgeLog(params.entity, body);
  }

  @Basic()
  @Get("/:entity/permission/default")
  async defaultPermission(@Param() params: any): Promise<string> {
    return this.serviceSetting.defaultPermission(params.entity);
  }

  @Basic()
  @Put("/:entity/permission")
  async setPermission(
    @Param() params: any,
    @Body() body: any
  ): Promise<string> {
    const result = await this.serviceSetting.setPermission(params.entity, body);
    return result;
  }

  @Basic()
  @Patch("/:entity/import_validate")
  async importValidate(@Param() params: any, @Body() body): Promise<boolean> {
    return this.service.importValidate(
      params.entity,
      body.id,
      body.code,
      body.data,
      body.data_text,
      body.original_data,
      body.filename
    );
  }
}
