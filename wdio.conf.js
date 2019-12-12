require("ts-node").register({ files: true });

const config = {
    hostname: 'ip-5236.sunline.net.ua',
    port: 4444,
    path: '/wd/hub',
    // path: '/',
    runner: 'local',
    specs: [
        './test/specs/**/*.ts'
    ],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
    }],
    baseUrl: process.env.SUT_URL || 'http://ip-5236.sunline.net.ua:38015',
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
}

exports.config = config
