const defaultConfigSetup = require('./core/config-setup/default-config-setup');
const reportersSetup = require('./core/config-setup/reporters-setup');
const { chrome } = defaultConfigSetup.keywords;
exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    SELENIUM_PROMISE_MANAGER: defaultConfigSetup.SELENIUM_PROMISE_MANAGER,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    getPageTimeout: defaultConfigSetup.getPageTimeout,
    suites: defaultConfigSetup.suites,
    directConnect:true,
    capabilities: defaultConfigSetup.capabilities(chrome),
    params: defaultConfigSetup.params,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    onPrepare() {
        reportersSetup.configureAllReporters();
    }
};
