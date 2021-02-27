const Router = require("koa-router");
const requireDirectory = require("require-directory");
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRoutes();
    InitManager.loadHttpException()
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
