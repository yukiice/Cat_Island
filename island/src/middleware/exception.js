const  catchError  = async (ctx,next) =>{
    try {
        await next()
    } catch (error) {
        if (error.errorCode) {
            ctx.body  = {
                msg:error.message,
                error_code:error.errorCode,
                request_url:error.requestUrl
            }
            ctx.status  = error.status
        }
        
    }
}

module.exports  = catchError