import { by } from 'protractor';

import { Constants } from '../../../../components/misc-utils/constants';
import { $, $$ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { xpath } from '../../../../components/misc-utils/xpath-builder';

import { WorkflowBuilderConstant } from './workflow-builder.constants';
const { attributes, tags } = HtmlHelper;

export class WorkflowBuilderPage {
    private static readonly names = WorkflowBuilderConstant.elementNames;
    private static readonly classes = WorkflowBuilderConstant.classes;
    private static readonly ids = WorkflowBuilderConstant.ids;
    private static readonly attr = WorkflowBuilderConstant.attributes;
    private static readonly windowMessages = WorkflowBuilderConstant.windowMessages;
    private static readonly stateDialog = WorkflowBuilderConstant.workflowStateDialog;
    private static readonly usersDialog = WorkflowBuilderConstant.usersGroupsDialog;

    static get buttons() {
        return {
            newRule: $(by.id(this.ids.newRuleBtn), this.names.newRule),
            cancel: $(by.id(this.ids.cancelBtn), this.names.cancel),
            saveChanges: $(by.id(this.ids.saveBtn), this.names.save),
            reorder: $(by.id(this.ids.reorderBtn), this.names.reorder),
            edit: $(xpath(tags.a)
                .textContains(this.names.edit)
                .first()
                .buildByObject(), this.names.edit),
            newState: $(by.id(this.ids.newStateID), this.names.newState),
        };
    }

    static get titles() {
        return {
            pageTitle: $(by.css(`${HtmlHelper.tags.span}.${this.classes.title}`), this.names.title),
        };
    }

    static get ruleFields() {
        return {
            name: $(by.xpath(`(//span[@id="${this.ids.name}"]//input)[1]`), this.names.name),
            savedName: $(by.xpath(`(//span[@id="${this.ids.name}"])[1]`), this.names.name),
            products: $(by.xpath(`(//span[@id="${this.ids.products}"])[1]`), this.names.products),
            accessLevel: $(by.xpath(`(//span[@id="${this.ids.accessLevel}"])[1]`), this.names.accessLevel),
            locale: $(by.xpath(`(//span[@id="${this.ids.locale}"])[1]`), this.names.locale),
            unifiedTemplate: $(by.xpath(`(//span[@id="${this.ids.unifiedTemplate}"])[1]`), this.names.unifiedTemplate),
            event: $(by.xpath(`(//span[@id="${this.ids.event}"])[1]`), this.names.event),
            documentLifecycle: $(by.xpath(`(//span[@id="${this.ids.documentLifecycle}"])[1]`), this.names.documentLifecycle),
            nextState: $(by.xpath(`(//span[@id="${this.ids.nextState}"])[1]`), this.names.nextState),
            nextStateSelect: $(by.css(`span#${this.ids.nextState} select`), this.names.nextState),
            eventSelect: $(by.css(`span#${this.ids.event} select`), this.names.nextState),
            deleteRule: $(by.xpath(`(//img[@alt="${this.names.delete}"])[1]`), this.names.delete),
            all: $$(by.css(`span#${this.ids.name}`), this.names.name),
            deleteRuleAll: $$(by.css(`img[alt="${this.names.delete}"]`), this.names.delete),
        };
    }

    static get workflowStates() {
        return {
            author: $(by.css(`${HtmlHelper.tags.a}#${this.ids.author}`), this.ids.author),
            suggestion: $(by.css(`${HtmlHelper.tags.a}#${this.ids.suggestion}`), this.ids.suggestion),
            state: $(by.id(this.ids.workflowState), this.names.state),
            selectedState: (name: string) => $(by.cssContainingText(tags.b, name), name),
            selectState: (name: string) => $(by.cssContainingText(tags.a, name), name),
        };
    }

    static getNextStateOption(state: string) {
        return $(by.cssContainingText(`span#${this.ids.nextState} select option`, state), state);
    }

    static getEventOption(event: string) {
        return $(by.cssContainingText(`span#${this.ids.event} select option`, event), event);
    }

    static getRuleByName(rule: string) {
        return $(by.cssContainingText(`span#${this.ids.name}`, rule), rule);
    }

    static get saveChangesWindow() {
        return {
            noBtn: $(by.css(`input[value="${this.names.no}"]`), this.names.no),
        };
    }

    static rowNameNotUniqueMessage() {
        return $(by.cssContainingText(HtmlHelper.tags.span, this.windowMessages.rowNameNotUnique),
            this.windowMessages.rowNameNotUnique);
    }

    static get atLeastTwoRulesMessage() {
        return {
            okBtn: $(by.css(WorkflowBuilderConstant.atLeastTwoRulesWindow.okBtn), this.names.ok),
            dialog: $(by.cssContainingText(HtmlHelper.tags.span, this.windowMessages.atLeastTwoRules),
                this.windowMessages.atLeastTwoRules),
        };
    }

    static get deleteStateWindow() {
        return {
            noBtn: $(by.css(`input[value="${this.names.no}"]`), this.names.no),
            yesBtn: $(by.css(`input[value="${this.names.yes}"]`), this.names.yes),
            dialog: $(by.cssContainingText(HtmlHelper.tags.div, this.windowMessages.deleteState),
                this.windowMessages.deleteState),
        };
    }

    static get reorder() {
        return {
            dialogIFrame: $(by.css(`#${this.ids.overlayDialog} #${this.ids.dialogIFrame}`),
                this.ids.dialogIFrame),
            moveUp: $(by.css(`[${attributes.alt}='${this.attr.moveUp}']`), this.attr.moveUp),
            moveDown: $(by.css(`[${attributes.alt}='${this.attr.moveDown}']`), this.attr.moveDown),
            ok: $(by.id(this.ids.okID), this.names.ok),
            cancel: $(by.id(this.ids.cancelIFrameID), this.names.cancel),
            allItems: $$(by.css(`#${this.ids.reorderList} ${tags.option}`), this.ids.dialogIFrame),
            selectItem: (itemName: string) => $(xpath(tags.select)
                .where(attributes.id, this.ids.reorderList)
                .descendant(tags.option)
                .text(itemName)
                .buildByObject(), itemName),
        };
    }

    static get worflowState() {
        return {
            dialog: $(by.id(this.stateDialog.dialogId), this.stateDialog.title),
            inputName: $(by.css(this.stateDialog.inputName), this.names.name),
            dialogIFrame: $(by.css(`#${this.ids.dialogIFrame}`), this.ids.dialogIFrame),
            selectBtn: $(by.id(this.stateDialog.selectID), this.names.select),
            selectedUsersGroups: $(by.id(this.stateDialog.displayRecipients), this.usersDialog.user),
            timeLimit: $(by.css(`input[name=${this.stateDialog.timeLimit}]`), this.stateDialog.timeLimit),
            submitBtn: $(by.id(this.stateDialog.saveChangesId), this.names.save),
        };
    }

    static get usersGroups() {
        return {
            dialogIFrame: $(by.css(`#${this.ids.overlayDialog} #${this.ids.dialogIFrame}`),
                this.ids.dialogIFrame),
            ok: $(by.id(this.usersDialog.okId), this.names.ok),
            showAllBtn: $(by.id(this.usersDialog.showAllBtn), this.names.showAll),
            findUsersFrame: $(by.id(this.usersDialog.findUsersFrame), this.usersDialog.findUsersFrame),
            findGroupsFrame: $(by.id(this.usersDialog.findGroupsFrame), this.usersDialog.findGroupsFrame),
            selectItem: $(xpath(tags.input)
                .where(attributes.name, this.usersDialog.selectItems)
                .first()
                .buildByObject(), this.usersDialog.user),
            userName: $(xpath(tags.a)
                .where(attributes.class, this.usersDialog.itemClass)
                .first()
                .buildByObject(), this.usersDialog.user),
            groupNameSearched: $(xpath(tags.div)
                .where(attributes.class, this.usersDialog.itemClass)
                .first()
                .buildByObject(), this.usersDialog.user),
            selectedFrame: $(by.id(this.usersDialog.selectedFrame), this.usersDialog.selectedFrame),
            selectedItem: $(by.css(`${tags.div}.${this.usersDialog.itemClass}`), this.names.selectedItem),
            allSelectedItems: $$(by.css(`${tags.div}.${this.usersDialog.itemClass}`), this.names.selectedItem),
            searchList: $(by.css(`${tags.table}`), this.names.list),
            firstName: $(by.id(this.usersDialog.firstName), this.names.firstName),
            searchBtn: $(by.id(this.usersDialog.searchBtn), this.names.search),
            showAllGroupsBtn: $(xpath(tags.input)
                .where(attributes.value, this.usersDialog.showAllGroupsBtn)
                .nthChild(Constants.number.two)
                .buildByObject(), this.usersDialog.user),
            searchGroupBtn: $(xpath(tags.input)
                .where(attributes.id, this.usersDialog.searchBtn)
                .nthChild(Constants.number.two)
                .buildByObject(), this.names.search),
            groupName: $(by.id(this.usersDialog.groupName), this.names.groupName),
        };
    }
}
