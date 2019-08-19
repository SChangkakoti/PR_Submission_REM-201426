import { browser } from 'protractor';

import { StepLogger } from '../../../core/logger/step-logger';
import { DfElement } from '../misc-utils/df-elements-helper';

import { PageHelper } from './page-helper';
import { WaitHelper } from './wait-helper';

export class PageHelperExtension {

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

    static async executeInIFrames(targets: DfElement[], fn: Function, switchBack = true) {
        await PageHelperExtension.switchToiFrames(targets);

        await fn();

        if (switchBack) {
            await PageHelper.switchToDefaultContent();
        }
    }
}
