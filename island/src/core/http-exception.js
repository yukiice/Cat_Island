class HttpException extends Error {
    constructor(msg='服务器异常',errorCode = 10000,code=100){
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}