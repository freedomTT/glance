'use strict';

const Service = require('egg').Service;
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

class NewsService extends Service {
  async getBaiduHotSearch(cg) {
    const baseUrl = 'http://top.baidu.com/buzz?b=';
    let url = '';
    switch (cg) {
      case 1: url = baseUrl + '1'; break; // 实时热点  1
      case 341: url = baseUrl + '341'; break; // 今日热点  341
      case 42: url = baseUrl + '42'; break; // 七日热点  42
      case 342: url = baseUrl + '342'; break; // 民生热点  342
      case 344: url = baseUrl + '344'; break; // 娱乐热点  344
      case 11: url = baseUrl + '11'; break; // 体育热点  11
      default:url = baseUrl + '1';
    }
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
    };
    const getData = new Promise(resolve => {
      request({
        url,
        headers,
        method: 'get',
        encoding: null,
      }, (err, res, body) => {
        if (err) {
          resolve({
            success: false,
            message: '获取数据失败',
          });
        } else {
          const html = iconv.decode(body, 'gb2312');
          const list = [];
          const $ = cheerio.load(html.toString());
          // 获取指定元素
          const item = $('.list-table tbody tr');
          // 循环得到元素的跳转地址和名称
          item.map((i, index) => {
            if (i !== 0) {
              const obj = {};
              const title = $(index).find('.keyword .list-title').text();
              const hot = $(index).find('.last span').text();
              if (title) {
                obj.title = title;
                obj.hot = hot;
                list.push(obj);
              }
            }
          });
          resolve({
            success: true,
            message: '查询成功',
            result: list,
          });
        }
      });
    });
    return await getData;
  }

  async getWeiboHotSearch() {
    const url = 'https://s.weibo.com/top/summary?cate=realtimehot';
    const headers = {
      Host: 's.weibo.com',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      // 'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      Connection: 'keep-alive',
      Referer: 'https://weibo.com/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    };
    const getData = new Promise(resolve => {
      request({
        url,
        headers,
        method: 'get',
        encoding: null,
      }, (err, res, body) => {
        if (err) {
          resolve({
            success: false,
            message: '获取数据失败',
          });
        } else {
          const html = iconv.decode(body, 'UTF-8');
          const list = [];
          const $ = cheerio.load(html.toString());

          console.log(html)
          // 获取指定元素
          const item = $('table tbody tr');
          // 循环得到元素的跳转地址和名称
          item.map((i, index) => {
            if (i !== 0) {
              const obj = {};
              const title = $(index).find('.td-02 a').text();
              const hot = $(index).find('.td-02 span').text();
              const icon = $(index).find('.td-03 i').text();
              if (title) {
                obj.title = title;
                obj.hot = hot;
                obj.icon = icon;
                list.push(obj);
              }
            }
          });
          resolve({
            success: true,
            message: '查询成功',
            result: list,
          });
        }
      });
    });
    return await getData;
  }
}

module.exports = NewsService;
