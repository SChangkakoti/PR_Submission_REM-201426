export class WorkflowBuilderConstant {

    static get elementNames() {
        return {
            title: 'Title',
            add: 'Add',
            save: 'Save',
            delete: 'Delete',
            ok: 'OK',
            edit: 'Edit',
            input: 'Input',
            yes: 'Yes',
            cancel: 'Cancel',
            no: 'No',
            newRule: 'New Rule',
            name: 'Name',
            products: 'Products',
            accessLevel: 'Access Level',
            locale: 'Locale',
            unifiedTemplate: 'Unified Template',
            event: 'Event',
            documentLifecycle: 'Document Life Cycle',
            nextState: 'Next State',
            state: 'State',
            reorder: 'Reorder',
            selectItem: 'selectItem',
            newState: 'New State',
            select: 'Select',
            showAll: 'Show All',
            selectedItem: 'selected item',
            list: 'List',
            firstName: 'first name',
            groupName: 'group name',
            search: 'Search',
        };
    }

    static get classes() {
        return {
            title: 'pop_hd_text',
        };
    }

    static get ids() {
        return {
            newRuleBtn: 'newRule',
            cancelBtn: 'cancelWindowID',
            saveBtn: 'saveChanges',
            name: 'NameColumn',
            reorderBtn: 'reorderRow',
            products: 'SG_SupportGoalsTaxonomy',
            accessLevel: 'SAL_SearchAccessLevelTaxonomy',
            locale: 'LA_LocaleTaxonomy',
            unifiedTemplate: 'Authoring.templatesAttributeToken',
            event: 'AWE_AuthoringWorkflowEventsTaxonomy',
            documentLifecycle: 'UMAS_ArchiveStateTaxonomy',
            nextState: 'OutputColumn',
            author: 'Author',
            workflowState: 'EditState',
            iFrameTree: 'tree',
            suggestion: 'Suggestion',
            overlayDialog: 'overlay-dialog',
            dialogIFrame: 'dialogIFrame',
            okID: 'okID',
            cancelIFrameID: 'cancelIFrameID',
            reorderList: 'reorder_list',
            newStateID: 'newStateID',
        };
    }

    static get attributes() {
        return {
            moveUp: 'Move Up',
            moveDown: 'Move Down',
        };
    }

    static get titles() {
        return {
            pageTitle: 'Authoring Workflow Builder',
        };
    }

    static get labels() {
        return {
            test: 'Test',
            all: '*',
        };
    }

    static get nextState() {
        return {
            author: 'Author',
            archiveReview: 'Archive Review',
        };
    }

    static get event() {
        return {
            otherChange: 'Other Change',
        };
    }

    static get workflowStates() {
        return {
            author: 'Author',
            suggestion: 'Suggestion',
        };
    }

    static get windowMessages() {
        return {
            rowNameNotUnique: 'is not unique',
            atLeastTwoRules: 'At least two editable rules are required to perform rule reordering',
            deleteState: 'Would you like to delete the following workflow state(s) which are no longer referenced by any workflow rules',
        };
    }

    static get atLeastTwoRulesWindow() {
        return {
            okBtn: 'input[value="OK"]',
        };
    }

    static get workflowStateDialog() {
        return {
            title: 'Authoring Workflow State',
            dialogId: 'ui-id-1',
            inputName: 'input.skb_query',
            selectID: 'showUOGDialogID',
            displayRecipients: 'display_recipients',
            timeLimit: 'timeLimit',
            saveChangesId: 'saveChangesID',
        };
    }

    static get usersGroupsDialog() {
        return {
            okId: 'submitBtn',
            showAllBtn: 'showAllBtn',
            findUsersFrame: 'findUsersFrame',
            findGroupsFrame: 'findGroupsFrame',
            selectItems: 'selectItems',
            user: 'User',
            itemClass: 'aptean_body',
            selectedFrame: 'selectedFrame',
            firstName: 'firstname',
            groupName: 'groupname',
            searchBtn: 'Image2',
            showAllGroupsBtn: 'Show All',
        };
    }
}
