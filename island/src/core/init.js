const Router = require("koa-router");
// 导入自动化组件
const requireDirectory = require("require-directory");
class InitManager {
    static initCore(app) {
            InitManager.app = app;
            InitManager.initLoadRoutes();
            InitManager.loadHttpException();
            InitManager.loadConfig()
        }
        // 判断开发环境还是生产环境
    static loadConfig(path = "") {
        const configPath = path || process.cwd() + `/src/config/config.js`;
        const config = require(configPath);
        global.config = config;
    }

    //   自动化加载路由
    static initLoadRoutes() {
            // 导入中间件
            const apiDirectory = `${process.cwd()}/src/router`;
            requireDirectory(module, apiDirectory, {
                visit: whenLoadModule,
            });

            function whenLoadModule(obj) {
                obj instanceof Router && InitManager.app.use(obj.routes());
            }
        }
        //   错误捕获
    static loadHttpException() {
        const errors = require("./http-exception");
        global.errs = errors;
    }
}

module.exports = InitManager;