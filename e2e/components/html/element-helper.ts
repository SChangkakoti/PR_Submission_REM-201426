import { ComponentHelpersFactory } from '@aurea/protractor-automation-helper';
import { browser, by, element, protractor, By, ElementFinder } from 'protractor';
import { ILocation, ISize } from 'selenium-webdriver';

import { StepLogger } from '../../../core/logger/step-logger';
import { $, DfElement } from '../misc-utils/df-elements-helper';
import { ElementType } from '../misc-utils/element-type';
import { ExpectationHelper } from '../misc-utils/expectation-helper';
import { HtmlHelper } from '../misc-utils/html-helper';
import { xpath } from '../misc-utils/xpath-builder';

import { PageHelper } from './page-helper';
import { TextBoxHelper } from './textbox-helper';
import { WaitHelper } from './wait-helper';

export class ElementHelper {
    private static readonly EC = protractor.ExpectedConditions;

    private static async clickJs(targetElement: DfElement, eType: ElementType) {
        StepLogger.subStep(`Click '${targetElement.name}' ${eType}`);
        await this.clickUsingJs(targetElement);
    }

    private static async click(targetElement: DfElement, eType: ElementType) {
        StepLogger.subStep(`Click '${targetElement.name}' ${eType}`);
        await PageHelper.click(targetElement);
    }

    static async getBrowser() {
        const capabilities = await browser.getCapabilities();
        return capabilities.get('browserName');
    }

    static async actionMouseMove(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        return browser.actions().mouseMove(target.item).perform();
    }

    static async actionMouseDown(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        return browser.actions().mouseDown(target.item).perform();
    }

    static async actionDragAndDrop(source: DfElement, destination: DfElement) {
        await WaitHelper.waitForElement(source.item);
        return browser.actions().dragAndDrop(source.item, destination.item).perform();
    }

    static async actionDoubleClick(optElementOrButton?: ElementFinder | string, optButton?: string) {
        if (optElementOrButton) {
            return browser.actions().doubleClick(optElementOrButton).perform();
        }
        if (optButton) {
            return browser.actions().doubleClick(optButton).perform();
        }
    }

    static async actionClick(optElementOrButton?: ElementFinder | string, optButton?: string) {
        if (optElementOrButton) {
            return browser.actions().click(optElementOrButton).perform();
        }
        if (optButton) {
            return browser.actions().click(optButton).perform();
        }
    }

    static async actionHoverOver(target: DfElement) {
        StepLogger.subStep(`Hover over '${target.name}'`);
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await browser.actions().mouseMove(target.item).perform();
    }

    static async actionHoverOverAndClick(hoverOverLocator: DfElement, clickLocator: DfElement) {
        await WaitHelper.waitForElement(hoverOverLocator.item);
        await browser.actions().mouseMove(hoverOverLocator.item).click(clickLocator.item).perform();
    }

    static async hasOption(select: DfElement, option: string) {
        return select.item
            .element(by.cssContainingText('option', option))
            .isPresent();
    }

    static async getFocusedElement() {
        return browser
            .driver
            .switchTo()
            .activeElement();
    }

    static async getLocation(target: DfElement): Promise<ILocation> {
        StepLogger.subStep(`Get location of '${target.name}'`);
        await WaitHelper.waitForElement(target.item);
        const location = await target.item.getLocation();
        StepLogger.subStep(`Received location: '${JSON.stringify(location)}'`);
        return location;
    }

    static async getSize(target: DfElement): Promise<ISize> {
        StepLogger.subStep(`Get size of '${target.name}'`);
        await WaitHelper.waitForElement(target.item);
        const size = await target.item.getSize();
        StepLogger.subStep(`Received size: '${JSON.stringify(size)}'`);
        return size;
    }

    static async currentSelectedOptionByText(text: string) {
        const selector = `//option[@selected="selected" and normalize-space(.)="${text}"]`;
        return element(By.xpath(selector));
    }

    static async getSelectedOption(target: DfElement) {
        return target.item.element(By.css('option[selected]'));
    }

    static async isVisible(target: DfElement) {
        return this.EC.visibilityOf(target.item);
    }

    static async isNotVisible(locator: DfElement) {
        return this.EC.invisibilityOf(locator.item);
    }

    static async inDom(locator: DfElement) {
        return this.EC.presenceOf(locator.item);
    }

    static async notInDom(locator: DfElement) {
        return this.EC.stalenessOf(locator.item);
    }

    static async isClickable(locator: DfElement) {
        return this.EC.elementToBeClickable(locator.item);
    }

    static async hasText(locator: DfElement, text: string) {
        return this.EC.textToBePresentInElement(locator.item, text);
    }

    static async titleIs(title: string) {
        return this.EC.titleIs(title);
    }

    static async hasClass(locator: DfElement, klass: string) {
        const classes = await locator.item.getAttribute('class') as string;
        return classes && classes.split(' ').indexOf(klass) !== -1;
    }

    static async hasClassRegex(locator: DfElement, klass: string) {
        const classAttribute = await locator.item.getAttribute('class');
        const pattern = new RegExp('(^|\\s)' + klass + '(\\s|$)');
        return pattern.test(classAttribute);
    }

    static async clickUsingJs(targetElement: DfElement) {
        await WaitHelper.waitForElementToBeClickable(targetElement.item);
        await this.clickUsingJsNoWait(targetElement);
    }

    static async clickUsingJsNoWait(target: DfElement) {
        await browser.executeScript('arguments[0].click();', await target.item.getWebElement());
    }

    static async selectDropDownByIndex(target: DfElement, optionNum: number) {
        if (optionNum) {
            const options = await target.item.findElements(by.tagName('option'));
            await options[optionNum].click();
        }
    }

    static async scrollToElement(target: DfElement) {
        await browser.executeScript('arguments[0].scrollIntoView(true);', target.item.getWebElement());
    }

    static async getAttributeValue(elem: DfElement, attribute: string): Promise<string> {
        await WaitHelper.waitForElement(elem.item);
        const value = await elem.item.getAttribute(attribute);
        return value.trim();
    }

    static async getText(elem: DfElement) {
        StepLogger.subStep(`Get text of element: '${elem.name}'`);
        await WaitHelper.waitForElementToHaveText(elem.item);
        let text = await elem.item.getText();
        text = text.trim();
        StepLogger.subStep(`Received text: '${text}'`);
        return text;
    }

    static getElementByText(text: string, isContains = false) {
        return element(By.xpath(`//*[${ComponentHelpersFactory.getXPathFunctionForText(text, isContains)}]`));
    }

    static getElementByTextAndHref(href: string, text: string) {
        return $(xpath()
            .contains(HtmlHelper.attributes.href, href)
            .text(text)
            .buildByObject(), text);
    }

    static getElementByContainsTextAndHref(href: string, text: string) {
        return $(xpath()
            .contains(HtmlHelper.attributes.href, href)
            .textContains(text)
            .buildByObject(), text);
    }

    static getAnchorByClassAndText(className: string, text: string) {
        return element(xpath(HtmlHelper.tags.a)
            .contains(HtmlHelper.attributes.class, className)
            .text(text)
            .first()
            .buildByObject());
    }

    static async openLinkInNewTabUsingTarget(target: DfElement) {
        const script = 'const item = arguments[0];item.setAttribute("target", "_blank");item.click()';
        await browser.executeScript(script, await target.item.getWebElement());
    }

    static async openLinkInNewTabUsingWindowOpener(target: DfElement) {
        const script = 'return window.open(arguments[0].getAttribute("href"),"_blank")';
        await browser.executeScript(script, await target.item.getWebElement());
    }

    static async clickButtonJs(targetElement: DfElement) {
        await this.clickJs(targetElement, ElementType.Button);
    }

    static async clickLinkJs(targetElement: DfElement) {
        await this.clickJs(targetElement, ElementType.Link);
    }

    static async clickButton(targetElement: DfElement) {
        await this.click(targetElement, ElementType.Button);
    }

    static async clickLink(targetElement: DfElement) {
        await this.click(targetElement, ElementType.Link);
    }

    static async clickElementWithOffset(targetElement: DfElement, offset: ILocation) {
        StepLogger.subStep(`Click '${targetElement.name}' with offset: ${JSON.stringify(offset)}`);
        await WaitHelper.waitForElementToBeDisplayed(targetElement.item);
        await browser.actions()
            .mouseMove(targetElement.item, offset)
            .click()
            .perform();
    }

    static async refreshAndClickButton(targetElement: DfElement) {
        await browser.refresh(PageHelper.DEFAULT_TIMEOUT);
        await this.click(targetElement, ElementType.Button);
    }

    static async waitAndClickButton(targetElement: DfElement, wait = PageHelper.timeout.xs) {
        await WaitHelper.waitForElementToBeDisplayed(targetElement.item);
        await WaitHelper.sleep(wait);
        try {
            await this.click(targetElement, ElementType.Button);
        } catch (e) {
            await this.clickJs(targetElement, ElementType.Button);
        }
    }

    static async actionMouseMoveAndClick(target: DfElement) {
        await WaitHelper.waitForElement(target.item);
        await browser.actions().mouseMove(target.item.getWebElement()).perform();
        await browser.actions().click().perform();
    }

    static async actionClickWithWait(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        await this.actionMouseMoveAndClick(target);
    }

    static async sendKeys(targetElement: DfElement, value: string,
                          sendEnter = false) {
        StepLogger.subStep(`Enter '${value}' in '${targetElement.name}' textbox`);
        await TextBoxHelper.sendKeys(targetElement.item, value, sendEnter);
    }

    static async clickViaCoordinates(location: ILocation) {
        const script = (x: number, y: number) => `document.elementFromPoint(${x}, ${y}).click();`;
        await browser.driver.executeScript(script(location.x, location.y));
    }

    static async verifyTextEntered(targetElement: DfElement, value: string) {
        const actual = await this.getAttributeValue(targetElement, HtmlHelper.attributes.value);
        await ExpectationHelper.verifyStringEqualTo(actual, value);
    }

    static async shiftClick(targetElement: DfElement) {
        StepLogger.subStep('Key down SHIFT, click and release SHIFT');
        await browser.actions().keyDown(protractor.Key.SHIFT).perform();
        await this.clickButton(targetElement);
        await browser.actions().keyUp(protractor.Key.SHIFT).perform();
    }

    static getItemByText(text: string, isContains = false, tag = '*') {
        const itemXpath = `//${tag}[${ComponentHelpersFactory.getXPathFunctionForText(
            text, isContains)}]`;
        return $(By.xpath(itemXpath), text);
    }

    static async getAttributeValueWithoutTrim(elem: DfElement, attribute: string): Promise<string> {
        await WaitHelper.waitForElement(elem.item);
        const value = await elem.item.getAttribute(attribute);
        return value;
    }

    static async getDisabledAttributeValue(elem: DfElement): Promise<string> {
        return this.getAttributeValueWithoutTrim(elem, 'disabled');
    }
}
