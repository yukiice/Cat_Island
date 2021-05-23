const Router = require('koa-router')
const { RegisterValidator } = require('../validators/validators')
    //导入user model
const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const { success } = require('../lib/helper')
const router = new Router({
    prefix: '/v1/user'
})


router.post('/register', async(ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    const salt = bcrypt.genSaltSync(10)
    const psw = bcrypt.hashSync(v.get('body.password2'), salt)
    const user = {
        //    用get方法拿到user里面的数据
        email: v.get('body.email'),
        nickname: v.get('body.nickname'),
        password: psw
    }
    const r = await User.create(user)

    success()

})
module.exports = router