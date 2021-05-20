const Router = require('koa-router')
const router = new Router()
const { ValidationInteger } = require('../validators/validator')

router.post('/book/:id/', async(ctx, next) => {
    const V = await new ValidationInteger().validate(ctx)
    const id = V.get('path.id')

    ctx.body = {
        msg: 'success',
        id
    }
})

module.exports = router