const Router = require("koa-router");
const router = new Router();
router.post("/v1/:id/classic/latest", async (ctx, next) => {
  if (true) {
    const error = new Error("why");
    error.errorCode = 1001;
    error.status = 400;
    error.requestUrl = `${ctx.method} ${cxt.path}`;
    throw error;
  }
  ctx.body = {
      key:'clasic'
  }
});
module.exports = router;
