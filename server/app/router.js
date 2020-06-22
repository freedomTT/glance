'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /*
  * @params ：
  *   kind ：'weibo' ; 'baidu' (cg ：实时热点  1；今日热点  341；七日热点  42；民生热点  342；娱乐热点  344；体育热点  11)
  * */
  router.get('/api/news', controller.news.query);
};
