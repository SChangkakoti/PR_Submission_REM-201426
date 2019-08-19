const defaultConfigSetup = require('./core/config-setup/default-config-setup.js');
const reportersSetup = require('./core/config-setup/reporters-setup');

exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    SELENIUM_PROMISE_MANAGER: defaultConfigSetup.SELENIUM_PROMISE_MANAGER,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    getPageTimeout: defaultConfigSetup.getPageTimeout,
    suites: defaultConfigSetup.suites,
    params: defaultConfigSetup.params,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    seleniumAddress: defaultConfigSetup.seleniumAddress.browserstack,
    maxSessions: defaultConfigSetup.maxSessions,
    multiCapabilities: defaultConfigSetup.bsMultiCapabilities,
    onPrepare() {
        reportersSetup.configureAllReporters();
    }
};
