import * as dotenv from "dotenv";
dotenv.config();
require("newrelic");
const now = require("performance-now");
import { Reflector } from "@nestjs/core";

import * as _ from "lodash";
import * as moment from "moment";

import { v4 as uuid } from "uuid";
import * as rTracer from "cls-rtracer";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { join } from "path";
import { AppClusterService } from "./app_cluster.service";
import { CUSTOM_MODULES as LIB_CUSTOM_MODULES } from '@shopstack/cc-core-lib/module'
import { Logger, RequestMethod } from "@nestjs/common";
import {
  IGNORE_ENDPOINT_PATHS,
  CONST,
  EntitiesService,
  TemplateService,
  SettingService,
  TranslateService,
  AllExceptionsFilter,
  AuthService,
  UserRolePermissonService,
  UserRoleService,
  UserService,
  ActivityLogService,
  DeployLogService,
  ImportExportLogService,
  LanguageService,
  ImportExportService,
  AttachmentService,
  CommentDataService,
  AddressService,
  CurrencyService,
  CountryService,
  DistrictService,
  ProvinceService,
  SubdistrictService,
  TimeZoneService,
  CompanyService,
  DeployDestinationService,
  DeployPackageService,
  CustomFunctionService,
  SmsService,
  ReasonDataService,
  ReasonMasterService,
  ReasonOptionService,
  WidgetService,
  VersionDataService,
  ScheduleActionService,
  ScheduleLogService,
  MapLocationService,
  MailSettingService,
  MailLogService,
  request,
  SmsLogService,
  ExecutionLogService,
  initialCustomModules,
  initialCustomProviders,
  initialSettingLayouts,
  NotificationSubscriptionService,
  NotificationMessageService,
  NotificationMessageQueueService,
  NotificationLogService,
  ShortlyUrlService,
  LayoutShareWidgetService,
  ApiKeyService,
  JWTAuthGuard,
  CsrfGuard,
  CacheInterceptor,
  FilterInterceptor,
  AuditLogService,
  PipelineService,
  PipelineJobService,
  PipelineLogService,
  PrintLogService,
  redisCache,
  RewriteUrlService
} from '@shopstack/cc-core-lib/core'

import { CUSTOM_MODULES } from "src/modules/modules";
import * as packageData from "../package.json";

async function initialService(app: NestFastifyApplication, serviceClass: any) {
  let start = now();
  const service = await app.resolve<typeof serviceClass>(serviceClass);
  await service.init();
  let end = now();
  Logger.log(
    `${service.constructor.name} initial done (${(end - start).toFixed(3)})`,
    "MAIN"
  );
}

async function refreshService(app: NestFastifyApplication, serviceClass: any) {
  let start = now();
  const service = await app.resolve<typeof serviceClass>(serviceClass);
  await service.initRefresh();
  let end = now();
  Logger.log(
    `${service.constructor.name} initial refresh done (${(end - start).toFixed(
      3
    )})`,
    "MAIN"
  );
}

async function initialCustomService(app: NestFastifyApplication) {
  const SPECIFY_CUSTOM_MODULES =
    process.env.CUSTOM_MODULES === "" ||
      process.env.CUSTOM_MODULES === undefined
      ? []
      : process.env.CUSTOM_MODULES.split(",");
  const RUN_CUSTOM_SERVICES = [];
  SPECIFY_CUSTOM_MODULES.length === 0
    ? CUSTOM_MODULES.forEach(c => {
      RUN_CUSTOM_SERVICES.push(...(c.services || []));
    })
    : CUSTOM_MODULES.filter(c =>
      SPECIFY_CUSTOM_MODULES.includes(c.module.name)
    ).forEach(c => {
      RUN_CUSTOM_SERVICES.push(...(c.services || []));
    });
  for (const customService of RUN_CUSTOM_SERVICES) {
    await initialService(app, customService);
  }
}

async function initial(app: NestFastifyApplication) {

  LIB_CUSTOM_MODULES.push(...CUSTOM_MODULES)

  await initialService(app, SettingService);
  await initialService(app, EntitiesService);
  await initialService(app, UserRolePermissonService);
  await initialService(app, UserRoleService);
  await initialService(app, UserService);
  await initialService(app, ApiKeyService);
  await initialService(app, LanguageService);
  await initialService(app, TranslateService);
  await initialService(app, ActivityLogService);
  await initialService(app, AttachmentService);
  await initialService(app, AuditLogService);

  await initialService(app, TimeZoneService);
  await initialService(app, CountryService);
  await initialService(app, ProvinceService);
  await initialService(app, DistrictService);
  await initialService(app, SubdistrictService);
  await initialService(app, AddressService);
  await initialService(app, CurrencyService);
  await initialService(app, CompanyService);

  await initialService(app, MailSettingService);
  await initialService(app, MailLogService);
  await initialService(app, SmsLogService);
  await initialService(app, SmsService);

  await initialService(app, ReasonMasterService);
  await initialService(app, ReasonOptionService);
  await initialService(app, ReasonDataService);

  await initialService(app, WidgetService);
  await initialService(app, MapLocationService);
  await initialService(app, VersionDataService);
  await initialService(app, CommentDataService);

  await initialService(app, ScheduleLogService);
  await initialService(app, ScheduleActionService);

  await initialService(app, NotificationSubscriptionService);
  await initialService(app, NotificationMessageService);
  await initialService(app, NotificationMessageQueueService);
  await initialService(app, NotificationLogService);

  await initialService(app, ShortlyUrlService);

  await initialService(app, DeployDestinationService);
  await initialService(app, DeployPackageService);
  await initialService(app, DeployLogService);

  await initialService(app, CustomFunctionService);

  await initialService(app, ExecutionLogService);

  await initialService(app, LayoutShareWidgetService);

  await initialCustomModules();
  await initialCustomProviders();
  await initialSettingLayouts();

  await initialCustomService(app);

  await initialService(app, AuthService);

  await initialService(app, TemplateService);
  await initialService(app, ImportExportService);
  await initialService(app, ImportExportLogService);

  await initialService(app, PrintLogService);

  await initialService(app, PipelineService);
  await initialService(app, PipelineJobService);
  await initialService(app, PipelineLogService);
  await initialService(app, RewriteUrlService);

  await initialService(app, EntitiesService);
  await refreshService(app, EntitiesService);
  await refreshService(app, ScheduleActionService);
  await refreshService(app, SettingService);
  await refreshService(app, AttachmentService);

  redisCache.set("START_TIME", moment().format("DD MMMM YYYY HH:mm"));
}

async function bootstrap() {
  dotenv.config();
  const fastify = new FastifyAdapter({ logger: true, bodyLimit: 104857600 });
  
  fastify.register(require("@fastify/cors"), {
    // put your options here
  });

  fastify.register(rTracer.fastifyPlugin, {
    requestIdFactory: req => ({
      request_id: uuid(),
      user_ip: req.headers["client-ip"],
      user_agent: req.headers["user-agent"]
    })
  });
  
  // Register the multipart plugin
  fastify.register(require("@fastify/multipart"), { attachFieldsToBody: true });

  // Register the fastify-xml-body-parser plugin
  fastify.register(require("fastify-xml-body-parser"));
  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify
  );

  app.useStaticAssets({
    root: `${process.cwd()}/storage/public`,
    prefix: `/public`
  });

  _.set(CONST, "app", app);
  await initial(app);

  const reflector = app.get(Reflector);
  const auth = app.get(AuthService);
  app.useGlobalGuards(new JWTAuthGuard(reflector, auth));
  app.useGlobalGuards(new CsrfGuard(reflector));
  app.setGlobalPrefix("api/v1", {
    exclude: [{ path: "private/*", method: RequestMethod.GET }]
  });
  app.use(request);
  app.useGlobalInterceptors(new FilterInterceptor(reflector));
  app.useGlobalInterceptors(new CacheInterceptor(reflector));

  // app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());

  const routes = [];
  const ignoreRouteRegex = new RegExp(IGNORE_ENDPOINT_PATHS.join("|"));
  app
    .getHttpAdapter()
    .getInstance()
    .addHook("onRoute", route => {
      if (!ignoreRouteRegex.test(route.path)) {
        routes.push({
          path: route.path.replace("/api/v1/", ""),
          method: route.method
        });
      }
    });
  app
    .getHttpAdapter()
    .getInstance()
    .addHook("onReady", done => {
      CONST.ENDPOINT_PATHS = routes;
      done();
    });

  await app.listen(parseInt(process.env.PORT, 10), "0.0.0.0");
  CONST.HEALTH_CHECK = true;
  CONST.SYSTEM_NAME = process.env.SYSTEM_NAME || _.get(packageData, "name");
}

AppClusterService.clusterize(bootstrap);
// +process.env.QUEUE_CONCURRENCY > 0 || process.env.ENABLE_SCHEDULE_ACTION === "true" ? bootstrap() : AppClusterService.clusterize(bootstrap);
// bootstrap();
