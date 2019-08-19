import { by } from 'protractor';

import { $ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';

import { ContentAccessLevelManagerConstant } from './content-access-level-manager.contants';

export class ContentAccessLevelManagerPage {
    private static readonly names = ContentAccessLevelManagerConstant.elementNames;
    private static readonly classes = ContentAccessLevelManagerConstant.classes;
    private static readonly ids = ContentAccessLevelManagerConstant.ids;
    private static readonly langDropdown = ContentAccessLevelManagerConstant.languageDropdown;
    private static readonly newAccessLevelDialog = ContentAccessLevelManagerConstant.newAccessLevelDialog;
    private static readonly editLevelDialog = ContentAccessLevelManagerConstant.editLevelDialog;
    private static readonly errorMessages = ContentAccessLevelManagerConstant.errorMessages;

    static get buttons() {
        return {
            addBtn: $(by.id(this.ids.addBtn), this.names.add),
            deleteBtn: $(by.id(this.ids.delBtn), this.names.delete),
            editBtn: $(by.id(this.ids.editBtn), this.names.edit),
            submitBtn: $(by.id(this.ids.submitBtn), this.names.submit),
            cancelBtn: $(by.css(this.newAccessLevelDialog.cancelBtn), this.names.cancel),
        };
    }

    static get titles() {
        return {
             pageTitle: $(by.css(`${HtmlHelper.tags.span}.${this.classes.title}`), this.names.title),
         };
    }

    static get languageDropdown() {
        return $(by.css(`${HtmlHelper.tags.select}[name=${this.langDropdown.language}]`),
            this.langDropdown.language);
    }

    static getLanguageOptions(language: string) {
        return $(by.cssContainingText(this.langDropdown.option, language), language);
    }

    static levels(level: string) {
        return  $(by.cssContainingText(HtmlHelper.tags.a, level), level);
    }

    static getCategorySelected(category: string) {
        return $(by.cssContainingText(`${HtmlHelper.tags.span}.${this.classes.category}`, category), category);
    }

    static get newAccessLevel() {
        return {
            dialog: $(by.id(this.ids.newAccessLevelDialogId), this.newAccessLevelDialog.title),
            input: $(by.css(this.newAccessLevelDialog.input), this.names.input),
            iFrame: $(by.css(`iframe#${this.newAccessLevelDialog.iFrame}`), this.newAccessLevelDialog.iFrame),
        };
    }

    static get deleteWindow() {
        return {
            yesBtn: $(by.css(ContentAccessLevelManagerConstant.deleteWindow.yesBtn), this.names.yes),
            noBtn: $(by.css(ContentAccessLevelManagerConstant.deleteWindow.noBtn), this.names.no),
            dialog: $(by.cssContainingText('div#text', this.errorMessages.deleteLevelMessage),
                this.errorMessages.deleteLevelMessage),
        };
    }

    static blankNameErrorMessage() {
        return $(by.cssContainingText(HtmlHelper.tags.span, this.errorMessages.blankNameErrorMessage),
            this.errorMessages.blankNameErrorMessage);
    }

    static alreadyExistsErrorMessage() {
        return $(by.cssContainingText('span#text', this.errorMessages.alreadyExitsErrorMessage),
            this.errorMessages.alreadyExitsErrorMessage);
    }

    static get editLevel() {
        return {
            dialog: $(by.id(this.editLevelDialog.dialogId), this.editLevelDialog.title),
            input: $(by.css(this.editLevelDialog.input), this.names.input),
            iFrame: $(by.css(`iframe#${this.editLevelDialog.iFrame}`), this.editLevelDialog.iFrame),
        };
    }
}
