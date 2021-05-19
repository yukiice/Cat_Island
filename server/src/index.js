const Koa = require("koa");
const parser = require('koa-bodyparser')
const InitManager  =require('./core/init')
const  catchError = require('./middleware/exception')

const app = new Koa()
 
// 应用中间件
app.use(parser())
app.use(catchError)
process.cwd()
// 挂载静态方法
InitManager.initCore(app)

app.listen(3000,()=>{
    console.log('server is running http://localhost:3000')
})