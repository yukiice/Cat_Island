const { HttpException } = require("../core/http-exception");
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    //判断是开发环境还是生产环境
    const isHttpException = error instanceof HttpException
    const isDev  = global.config.environment === 'dev'
    if(isDev && !isHttpException){
      throw error;
    }
    // 判断错误类型 如果符合  那么属于已知错误
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = error.code;
    }
    else{
      ctx.body ={
        msg:'we make a mistake!',
        error_code:999,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
};
module.exports = catchError;

