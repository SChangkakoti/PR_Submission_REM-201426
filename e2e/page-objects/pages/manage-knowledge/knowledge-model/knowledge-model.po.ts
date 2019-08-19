import { by } from 'protractor';

import { $ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { xpath } from '../../../../components/misc-utils/xpath-builder';

import { KnowledgeModelConstant } from './knowledge-model.constant';

const tag = HtmlHelper.tags;
const label = KnowledgeModelConstant.labels;
const titles = KnowledgeModelConstant.titles;
const attr = KnowledgeModelConstant.attributes;
const msg = KnowledgeModelConstant.messages;

export class KnowledgeModelPage {

    static get titles() {
        return {
            feedbackMetadataManager: $(by.cssContainingText(HtmlHelper.tags.span, titles.feedbackMetadataManager), titles.feedbackMetadataManager),
        };
    }

    static get feedbackMetadataManager() {
        return {
            category: $(by.id(attr.id.wrapper_CFC_root), label.categories),
            classificationDropdown: $(by.id(attr.id.classification), label.classification),
            name: $(by.id(attr.id.nameLaEngUs), label.name),
            description: $(by.id(attr.id.descLaEngUs), label.description),
            saveButton: $(by.id(attr.id.detailSaveBtn), label.saveButton),
            deleteButton: $(by.id(attr.id.detailDeleteBtn), label.deleteButton),
            cancelButton: $(by.id(attr.id.detailCancelBtn), label.cancelButton),
            selectedCategory: $(by.className(attr.class.selectedNode), label.selectedCategory),
            statuses: $(by.id(attr.id.nameCfsRoot), label.statuses),
            statusesList: $(by.id(attr.id.cfsRoot), label.statusesList),
            languageDropdown: $(by.name(attr.name.language), label.language),
            languageDropdownList: $(xpath(tag.select).where('name', attr.name.language).descendant(tag.option).buildByObject(), label.languagesList),
            createButton: $(by.id(attr.id.createBtn), label.createButton),
            deleteButtonHeaderButton: $(by.id(attr.id.deleteBtn), label.deleteButton),
            languagesLabels: {
                english: $(by.cssContainingText(tag.span, label.languages.english), label.languages.english),
                arabic: $(by.cssContainingText(tag.span, label.languages.arabic), label.languages.arabic),
                catalan: $(by.cssContainingText(tag.span, label.languages.catalan), label.languages.catalan),
                chineseSimplified: $(by.cssContainingText(tag.span, label.languages.chineseSimplified), label.languages.chineseSimplified),
                chineseTraditional: $(by.cssContainingText(tag.span, label.languages.chineseTraditional), label.languages.chineseTraditional),
                croatian: $(by.cssContainingText(tag.span, label.languages.english), label.languages.croatian),
                czech: $(by.cssContainingText(tag.span, label.languages.czech), label.languages.czech),
                danish: $(xpath(tag.span).where('class', attr.class.aptean_body_bold).textContains(label.languages.danish).buildByObject(),
                    label.languages.danish),
                dutch: $(by.cssContainingText(tag.span, label.languages.dutch), label.languages.dutch),
                french: $(by.cssContainingText(tag.span, label.languages.french), label.languages.french),
                german: $(by.cssContainingText(tag.span, label.languages.german), label.languages.german),
            },
            languagesFields: {
                english: $(by.id(attr.id.nameLaEngUs), label.languages.english),
            },
            dataSavedSuccessfullyMessage: $(by.cssContainingText(tag.td, msg.dataSavedSuccessfully), msg.dataSavedSuccessfully),
        };
    }

    static getClassificationOption(name: string) {
        return $(by.cssContainingText(tag.option, name), name);
    }

    static getCategoryByText(text: string) {
        return $(xpath(tag.div)
            .contains('onclick', text.toUpperCase())
            .buildByObject(), text);
    }

    static getStatusByText(text: string) {
        return $(xpath(tag.div)
            .contains('onclick', text.toUpperCase())
            .buildByObject(), text);
    }

    static getStatusTextElementByText(text: string) {
        return $(xpath(tag.div)
            .contains('onclick', text.toUpperCase())
            .descendant(tag.div)
            .buildByObject(), text);
    }
}
