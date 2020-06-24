'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const queryRule = {
  kind: 'string',
};

const queryDetailRule = {
  text: 'string',
};

class NewsController extends Controller {
  async query() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    ctx.validate(queryRule, ctx.query);
    if (ctx.query.kind === 'weibo') {
      const results = await ctx.service.news.getWeiboHotSearch();
      // 设置响应体和状态码
      ctx.body = results;
    } else if (ctx.query.kind === 'baidu') {
      const results = await ctx.service.news.getBaiduHotSearch(ctx.query.cg);
      ctx.body = results;
    } else {
      ctx.body = {
        success: false,
        result: [],
      };
    }
    ctx.status = 200;
  }
  async detail() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    ctx.validate(queryDetailRule, ctx.query);
    ctx.body = await ctx.service.news.getNewsDetail({
      text: ctx.query.text,
    });
    ctx.status = 200;
  }
}

module.exports = NewsController;
