const Koa = require('koa');
const axios = require('axios');
const Router = require('koa-router')
const bodyParser  = require('koa-bodyparser')
// 导入自动化组件
const requireDirectory = require('require-directory')

// 导入中间件
const catchError  =require('./middleware/exception')


const app = new Koa()

// 应用中间件
app.use(bodyParser())
app.use(catchError)


requireDirectory(module,`./router`,{
  visit: whenLoadModule
})

function whenLoadModule(obj){
  obj instanceof Router && app.use(obj.routes())
}
 

app.listen(3000,()=>{
  console.log(`server is running http://localhost:3000`) 
})
 