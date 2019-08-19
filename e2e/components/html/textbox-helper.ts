import { browser, protractor, ElementFinder } from 'protractor';

import { VerboseLogger } from '../../../core/logger/verbose-logger';
import { DfElement } from '../misc-utils/df-elements-helper';
import { HtmlHelper } from '../misc-utils/html-helper';

import { ElementHelper } from './element-helper';
import { WaitHelper } from './wait-helper';

export class TextBoxHelper {
    /**
     * Clears the existing text from an input elements
     * @param {ElementFinder} locator
     */
    static async clearText(locator: ElementFinder) {
        let ctrl = protractor.Key.CONTROL;

        if (browser.platform && browser.platform.indexOf('Mac')) {
            ctrl = protractor.Key.COMMAND;
        }
        const command = protractor.Key.chord(ctrl, 'a') + protractor.Key.BACK_SPACE;
        await locator.sendKeys(command);
        await locator.clear();
    }

    /**
     * Send Keys to an input elements once it becomes available
     * @param {ElementFinder} locator for element
     * @param {string} value to be sent
     * @param {boolean} sendEnter for sending an enter key
     */
    static async sendKeys(locator: ElementFinder,
                          value: string,
                          sendEnter = false) {
        await WaitHelper.waitForElementToBeDisplayed(locator);
        await this.clearText(locator);

        // On IE, text is sometimes not well sent, this is a workaround
        VerboseLogger.log(`Sending keys: ${value} to ${locator.locator().toString()}`);
        await locator.sendKeys(value);
        if (sendEnter) {
            await locator.sendKeys(protractor.Key.ENTER);
        }
    }

    public static async typeSlowly(elm: ElementFinder, keys: string, delay: number) {
        await WaitHelper.waitForElementToBeDisplayed(elm);
        VerboseLogger.log(`Sending keys slowly: ${keys} to ${elm.locator().toString()}`);
        await this.clearText(elm);
        for (let i = 0; i < keys.length; i++) {
            await elm.sendKeys(keys[i]);
            await WaitHelper.sleep(delay);
        }
    }

    /**
     * Checks whether an input box has particular value or not
     * @param {ElementFinder} target
     * @param {string} text
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async hasValue(target: DfElement, text: string) {
        const val = await ElementHelper.getAttributeValue(
            target,
            HtmlHelper.attributes.value
        );
        return val === text;
    }
}
