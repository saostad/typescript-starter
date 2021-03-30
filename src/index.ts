import dotenv from "dotenv";
dotenv.config();
import { writeLog } from "fast-node-logger";
import type { NodeMode } from "./typings/node/mode";
import { createLoggerInstance, getCredential } from "./helpers/util";

/** server mode base on process.env.NODE_ENV */
let nodeMode: NodeMode = process.env.NODE_ENV || "production";

if (process.env.NODE_ENV) {
  nodeMode = process.env.NODE_ENV;
}

export async function main() {
  /**@step create a logger instance */
  /**@description logger instance to store logs in files located in ./logs directory */
  const logger = await createLoggerInstance(nodeMode);

  /**@note put your code below here */

  /**
   * @BEST_PRACTICES how to store credential out of source code
   * - use operating system credential manager
   * - use .env file located in project root directory
   */
  getCredential("test_cred").then(({ account, password }) => {
    writeLog(`loaded credential: ${account}, ${password}`, {
      level: "warn",
      stdout: true,
    });
  });

  return process.env.MY_SECRET; // this line is just for passing test, you can remove it in your app
}

main().catch((err: Error) => {
  writeLog(err, { level: "error", stdout: true });
});
