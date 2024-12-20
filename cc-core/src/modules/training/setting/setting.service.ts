import * as _ from "lodash";
import { Inject, Injectable, Logger, Scope } from "@nestjs/common";

import { IModuleSetting, BaseModuleSettingService, SettingService, UserPermission, loadEntity } from "@shopstack/cc-core-lib/core";

import { ClsService } from "nestjs-cls";

import * as moduleConfig from "../module.json";
const { code, name } = moduleConfig;

@Injectable()
export class TrainingSettingService extends BaseModuleSettingService implements IModuleSetting {
  constructor(readonly cls: ClsService, protected setting: SettingService) {
    super(code, setting, cls);
  }

  public async defaultPermission(): Promise<any> {
    return {
      manage_example: false,
      manage_setting: false,
    };
  }
  public async setPermission(permission: any): Promise<any> {
    const result = [];
    result.push({
      permission: permission.manage_example ? [UserPermission.creator] : [UserPermission.access_denied],
      entity: await loadEntity(`${code}_example`),
    });
    
    return result;
  }

  public async getSetting(key?: string): Promise<any> {
    const data = await super.getSetting(key);
    return data;
  }
  public async setSetting(data: any, key?: string): Promise<any> {
    const result = await super.setSetting(data, key);
    return result;
  }
}
