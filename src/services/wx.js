const util = require('util');
const axios  = require('axios');
const {User} = require('../models/user')
const {Auth} = require('../middleware/auth')
const {generateToken} = require('../core/util')
class WXManager {
//    code 小程序生成微信
//    openid 唯一标识  鉴定

//    显示注册  唯一标识
//    code
//    appid appsecret
    static async codeToToken(code){
    //    字符串格式化
        let url = await util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code)
        const result = await axios.get(url)
        //验证是否获取
        if(result.status !== 200){
            throw new  global.errs.AuthFailed('openid获取失败')
        }
    //    验证是否合法
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if(errcode){
            throw new global.errs.AuthFailed('openid获取失败'+errcode+"原因："+errmsg)
        }
    //    验证openid
        let user = await User.getUserbyOpenid(result.data.openid)
        if (!user){
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id,Auth.USER)
    }
}
module.exports = {
    WXManager
}