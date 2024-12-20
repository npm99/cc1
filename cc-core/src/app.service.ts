import { Injectable, Logger } from "@nestjs/common";
import * as os from "os";
import { CONST } from "@shopstack/cc-core-lib/core";

@Injectable()
export class AppService {
  private _isReady: boolean;

  init(): string {
    this._isReady = true;
    Logger.log(`CPU cores ${os.cpus().length}`, "OS");
    return "health_check";
  }

  healthCheck(): boolean {
    if (!CONST.HEALTH_CHECK) {
      throw new Error("not ready");
    }
    return true;
  }
}
