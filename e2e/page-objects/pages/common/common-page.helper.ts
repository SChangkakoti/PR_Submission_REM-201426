import { browser, by, ElementFinder } from 'protractor';

import { StepLogger } from '../../../../core/logger/step-logger';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { $ } from '../../../components/misc-utils/df-elements-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { ContentAlertManagerPage } from '../manage-communities/content-alert-manager/content-alert-manager.po';

import { CommonPage } from './common.po';

export class CommonPageHelper {

    static getElementByClassContains(className: string, name: string) {
        return $(by.css(`[${HtmlHelper.attributes.class}*='${className}']`), name);
    }

    static getElementByClassEndsWith(className: string, name: string) {
        return $(by.css(`[${HtmlHelper.attributes.class}$='${className}']`), name);
    }

    static getElementByClassStartsWith(className: string, name: string) {
        return $(by.css(`[${HtmlHelper.attributes.class}^='${className}']`), name);
    }

    static getElementByIdEndsWith(id: string, name: string, tag = HtmlHelper.tags.li) {
        return $(by.css(`${tag}[${HtmlHelper.attributes.id}$='${id}']`), name);
    }

    static getElementByHrefContains(href: string, name: string) {
        return $(by.css(`[${HtmlHelper.attributes.href}*='${href}']`), name);
    }

    static async switchToDefaultContent() {
        await browser.switchTo().defaultContent();
        await browser.waitForAngularEnabled(false);
    }

    static async switchToFrame(frameEle: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT) {
        await WaitHelper.waitForElementToBeDisplayed(frameEle, timeout);
        await browser.driver.switchTo().frame(frameEle.getWebElement());
    }

    public static async switchToContentFrame(timeout = PageHelper.timeout.xs) {
        StepLogger.subStep('Switch to Default content');
        await CommonPageHelper.switchToDefaultContent();
        StepLogger.subStep('Switch to Content frame');
        await PageHelper.switchToiFrame(CommonPage.contentFrame, timeout);
    }

    public static async switchToDialogFrame(timeout = PageHelper.DEFAULT_TIMEOUT, levelTwo = false) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        StepLogger.subStep('Switch to Dialog frame');
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);

        if (levelTwo) {
            await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        }
    }

    public static async switchToFindUsersFrameBasic() {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames(CommonPage.contentDialogueAndFindUsersIFrames);
    }

    public static async switchToUserFrame(timeout = PageHelper.DEFAULT_TIMEOUT) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        StepLogger.subStep('Switch to Users frame');
        await PageHelper.switchToiFrame(CommonPage.usersFrame, timeout);
    }

    public static async swithToFindUsersFrame(timeout = PageHelper.timeout.xs) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        StepLogger.subStep('Switch to Dialog frame');
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        StepLogger.subStep('Switch to Find Users frame');
        await PageHelper.switchToiFrame(CommonPage.findUsersFrame, timeout);
    }

    static async switchToWindow(nameOrNumber: number | string = 1) {
        if (typeof nameOrNumber === 'number') {
            StepLogger.subStep(`Switch to window ${nameOrNumber}`);

            await WaitHelper.waitWindowsCountGreaterOrEqual(nameOrNumber + 1);
            const handles = await browser.getAllWindowHandles();
            await browser.switchTo().window(handles[nameOrNumber]);
        } else {
            StepLogger.subStep(`Switch to window '${nameOrNumber}'`);

            await browser.wait(async () => {
                const handles = await browser.getAllWindowHandles();
                for (let i = 0; i < handles.length; i++) {
                    await browser.switchTo().window(handles[i]);
                    const title = await browser.getTitle();
                    if (title === nameOrNumber) {
                        return true;
                    }
                }
                return false;
            }, PageHelper.DEFAULT_TIMEOUT);
        }
    }

    static async switchToFmtreeFrame() {
        StepLogger.subStep('Switch to Fmtree frame');
        await PageHelper.switchToiFrame(CommonPage.fmtreeFrame);
    }

    static async switchToFmeditFrame() {
        StepLogger.subStep('Switch to Fmedit frame');
        await PageHelper.switchToiFrame(CommonPage.fmeditFrame);
    }

    static async switchToSupervisorFrame(timeout = PageHelper.DEFAULT_TIMEOUT) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        StepLogger.subStep('Switch to supFrame');
        await PageHelper.switchToiFrame(CommonPage.supervisorFrame, timeout);
    }

    static async switchToSelectedFrame(timeout = PageHelper.DEFAULT_TIMEOUT) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        StepLogger.subStep('Switch to Selected Frame');
        await PageHelper.switchToiFrame(CommonPage.selectedFrame, timeout);
    }

    static async switchToTreeFrame(timeout = PageHelper.DEFAULT_TIMEOUT) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.contentIFrame, timeout);
        StepLogger.subStep('Switch to Tree Frame');
        await PageHelper.switchToiFrame(CommonPage.treeFrame, timeout);
    }

    static async switchToExpertiseTableFrame(timeout = PageHelper.DEFAULT_TIMEOUT) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.dialogFrame, timeout);
        StepLogger.subStep('Switch to Expertise Table Frame');
        await PageHelper.switchToiFrame(CommonPage.expertiseTableFrame, timeout);
    }

    static async switchToGroupFrame(timeout = PageHelper.DEFAULT_TIMEOUT) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame, timeout);
        StepLogger.subStep('Switch to Group Frame');
        await PageHelper.switchToiFrame(CommonPage.groupFrame, timeout);
    }

    static async switchToTreeIFrame() {
        StepLogger.subStep('Switch to tree frame');
        await PageHelper.switchToiFrame(CommonPage.treeIFrame);
    }

    static async switchToWhatsPopularIFrame(timeout = PageHelper.timeout.xs) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(CommonPage.whatsPopularIFrame, timeout);
    }

    static async switchToHeaderFrame(timeout = PageHelper.timeout.xs) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(CommonPage.headerFrame, timeout);
    }

    static async switchToextiFrame(timeout = PageHelper.timeout.xs) {
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrame(CommonPage.docFrame, timeout);
        await PageHelper.switchToiFrame(CommonPage.extiFrame, timeout);
    }

    static async verifyErrorMessageDisplayedAndClosePopup() {
        await PageHelper.executeInNewTab(async () => {
            await CommonPage.errorMessageIcon.verifyDisplayedStatus();
            await browser.executeScript('window.top.close();');
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async verifyNumberOfWindowsOpen(expectedNumber: number) {
        await ExpectationHelper.verifyValueEqualTo(await PageHelper.getTabsCount(), expectedNumber);
    }

    static async verifyConfirmatioMessageDisplayedAndClickYes() {
        await PageHelper.executeInNewTab(async () => {
            await CommonPage.errorMessageIcon.verifyDisplayedStatus();
            await browser.executeScript('onAction1();');
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async verifyConfirmatioMessageDisplayedAndClickNo() {
        await PageHelper.executeInNewTab(async () => {
            await CommonPage.errorMessageIcon.verifyDisplayedStatus();
            await browser.executeScript('onAction2();');
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async verifyConfirmatioMessageDisplayedAndClickCancel() {
        await PageHelper.executeInNewTab(async () => {
            await CommonPage.errorMessageIcon.verifyDisplayedStatus();
            await browser.executeScript('onAction3();');
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async executeScriptOnActionOne() {
        await browser.executeScript('onAction1();');
    }

    static async executeScriptOnActionTwo() {
        await browser.executeScript('onAction2();');
    }

    static async executeScriptOnActionThree() {
        await browser.executeScript('onAction3();');
    }
}
