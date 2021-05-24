const Router = require('koa-router')

const router = new Router({
    prefix: `/v1/classic`
})

const { ValidationInteger } = require('../validators/validator')

const { Auth } = require('../middleware/auth')

router.get('/', new Auth().m, async(ctx, next) => {
    ctx.body = ctx.auth.uid
})

module.exports = router