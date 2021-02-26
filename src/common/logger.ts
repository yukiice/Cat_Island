import log4js from "log4js";
import { log4js as config } from "../config";
// 挂载log配置
log4js.configure(config);
const log = log4js.getLogger("file");
export default log;
