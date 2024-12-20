import * as _ from "lodash";

import { Module } from "@nestjs/common";
import { CUSTOM_MODULES } from "src/modules/modules";
import { CoreController } from "./core.controller";
import {
  CoreLogService,
  CoreService,
  CoreSettingService
} from "./core.service";
import {
  EntitiesModule,
  ActivityLogModule,
  AddressModule,
  ApiKeyModule,
  AttachmentModule,
  CommentDataModule,
  CompanyModule,
  CustomFunctionModule,
  CurrencyModule,
  DeployModule,
  ExecutionLogModule,
  ImportExportModule,
  LanguageModule,
  MailSettingModule,
  MapLocationModule,
  ReasonModule,
  ScheduleActionModule,
  SmsModule,
  TemplateModule,
  TranslateModule,
  UserModule,
  VersionDataModule,
  NotificationModule,
  ShortlyModule,
  WidgetModule,
  LayoutModule,
  AuditLogModule,
  PipelineModule
} from '@shopstack/cc-core-lib/core'

const SPECIFY_CUSTOM_MODULES =
  process.env.CUSTOM_MODULES === "" || process.env.CUSTOM_MODULES === undefined
    ? []
    : process.env.CUSTOM_MODULES.split(",");

const RUN_CUSTOM_MODULES =
  SPECIFY_CUSTOM_MODULES.length === 0
    ? CUSTOM_MODULES.map(c => c.module)
    : CUSTOM_MODULES.filter(c =>
      SPECIFY_CUSTOM_MODULES.includes(c.module.name)
    ).map(c => c.module);

@Module({
  imports: [
    EntitiesModule,
    ActivityLogModule,
    AddressModule,
    ApiKeyModule,
    AttachmentModule,
    AuditLogModule,
    CommentDataModule,
    CompanyModule,
    CustomFunctionModule,
    CurrencyModule,
    DeployModule,
    ExecutionLogModule,
    ImportExportModule,
    LanguageModule,
    MailSettingModule,
    MapLocationModule,
    ReasonModule,
    ScheduleActionModule,
    SmsModule,
    TemplateModule,
    TranslateModule,
    UserModule,
    VersionDataModule,
    NotificationModule,
    ShortlyModule,
    WidgetModule,
    PipelineModule,
    LayoutModule,

    ...RUN_CUSTOM_MODULES
  ],
  controllers: [CoreController],
  providers: [CoreService, CoreLogService, CoreSettingService]
})
export class CoreModule { }
