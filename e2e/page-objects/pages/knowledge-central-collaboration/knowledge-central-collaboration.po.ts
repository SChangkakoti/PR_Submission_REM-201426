import { by } from 'protractor';

import { $ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';

import { KnowledgeCentralCollaborationConstant } from './knowledge-central-collaboration.constant';

export class KnowledgeCentralCollaborationPage {
    private static tags = HtmlHelper.tags;
    private static title = KnowledgeCentralCollaborationConstant.titles;

    static get titles() {
        return {
            collaboration: $(by.cssContainingText(this.tags.div, this.title.collaboration), this.title.collaboration),
        };
    }

    static get collaborationPageItems() {
        const label = KnowledgeCentralCollaborationConstant.collaborationPageItems;
        return {
            newCollaborationButton: $(by.id('newCollaborationId'), label.newCollaborationButton),
            subject: $(by.xpath(`//th[text()='${label.subject}']`), label.subject),
            originator: $(by.xpath(`//th[text()='${label.originator}']`), label.originator),
            customer: $(by.xpath(`//th[text()='${label.customer}']`), label.customer),
            caseId: $(by.xpath(`//th[text()='${label.caseId}']`), label.caseId),
            lastUpdate: $(by.xpath(`//th[text()='${label.lastUpdate}']`), label.lastUpdate),
            delete: $(by.xpath(`//th[text()='${label.delete}']`), label.delete),
            collaboratorCreatorWindow: $(by.css('.ui-dialog-title'), label.collaboratorCreatorWindow),
            collaborationBlueLink: $(by.css('.aptean-table a'), label.collaboratorCreatorWindow),
            deleteButton: $(by.css(`input[alt='${label.delete}']`), label.delete),
        };
    }

    static get collaboratorCreatorWindowItems() {
        const label = KnowledgeCentralCollaborationConstant.collaboratorCreatorWindowItems;
        return {
            subject: $(by.css(`input[name='${label.subject}']`), label.subject),
            message: $(by.css(`textarea[name='${label.message}']`), label.message),
            urgent: $(by.css(`input[value='${label.urgent}']`), label.urgent),
            normal: $(by.css(`input[value='${label.normal}']`), label.normal),
            addCollaborators: $(by.id('addCollaboratorId'), label.addCollaborators),
            submit: $(by.id('submitID'), label.submit),
            cancel: $(by.id('cancelID'), label.cancel),
        };
    }

    static get dialogIFrame() {
        return $(by.id('dialogIFrame'), KnowledgeCentralCollaborationConstant.dialogIFrame);
    }

    static get findIFrame() {
        return $(by.id('findFrame'), KnowledgeCentralCollaborationConstant.dialogIFrame);
    }

    static get expertFinderItems() {
        const label = KnowledgeCentralCollaborationConstant.expertFinderItems;
        return {
            expertFinderPane: $(by.xpath(`//span[text()='${label.expertFinderPane}']`), label.expertFinderPane),
            suggestedTab: $(by.id('suggested'), label.suggestedTab),
            mostRecentTab: $(by.id('mostrecent'), label.mostRecentTab),
            findTab: $(by.id('find'), label.findTab),
            selectedCollaborators: $(by.id('selectedFrame'), label.selectedCollaborators),
            okButton: $(by.id('submit_button'), label.okButton),
            cancelButton: $(by.id('cancel_button'), label.cancelButton),
        };
    }

    static get findTabItems() {
        const label = KnowledgeCentralCollaborationConstant.findTabItems;
        return {
            firstName: $(by.id('firstname'), label.firstName),
            lastName: $(by.id('lastname'), label.lastName),
            groupName: $(by.id('groupname'), label.lastName),
            search: $(by.css(`.body *[id='${label.search}']`), label.search),
            showAllButton: $(by.css(`.body input[value='${label.showAllButton}']`), label.showAllButton),
            collaboratorsList: $(by.css(`#content-table input[type='${label.checkbox}']`), label.collaboratorsList),
        };
    }

    static errorPopup(error: string) {
        return $(by.xpath(`//span[normalize-space(text())='${error}']`), KnowledgeCentralCollaborationConstant.error);
    }

    static get okOnErrorPopup() {
         return $(by.css(`input[value='${KnowledgeCentralCollaborationConstant.ok}']`), KnowledgeCentralCollaborationConstant.ok);
    }

    static get collaborationBuilderItems() {
        const label = KnowledgeCentralCollaborationConstant.collaborationBuilderItems;
        return {
            subject: $(by.xpath(`//span[contains(text(),'${label.subject}')]`), label.subject),
            collaborators: $(by.xpath(`//span[contains(text(),'${label.collaborators}')]`), label.collaborators),
            originator: $(by.xpath(`//span[contains(text(),'${label.originator}')]`), label.originator),
            message: $(by.css('.skb_query'), label.message),
            postMessage: $(by.id('addMsgBtn'), label.postMessage),
            addCollaborator: $(by.css(`input[value='${label.addCollaborator}']`), label.addCollaborator),
            okButton: $(by.css(`input[value='${label.okButton}']`), label.okButton),
            deleteButton: $(by.css(`input[value='${label.deleteButton}']`), label.deleteButton),
        };
    }

    static addedMessage(message: string) {
        return $(by.xpath(`//pre[text()='${message}']`), KnowledgeCentralCollaborationConstant.addedMessage);
    }

    static deletePopup(message: string) {
        return $(by.xpath(`//div[normalize-space(text())='${message}']`), KnowledgeCentralCollaborationConstant.delete);
    }

    static get noOnDeletePopup() {
        return $(by.css(`input[value='${KnowledgeCentralCollaborationConstant.no}']`), KnowledgeCentralCollaborationConstant.no);
   }

   static get yesOnDeletePopup() {
    return $(by.css(`input[value='${KnowledgeCentralCollaborationConstant.yes}']`), KnowledgeCentralCollaborationConstant.yes);
}
}
