import * as _ from "lodash";
import {
  Module,
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClsModule } from "nestjs-cls";
import * as dotenv from "dotenv";

import { NestEmitterModule } from "nest-emitter";
import { EventEmitter } from "events";

import { StoragePrivateController } from "./private.controller";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScheduleModule } from "@nestjs/schedule";

import { CUSTOM_MODULES } from "./modules/modules";
// import { CoreModule } from "./core/core.module";
import {
  UserModule,
  AuthModule,
  EntitiesModule,
  ScheduleActionModule,
  SettingModule,
  TemplateModule,
  QueueModule,
  TranslateModule,
  AttachmentModule,
  NotificationModule,
  RedisModule,
  MailSettingModule,
  SmsModule,
  ShortlyModule,
  LayoutModule,
  CompanyModule,
  LanguageModule,
  ImportExportModule,
  CommentDataModule,
  DatabaseModule,
  DeployModule,
  CustomFunctionModule,
  CacheModule,
  PipelineModule,
  RewriteUrlModule
} from '@shopstack/cc-core-lib/core'

import { CoreModule } from './core/core.module'

// const { CoreModule } = core

dotenv.config();

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

const mongoConfig = {};

if (+process.env.MONGODB_MIN_POOL_SIZE) {
  mongoConfig["minPoolSize"] = +process.env.MONGODB_MIN_POOL_SIZE;
}

if (+process.env.MONGODB_MAX_POOL_SIZE) {
  mongoConfig["maxPoolSize"] = +process.env.MONGODB_MAX_POOL_SIZE;
}

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useFactory: async () => ({
    //     uri: process.env.MONGODB_URI,
    //     useNewUrlParser: true,
    //     useFindAndModify: false
    //   })
    // }),
    MongooseModule.forRoot(process.env.MONGODB_URI, mongoConfig),
    // Register the ClsModule,
    ClsModule.forRoot({
      middleware: {
        // automatically mount the
        // ClsMiddleware for all routes
        mount: true,
        // and use the setup method to
        // provide default store values.
        setup: (cls, req) => {
          cls.set("request", {
            api_key: _.get(req, "api_key", {}),
            profile: _.get(req, "profile", {}),
            permissions: _.get(req, "permissions", []),
            headers: _.get(req, "headers", {}),
            ip: _.get(req, "ip"),
            protocol: _.get(req, "protocol"),
            hostname: _.get(req, "hostname"),
            url: _.get(req, "url"),
            method: _.get(req, "method"),
            body: _.get(req, "body", {}),
            action_profile: _.get(req, "action_profile", {}),
            permisson_entities: _.get(req, "permisson_entities", {}),
            permisson_tab: _.get(req, "permisson_tab", {})
          });
        }
      },
      interceptor: {
        mount: true,
        setup: (cls, ctx) => {
          const req = ctx.switchToHttp().getRequest();
          cls.set("request", {
            api_key: _.get(req, "api_key", {}),
            profile: _.get(req, "profile", {}),
            permissions: _.get(req, "permissions", []),
            roles: _.get(req, "roles", []),
            headers: _.get(req, "headers", {}),
            // ip: req.connection.remoteAddress,
            ip:
              _.get(req, "socket.remoteAddress") ||
              _.get(req, "connection.remoteAddress"),
            protocol: _.get(req, "protocol"),
            hostname: _.get(req, "hostname"),
            url: _.get(req, "url"),
            method: _.get(req, "method"),
            body: _.get(req, "body", {}),
            action_profile: _.get(req, "action_profile", {}),
            permisson_entities: _.get(req, "permisson_entities", {}),
            permisson_tab: _.get(req, "permisson_tab", {})
          });
        }
      }
    }),

    EntitiesModule,
    NestEmitterModule.forRoot(new EventEmitter()),
    ScheduleModule.forRoot(),
    AuthModule,
    SettingModule,
    QueueModule,
    RedisModule,
    DatabaseModule,
    CacheModule,

    CompanyModule,

    AttachmentModule,
    CommentDataModule,
    CustomFunctionModule,
    DeployModule,
    ImportExportModule,
    LanguageModule,
    MailSettingModule,
    ScheduleActionModule,
    SmsModule,
    TemplateModule,
    TranslateModule,
    NotificationModule,
    ShortlyModule,
    UserModule,
    PipelineModule,
    LayoutModule,
    RewriteUrlModule,

    // ...RUN_CUSTOM_MODULES,

    CoreModule
  ],
  controllers: [AppController, StoragePrivateController],
  providers: [AppService]
})
export class AppModule { }
