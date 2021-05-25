const util = require('util')
const axios = require('axios')
const {User} = require('../model/user')
const {generateToken} = require('../core/util')
const {Auth} = require('../middleware/auth')
const errorCode = {
    "-1": "系统繁忙，此时请开发者稍候再试",
    "0": "请求成功",
    "40001": "AppSecret 错误或者 AppSecret 不属于这个小程序，请开发者确认 AppSecret 的正确性",
    "40002": "请确保 grant_type 字段值为 client_credential",
    "40013": "不合法的 AppID，请开发者检查 AppID 的正确性，避免异常字符，注意大小写\t\n"
};

class WxManager {
    static async codeToToken(code) {
        //    code 由小程序生成
        //    openid 唯一的标识，用于鉴定
        const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code)
        const res = await axios.get(url)
        console.log(res, 'this is res')
        if (res.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        if (res.data.errcode !== 0) {
            throw new global.errs.AuthFailed(errorCode[`${res.data.errcode}`])
        }
        let user = await User.getUserByOpenid(res.data.openid)
        if (!user) {
            user = await User.registerByOpenId((res.data.openid))
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WxManager
}