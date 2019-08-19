export class CommunitiesManagerConstant {

    static get titles() {
        return {
            pageTitle: 'Community Manager',
        };
    }

    static get elementNames() {
        return {
            title: 'Title',
            privateCommunity: 'Private Community',
            createForum: 'Create Forum',
            subcategory: 'Subcategory',
            communities: 'Communities',
            communityHierarchy: 'Community Hierarchy',
            createCommunity: 'Create Community',
            name: 'name',
            description: 'description',
            moderator: 'moderator',
            ok: 'OK',
            submit: 'Submit',
            rename: 'Rename',
            delete: 'Delete',
            yes: 'Yes',
            no: 'No',
            editProperties: 'Edit Properties',
            editVisibility: 'Edit Visibility',
            editHomePageOptions: 'Edit Home Page Options',
            visibility: 'Visibility',
            cancel: 'Cancel',
            addAction: 'Add Action',
            action: 'Action',
            save: 'Save',
            actionTwo: 'Action 2:',
            showAll: 'Show All',
            list: 'List',
            selectedItem: 'Selected item',
            groupName: 'group name',
        };
    }

    static get classes() {
        return {
            title: 'aptean_pop_hd_text',
            titles: 'titles',
            bottomTitle: 'aptean_body',
            bottomDiv: 'aptean-bottom-div',
        };
    }

    static get ids() {
        return {
            subcategoryId: 'subcategoryID',
            createForumId: 'createforumID',
            privateCommunityId: 'privatecommunityID',
            renameId: 'renameID',
            deleteId: 'deleteID',
            forumTree: 'forumTree',
            dialog: 'overlay-dialog',
            okId: 'okID',
            editForum1Id: 'editforum1ID',
            editforum2Id: 'editforum2ID',
            openForumId: 'openforumID',
            selectedT: 'selectedT',
            templateName: 'templatename',
            defaultT: 'defaultT',
        };
    }

    static get languageDropdown() {
        return {
            language: 'language',
            option: 'select[name="language"] option',
            english: 'English',
            russian: 'Russian',
        };
    }

    static get communityDialog() {
        return {
            dialogIFrame: 'dialogIFrame',
            desc: 'desc',
            description: 'description',
            moderatorId: 'moderatorID',
            moderatorIFrame: 'supervisorFrame',
            moderatorTable: 'content-table',
            radioButton: 'radiobutton',
            supervisorOwner: 'supervisorOwner',
            submitId: 'submitID',
            template: 'template',
            workflow: 'workflow',
            managedCollaboration: 'Managed Collaboration Community',
            cancelId: 'cancelID',
            editCollaborationProcess: 'Edit Collaboration Process',
            addUsers: 'Add Users',
            viewEditUsers: 'View / Edit Users',
            memberCountFrame: 'memberCountFrame',
            memberCount: 'Member Count',
            default: 'Default',
        };
    }

    static get labels() {
        return {
            test: 'Test',
            all: '*',
        };
    }

    static get windowMessages() {
        return {
            communityNameRequired: 'Community Name Required',
            deleteCommunity: 'The community and all of its posts will be deleted. Continue?',
            selectModerator: 'Please select the Moderator',
            enterSubcategoryName: 'Please enter the Sub Category name',
            deleteCategory: 'Delete category',
            nameAlreadyExists: 'Community with this name already exists',
        };
    }

    static get visibilityDropdown() {
        return {
            option: 'td select option',
            public: 'Public',
            private: 'Private',
        };
    }

    static get collaborationWorkflowDialog() {
        return {
            dialogIFrame: 'dialogIFrame',
            addStateId: 'addStateID',
            saveId: 'saveID',
            cancelId: 'cancelIFrameID',
            select1: 'select.1',
            selectType: 'select type',
            typeOption: 'select[name="select.1"] option',
            expertsOption: 'Send to experts with reputation level',
        };
    }

    static get usersGroupsDialog() {
        return {
            okId: 'submitBtn',
            showAllBtn: 'showAllBtn',
            findUsersFrame: 'findUsersFrame',
            selectItems: 'selectItems',
            user: 'User',
            itemClass: 'aptean_body',
            selectedFrame: 'selectedFrame',
            firstName: 'firstname',
            showAllGroupsBtn: 'Show All',
            groupName: 'groupname',
            findGroupsFrame: 'findGroupsFrame',
        };
    }
}
