class HttpException extends Error {
    constructor(msg = "服务器异常", errorCode = 10000, code = 400) {
        super();
        this.errorCode = errorCode;
        this.code = code;
        this.msg = msg;
    }
}

class ParameterException extends HttpException {

    constructor(msg, errorCode, code) {
        super();
        this.code = code || 400;
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 10000;
    }
}

// 成功服务
class Success extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 201
        this.msg = msg || 'OK'
        this.errorCode = errorCode || 0
    }
}

// 404 未找到
class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '您没有访问的权限'
        this.errorCode = errorCode || 10006
    }
}

class LikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = '您已经点赞过了'
        this.errorCode = 60001
    }
}

class DisLikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = '您已经取消点赞了'
        this.errorCode = 60002
    }
}


module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DisLikeError
}