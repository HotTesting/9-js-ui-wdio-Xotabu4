require("ts-node").register({ files: true });

const wdioConfig = {
    runner: "local",
    // specs: ["./test/specs/**/*.ts"],
    specs: ["./test/specs/checkout-user.ts"],
    capabilities: [
        {
            maxInstances: 2,
            browserName: "chrome"
        }
    ],

    // capabilities: {
    //     user1: {
    //         capabilities: {
    //             browserName: "chrome"
    //         }
    //     },
    //     user2: {
    //         capabilities: {
    //             browserName: "chrome"
    //         }
    //     }
    // },
    baseUrl: process.env.SUT_URL || "http://ip-5236.sunline.net.ua:38015",
    services: [],
    framework: "mocha",
    reporters: [
        "spec",
        [
            "allure",
            {
                outputDir: "allure-results",
                disableMochaHooks: true,
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000
    },
    beforeSession: function(config, capabilities) {
        if (process.env.DEBUG == "1") {
            // Giving debugger some time to connect...
            return new Promise(resolve => setTimeout(resolve, 5000));
        }
    },
    afterTest: function(test) {
        if (test.error !== undefined) {
            browser.takeScreenshot();
        }
    }
};

if (process.env.SELENIUM_HUB_HOST) {
    wdioConfig.hostname = process.env.SELENIUM_HUB_HOST
    wdioConfig.port = 4444
    wdioConfig.path = "/wd/hub"
} else {
    wdioConfig.services = ["chromedriver"];
}

if (process.env.DEBUG == "1") {
    console.log("###### Running in debug mode! ######");
    wdioConfig.maxInstances = 1;
    wdioConfig["execArgv"] = ["--inspect=127.0.0.1:5858"];
    wdioConfig.mochaOpts.timeout = 360000;
}

exports.config = wdioConfig;
