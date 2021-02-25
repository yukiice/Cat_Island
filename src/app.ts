const Koa  = require('koa');

const app = new Koa()

function test(){
    console.log('hello')
}

app.use(test)

app.listen(3000)