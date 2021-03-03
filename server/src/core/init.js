const Router = require("koa-router");
const requireDirectory = require("require-directory");
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRoutes();
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }
  //验证是否为开发或者生产环境
  static loadConfig(path=""){
    const configPath  = path || process.cwd() + "/src/config/config.js"
    const config = require(configPath)
    global.config =  config
  }
  static initLoadRoutes() {
    const apiDirectory = `${process.cwd()}/src/routes`;
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule,
    });
    function whenLoadModule(obj) {
      obj instanceof Router && InitManager.app.use(obj.routes());
    }
  }



  static loadHttpException(){
    const errors = require('./http-exception')
    global.errs  = errors
  }
}
module.exports = InitManager;
