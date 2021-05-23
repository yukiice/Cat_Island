function isThisTyPE(val) {
    for (const key in this) {
        if (this[key] == val) {
            return true
        }
    }
    return false
}

const LoginType = {
    //    小程序登录
    USER_MINI_PROGRAM: 100,
    //    email登录
    USER_EMAIL: 101,
    //    手机号登录
    USER_MOBILE: 102,
    //    默认登录
    CONVENTION: 200,
    //管理员登录
    ADMIN_LOGIN: 99,
    isThisTyPE
}

module.exports = {
    LoginType
}