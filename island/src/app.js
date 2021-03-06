const Koa = require('koa');
const bodyParser = require('koa-bodyparser')

const InitManager = require('./core/init')
const catchError = require(`./middleware/exception`);

require('./model/user')

const app = new Koa()
    // 应用中间件
app.use(bodyParser())
app.use(catchError)
process.cwd()
InitManager.initCore(app)
app.listen(3000, () => {
    console.log(`server is running http://localhost:3000`)
})