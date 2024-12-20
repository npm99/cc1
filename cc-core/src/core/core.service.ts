import * as _ from "lodash";

import {
  Inject,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";


import { CUSTOM_MODULES } from "src/modules/modules";

import {
  ActivityLogService,
  ApiKeyService,
  AttachmentService,
  AuditLogService,
  CommentDataService,
  CustomFunctionService,
  CompanyService,
  AddressService,
  CountryService,
  ProvinceService,
  DistrictService,
  SubdistrictService,
  TimeZoneService,
  CurrencyService,
  DeployDestinationService,
  DeployPackageService,
  DeployLogService,
  ExecutionLogService,
  ImportExportService,
  ImportExportLogService,
  LanguageService,
  MailSettingService,
  MailLogService,
  MapLocationService,
  ReasonMasterService,
  ReasonOptionService,
  ReasonDataService,
  ScheduleActionService,
  ScheduleLogService,
  SmsService,
  SmsLogService,
  TemplateService,
  TranslateService,
  NotificationLogService,
  ShortlyUrlService,
  LayoutShareWidgetService,
  SearchResultDto,
  UserService,
  UserRoleService,
  UserRolePermissonService,
  UserFilterService,
  VersionDataService,
  WidgetService,
  IBaseModuleSettingService,
  NotificationSubscriptionService,
  NotificationMessageService,
  NotificationMessageQueueService,
  PipelineService,
  PipelineJobService,
  PipelineLogService,
  PrintLogService,
} from '@shopstack/cc-core-lib/core'

const SPECIFY_CUSTOM_MODULES =
  process.env.CUSTOM_MODULES === "" || process.env.CUSTOM_MODULES === undefined
    ? []
    : process.env.CUSTOM_MODULES.split(",");

const RUN_CUSTOM_MODULES =
  SPECIFY_CUSTOM_MODULES.length === 0
    ? CUSTOM_MODULES
    : CUSTOM_MODULES.filter(c =>
      SPECIFY_CUSTOM_MODULES.includes(c.module.name)
    );

const CUSTOM_SERVICES = _.reduce(
  RUN_CUSTOM_MODULES,
  (r, v) => {
    const moduleName = _.snakeCase(
      `${v.module.name.slice(0, 2).toLowerCase()}${v.module.name.slice(2)}`
    )
      .replace(/_[0-9]*_/g, (m, g1, g2, i) => {
        return m.slice(1);
      })
      .toLowerCase()
      .replace("_module", "");
    for (const service of v.services || []) {
      const serviceName = `${service.name
        .slice(0, 2)
        .toLowerCase()}${service.name.slice(2)}`;
      let key = `${moduleName}_${_.snakeCase(serviceName)
        .replace(/_[0-9]*_/g, (m, g1, g2, i) => {
          return m.slice(1);
        })
        .toLowerCase()
        .replace("_service", "")
        .replace(`${moduleName}_`, "")}`;
      if (key === "sellers_seller_user") {
        key = "sellers_user";
      }
      r[key] = service;
    }
    return r;
  },
  {}
);

const CUSTOM_LOG_SERVICES = _.reduce(
  RUN_CUSTOM_MODULES,
  (r, v) => {
    const moduleName = _.snakeCase(
      `${v.module.name.slice(0, 2).toLowerCase()}${v.module.name.slice(2)}`
    )
      .toLowerCase()
      .replace("_module", "");
    for (const service of v.services || []) {
      const serviceName = _.snakeCase(
        `${service.name.slice(0, 2).toLowerCase()}${service.name.slice(2)}`
      )
        .toLowerCase()
        .replace("_service", "")
        .replace(`${moduleName}_`, "");
      if (serviceName === "log") {
        const key = `${moduleName}_${serviceName}`;
        r[key] = service;
      }
    }
    return r;
  },
  {}
);

const CUSTOM_SETTING_SERVICES = _.reduce(
  RUN_CUSTOM_MODULES,
  (r, v) => {
    const moduleName = _.snakeCase(
      `${v.module.name.slice(0, 2).toLowerCase()}${v.module.name.slice(2)}`
    )
      .toLowerCase()
      .replace("_module", "");
    for (const service of v.services || []) {
      const serviceName = _.snakeCase(
        `${service.name.slice(0, 2).toLowerCase()}${service.name.slice(2)}`
      )
        .toLowerCase()
        .replace("_service", "")
        .replace(`${moduleName}_`, "");
      if (serviceName === "setting") {
        const key = `${moduleName}_${serviceName}`;
        r[key] = service;
      }
    }
    return r;
  },
  {}
);

@Injectable()
export class CoreService implements OnModuleInit {
  @Inject(ActivityLogService) private readonly _activityLogService: ActivityLogService;
  @Inject(AddressService) private readonly _addressService: AddressService;
  @Inject(ApiKeyService) private readonly _apiKeyService: ApiKeyService;
  @Inject(AttachmentService) private readonly _attachmentService: AttachmentService;
  @Inject(CommentDataService) private readonly _commentDataService: CommentDataService;
  @Inject(CountryService) private readonly _countryService: CountryService;
  @Inject(CompanyService) private readonly _companyService: CompanyService;
  @Inject(CustomFunctionService) private readonly _customFunctionService: CustomFunctionService;
  @Inject(DeployDestinationService) private readonly _deployDestinationService: DeployDestinationService;
  @Inject(DeployLogService) private readonly _deployLogService: DeployLogService;
  @Inject(DeployPackageService) private readonly _deployPackageService: DeployPackageService;
  @Inject(DistrictService) private readonly _districtService: DistrictService;
  @Inject(ExecutionLogService) private readonly _executionLogService: ExecutionLogService;
  @Inject(ImportExportService) private readonly _importExportService: ImportExportService;
  @Inject(ImportExportLogService) private readonly _importExportLogService: ImportExportLogService;
  @Inject(PrintLogService) private readonly _printLogService: PrintLogService;
  @Inject(LanguageService) private readonly _languageService: LanguageService;
  @Inject(LayoutShareWidgetService) private readonly _layoutShareWidgetService: LayoutShareWidgetService;
  @Inject(MailSettingService) private readonly _mailService: MailSettingService;
  @Inject(MailLogService) private readonly _mailLogService: MailLogService;
  @Inject(MapLocationService) private readonly _mapLocationService: MapLocationService;
  @Inject(NotificationSubscriptionService) private readonly _notificationSubscriptionService: NotificationSubscriptionService;
  @Inject(NotificationMessageService) private readonly _notificationMessageService: NotificationMessageService;
  @Inject(NotificationMessageQueueService) private readonly _notificationMessageQueueService: NotificationMessageQueueService;
  @Inject(NotificationLogService) private readonly _notificationLogService: NotificationLogService;
  @Inject(ProvinceService) private readonly _provinceService: ProvinceService;
  @Inject(ReasonDataService) private readonly _reasonDataService: ReasonDataService;
  @Inject(ReasonMasterService) private readonly _reasonMasterService: ReasonMasterService;
  @Inject(ReasonOptionService) private readonly _reasonOptionService: ReasonOptionService;
  @Inject(ScheduleActionService) private readonly _scheduleActionService: ScheduleActionService;
  @Inject(ScheduleLogService) private readonly _scheduleLogService: ScheduleLogService;
  @Inject(ShortlyUrlService) private readonly _shortlyUrlService: ShortlyUrlService;
  @Inject(SmsService) private readonly _smsService: SmsService;
  @Inject(SmsLogService) private readonly _smsLogService: SmsLogService;
  @Inject(SubdistrictService) private readonly _subdistrictService: SubdistrictService;
  @Inject(TemplateService) private readonly _templateService: TemplateService;
  @Inject(TimeZoneService) private readonly _timeZoneService: TimeZoneService;
  @Inject(CurrencyService) private readonly _currencyService: CurrencyService;
  @Inject(TranslateService) private readonly _translateService: TranslateService;
  @Inject(UserFilterService) private readonly _userFilterService: UserFilterService;
  @Inject(UserRoleService) private readonly _userRoleService: UserRoleService;
  @Inject(UserRolePermissonService) private readonly _userRolePermissonService: UserRolePermissonService;
  @Inject(UserService) private readonly _userService: UserService;
  @Inject(VersionDataService) private readonly _versionDataService: VersionDataService;
  @Inject(WidgetService) private readonly _widgetService: WidgetService;
  @Inject(AuditLogService) private readonly _auditLogService: AuditLogService;
  @Inject(PipelineService) private readonly _pipelineService: PipelineService;
  @Inject(PipelineJobService) private readonly _pipelineJobService: PipelineJobService;
  @Inject(PipelineLogService) private readonly _pipelineLogService: PipelineLogService;


  private services: any = {};

  constructor(private moduleRef: ModuleRef) { }

  async onModuleInit() {
    // console.log(CUSTOM_SERVICES);
    for (const key of Object.keys(CUSTOM_SERVICES)) {
      this.services[key] = await this.moduleRef.get(CUSTOM_SERVICES[key], {
        strict: false
      });
    }
  }

  private async _getService(entityName: string): Promise<any> {
    switch (entityName) {
      case "activity_log":
        return this._activityLogService;
      case "address":
        return this._addressService;
      case "api_key":
        return this._apiKeyService;
      case "attachment":
        return this._attachmentService;
      case "comment_data":
        return this._commentDataService;
      case "country":
        return this._countryService;
      case "company":
        return this._companyService;
      case "custom_function":
        return this._customFunctionService;
      case "deploy_destination":
        return this._deployDestinationService;
      case "deploy_package":
        return this._deployPackageService;
      case "deploy_log":
        return this._deployLogService;
      case "district":
        return this._districtService;
      case "execution_log":
        return this._executionLogService;
      case "import_export":
        return this._importExportService;
      case "import_export_log":
        return this._importExportLogService;
      case "language":
        return this._languageService;
      case "layout_share_widget":
        return this._layoutShareWidgetService;
      case "mail_setting":
        return this._mailService;
      case "mail_log":
        return this._mailLogService;
      case "map_location":
        return this._mapLocationService;
      case "notification_subscription":
        return this._notificationSubscriptionService;
      case "notification_message":
        return this._notificationMessageService;
      case "notification_message_queue":
        return this._notificationMessageQueueService;
      case "notification_log":
        return this._notificationLogService;
      case "pipeline":
        return this._pipelineService;
      case "pipeline_job":
        return this._pipelineJobService;
      case "pipeline_log":
        return this._pipelineLogService;
      case "province":
        return this._provinceService;
      case "reason_data":
        return this._reasonDataService;
      case "reason_master":
        return this._reasonMasterService;
      case "reason_option":
        return this._reasonOptionService;
      case "schedule_action":
        return this._scheduleActionService;
      case "schedule_log":
        return this._scheduleLogService;
      case "shortly_url":
        return this._shortlyUrlService;
      case "sms":
        return this._smsService;
      case "sms_log":
        return this._smsLogService;
      case "print_log":
        return this._printLogService;
      case "subdistrict":
        return this._subdistrictService;
      case "template":
        return this._templateService;
      case "time_zone":
        return this._timeZoneService;
      case "currency":
        return this._currencyService;
      case "translate":
        return this._translateService;
      case "user":
        return this._userService;
      case "user_role":
        return this._userRoleService;
      case "user_role_permission":
        return this._userRolePermissonService;
      case "user_filter":
        return this._userFilterService;
      case "version_data":
        return this._versionDataService;
      case "widget":
        return this._widgetService;
      case "audit_log":
        return this._auditLogService;

      default:
        const customService = this.services[entityName];
        if (_.isEmpty(customService)) {
          throw new Error(`Invalid entity ${entityName}.`);
        }
        return customService;
    }
  }

  public async init(entityName: string): Promise<string> {
    const service = await this._getService(entityName);
    return service.init();
  }

  public async initData(entityName: string): Promise<void> {
    const service = await this._getService(entityName);
    await service.initData();
  }

  public async search(
    entityName: string,
    keywords: string,
    filters?: any,
    page: number = 1,
    pageSize: number = 10,
    sort: string = "",
    grouping?: Array<string>,
    noTranslate?: boolean,
    fields?: Array<string>
  ): Promise<SearchResultDto> {
    const service = await this._getService(entityName);
    return service.search(
      keywords,
      filters,
      page,
      pageSize,
      sort,
      grouping,
      noTranslate,
      fields
    );
  }

  public async searchIds(
    entityName: string,
    keywords: string,
    filters?: any,
    page?: number,
    pagesize?: number,
    sort?: Object
  ): Promise<Array<string>> {
    const service = await this._getService(entityName);
    return service.searchIds(keywords, filters, page, pagesize, sort);
  }

  public async searchWithLayout(
    entityName: string,
    layoutCode: string,
    keywords: string,
    filters?: any,
    page?: number,
    pageSize?: number,
    sort?: any,
    grouping?: Array<string>,
    isDetail?: boolean
  ): Promise<SearchResultDto> {
    const service = await this._getService(entityName);
    return service.searchWithLayout(
      layoutCode,
      keywords,
      filters,
      page,
      pageSize,
      sort,
      grouping,
      isDetail
    );
  }

  public async find(
    entityName: string,
    keywords: string,
    filters?: any,
    sort: string = "",
    noTranslate?: boolean,
    fields?: Array<string>
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.find(keywords, filters, sort, noTranslate, fields);
  }

  public async findWithLayout(
    entityName: string,
    layoutCode: string,
    keywords: string,
    filters?: any,
    sort?: Object
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.findWithLayout(layoutCode, keywords, filters, sort);
  }

  public async findOne(
    entityName: string,
    id: string,
    fields?: Array<string>
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.findOne(id, fields);
  }

  public async findOneWithLayout(
    entityName: string,
    layoutCode: string,
    id: string
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.findOneWithLayout(layoutCode, id);
  }

  public async count(
    entityName: string,
    filters?: any,
    keywords?: string
  ): Promise<number> {
    const service = await this._getService(entityName);
    return service.count(filters, keywords);
  }

  public async aggregate(entityName: string, query: string): Promise<any> {
    const service = await this._getService(entityName);
    return service.aggregate(query);
  }

  public async create(entityName: string, data: any): Promise<any> {
    const service = await this._getService(entityName);
    return service.create(data);
  }

  public async update(entityName: string, id: string, data: any): Promise<any> {
    const service = await this._getService(entityName);
    return service.update(id, data);
  }

  public async delete(entityName: string, id: string): Promise<any> {
    const service = await this._getService(entityName);
    return service.delete(id);
  }

  public async deleteMany(entityName: string, filter: any): Promise<any> {
    const service = await this._getService(entityName);
    return service.deleteMany(filter);
  }

  public async bulkCreate(entityName: string, data: any[]): Promise<any> {
    const service = await this._getService(entityName);
    return service.bulkCreate(data);
  }

  public async bulkUpdate(entityName: string, data: any[]): Promise<any> {
    const service = await this._getService(entityName);
    return service.bulkUpdate(data);
  }

  public async bulkDelete(entityName: string, ids: string[]): Promise<any> {
    const service = await this._getService(entityName);
    return service.bulkDelete(ids);
  }

  public async prepareGenerateData(
    entityName: string,
    data?: any
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.prepareGenerateData(data);
  }

  public async generateData(entityName: string, data?: any): Promise<boolean> {
    const service = await this._getService(entityName);
    return service.generateData(data);
  }

  public async progressGenerateData(
    entityName: string,
    ref_id: string
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.progressGenerateData(ref_id);
  }

  public async approve(
    entityName: string,
    id: string,
    data: any
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.approve(id, data);
  }

  public async workflowActions(entityName: string, id: string): Promise<any> {
    const service = await this._getService(entityName);
    return service.workflowActions(id);
  }

  public async executeWorkflowAction(
    entityName: string,
    id: string,
    body: any
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.executeWorkflowAction(id, body);
  }

  public async dataWithLocale(
    entityName: string,
    layout: string,
    id: string,
    locale: string
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.dataWithLocale(layout, id, locale);
  }

  public async findWithLocale(
    entityName: string,
    locale: string,
    keywords: string,
    filters?: any,
    sort?: Object
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.findWithLocale(locale, keywords, filters, sort);
  }

  public async setDataLocale(
    entityName: string,
    id: string,
    locale: string,
    data: any
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.setDataLocale(id, locale, data);
  }

  public async exampleOutputMapping(
    entityName: string,
    data: any
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.exampleOutputMapping(data);
  }

  public async searchText(entityName: string, data: any): Promise<any> {
    const service = await this._getService(entityName);
    return service.searchText(data);
  }

  public async importValidate(
    entityName: string,
    id: string,
    code: string,
    data: any,
    dataText: string,
    originalData,
    filename
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.importValidate(
      id,
      code,
      data,
      dataText,
      originalData,
      filename
    );
  }
}

@Injectable()
export class CoreLogService implements OnModuleInit {
  @Inject(ActivityLogService)
  private readonly _activityLogService: ActivityLogService;
  @Inject(DeployLogService)
  private readonly _deployLogService: DeployLogService;
  @Inject(ExecutionLogService)
  private readonly _executionLogService: ExecutionLogService;
  @Inject(ImportExportLogService)
  private readonly _importExportLogService: ImportExportLogService;
  @Inject(PrintLogService)
  private readonly _printLogService: PrintLogService;
  @Inject(MailLogService)
  private readonly _mailLogService: MailLogService;
  @Inject(NotificationLogService)
  private readonly _notificationLogService: NotificationLogService;
  @Inject(ScheduleLogService)
  private readonly _scheduleLogService: ScheduleLogService;
  @Inject(SmsLogService)
  private readonly _smsLogService: SmsLogService;
  @Inject(AuditLogService)
  private readonly _auditLogService: AuditLogService;
  @Inject(PipelineLogService)
  private readonly _pipelineLogService: PipelineLogService;


  private services: any = {};

  constructor(private moduleRef: ModuleRef) { }

  private _getService(entityName: string): any {
    switch (entityName) {
      case "deploy_log":
        return this._deployLogService;
      case "schedule_log":
        return this._scheduleLogService;
      case "activity_log":
        return this._activityLogService;
      case "import_export_log":
        return this._importExportLogService;
      case "mail_log":
        return this._mailLogService;
      case "sms_log":
        return this._smsLogService;
      case "print_log":
        return this._printLogService;
      case "execution_log":
        return this._executionLogService;
      case "notification_log":
        return this._notificationLogService;
      case "audit_log":
        return this._auditLogService;
      case "pipeline_log":
        return this._pipelineLogService;
      default:
        const customService = this.services[entityName];
        if (_.isEmpty(customService)) {
          throw new Error(`Invalid entity ${entityName}.`);
        }
        return customService;
    }
  }

  async onModuleInit() {
    // console.log(CUSTOM_LOG_SERVICES);
    for (const key of Object.keys(CUSTOM_LOG_SERVICES)) {
      this.services[key] = await this.moduleRef.get(CUSTOM_LOG_SERVICES[key], {
        strict: false
      });
    }
  }

  public async purgeLog(entityName: string, setting: any) {
    const service = await this._getService(entityName);
    return service.purgeLog(setting);
  }
}

@Injectable()
export class CoreSettingService implements OnModuleInit {
  private services: any = {};

  constructor(private moduleRef: ModuleRef) { }

  private _getService(entityName: string): IBaseModuleSettingService {
    switch (entityName) {
      default:
        const customService = this.services[entityName];
        if (_.isEmpty(customService)) {
          throw new Error(`Invalid entity ${entityName}.`);
        }
        return customService;
    }
  }

  async onModuleInit() {
    // console.log(CUSTOM_SETTING_SERVICES);
    for (const key of Object.keys(CUSTOM_SETTING_SERVICES)) {
      this.services[key] = await this.moduleRef.get(
        CUSTOM_SETTING_SERVICES[key],
        {
          strict: false
        }
      );
    }
  }

  public async getSetting(entityName: string, key?: string): Promise<any> {
    const service = await this._getService(entityName);
    return service.getSetting(key);
  }
  public async setSetting(
    entityName: string,
    data: any,
    key?: string
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.setSetting(data, key);
  }

  public async defaultPermission(entityName: string): Promise<any> {
    const service = await this._getService(entityName);
    return service.defaultPermission();
  }
  public async setPermission(
    entityName: string,
    permissoin: any
  ): Promise<any> {
    const service = await this._getService(entityName);
    return service.setPermission(permissoin);
  }
}
