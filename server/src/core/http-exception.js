class HttpException extends Error {
  constructor(code = 400, errorCode = 10000, msg = "服务器错误") {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}
//客户端错误
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "参数错误";
    this.errorCode = errorCode || 10000;
  }
}

//成功
class Success extends HttpException {
  constructor(msg,errorCode){
    super();
    this.code = 201
    this.msg = msg || 'OK'
    this.errorCode = errorCode || 0
  }
}

// 404 未找到
class NotFound extends HttpException {
  constructor(msg,errorCode){
    super()
    this.msg = msg || '资源未找到'
    this.errorCode = errorCode || 10000
    this.code = 404
  }
}

class AuthFailed extends HttpException {
  constructor(msg,errorCode ){
    super()
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
    this.code  = 401
  }
}

class Forbidden extends HttpException {
  constructor(msg,errorCode){
    super()
    this.msg = msg || '您没有访问的权限'
    this.errorCode = errorCode  || 10006
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden,
};
