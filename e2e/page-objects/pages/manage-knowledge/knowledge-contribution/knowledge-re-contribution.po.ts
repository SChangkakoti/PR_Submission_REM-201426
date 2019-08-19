import { by } from 'protractor';

import { $ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { xpath } from '../../../../components/misc-utils/xpath-builder';

import { KnowledgeReContributionConstant } from './knowledge-re-contribution.constants';

export class KnowledgeReContributionPage {
    private static readonly names = KnowledgeReContributionConstant.elementNames;
    private static readonly ids = KnowledgeReContributionConstant.ids;
    private static readonly tags = HtmlHelper.tags;
    private static readonly attributes = HtmlHelper.attributes;
    private static readonly title = KnowledgeReContributionConstant.titles;
    private static readonly class = KnowledgeReContributionConstant.classes;

    static get buttons() {
        return {
            generateBatFile: $(by.id(this.ids.generateBatFile), this.names.generateBatFile),
            start: $(by.id(this.ids.start), this.names.start),
            alertOK: $(by.css(`${this.tags.input}[${this.attributes.value}="${this.names.ok}"]`), this.names.ok),
            cancel: $(by.css(`${this.tags.input}[${this.attributes.value}="${this.names.cancel}"]`), this.names.cancel),
            submit: $(by.css(`${this.tags.input}[${this.attributes.value}="${this.names.submit}"]`), this.names.submit),
            yes: $(by.css(`${this.tags.input}[${this.attributes.value}="${this.names.yes}"]`), this.names.yes),
            no: $(by.css(`${this.tags.input}[${this.attributes.value}="${this.names.no}"]`), this.names.no),
            viewDetails: $(by.css(`${this.tags.input}[${this.attributes.value}="${this.names.viewDetails}"]`), this.names.viewDetails),
            stop: $(by.css(`${HtmlHelper.tags.input}[${HtmlHelper.attributes.value}="${this.names.stop}"]`), this.names.stop),
            viewList: $(by.css(`${this.tags.input}[value="${this.names.viewList}"]`), this.names.viewList),
            okButtonFromContributionFailedDialog: $(by.id(this.ids.cancelIFrameID), this.names.ok),
        };
    }

    static get contributeAuthoredDocuments() {
        return {
            checkBox: $(by.id(this.ids.contributeAuthoredDocuments), this.names.contributeAuthoredDocuments),
            fromInput: $(by.id(this.ids.fromID), this.names.from),
            toInput: $(by.id(this.ids.toID), this.names.to),
        };
    }

    static get publicationStatus() {
        return {
            dropDown: $(by.id(this.ids.publicationStatuses), this.names.publicationStatuses),
            draft: $(by.cssContainingText(`#${this.ids.publicationStatuses} ${this.tags.option}`, this.names.draft), this.names.draft),
            published: $(by.cssContainingText(`#${this.ids.publicationStatuses} ${this.tags.option}`, this.names.published), this.names.published),
        };
    }

    static get templates() {
        return {
            firstTemplates: $(by.xpath(
                `(//${this.tags.select}[@${this.attributes.id}='${this.ids.templates}']//${this.tags.option})[1]`), this.names.templates),
            templatesList: $(by.css(`#${this.ids.templates}`), this.names.templates),
        };
    }

    static get styleSheets() {
        return {
            firstStyleSheets: $(by.xpath(
                `(//${this.tags.select}[@${this.attributes.id}='${this.ids.styleSheets}']//${this.tags.option})[1]`), this.names.styleSheets),
            styleSheetList: $(by.css(`#${this.ids.styleSheets}`), this.names.styleSheets),
        };
    }

    static get selectUser() {
        return {
            button: $(by.id(`${this.ids.selectUser}`), this.names.selectUsers),
            dialogIFrame: $(by.css(`#${this.ids.dialogIFrame}`), this.ids.dialogIFrame),
            firstname: $(by.css(`#${this.ids.firstname}`), this.ids.firstname),
            lastname: $(by.css(`#${this.ids.lastname}`), this.ids.lastname),
            showAllBtn: $(by.css(`#${this.ids.showAllBtn}`), this.ids.showAllBtn),
            search: $(by.css(`#${this.ids.search}`), this.ids.search),
            username: $(by.css(`#${this.ids.username}`), this.ids.username),
            findUserFrame: $(by.css(`#${this.ids.findUsersFrame}`), this.ids.findUsersFrame),
            userList: $(by.xpath(`(//${this.tags.a}[@${this.attributes.class}='${this.ids.apteanBody}'])[1]`), this.ids.apteanBody),
            noUserMessage: $(by.cssContainingText(`${this.tags.td}.${this.ids.apteanBody}`, this.names.noUserFound), this.names.noUserFound),
            userCheckBox: $(by.xpath(`(//${this.tags.input}[@${this.attributes.name}='${this.ids.selectItems}'])[1]`), this.ids.selectItems),
            selectedFrame: $(by.css(`#${this.ids.selectedFrame}`), this.ids.selectedFrame),
            selectedUserList: $(by.xpath(`(//${this.tags.div}[@${this.attributes.class}='${this.ids.apteanBody}'])[1]`), this.names.selectedUserList),
            selectedUser: $(by.css(`${this.tags.span}#${this.ids.selectedUser}`), this.ids.selectedUser),
            removeSelectedUser: $(by.xpath(`(//${this.tags.a}[contains(@${this.attributes.href},"${this.names.removeUser}")])[1]`), this.names.removeUser),
        };
    }

    static get contentIFrame() {
        return $(by.id(this.ids.contentFrame), this.names.contentFrame);
    }

    static get titles() {
        return {
            pageTitle: $(by.css(`${this.tags.span}.${KnowledgeReContributionConstant.classes.title}`),
                this.names.title),
            cotributionFailedList: $(
                by.cssContainingText(
                    `${this.tags.div}.${this.class.uiDialogTitleBar} ${this.tags.span}.${this.class.uiDialogTitle}`,
                    this.title.contributionFailedList),
                this.title.contributionFailedList),
        };
    }

    static get uiDialog() {
        return {
            window: $(by.css(`${this.tags.div}.${KnowledgeReContributionConstant.classes.uiDialog}`), this.names.uiDialog),
            fileNameTextBox: $(by.css(`${this.tags.input}#${this.ids.fileName}`), this.ids.fileName),
            uiDialogTitle: $(by.css(`${this.tags.span}.${KnowledgeReContributionConstant.classes.uiDialogTitle}`), this.names.uiDialog),
        };
    }

    static get contributionProgressMonitor() {
        return {
            contribution: $(by.css(`${this.tags.div}#${this.ids.apteantabs} ${this.tags.li}#${this.ids.contribution}`), this.names.contribution),
            queued: $(by.css(`${this.tags.div}#${this.ids.apteantabs} ${this.tags.li}#${this.ids.queued}`), this.names.queued),
            previousRuns: $(by.css(`${this.tags.div}#${this.ids.apteantabs} ${this.tags.li}#${this.ids.previousRuns}`), this.names.previousRuns),
            updatedLabel: $(by.cssContainingText(`${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.updated), this.names.updated),
            statusLabel: $(by.cssContainingText(`${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.status), this.names.status),
            totalQueuedLabel: $(by.cssContainingText(
                `${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.totalQueued), this.names.totalQueued),
            queuedLabel: $(by.cssContainingText(
                `${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.queued), this.names.queued),
            totalProcessedLabel: $(by.cssContainingText(
                `${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.totalProcessed), this.names.totalProcessed),
            itemsProcessedLabel: $(by.cssContainingText(
                `${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.itemsProcessed), this.names.itemsProcessed),
            sucessfulLabel: $(by.cssContainingText(`${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.sucessful), this.names.sucessful),
            failedLabel: $(by.cssContainingText(`${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.failed), this.names.failed),
            processingLabel: $(by.cssContainingText(`${this.tags.div}.${this.ids.apeanMiddle} ${this.tags.td}`, this.names.processing), this.names.processing),
        };
    }

    static get knowledgeContributionElements() {
        return {
            contributeFailedItemsCheckbox: $(by.id(this.ids.contributeFailedItems),
                this.names.contributeFailedItems),
        };
    }

    static get messages() {
        return {
            areYouSureYouWantToPerformSelectedTasks: $(by.cssContainingText(this.tags.div,
                KnowledgeReContributionConstant.messages.areYouSureYouWantToPerformSelectedTasks),
                KnowledgeReContributionConstant.messages.areYouSureYouWantToPerformSelectedTasks),
            areYouSureYouWantToStopTheCurrentProcess: $(by.cssContainingText(this.tags.div,
                KnowledgeReContributionConstant.messages.areYouSureYouWantToStopTheCurrentProcess),
                KnowledgeReContributionConstant.messages.areYouSureYouWantToStopTheCurrentProcess),
            areYouSureYouWantToStopContributingTheCurrentBatch: $(xpath(this.tags.div)
                .textContains(KnowledgeReContributionConstant
                    .messages
                    .areYouSureYouWantToStopContributingTheCurrentBatch)
                .buildByObject(),
                KnowledgeReContributionConstant.messages.areYouSureYouWantToStopContributingTheCurrentBatch),
        };
    }
}
