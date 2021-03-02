const basicAuth = require('basic-auth')
const jwt =require('jsonwebtoken')
class Auth {
    constructor(level){
    //   设置权限对应的用户和数字
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }
    get m(){
        return async(ctx,next)=>{
            let userToken;
            let decode
            let errMsg = '您的token不合法'
            userToken = basicAuth(ctx.req);
            //如果token不存在
            if(!userToken || !userToken.name){
                throw new global.errs.Forbidden(errMsg)
            }
            try {
                decode = jwt.verify(userToken.name, global.config.security.secretKey);
            }catch(error){
            // token过期
                if(error.name === 'TokenExpiredError'){
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbidden(errMsg)
            }

        //    权限判断
            if(decode.scope < this.level){
                errMsg = '权限不足'
                throw new global.errs.Forbidden(errMsg)
            }

        //    这里证明token合法
        //    然后往jwt里面放东西
            ctx.auth ={
                uid:decode.uid,
                scope:decode.scope
            }
            await next();
        }
    }
}

module.exports = {
    Auth
}