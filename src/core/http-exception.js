class HttpException extends Error {
  constructor(code = 400, errorCode = 10000, msg = "服务器错误") {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}
class ParamsException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "参数错误";
    this.errorCode = errorCode || 10000;
  }
}

module.exports = {
  HttpException,
  ParamsException,
};
