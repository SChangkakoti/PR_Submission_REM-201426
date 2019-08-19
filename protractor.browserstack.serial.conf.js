const defaultConfigSetup = require('./core/config-setup/default-config-setup');
const reportersSetup = require('./core/config-setup/reporters-setup');

exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    SELENIUM_PROMISE_MANAGER: defaultConfigSetup.SELENIUM_PROMISE_MANAGER,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    getPageTimeout: defaultConfigSetup.getPageTimeout,
    suites: defaultConfigSetup.suites,
    params: defaultConfigSetup.params,
    seleniumAddress: defaultConfigSetup.seleniumAddress.browserstack,
    localSeleniumStandaloneOpts: defaultConfigSetup.localSeleniumStandaloneOpts,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    capabilities: defaultConfigSetup.bsMultiCapabilities[0],
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    beforeLaunch: defaultConfigSetup.beforeLaunch,
    afterLaunch: defaultConfigSetup.afterLaunch,
    onPrepare() {
        reportersSetup.configureAllReporters();
    }
};
