require("ts-node").register({ files: true });

const wdioConfig = {
    //hostname: 'ip-5236.sunline.net.ua',
    //port: 4444,
    path: "/wd/hub",
    // path: '/',
    runner: "local",
    specs: ["./test/demo/multiremote.ts"],
    // capabilities: [{
    //     maxInstances: 1,
    //     browserName: 'chrome',
    // }],

    capabilities: {
        user1: {
            capabilities: {
                browserName: "chrome"
            }
        },
        user2: {
            capabilities: {
                browserName: "chrome"
            }
        }
    },
    baseUrl: process.env.SUT_URL || "http://ip-5236.sunline.net.ua:38015",
    services: ["chromedriver"],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000
    },
    beforeSession: function(config, capabilities) {
        if (process.env.DEBUG == "1") {
            // Giving debugger some time to connect...
            return new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

if (process.env.DEBUG == "1") {
    console.log("###### Running in debug mode! ######");
    wdioConfig.maxInstances = 1;
    wdioConfig["execArgv"] = ["--inspect=127.0.0.1:5858"];
    wdioConfig.mochaOpts.timeout = 360000;
}

exports.config = wdioConfig;
