const Router = require('koa-router')
const {Auth} = require('../middleware/auth')
const router = new Router()

router.get('/latest',new Auth(9).m, async (ctx,next)=>{
    ctx.body = ctx.auth.uid
} )

module.exports = router