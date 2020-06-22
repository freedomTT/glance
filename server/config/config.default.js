/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_glance';

    // add your middleware config here
    config.middleware = [];


    config.mysql = {
        client: {
            host: '120.78.84.46',
            port: '3306',
            user: 'root',
            password: 'luozhongdao@931121',
            database: 'app',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    // add your user config here
    const userConfig = {
        // myAppName: '',
    };

    return {
        ...config,
        ...userConfig,
    };
};
