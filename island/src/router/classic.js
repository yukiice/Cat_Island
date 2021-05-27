const Router = require('koa-router')

const router = new Router({
    prefix: `/v1/classic`
})

const {
    ValidationInteger
} = require('../validators/validator')

const {
    Auth
} = require('../middleware/auth')

const {
    Flow
} = require('../model/flow')
const {
    Art
} = require('../model/art')

router.get('/', new Auth().m, async(ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    art.setDataValue('index', flow.index)
    ctx.body = art
})

module.exports = router