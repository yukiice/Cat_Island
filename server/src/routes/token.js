const Router = require('koa-router')
const {TokenValidator,NotEmptyValidator} = require('../validators/validators')
const {LoginType} = require('../lib/enums')
const {User} = require('../models/user')
const {generateToken} = require('../core/util')
const {Auth} =  require('../middleware/auth')
//导入wx openid
const {WXManager} = require('../services/wx')
const router = new Router({
    prefix:'/v1/token'
})

router.post('/',async(ctx)=>{
    const v = await new TokenValidator().validate(ctx)
//    判断登录方式
    let token;
    switch(v.get('body.type')){
        // email登录
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
            // 小程序登录
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break
            // 没有设置特殊登录
        default :
            throw new global.errs.ParameterException("没有相应的处理函数，请联系管理员")
    }
    ctx.body = {
        token
    }
})
router.post('/verify',async(ctx)=>{
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken((v.get('body.token')))
    ctx.body = {
        result
    }
})
async function emailLogin(account,secret){
    const user =  await User.verifyEmailPassword(account,secret)
    let token;
    token = generateToken(user.id, Auth.USER);
    return token
}

module.exports = router