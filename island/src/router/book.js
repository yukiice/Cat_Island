const Router = require("koa-router");
const router = new Router();
router.get("/", (ctx, next) => {
  ctx.body = "yukiice hello";
});
router.post("/books/:id/", async (ctx, next) => {
  const query  = ctx.request.query
  console.log(query);
  if (true) {
      const error  = new Error('没有参数')
      error.errorCode  = 10001
      error.status = 400
      error.requestUrl = `${ctx.method } - ${ctx.path}`
      throw error
  }
  ctx.body  ={
      name:'yukiice'
  }
});
module.exports = router;
