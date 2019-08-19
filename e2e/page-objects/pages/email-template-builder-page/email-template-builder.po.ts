import { by } from 'protractor';

import { $, $$ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { xpath } from '../../../components/misc-utils/xpath-builder';

import { EmailTemplateBuilderPageConstant } from './email-template-builder.constants';

const { attributes, tags } = HtmlHelper;
export class EmailTemplateBuilderPage {
    private static readonly names = EmailTemplateBuilderPageConstant.elementNames;
    private static readonly attr = EmailTemplateBuilderPageConstant.attributes;
    private static readonly errors = EmailTemplateBuilderPageConstant.errorMessages;

    private static greetingTableItems(tableName: string, index: number) {
        const greeting = EmailTemplateBuilderPageConstant.greetingText(index);
        return {
            delete: $(xpath(tags.div)
                .contains(attributes.id, this.attr.id.shown)
                .anywhere(attributes.span)
                .text(tableName)
                .parent(tags.td)
                .followingSibling(tags.td)
                .descendant(tags.img)
                .buildByObject(), this.names.delete),
            selectionText: $(by.name(greeting.greetingSelectionText),
                `${this.names.selectionText}~ ${tableName}`),
            insertedText: $(by.name(greeting.greetingInsertedText),
                `${this.names.insertedText}~ ${tableName}`),
            autoInsertThisSelection: $(by.name(greeting.greetingAutoInsert),
                `${this.names.autoInsertThisSelection}~ ${tableName}`),
        };
    }

    private static signatureTableItems(tableName: string, index: number) {
        const signature = EmailTemplateBuilderPageConstant.signatureText(index);
        return {
            delete: $(xpath(tags.div)
                .contains(attributes.id, this.attr.id.shown)
                .anywhere(attributes.span)
                .text(tableName)
                .parent(tags.td)
                .followingSibling(tags.td)
                .descendant(tags.img)
                .buildByObject(), this.names.delete),
            selectionText: $(by.name(signature.signatureSelectionText),
                `${this.names.selectionText}~ ${tableName}`),
            insertedText: $(by.name(signature.signatureInsertedText),
                `${this.names.insertedText}~ ${tableName}`),
            autoInsertThisSelection: $(by.name(signature.signatureAutoInsert),
                `${this.names.autoInsertThisSelection}~ ${tableName}`),
        };
    }

    static get contentIFrame() {
        return $(by.id(this.attr.id.contentFrame), this.names.contentIFrame);
    }

    static get pageTitle() {
        return $(by.cssContainingText(tags.span, this.names.emailTemplateBuilder),
            this.names.emailTemplateBuilder);
    }

    static get subject() {
        return $(by.name(this.attr.name.subject), this.names.subject);
    }

    static get language() {
        return {
            dropDown: $(by.name(this.attr.name.selectedLanguage), this.names.selectedLanguage),
            dropDownOptions: $$(by.css(`[${attributes.name}='${this.attr.name.selectedLanguage}'] ${tags.option}`),
                this.names.languageDropDownOptions),
        };
    }

    static get greetingSelections() {
        const { classes, error, id } = this.attr;
        return {
            new: $(by.id(this.attr.id.newID), this.names.new),
            reorder: $(by.id(this.attr.id.reorderID), this.names.reorder),
            customers: this.greetingTableItems(this.names.customers, 1),
            mr: this.greetingTableItems(this.names.mr, 2),
            ms: this.greetingTableItems(this.names.ms, 3),
            greetingOrderedIds: $(by.name(this.attr.name.greetingOrderedIds),
                this.names.greetingOrderedIds),
            all: $$(by.css(`[id^='${error.greeting.toLowerCase()}'][id$='${id.shown}'] .${classes.apteanBodyBold}`),
                this.names.greetingSelection),
            specificGreeting: (index: number, name?: string) => this.greetingTableItems(name, index),
            specificDelete: (index: number) => $(by.css(`[id$='${index}${this.attr.id.shown}'] img[alt='Delete']`),
                this.names.delete),
        };
    }

    static get signatureSelections() {
        return {
            new: $(xpath(tags.div)
                .textContains(this.names.signatureSelections)
                .descendant(tags.input)
                .where(attributes.value, this.names.new)
                .buildByObject(), this.names.new),
            reorder: $(xpath(tags.div)
                .textContains(this.names.signatureSelections)
                .descendant(tags.input)
                .where(attributes.value, this.names.reorder)
                .buildByObject(), this.names.reorder),
            sincerely: this.signatureTableItems(this.names.sincerely, 4),
            signatureOrderedIds: $(by.name(this.attr.name.signatureOrderedIds),
                this.names.signatureOrderedIds),
            specific: (index: number, name?: string) => this.signatureTableItems(name, index),
        };
    }

    static get save() {
        return $(by.id(this.attr.id.saveID), this.names.save);
    }

    static get reorder() {
        return {
            dialogIFrame: $(by.css(`.${this.attr.classes.uiDialog} #${this.attr.id.dialogIFrame}`),
                this.names.dialogIFrame),
            moveUp: $(by.css(`[${attributes.alt}='${this.names.moveUp}']`), this.names.moveUp),
            moveDown: $(by.css(`[${attributes.alt}='${this.names.moveDown}']`), this.names.moveDown),
            ok: $(by.id(this.attr.id.okID), this.names.ok),
            cancel: $(by.id(this.attr.id.cancelIFrameID), this.names.cancel),
            allItems: $$(by.css(`[${attributes.name}='${this.attr.name.selectItem}'] ${tags.option}`), this.names.dialogIFrame),
            selectItem: (itemName: string) => $(xpath(tags.select)
                .where(attributes.name, this.attr.name.selectItem)
                .descendant(tags.option)
                .text(itemName)
                .buildByObject(), itemName),
        };
    }

    static get errorModal() {
        return {
            signatureSelectionText: $(by.cssContainingText(tags.span,
                this.errors.signatureSelectionText), this.errors.signatureSelectionText),
            signatureInsertedText: $(by.cssContainingText(tags.span,
                this.errors.signatureInsertedText), this.errors.signatureInsertedText),
            greetingSelectionText: $(by.cssContainingText(tags.span,
                this.errors.greetingSelectionText), this.errors.greetingSelectionText),
            greetingInsertedText: $(by.cssContainingText(tags.span,
                this.errors.greetingInsertedText), this.errors.greetingInsertedText),
            ok: $(by.name(this.attr.name.btn1), this.names.ok),
        };
    }

    static get deleteModal() {
        return {
            yes: $(by.name(this.attr.name.btn1), this.names.yes),
            no: $(by.name(this.attr.name.btn2), this.names.no),
        };
    }
}
