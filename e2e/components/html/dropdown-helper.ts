import { By } from 'protractor';

import { DfElement, DfElements } from '../misc-utils/df-elements-helper';
import { HtmlHelper } from '../misc-utils/html-helper';

export class DropDownHelper {
    static async selectOptionByVal(target: DfElement, optionVal: string) {
        const option = target.item.element(By.css(this.getCssForOptionValue(optionVal)));
        await option.click();
    }

    static getXPathForOptionValue(optionVal: string) {
        return `//option[normalize-space(.)="${optionVal}"]`;
    }

    static getCssForOptionValue(optionVal: string) {
        return `option[value="${optionVal}"]`;
    }

    static async selectOptionByText(target: DfElement, optionVal: string) {
        return target.item.element(By.xpath(this.getXPathForOptionValue(optionVal))).click();
    }

    static getDropdownOptions(target: DfElements) {
        return target.item.all(By.tagName(HtmlHelper.tags.option));
    }

    static getDropdownOptionByText(target: DfElement, option: string) {
        return target.item.element(By.cssContainingText(
            HtmlHelper.tags.option, option));
    }

    static getTheSelectedOptionText(target: DfElement) {
        return target.item.element(By.css('option:checked')).getText();
    }

    static getTheSelectedOptionTextWithIndex(target: DfElement, index: number) {
        return target.item.$$(HtmlHelper.cssExpressions.optionChecked).get(index).getText();
    }

    static getAllSelectedOptions(target: DfElement) {
        return target.item.$$(HtmlHelper.cssExpressions.optionChecked);
    }
}
