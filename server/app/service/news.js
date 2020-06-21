'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
    async getWeiboHotSearch() {
        // const result = await this.app.mysql.query('SELECT * FROM `weibo_hotsearch` LIMIT 0, 50');
        const result = await this.app.mysql.query('select * from (select * from weibo_hotsearch order by datetime desc limit 50) aa order by hot+0 desc');
        return result;
    }

    async refreshWeiboHotSearch() {
        let runPy = new Promise((success, nosuccess) => {
            const {spawn} = require('child_process');
            const path = require("path");
            const pyprog = spawn('python3.8', [path.join(__dirname, '../public/python/weibo_hot_search.py')]);
            pyprog.stdout.on('data', function (data) {
                success(data);
            });
            pyprog.stderr.on('data', (data) => {
                nosuccess(data);
            });
        });
        return await runPy
    }
}

module.exports = NewsService;
