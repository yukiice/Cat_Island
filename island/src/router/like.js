const Router = require('koa-router')
const router = new  Router({
    prefix:'/v1/like'
})
const {LikeValidator} = require('../validators/validator')
const {Auth} =  require('../middleware/auth')
const {Favor}   = require('../model/favor')

router.post('/',new Auth().m,async (ctx,next)=>{
    const v =  await  new LikeValidator().validate(ctx)
    Favor.like(v.get('body.art_id'),v.get('body.type'),ctx.auth.uid)
})

module.exports = router