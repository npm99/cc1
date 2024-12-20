import * as _ from "lodash";
import * as cluster from "cluster";
import * as os from "os";
import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { CONST } from '@shopstack/cc-core-lib/core'

CONST.INTERNAL_DOMAIN = `http://${process.env.LOOP_BACK_IP}:${process.env
  .PORT || 3000}/api/v1`;

const numCPUs = _.isEmpty(process.env.MAX_WORKER)
  ? os.cpus().length
  : parseInt(process.env.MAX_WORKER, 10) === 0
    ? os.cpus().length
    : parseInt(process.env.MAX_WORKER, 10);
console.log("MAXIMUM WORKER PROCESS: " + numCPUs);
// const numCPUs = 2;
let checkInit = false;
let mainPID = 0;

@Injectable()
export class AppClusterService {
  static async clusterize(callback: Function): Promise<void> {
    if (cluster.isMaster) {
      console.log(`Master server started on ${process.pid}`);
      CONST.MAIN_PROCESS = true;
      for (let i = 0; i < numCPUs; i++) {
        const env = { WORKER_NO: i + 1 }
        const worker = cluster.fork(env);
        worker.process['env'] = env
      }
      cluster.on("listening", (worker, address) => {
        console.log(
          `A worker is now connected to ${address.address}:${address.port}`
        );
        const http: AxiosInstance = axios.create();
        if (worker.process["env"].WORKER_NO == "1") {
          http.get(`${CONST.INTERNAL_DOMAIN}/entities/init_data`);
          http.get(`${CONST.INTERNAL_DOMAIN}/setting/update_version`);
        }
        http.get(`${CONST.INTERNAL_DOMAIN}/user_role/reload_system`);
        http.get(`${CONST.INTERNAL_DOMAIN}/translate/generate`);
        http.get(`${CONST.INTERNAL_DOMAIN}/health_check/init`);
      });
      // cluster.on("online", worker => {
      //   console.log("Yay, the worker responded after it was forked");
      // });
      cluster.on("exit", (worker, code, signal, ...other) => {
        const env = worker.process['env']
        console.log(
          `Worker ${worker.process.pid} (${code},${signal}) died. Restarting`
        );
        const newWorker = cluster.fork(env);
        newWorker.process['env'] = env
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      await callback();
    }
  }
}
