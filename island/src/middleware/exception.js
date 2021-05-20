const { HttpException } = require("../core/http-exception");
const catchError = async(ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 判断是开发环境还是生产环境
        if (global.config.environment === 'dev') {
            throw error
        }
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} - ${ctx.path}`,
            };
            ctx.status = error.code
        } else {
            // 客户端的异常
            ctx.body = {
                msg: 'we made a mistake ❤️',
                error_code: 999,
                request: `${ctx.method} - ${ctx.path}`
            }
            ctx.status = 500
        }
    }
};

module.exports = catchError;