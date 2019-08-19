/**
 * Page helper for general utility
 */
import { browser, protractor, ElementArrayFinder, Key } from 'protractor';

import { StepLogger } from '../../../core/logger/step-logger';
import { VerboseLogger } from '../../../core/logger/verbose-logger';
import { DfElement, DfElements } from '../misc-utils/df-elements-helper';

import { AlertHelper } from './alert-helper';
import { ElementHelper } from './element-helper';
import { PageHelperExtension } from './page-helper-extension';
import { WaitHelper } from './wait-helper';

const shortId = require('shortid');
const on = require('await-handler');
export class PageHelper extends PageHelperExtension {
    static MAX_RETRY_ATTEMPTS = 3;
    // noinspection JSValidateJSDoc
    /**
     * Timeout collection to meet various needs
     * @type {{xs: number; s: number; m: number; l: number; xl: number; xxl: number; xxxl: number}}
     */
    static timeout = {
        xxs: 1000,
        xs: 2000,
        s: 5000,
        m: 10000,
        l: 25000,
        xl: 50000,
        xxl: 75000,
        xxxl: 200000,
        xxxxl: 300000,
        xxxxxl: 400000,
        tenMinutes: 600000,
    };
    static DEFAULT_TIMEOUT = PageHelper.timeout.xl;

    static async actionSendKeys(key: string) {
        return browser.actions().sendKeys(key).perform();
    }

    static async actionKeyUp(key: string) {
        return browser.actions().keyUp(key).perform();
    }

    static async actionHoverOver(target: DfElement) {
        return browser.actions().mouseMove(target.item).perform();
    }

    static async actionMouseUp(target: DfElement) {
        return browser.actions().mouseUp(target.item.getWebElement()).perform();
    }

    static async rightClick(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().click(protractor.Button.RIGHT).perform();
    }

    static async openLinkInANewTab(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().keyDown(protractor.Key.CONTROL).click().perform();
    }

    static async actionPushControlKeyboard() {
        await browser.actions().keyDown(Key.CONTROL).perform();
    }

    static async controlKeyFree() {
        await browser.actions().keyUp(Key.CONTROL).perform();
    }

    static async clickOnDeleteButton() {
        await browser.actions().sendKeys(protractor.Key.DELETE).perform();
    }

    static async vKeybordClick(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().click(protractor.Button.LEFT).sendKeys('V').perform();
    }

    static async shiftPlusCShortCut(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().keyDown(protractor.Key.SHIFT).sendKeys('c').perform();
    }

    static async shiftPlusPShortCut(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
        await browser.actions().keyDown(protractor.Key.SHIFT).sendKeys('P').perform();
    }

    /**
     * Wrapper for executing javascript code
     * @param {string | Function} script
     * @param varAargs
     * @returns {promise.Promise<any>}
     */
    static async executeScript(script: string | Function,
                               ...varAargs: any[]) {
        return browser.driver.executeScript(script, varAargs);
    }

    /**
     * Get all browser window handles
     */
    static async getAllWindowHandles() {
        return await browser.getAllWindowHandles();
    }

    /**
     * Switch to a new tab if browser has availability
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async switchToNewTabIfAvailable(windowNumber = 1) {
        const handles = await this.getAllWindowHandles();
        const newWindowHandle = handles[windowNumber]; // this is your new window
        if (newWindowHandle) {
            await browser.switchTo().window(newWindowHandle);
        }
    }

    public static async switchToFirstTab(wait = PageHelper.timeout.xs) {
        await WaitHelper.sleep(wait);
        const handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[0]);
        await this.switchToDefaultContent();
    }

    /**
     * Refresh a page
     * @param dismissAlert
     */
    public static async refreshPage(dismissAlert = true) {
        try {
            await browser.navigate().refresh();
            if (dismissAlert) {
                await AlertHelper.dismissAlertIfExists();
            }
        } catch (e) {
            VerboseLogger.log(`Browser refresh failed: ${e}`);
        }
    }

    public static async restartBrowser() {
        try {
            StepLogger.subStep('Restart browser');
            await browser.restart();
            await browser.waitForAngularEnabled(false);
            await PageHelper.maximiseBrowser();
        } catch (e) {
            VerboseLogger.log(`Browser restart failed: ${e}`);
        }
    }

    /**
     * Control + Click on element
     * @param target
     */
    public static async actionControlClick(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await ElementHelper.actionMouseMove(target);
        await browser.actions().keyDown(Key.CONTROL)
            .click(target.item).perform();
        await this.actionKeyUp(Key.CONTROL);
        await this.actionMouseUp(target);
    }

    /**
     * Click on element
     * @param {DfElement} target
     * @returns {any}
     */
    static async click(target: DfElement) {
        await WaitHelper.waitForElementToBeClickable(target.item);
        return await target.item.click();
    }

    /**
     * DblClick on element
     * @param {DfElement} target
     * @returns {any}
     */
    static async doubleClick(target: DfElement) {
        await WaitHelper.waitForElementToBeClickable(target.item);
        await browser.actions().doubleClick(target.item).perform();
    }

    static async switchToiFrame(target: DfElement, sleepTime = PageHelper.timeout.xs) {
        StepLogger.subStep(`Switch to ${target.name} frame`);
        await WaitHelper.waitForElement(target.item);
        // Wait is needed to load the iframe properly
        await browser.switchTo().frame(target.item.getWebElement());
        await browser.sleep(sleepTime);
    }

    /**
     * Iterates over all the iFrame-elements passed
     * @param targets
     */
    static async switchToiFrames(targets: DfElement[]) {
        for (const target of targets) {
            StepLogger.subStep(`Switch to iframe: '${target.name}' by locator: ${target.item.locator()}`);
            await WaitHelper.waitForElementToBeDisplayed(target.item);
            await browser.switchTo().frame(target.item.getWebElement());
        }
    }

    static async switchToDefaultContent() {
        await browser.driver.switchTo().defaultContent();
    }

    static async switchToDefaultContentAndIFrame(target: DfElement,
                                                 sleepTime = PageHelper.timeout.xs) {
        await browser.switchTo().defaultContent();
        await this.switchToiFrame(target, sleepTime);
    }

    /**
     * Gets promise for current url
     * @returns {any}
     */
    static async currentUrl() {
        return browser.getCurrentUrl();
    }

    public static async goToUrl(url: string, waitForAngular = false) {
        await browser.waitForAngularEnabled(waitForAngular);
        return await browser.get(url, PageHelper.DEFAULT_TIMEOUT)
            .catch(() => false)
            .then(() => true);
    }

    public static getUniqueId(): string {
        // noinspection reason: Giving error for unknown character function
        // noinspection Annotator
        shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
        return shortId.generate().replace(/-/g, '').replace(/_/g, '');
    }

    public static async getTitle() {
        return await browser.driver.getTitle();
    }

    public static async scrollToElement(target: DfElement) {
        return await browser.executeScript('arguments[0].scrollIntoView();', target);
    }

    public static async scrollToElementAndClick(target: DfElement) {
        await this.scrollToElement(target);
        await this.click(target);
    }

    public static async scrollToElementAndDoubleClick(target: DfElement) {
        await this.scrollToElement(target);
        await this.click(target);
        await this.click(target);
    }

    /**
     * Gets CSS attribute value
     * @param {WebElementPromise} target
     * @param {string} attribute
     * @returns {string} attribute value
     */
    public static async getCssValue(target: DfElement, attribute: string) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        const attributeValue = await target.item.getCssValue(attribute);
        return attributeValue.trim();
    }

    public static async getWindowCount() {
        const handles = await browser.getAllWindowHandles();
        return handles.length;
    }

    public static async switchToTab(tabNumber: number) {
        const handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[tabNumber]);
    }

    /**
     * Press CTRL + A
     */
    public static async actionClickControlAButton() {
        await PageHelper.actionSendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
    }

    public static async closeTab() {
        await browser.driver.close();
    }

    public static async verifyIfListContentsAreEqual(sourceList: any[], destinationList: any[]) {
        let isEquals = true;
        for (let i = 0; i < sourceList.length; i++) {
            if (!sourceList[i] === (destinationList[i])) {
                isEquals = false;
                break;
            }
        }
        return isEquals;
    }

    public static async getTagName(target: DfElement) {
        await WaitHelper.waitForElement(target.item);
        return await target.item.getTagName();
    }

    /**
     * Get current url of the webpage
     */
    public static async getCurrentUrl() {
        return await browser.getCurrentUrl();
    }

    public static async maximiseBrowser() {
        try {
            await browser.driver.manage().window().maximize();
        } catch (e) {
            // catch error if window cannot be maximised
        }
    }

    /**
     * This function closes current tab of browser
     * @returns {Promise<void>}
     */
    public static async closeCurrentTab() {
        await browser.executeScript('window.close();');
    }

    /**
     * This method can execute 'fn' multiple times based on the {maxCount} argument
     * If any exception is thrown during execution of 'fn', then current page would be
     * refreshed and same function would be called unless maxCount value is reached
     * @param {Function} fn
     * @param {boolean} refresh
     * @param {number} maxCount
     * @returns {Promise<any>}
     */
    public static async executeFunctionMultipleTimes(fn: Function, refresh = false,
                                                     maxCount = this.MAX_RETRY_ATTEMPTS) {
        if (maxCount > this.MAX_RETRY_ATTEMPTS) {
            throw new Error(`MaxCount value should be equal or less than: ${this.MAX_RETRY_ATTEMPTS}`);
        }
        for (let count = 0; count < maxCount; count++) {
            const [err, result] = await on(fn());
            if (err) {
                StepLogger.subStep(`\tError while executing function: ${err}\n\t*Current count*: ${count}`);
                if (count === (maxCount - 1)) {
                    throw err;
                }
                if (refresh) {
                    await browser.switchTo().defaultContent();
                    await browser.navigate().refresh();
                }
            } else {
                return result;
            }
        }
    }

    /**
     * Helps in executing code in newly opened tab
     * @param fn
     * @param windowNumber
     * @param toCloseAfterExecution
     * @param wait
     */
    static async executeInNewTab(fn: Function, windowNumber = 1,
                                 toCloseAfterExecution = true,
                                 wait = PageHelper.timeout.xs) {
        await WaitHelper.sleep(wait);
        let windowChanged = false;
        try {
            const handles = await browser.getAllWindowHandles();
            const newWindowHandle = handles[windowNumber]; // this is your new window
            if (newWindowHandle) {
                await browser.switchTo().window(newWindowHandle);
                windowChanged = true;
            }
            await fn();
        } finally {
            if (windowChanged && toCloseAfterExecution) {
                await browser.driver.close();
                await WaitHelper.waitUntilTabsCountEqual(windowNumber);
                const handles = await browser.getAllWindowHandles();
                await browser.switchTo().window(handles[0]);
            }
        }
    }

    /**
     * Scroll to the bottom of webpage
     * @returns {Promise<any>}
     */
    static async scrollToBottom() {
        await browser.driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    }

    static async clearCookies() {
        await browser.driver.manage().deleteAllCookies();
    }

    static async executeInIFrame(target: DfElement, fn: Function, switchBack = true, wait = PageHelper.timeout.xs) {
        await WaitHelper.waitForElement(target.item);
        await browser.switchTo().frame(target.item.getWebElement());
        if (Number(wait) > 0) {
            await WaitHelper.sleep(Number(wait));
        }
        await fn();
        if (switchBack) {
            await browser.driver.switchTo().defaultContent();
        }
    }

    static async getTextOfElements(target: DfElements) {
        const textArray: string[] = [];
        for (let count = 0, length = await target.item.count(); count < length; count++) {
            textArray.push((await target.item.get(count).getText()).trim());
        }
        return textArray;
    }

    static async getTextOfElementsArray(target: ElementArrayFinder) {
        const textArray: string[] = [];
        for (let count = 0, length = await target.count(); count < length; count++) {
            textArray.push((await target.get(count).getText()).trim());
        }
        return textArray;
    }

    public static async getTabsCount() {
        const handles = await browser.getAllWindowHandles();
        return handles.length;
    }

    static async closeAllWindowsAndSwitchToFirst(number = 0) {
        StepLogger.subStep('Close all windows and switch to first window');
        const handles = await browser.getAllWindowHandles();
        for (let i = handles.length; number + 1 < i; i--) {
            await browser.switchTo().window(handles[i - 1]);
            await browser.driver.close();
        }
        await browser.switchTo().window(handles[number]);
    }
}
