const Router = require('koa-router')
const {TokenValidator} = require('../validators/validators')
const {LoginType} = require('../lib/enums')
const {User} = require('../models/user')
const {generateToken} = require('../core/util')
const {Auth} =  require('../middleware/auth')
const router = new Router({
    prefix:'/v1/token'
})

router.post('/',async(ctx)=>{
    const v = await new TokenValidator().validate(ctx)
//    判断登录方式
    let token;
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:

            break
        default :
            throw new global.errs.ParameterException("没有相应的处理函数，请联系管理员")
    }
    ctx.body = {
        token
    }
})
async function emailLogin(account,secret){
    const user =  await User.verifyEmailPassword(account,secret)
    let token;
    token = generateToken(user.id, Auth.USER);
    return token
}

module.exports = router