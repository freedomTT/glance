'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const queryRule = {
    kind: 'string'
};

const refreshRule = {
    kind: 'string'
};

class NewsController extends Controller {
    async query() {
        const {ctx} = this;
        // 校验 `ctx.request.body` 是否符合我们预期的格式
        ctx.validate(queryRule, ctx.query);
        if (ctx.query.kind === 'weibo') {
            const weiboList = await ctx.service.news.getWeiboHotSearch();
            // 设置响应体和状态码
            ctx.body = {
                success: true,
                result: weiboList,
            };
        } else {
            ctx.body = {
                success: false,
                result: [],
            };
        }
        ctx.status = 200;
    }

    async refresh() {
        const {ctx} = this;
        ctx.validate(refreshRule, ctx.query);
        if (ctx.query.kind === 'weibo') {
            const result = await ctx.service.news.refreshWeiboHotSearch();
            ctx.body = {
                success: true,
                result: result,
            };
        } else {
            ctx.body = {
                success: false,
                result: [],
            };
        }
        ctx.status = 200;
    }
}

module.exports = NewsController;
