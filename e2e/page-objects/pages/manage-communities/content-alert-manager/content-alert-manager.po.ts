import { by } from 'protractor';

import { $ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';

import { ContentAlertManagerConstant } from './content-alert-manager.constants';
const { tags } = HtmlHelper;

export class ContentAlertManagerPage {
    private static readonly names = ContentAlertManagerConstant.elementNames;
    private static readonly ids = ContentAlertManagerConstant.ids;
    private static readonly lanDropdown = ContentAlertManagerConstant.languageDropdown;

    static get buttons() {
        return {
            addLevel1Exact: $(by.id(this.ids.add1ID), this.names.add),
            addLevel1Partial: $(by.id(this.ids.add2ID), this.names.add),
            addLevel2Exact: $(by.id(this.ids.add3ID), this.names.add),
            addLevel2Partial: $(by.id(this.ids.add4ID), this.names.add),
            addLevel3Exact: $(by.id(this.ids.add5ID), this.names.add),
            addLevel3Partial: $(by.id(this.ids.add6ID), this.names.add),
            submit: $(by.id(this.ids.submitID), this.names.submit),
            deleteLevel1Exact: $(by.id(this.ids.delete1ID), this.names.delete),
            deleteLevel1Partial: $(by.id(this.ids.delete2ID), this.names.delete),
            deleteLevel2Exact: $(by.id(this.ids.delete3ID), this.names.delete),
            deleteLevel2Partial: $(by.id(this.ids.delete4ID), this.names.delete),
            deleteLevel3Exact: $(by.id(this.ids.delete5ID), this.names.delete),
            deleteLevel3Partial: $(by.id(this.ids.delete6ID), this.names.delete),
            okButton: $(by.css(`input[value="${this.names.ok}"]`), this.names.ok),
        };
    }

    static get contentIFrame() {
        return $(by.id(this.ids.contentFrame), this.names.contentFrame);
    }

    static get titles() {
       return {
            pageTitle: $(by.css(`${HtmlHelper.tags.span}.${ContentAlertManagerConstant.classes.title}`), this.names.title),
        };
    }

    static getTitleText(title: string) {
        return $(by.cssContainingText(`${HtmlHelper.tags.tr} ${HtmlHelper.tags.td}`, title), title);
    }

    static get languageDropdown() {
        return $(by.css(`${HtmlHelper.tags.select}[name=${this.lanDropdown.language}]`), this.lanDropdown.language);
    }

    static getLanguageOptions(language: string) {
        return $(by.cssContainingText(this.lanDropdown.option, language), language);
    }

    static getTextArea(name: string) {
        return $(by.css(`textarea[name="${name}"]`), name);
    }

    static getTextAreaOptions(area: string, text: string) {
        return $(by.cssContainingText(`select[name="${area}"] option`, text), text);
    }

    static getTextAreaSelect(area: string) {
        return $(by.css(`select[name="${area}"]`), area);
    }

    static duplicateErrorMessage(word: string) {
        return $(by.cssContainingText(tags.span,
            `'${word}' ${ContentAlertManagerConstant.errorMessages.duplicateErrorMessage}`), word);
    }

    static blankErrorMessage() {
        return $(by.cssContainingText(tags.span, ContentAlertManagerConstant.errorMessages.blankErrorMessage),
            ContentAlertManagerConstant.errorMessages.blankErrorMessage);
    }

    static noneDeletedErrorMessage() {
        return $(by.cssContainingText(tags.span, ContentAlertManagerConstant.errorMessages.noneDeletedErrorMessage),
            ContentAlertManagerConstant.errorMessages.noneDeletedErrorMessage);
    }
}
