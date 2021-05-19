const Router = require("koa-router");
const { PositiveIntegerValidator } = require('../validators/validators')
const router = new Router();
router.post("/v1/:id/classic/latest", (ctx, next) => {

    //验证处理
    const v = new PositiveIntegerValidator().validate(ctx)
    v.get()
    ctx.body = "success"
});
module.exports = router;