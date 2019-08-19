/**
 * This is a decorator function for a web element, pass in an element and get back
 * an extended function element
 * @param locator
 * @param name
 */
import { element, ElementArrayFinder, ElementFinder, Locator } from 'protractor';

import { DropDownHelper } from '../html/dropdown-helper';
import { ElementHelper } from '../html/element-helper';
import { PageHelper } from '../html/page-helper';
import { TextBoxHelper } from '../html/textbox-helper';

import { ExpectationHelper } from './expectation-helper';

export function $(locator: Locator, name: string) {
    return new DfElement(locator, name);
}

export function $$(locator: Locator, name: string) {
    return new DfElements(locator, name);
}

export class DfElement {

    readonly item: ElementFinder;

    constructor(locator: Locator, public name: string) {
        this.item = element(locator);
    }

    async clickButtonJs() {
        await ElementHelper.clickButtonJs(this);
    }

    async clickButton() {
        await ElementHelper.clickButton(this);
    }

    async clickLink() {
        await ElementHelper.clickLink(this);
    }

    async hoverOver() {
        await ElementHelper.actionHoverOver(this);
    }

    async hoverOverAndClick() {
        await this.hoverOver();
        await this.clickButton();
    }

    async getText() {
        return await ElementHelper.getText(this);
    }

    async getAtttribute(attribute: string) {
        return await ElementHelper.getAttributeValue(this, attribute);
    }

    async clickLinkJs() {
        await ElementHelper.clickLinkJs(this);
    }

    async sendKeys(text: string) {
        await ElementHelper.sendKeys(this, text);
    }

    async clearText() {
        await TextBoxHelper.clearText(this.item);
    }

    async verifyDisplayedStatus() {
        await ExpectationHelper.verifyDisplayedStatus(this);
    }

    async scrollToElement() {
        await ElementHelper.scrollToElement(this);
    }

    async verifyHiddenStatus() {
        await ExpectationHelper.verifyHiddenStatus(this);
    }

    async verifyPresentStatus() {
        await ExpectationHelper.verifyPresentStatus(this);
    }

    async getCssValue(attribute: string) {
        return await PageHelper.getCssValue(this, attribute);
    }

    async verifyTextEntered(expected: string) {
        return ElementHelper.verifyTextEntered(this, expected);
    }

    async verifyContainsText(expected: string) {
        await ExpectationHelper.verifyContainsText(this, expected);
    }

    async verifyTextBoxContains(expected: string) {
        await ExpectationHelper.verifyTextBoxContains(this, expected);
    }

    async getSelectedOptionText() {
        return await DropDownHelper.getTheSelectedOptionText(this);
    }

    async getTheSelectedOptionTextWithIndex(index: number) {
        return await DropDownHelper.getTheSelectedOptionTextWithIndex(this, index);
    }

    async getSrcAtttribute() {
        return await ElementHelper.getAttributeValue(this, 'src');
    }

    async getNameAtttribute() {
        return await ElementHelper.getAttributeValue(this, 'name');
    }

    async getCssBackgroundColorValue() {
        return await PageHelper.getCssValue(this, 'backgroundColor');
    }

    async getDisabledAtttribute() {
        return await ElementHelper.getAttributeValue(this, 'disabled');
    }
}

export class DfElements {

    readonly item: ElementArrayFinder;

    constructor(locator: Locator, public name: string) {
        this.item = element.all(locator);
    }
}
