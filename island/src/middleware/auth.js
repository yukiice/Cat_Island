const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m() {
        return async(ctx, next) => {
            // token 检测
            // token 开发者 传递令牌
            // token body header
            const userToken = basicAuth(ctx.req)
            let errMsg = `token不合法`
            let decode
                // token不存在
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg)
            }

            // 验证token是否合法
            try {
                decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                console.log(error)
                    // 判断token异常情况，为两种
                    // 1.传了token，但不合法
                    // 2.传了正确的token，但过期了
                if (error.name === "TokenExpiredError") {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }

            // 这之后的话  token合法
            // 拿到uid scope 存在上下文中
            if (decode.scope < this.level) {
                errMsg = '用户权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }

    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}