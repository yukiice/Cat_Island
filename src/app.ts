import koa, { Context } from "koa";

const app = new koa();

app.use(async (ctx: Context, next) => {
  ctx.body = "koa";
  console.log("aaa");
  await next();
});

app.listen(3000);
