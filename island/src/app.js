const Koa = require('koa');
const axios = require('axios');
const app = new Koa()

app.use(async (ctx,next)=>{
    console.log(1)
    await next()
    console.log(2)
})

app.use(async (ctx,next)=>{
    console.log(3)

    const res  = await axios.get('https://api.66mz8.com/api/social.php?format=json')
    console.log(res.data)
    console.log(666)
    await next()
    console.log(4)
})

app.listen(3000,()=>{
    console.log('running in http://localhost:3000')
})
