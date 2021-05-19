const Router = require('koa-router')
const router = new Router()
const { ValidationInteger } = require('../validators/validator')

router.post('/book/:id/', async(ctx, next) => {
    const V = await new ValidationInteger().validate(ctx)
    ctx.body = 'success'
})

module.exports = router