import { by } from 'protractor';

import { Constants } from '../../../../components/misc-utils/constants';
import { $, $$ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { xpath } from '../../../../components/misc-utils/xpath-builder';

import { CommunitiesManagerConstant } from './communities-manager.constants';

const { attributes, tags } = HtmlHelper;

export class CommunitiesManagerPage {
    private static readonly names = CommunitiesManagerConstant.elementNames;
    private static readonly classes = CommunitiesManagerConstant.classes;
    private static readonly ids = CommunitiesManagerConstant.ids;
    private static readonly commDialog = CommunitiesManagerConstant.communityDialog;
    private static readonly lanDropdown = CommunitiesManagerConstant.languageDropdown;
    private static readonly windowMessages = CommunitiesManagerConstant.windowMessages;
    private static readonly collaborationDialog = CommunitiesManagerConstant.collaborationWorkflowDialog;
    private static readonly usersDialog = CommunitiesManagerConstant.usersGroupsDialog;

    static get buttons() {
        return {
            subcategory: $(by.id(this.ids.subcategoryId), this.names.subcategory),
            createForum: $(by.id(this.ids.createForumId), this.names.createForum),
            privateCommunity: $(by.id(this.ids.privateCommunityId), this.names.privateCommunity),
            rename: $(by.id(this.ids.renameId), this.names.rename),
            delete: $(by.id(this.ids.deleteId), this.names.delete),
            editProperties: $(by.id(this.ids.editForum1Id), this.names.editProperties),
            editVisibility: $(by.id(this.ids.editforum2Id), this.names.editVisibility),
            editHomeOptions: $(by.id(this.ids.openForumId), this.names.editHomePageOptions),
        };
    }

    static get titles() {
        return {
            pageTitle: $(by.css(`${tags.span}.${this.classes.title}`), this.names.title),
            bottomTitle: (name: string) => $(
                by.cssContainingText(
                    `${tags.div}.${this.classes.bottomDiv} ${tags.td}.${this.classes.bottomTitle}`,
                    name
                ),
                name
            ),
        };
    }

    static get languageDropdown() {
        return $(by.css(`${tags.select}[name=${this.lanDropdown.language}]`), this.lanDropdown.language);
    }

    static getLanguageOptions(language: string) {
        return $(by.cssContainingText(this.lanDropdown.option, language), language);
    }

    static get communitiesList() {
        return {
            title: $(by.css(`${tags.td}.${this.classes.titles}`), this.names.communityHierarchy),
            communities: $(by.css(`${tags.span}#${this.ids.forumTree}`), this.names.communities),
            community: (name: string) => $(by.cssContainingText(tags.a, name), name),
            selectedCommunity: (name: string) => $(by.cssContainingText(tags.b, name), name),
            communityVisibility: (name: string) => $(by.cssContainingText(tags.b, name), name).item.element(by.xpath('following-sibling::#text')),
        };
    }

    static get communityDialog() {
        return {
            dialog: $(by.css(`${tags.div}#${this.ids.dialog}`), this.names.createCommunity),
            dialogIFrame: $(by.id(this.commDialog.dialogIFrame), this.commDialog.dialogIFrame),
            nameInput: $(by.css(`input[name="${this.names.name}"]`), this.names.name),
            description: $(by.css(`textarea[name="${this.commDialog.desc}"]`), this.names.description),
            selectBtn: $(by.id(this.commDialog.moderatorId), this.names.moderator),
            moderatorIFrame: $(by.css(`#${this.commDialog.moderatorIFrame}`), this.commDialog.moderatorIFrame),
            moderatorTable: $(by.id(this.commDialog.moderatorTable), this.names.moderator),
            selectModerator: $(xpath(tags.input)
                .where(attributes.name, this.commDialog.radioButton)
                .first()
                .buildByObject(), this.names.moderator),
            moderatorName: $(xpath(tags.td)
                .descendant(tags.a)
                .first()
                .buildByObject(), this.names.moderator),
            ok: $(by.id(this.ids.okId), this.names.ok),
            selectedModerator: $(by.id(this.commDialog.supervisorOwner), this.names.moderator),
            submitBtn: $(by.id(this.commDialog.submitId), this.names.submit),
            templateInput: $(by.css(`input[name="${this.commDialog.template}"]`), this.commDialog.template),
            managedCollaboration: $(by.id(this.commDialog.workflow), this.commDialog.managedCollaboration),
            cancelBtn: $(by.id(this.commDialog.cancelId), this.names.cancel),
            editCollaboration: $(by.css(tags.a), this.commDialog.editCollaborationProcess),
        };
    }

    static get subcategoryDialog() {
        return {
            dialog: $(by.css(`${tags.div}#${this.ids.dialog}`), this.names.createCommunity),
            dialogIFrame: $(by.id(this.commDialog.dialogIFrame), this.commDialog.dialogIFrame),
            nameInput: $(by.css(`input[name="${this.names.name}"]`), this.names.name),
            description: $(by.css(`textarea[name="${this.commDialog.description}"]`), this.names.description),
            submitBtn: $(by.id(this.commDialog.submitId), this.names.submit),
            subcategory: (name: string) => $(by.cssContainingText(tags.a, name), name),
            selectedSubcategory: (name: string) => $(by.cssContainingText(tags.b, name), name),
            cancelBtn: $(by.id(this.commDialog.cancelId), this.names.cancel),
        };
    }

    static get communityNameRequired() {
        return {
            okBtn: $(by.css(`input[value="${this.names.ok}"]`), this.names.ok),
            dialog: $(by.cssContainingText(HtmlHelper.tags.span, this.windowMessages.communityNameRequired),
                this.windowMessages.communityNameRequired),
        };
    }

    static get deleteCommunity() {
        return {
            yesBtn: $(by.css(`input[value="${this.names.yes}"]`), this.names.yes),
            noBtn: $(by.css(`input[value="${this.names.no}"]`), this.names.no),
            dialog: $(by.cssContainingText(HtmlHelper.tags.div, this.windowMessages.deleteCommunity),
                this.windowMessages.deleteCommunity),
        };
    }

    static get selectModerator() {
        return {
            okBtn: $(by.css(`input[value="${this.names.ok}"]`), this.names.ok),
            dialog: $(by.cssContainingText(HtmlHelper.tags.span, this.windowMessages.selectModerator),
                this.windowMessages.selectModerator),
        };
    }

    static get subcategoryName() {
        return {
            okBtn: $(by.css(`input[value="${this.names.ok}"]`), this.names.ok),
            dialog: $(by.cssContainingText(HtmlHelper.tags.span, this.windowMessages.enterSubcategoryName),
                this.windowMessages.enterSubcategoryName),
        };
    }

    static get communityVisibilityDialog() {
        return {
            dialog: $(by.css(`${tags.div}#${this.ids.dialog}`), this.names.createCommunity),
            dialogIFrame: $(by.id(this.commDialog.dialogIFrame), this.commDialog.dialogIFrame),
            submitBtn: $(by.id(this.commDialog.submitId), this.names.submit),
            cancelBtn: $(by.id(this.commDialog.cancelId), this.names.cancel),
            visibilityDropdown: $(by.css(`${tags.td} ${tags.select}`), this.names.visibility),
            visibilityOption: (name: string) => $(
                by.cssContainingText(CommunitiesManagerConstant.visibilityDropdown.option, name), name),
        };
    }

    static get homePageDialog() {
        return {
            dialog: $(by.css(`${tags.div}#${this.ids.dialog}`), this.names.createCommunity),
            dialogIFrame: $(by.id(this.commDialog.dialogIFrame), this.commDialog.dialogIFrame),
            submitBtn: $(by.id(this.commDialog.submitId), this.names.submit),
            cancelBtn: $(by.id(this.commDialog.cancelId), this.names.cancel),
            templateBtn: $(by.css(`input[value="${this.ids.selectedT}"]`), this.commDialog.template),
            templateInput: $(by.css(`input[name="${this.ids.templateName}"]`), this.commDialog.template),
            defaultBtn: $(by.css(`input[value="${this.ids.defaultT}"]`), this.commDialog.default),
        };
    }

    static get deleteCategory() {
        return {
            yesBtn: $(by.css(`input[value="${this.names.yes}"]`), this.names.yes),
            noBtn: $(by.css(`input[value="${this.names.no}"]`), this.names.no),
            dialog: $(by.cssContainingText(HtmlHelper.tags.div, this.windowMessages.deleteCategory),
                this.windowMessages.deleteCategory),
        };
    }

    static get collaborationWorkflowDialog() {
        return {
            dialog: $(by.css(`${tags.div}#${this.ids.dialog}`), this.names.createCommunity),
            dialogIFrame: $(by.id(this.collaborationDialog.dialogIFrame), this.commDialog.dialogIFrame),
            saveBtn: $(by.id(this.collaborationDialog.saveId), this.names.save),
            cancelBtn: $(by.id(this.collaborationDialog.cancelId), this.names.cancel),
            addAction: $(by.id(this.collaborationDialog.addStateId), this.names.addAction),
            actionTwo: $(by.cssContainingText(tags.span, this.names.actionTwo), this.names.actionTwo),
            actionType: $(by.css(`${tags.select}[name=${this.collaborationDialog.select1}]`), this.collaborationDialog.selectType),
            actionTypeOption: (name: string) => $(
                by.cssContainingText(this.collaborationDialog.typeOption, name), name),
        };
    }

    static get privateCommunityDialog() {
        return {
            dialog: $(by.css(`${tags.div}#${this.ids.dialog}`), this.names.createCommunity),
            dialogIFrame: $(by.id(this.commDialog.dialogIFrame), this.commDialog.dialogIFrame),
            nameInput: $(by.css(`input[name="${this.names.name}"]`), this.names.name),
            description: $(by.css(`textarea[name="${this.commDialog.desc}"]`), this.names.description),
            selectBtn: $(by.id(this.commDialog.moderatorId), this.names.moderator),
            moderatorIFrame: $(by.css(`#${this.commDialog.moderatorIFrame}`), this.commDialog.moderatorIFrame),
            moderatorTable: $(by.id(this.commDialog.moderatorTable), this.names.moderator),
            selectModerator: $(xpath(tags.input)
                .where(attributes.name, this.commDialog.radioButton)
                .first()
                .buildByObject(), this.names.moderator),
            moderatorName: $(xpath(tags.td)
                .descendant(tags.a)
                .first()
                .buildByObject(), this.names.moderator),
            ok: $(by.id(this.ids.okId), this.names.ok),
            selectedModerator: $(by.id(this.commDialog.supervisorOwner), this.names.moderator),
            submitBtn: $(by.id(this.commDialog.submitId), this.names.submit),
            templateInput: $(by.css(`input[name="${this.commDialog.template}"]`), this.commDialog.template),
            cancelBtn: $(by.id(this.commDialog.cancelId), this.names.cancel),
            addUser: $(by.cssContainingText(tags.a, this.commDialog.addUsers), this.commDialog.addUsers),
            viewEditUsers: $(by.cssContainingText(tags.a, this.commDialog.viewEditUsers), this.commDialog.viewEditUsers),
            memberCountFrame: $(by.id(this.commDialog.memberCountFrame), this.commDialog.memberCountFrame),
            memberCount: $(by.cssContainingText(tags.span, Constants.stringNumber.zero), this.commDialog.memberCount),
        };
    }

    static get communityNameAlreadyExists() {
        return {
            okBtn: $(by.css(`input[value="${this.names.ok}"]`), this.names.ok),
            dialog: $(by.cssContainingText(HtmlHelper.tags.span, this.windowMessages.nameAlreadyExists),
                this.windowMessages.nameAlreadyExists),
        };
    }

    static get usersGroups() {
        return {
            dialogIFrame: $(by.css(`#${this.commDialog.dialogIFrame}`), this.commDialog.dialogIFrame),
            ok: $(by.id(this.usersDialog.okId), this.names.ok),
            showAllBtn: $(by.id(this.usersDialog.showAllBtn), this.names.showAll),
            findUsersFrame: $(by.id(this.usersDialog.findUsersFrame), this.usersDialog.findUsersFrame),
            findGroupsFrame: $(by.id(this.usersDialog.findGroupsFrame), this.usersDialog.findGroupsFrame),
            selectedFrame: $(by.id(this.usersDialog.selectedFrame), this.usersDialog.selectedFrame),
            selectItem: $(xpath(tags.input)
                .where(attributes.name, this.usersDialog.selectItems)
                .first()
                .buildByObject(), this.usersDialog.user),
            userName: $(xpath(tags.a)
                .where(attributes.class, this.usersDialog.itemClass)
                .first()
                .buildByObject(), this.usersDialog.user),
            searchList: $(by.css(`${tags.table}`), this.names.list),
            allSelectedItems: $$(by.css(`${tags.div}.${this.usersDialog.itemClass}`), this.names.selectedItem),
            showAllGroupsBtn: $(xpath(tags.input)
                .where(attributes.value, this.usersDialog.showAllGroupsBtn)
                .nthChild(Constants.number.two)
                .buildByObject(), this.usersDialog.user),
            groupNameSearched: $(xpath(tags.div)
                .where(attributes.class, this.usersDialog.itemClass)
                .first()
                .buildByObject(), this.usersDialog.user),
            groupName: $(by.id(this.usersDialog.groupName), this.names.groupName),
            selectLastItem: $(xpath(tags.input)
                .where(attributes.name, this.usersDialog.selectItems)
                .last()
                .buildByObject(), this.usersDialog.user),
            deleteMember: $(xpath(tags.td)
                .descendant(tags.a)
                .first()
                .buildByObject(), this.usersDialog.user),
        };
    }
}
