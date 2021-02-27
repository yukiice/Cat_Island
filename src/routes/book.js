const Router = require("koa-router");
const router = new Router();
router.post("/v1/:id/classic/latest", async (ctx, next) => {
  if (true) {
    const error = new global.errs.ParamsException
    // error.requestUrl = `${ctx.method} ${cxt.path}`;
    throw error;
  }
  ctx.body = {
    key: "clasic",
  };
});
module.exports = router;
