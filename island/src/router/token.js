const Router = require('koa-router')

const {
    TokenValidator
} = require('../validators/validator.js')

const {
    User
} = require('../model/user')

const { LoginType } = require('../lib/enum')

// 导入 token处理函数
const { generateToken } = require('../core/util')

const router = new Router({
    prefix: `/v1/token`
})

router.post(`/`, async(ctx, next) => {
    const v = await new TokenValidator().validate(ctx)
    let token
    switch (v.get('body.type')) {
        case LoginType.USER_MINI_PROGRAM:

            break;
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        case LoginType.USER_MOBILE:

            break;
        case LoginType.CONVENTION:

            break;
        case LoginType.ADMIN_LOGIN:

            break
        default:
            throw new global.errs.ParameterException('没有想对应的处理函数')
    }
    ctx.body = {
        token
    }
})

// 密码比对验证
async function emailLogin(account, secret) {
    // 比对后返回
    const verify = await User.verifyEmailPassword(account, secret)
    return token = generateToken(verify.id, 2)
}

module.exports = router