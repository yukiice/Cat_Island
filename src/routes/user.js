const Router = require('koa-router')
const {RegisterValidator} = require('../validators/validators')
//导入user model
const {User} =require('../models/user')
const router = new Router({
    prefix:'/v1/user'
})


router.post('/register',async(ctx)=>{
    const v  = await new RegisterValidator().validate(ctx)
    const user = {
    //    用get方法拿到user里面的数据
        email:v.get('body.email'),
        nickname:v.get('body.nickname'),
        password:v.get('body.password2')
    }
    await User.create(user)

})
module.exports = router
