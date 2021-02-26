const Koa = require("koa");
const app = new Koa()
const parser = require('koa-bodyparser')
const InitManager  =require('./core/init')
 
InitManager.initCore(app)
 
app.listen(3000,()=>{
    console.log('server is running http://localhost:3000')
})