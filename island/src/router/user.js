const Router = require('koa-router')
const {
    RegisterValidator
} = require('../validators/validator')
const {
    User
} = require('../model/user')
const { Success } = require('../lib/helper')
const router = new Router({
    prefix: "/v1/user"
})

// 注册
router.post(`/register`, async(ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        nickname: v.get('body.nickname'),
        password: v.get('body.password2'),
        email: v.get('body.email')
    }
    const r = await User.create(user)
    Success()
})

module.exports = router