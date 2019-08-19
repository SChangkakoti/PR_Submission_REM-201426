import { by } from 'protractor';

import { $, $$ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { xpath } from '../../../../components/misc-utils/xpath-builder';

import { LanguageManagementPageConstant } from './language-management-page.constant';

const { attributes, tags } = HtmlHelper;
export class LanguageManagementPage {
    private static readonly names = LanguageManagementPageConstant.elementNames;
    private static readonly attr = LanguageManagementPageConstant.attributes;

    static get testData() {
        return {
            defaultLanguage: 'German',
        };
    }

    static get LanguagesTable() {
        return $(by.id(this.attr.id.apteanHeaderCal), this.names.languageTable);
    }

    private static getLanguageBoldLabel(name: string) {
        return $(xpath(HtmlHelper.tags.span)
            .where(HtmlHelper.attributes.class, this.attr.classes.apteanBodyBold)
            .text(name)
            .buildByObject(), name);
    }

    private static getButtonElement(name: string) {
        return $(xpath(tags.input)
            .where(attributes.class, this.attr.classes.apteanMediumButton)
            .contains(attributes.value, name)
            .buildByObject(), name);
    }

    public static getDisplayedName(language: string) {
        return $(xpath(tags.td)
            .where(attributes.class, this.attr.classes.apteanBody)
            .text(language)
            .buildByObject(), language);
    }

    static get LanguagesProperties() {
        const propAttr = this.attr.classes;
        const propNames = this.names.languagePropFields;
        return {
            locale: $(by.cssContainingText(`.${propAttr.apteanBodyBold}`, propNames.locale), propNames.locale),
            dispNames: this.getLanguageBoldLabel(propNames.displayNames),
            english: $(by.cssContainingText(`.${propAttr.apteanBody}`, propNames.english), propNames.english),
            arabic: $(by.id(this.attr.id.englishName), this.names.languagePropFields.arabic),
            french: $(by.cssContainingText(`.${propAttr.apteanBody}`, propNames.french), propNames.french),
            englishTextBox: $(by.id(this.attr.id.englishName), this.attr.id.englishName),
            frenchTextBox: $(by.css(`${tags.input}[${attributes.name}=${propAttr.frenchInput}]`), propAttr.frenchInput),
            arabicTextBox: $(by.css(`${tags.input}[${attributes.name}=${propAttr.arabicInput}]`), propAttr.arabicInput),
        };
    }

    static getlanguageLinkInList(language: string) {
        const propAttr = this.attr.classes;
        return $(by.cssContainingText(`${tags.a}[${attributes.class}=${propAttr.apteanBody}`, language), this.names.languageTable);
    }

    static get buttons() {
        return {
            addLanguage: this.getButtonElement(this.names.addLanguage),
            submit: this.getButtonElement(this.names.submit),
            cancel: this.getButtonElement(this.names.cancel),
        };
    }

    static get localeDropDown() {
        return {
            localeDd: $(by.css(`${tags.select}[${attributes.name}=${this.names.localeDd}]`), this.names.localeDd),
            localeDdOption: $$(by.css(`[${attributes.name}='${this.names.localeDd}'] ${tags.option}`),
                this.names.languageDropDownOptions),
        };
    }

    static getLanguageOptions(language: string) {
        return $(by.cssContainingText(`${tags.select}[${attributes.name}=${this.names.localeDd}] ${tags.option}`, language), language);
    }

    static get contentIFrame() {
        return $(by.id(this.attr.id.contentFrame), this.names.contentIFrame);
    }

    static get dialogIFrame() {
        return $(by.id(this.attr.id.dialogIFrame), this.names.languagePropFields.dialogIFrame);
    }
}
