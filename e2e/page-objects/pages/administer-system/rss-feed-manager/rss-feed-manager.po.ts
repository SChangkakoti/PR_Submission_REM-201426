import { by } from 'protractor';

import { $ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';

import { RssFeedManagerConstant } from './rss-feed-manager.constants';

export class RssFeedManagerPage {
    private static readonly names = RssFeedManagerConstant.elementNames;
    private static readonly ids = RssFeedManagerConstant.ids;
    private static readonly classes = RssFeedManagerConstant.classes;
    private static readonly tags = HtmlHelper.tags;
    private static readonly attributes = HtmlHelper.attributes;

    static get contentIFrame() {
        return $(by.id(this.ids.contentFrame), this.names.contentFrame);
    }

    static get titles() {
        return {
            pageTitle: $(by.css(`${this.tags.span}.${this.classes.title}`), this.names.title),
        };
    }

    static get buttons() {
        return {
            create: this.getElementByValue(this.names.create, this.names.create, this.tags.input),
            delete: this.getElementByValue(this.names.delete, this.names.delete, this.tags.input),
            copy: this.getElementByValue(this.names.copy, this.names.copy, this.tags.input),
            cancel: this.getElementByValue(this.names.cancel, this.names.cancel, this.tags.input),
            submit: this.getElementByValue(this.names.submit, this.names.submit, this.tags.input),
            yes: this.getElementByValue(this.names.yes, this.names.yes, this.tags.input),
            no: this.getElementByValue(this.names.no, this.names.no, this.tags.input),
            oK: this.getElementByValue(this.names.ok, this.names.ok, this.tags.input),
            add: this.getElementByValue(this.names.add, this.names.add, this.tags.input),
            remove: this.getElementByValue(this.names.remove, this.names.remove, this.tags.input),
        };
    }

    static getElementByValue(value: string, name: string, tag = HtmlHelper.tags.input) {
        return $(by.css(`${tag}[${this.attributes.value}='${value}']`), name);
    }

    static getElementByClassContainText(classValue: string, text: string, tag = HtmlHelper.tags.th) {
        return $(by.cssContainingText(`${tag}.${classValue}`, text), text);
    }

    static get tableDetail() {
        return {
            name: this.getElementByClassContainText(this.classes.tableHeader, this.names.name, this.tags.span),
            description: this.getElementByClassContainText(this.classes.tableHeader, this.names.description, this.tags.span),
            accessLevels: this.getElementByClassContainText(this.classes.tableHeader, this.names.accessLevels, this.tags.th),
            segments: this.getElementByClassContainText(this.classes.tableHeader, this.names.segments, this.tags.th),
            knowledgeSources: this.getElementByClassContainText(this.classes.tableHeader, this.names.knowledgeSources, this.tags.th),
            language: this.getElementByClassContainText(this.classes.tableHeader, this.names.language, this.tags.span),
            text: this.getElementByClassContainText(this.classes.tableHeader, this.names.text, this.tags.th),
        };
    }

    static getRssFeed(feedName: string) {
        return {
            record: $(by.cssContainingText(`${this.tags.div}#${this.ids.contentTable} ${this.tags.tr}`, feedName), feedName),
            recordCheckBox: $(by.xpath(
                `//${this.tags.div}[@${this.attributes.id}='${this.ids.contentTable}']
                //${this.tags.tr}[contains((.),'${feedName}')]
                //${this.tags.input}[@${this.attributes.name}="${this.names.rssFeedId}"]`), feedName),
            recordName: $(by.xpath(`//${this.tags.div}[@${this.attributes.id}='${this.ids.contentTable}']
                //${this.tags.a}[contains((.),'${feedName}')]`), feedName),
        };
    }

    static getElementByName(value: string, name: string, tag = HtmlHelper.tags.input) {
        return $(by.css(`${tag}[${this.attributes.name}="${value}"]`), name);
    }

    static getElementByNameOption(value: string, name: string, tag = HtmlHelper.tags.input) {
        return $(by.xpath(`(//${tag}[@${this.attributes.name}="${value}"]//${this.tags.option})[1]`), name);
    }

    static getElementByTextAndInputByClass(value: string, name: string, tag = HtmlHelper.tags.input) {
        return $(by.xpath(
            `(//${this.tags.div}[@${this.attributes.class}='${this.classes.apteanMiddle}']
            //${this.tags.tr}//${this.tags.tr}[contains((.),"${value}")]
            //${tag}[@${this.attributes.class}='${this.classes.apeanSmallButton}'])[1]`), name);
    }

    static get rssFeedDetail() {
        return {
            dialogIFrame: $(by.css(`#${this.ids.dialogIFrame}`), this.ids.dialogIFrame),
            name: this.getElementByName(this.names.feedName, this.names.name, this.tags.input),
            description: this.getElementByName(this.names.description.toLowerCase(), this.names.description, this.tags.textArea),
            title: this.getElementByName(this.names.title.toLowerCase(), this.names.title, this.tags.input),
            urlRoot: this.getElementByName(this.names.urlType, this.names.urlType, this.tags.select),
            urlRootOption: this.getElementByNameOption(this.names.urlType, this.names.urlType, this.tags.select),
            language: this.getElementByName(this.names.languageId, this.names.language, this.tags.select),
            languageOption: this.getElementByNameOption(this.names.languageId, this.names.language, this.tags.select),
            knowledgeSourcesInput: this.getElementByTextAndInputByClass(this.names.knowledgeSources, this.names.knowledgeSources, this.tags.input),
            knowledgeSourcesSpan: $(by.css(`${this.tags.span}#${this.ids.selectedKS}`), this.names.knowledgeSources),
            accessLevelsInput: this.getElementByTextAndInputByClass(this.names.accessLevels, this.names.accessLevels, this.tags.input),
            accessLevelsSpan: $(by.css(`${this.tags.span}#${this.ids.selectedAL}`), this.names.accessLevels),
            segmentsInput: this.getElementByTextAndInputByClass(this.names.segments, this.names.segments, this.tags.input),
            segmentsSpan: $(by.css(`${this.tags.span}#${this.ids.selectedMetadata}`), this.names.segments),
            availableKnowledgeSource: this.getElementByName(this.names.availableKnowledgeSource, this.names.availableKnowledgeSource, this.tags.select),
            availableKnowledgeSourceOption:
                this.getElementByNameOption(this.names.availableKnowledgeSource, this.names.availableKnowledgeSource, this.tags.select),
            move: $(by.css(`${this.tags.input}#${this.names.moving}`), this.names.moving),
            removing: $(by.css(`${this.tags.input}#${this.names.removing}`), this.names.removing),
            selectedKnowledgeSource: this.getElementByName(this.names.selectedKnowledgeSource, this.names.selectedKnowledgeSource, this.tags.select),
            selectedKnowledgeSourceOption:
                this.getElementByNameOption(this.names.selectedKnowledgeSource, this.names.selectedKnowledgeSource, this.tags.select),
            content: $(by.css(`#${this.ids.content}`), this.ids.content),
            tree: $(by.css(`#${this.ids.tree}`), this.ids.tree),
            salAgent: $(by.css(`${this.tags.div}#${this.ids.salAgent}`), this.ids.salAgent),
            selectedUM: this.getElementByName(this.names.selectedUM, this.names.selectedUM, this.tags.select),
            childOption:
                this.getOptionByValue(this.names.selectedUM, this.ids.salAgentValue, this.ids.salAgentValue),
            parentOption:
                this.getOptionByValue(this.names.selectedUM, this.ids.salPublicvalue, this.ids.salPublicvalue),
            search: this.getElementByValue(this.names.search, this.names.search, this.tags.input),
            browse: this.getElementByValue(this.names.browse, this.names.browse, this.tags.input),
            searchText: this.getElementByName(this.names.searchText, this.names.searchText, this.tags.input),
            selectedNode: $(by.xpath(`(//${this.tags.div}[@${this.attributes.class}="${this.classes.selectedNode}"]//${this.tags.option})[1]`),
                this.classes.selectedNode),
            searchIcon: $(by.css(`${this.tags.a}#${this.ids.searchIcon}`), this.ids.searchIcon),
            searchResultTable: $(by.css(`${this.tags.table}#${this.ids.tableSearchResult}`), this.ids.tableSearchResult),
            searchResult: $(by.css(
                `${this.tags.table}#${this.ids.tableSearchResult}
                ${this.tags.tr}[${this.attributes.class}*='${this.classes.tableDataRow}']`)
                , this.classes.tableDataRow),
            searchIFrame: $(by.css(`#${this.names.search}`), this.names.search),
            searchResultAdd: $(by.css(
                `${this.tags.table}#${this.ids.tableSearchResult}
                ${this.tags.tr}[${this.attributes.class}*='${this.classes.tableDataRow}']
                ${this.tags.a}[${this.attributes.title}='${this.names.add}']`)
                , this.classes.tableDataRow),
            selectedSegmentOption:
                this.getOptionByValue(this.names.selectedUM, this.ids.dtArticle, this.ids.dtArticle),
            selectedPendingSegmentOption:
                this.getOptionByValueContains(this.names.selectedUM, this.ids.pending, this.ids.dtArticle),
        };
    }

    static get uiDialog() {
        return {
            uiDialogTitle: $(by.css(`${this.tags.span}.${RssFeedManagerConstant.classes.uiDialogTitle}`), this.names.uiDialog),
        };
    }

    static getOptionByValue(selectId: string, value: string, name: string) {
        return $(by.css(`${this.tags.select}#${selectId} ${this.tags.option}[${this.attributes.value}="${value}"]`), name);
    }

    static getOptionByValueContains(selectId: string, value: string, name: string) {
        return $(by.css(`${this.tags.select}#${selectId} ${this.tags.option}[${this.attributes.value}*="${value}"]`), name);
    }
}
