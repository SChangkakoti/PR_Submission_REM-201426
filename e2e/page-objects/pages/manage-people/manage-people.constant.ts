export class ManagePeopleConstant {

    static get testData() {
        return {
            defTemplate: 'AddandRemoveSegments',
            defMetadata: 'TD_Product',
            defFolderName: 'Image Files',
            defMediaFolderName: 'Media Files',
        };
    }

    static get errorMessages() {
        return {
            noGroupName: 'Group Name Required',
        };
    }

    static get managePeopleSubmenuOptions() {
        return {
            agentLevelManager: 'Agent Level Manager',
            enterpriseReputationLevelManager: 'Enterprise Reputation Level Manager',
            groupCreator: 'Group Creator',
            userAndGroupFinder: 'User & Group Finder',
            roleManagerKkc: 'Role Manager (KKC)',
            roleManagerKss: 'Role Manager (KSS)',
            userCreator: 'User Creator',
            roleManager: 'Role Manager',
            roleManagerKkcSufix: '(KKC)',
            roleManagerKssSufix: '(KSS)',
        };
    }

    static get titles() {
        return {
            roleManagerKkc: 'Role Manager (KKC)',
            selectUsers: 'Select Users',
            doYouWantToSave: 'Do you want to save the changes you made to this role?',
            roleNameRequired: 'Role Name Required',
            permissionRequired: 'Permissions Required',
            descriptionRequired: 'Description Required',
            agentLevelManager: 'Agent Level Manager',
            groupCreator: 'Group Creator',
            expertiseProfile: 'Expertise Profile',
            addExpertise: 'Add Expertise',
            selectUniversalMetadata: 'Select Universal Metadata',
            browseForServer: 'Browse for Server',
            folder: 'Folder from Browse for Server',
        };
    }

    static get rolesTable() {
        return 'Roles table';
    }

    static get roles() {
        return {
            agent: 'Agent',
            contentSupervisor: 'contentsupervisor',
        };
    }

    static get availablePermissions() {
        return {
            findUsers: 'Find Users',
            frindGroups: 'Find Groups',
            analyticsDateConfigurationManager: 'Analytics: Date Configuration Manager',
            manageEmailTemplates: 'Manage Email Templates',
        };
    }

    static get selectUsersForm() {
        return {
            showAllButton: 'Show All',
            selectableUser: 'User',
            okButton: 'OK',
            username: 'User name',
            availableUsers: 'Available users',
        };
    }

    static get labels() {
        return {
            users: 'Users',
            roles: 'Roles',
            agentLevel: 'Agent level',
            mvpLevel: 'MVP Level',
            publicAccessLevel: 'Public',
        };
    }

    static get newRoleButton() {
        return 'New Role';
    }

    static get manageRolesForm() {
        return {
            employeeApplications: 'Employee Applications ',
            customerApplications: 'Customer Applications',
            title: 'Manage Roles',
            availablePermissions: 'Available permissions list',
            pushrightIcon: 'Push right icon',
            pushLeftIcon: 'Push left icon',
            submitButton: 'Submit',
            selectButton: 'Select',
            cancelButton: 'Cancel',
            name: 'Role name',
            description: 'Description',
        };
    }

    static get groupCreatorForm() {
        return {
            buttons: {
                supervisorframe: 'supervisorFrame',
                submit: 'Submit',
                cancel: 'Cancel',
                owner: 'Owner Select',
                supervisor: 'Supervisor Select',
                members: 'Members select',
                expertiseProfile: 'Expertise Profile Select',
                accessLevels: 'Select Access Levels',
                languages: 'Select Languages',
                unifiedTemplates: 'Select Unified Templates',
                universalMetadata: 'Select Universal Metadata',
                imagesDirectory: 'Select Images Folder',
                mediasDirectory: 'Select Media Folder',
                ok: 'Ok',
                radioButton: 'radiobutton',
            },
            textElements: {
                groupName: 'Group Name',
                description: 'Description',
                skills: 'Skills',
            },
            usersTable: 'Users Table',
            userchk: 'User checkbox',
            adminUserCheckboxValue: '2',
            addMetadata: 'Add Metadata',
            reputationLevel: 'Reputation Level',
            productMetadata: 'nameSG_TD_PRODUCT',
            reputationLevelDd: 'erllist',
            selectedAccessLevelSelected: 'selectedUM',
            labels: {
                owner: 'adminisOwner',
                supervisor: 'superviseOwner',
                members: 'membercount',
                experienceLevel: 'experienceLevel',
                skillLevel: 'Skill Level',
                addedMetadata: 'Added Metadata',
                accessLevel: 'authAccessLevel',
                language: 'language',
                unifiedTemplate: 'authUT',
                metadata: 'authUniversalMetadata',
            },
        };
    }

    static get userGroupFinderForm() {
        return {
            classes: {
                apteanBodyBold: 'aptean_body_bold',
                apteanBody: 'aptean_body',
            },
            labels: {
                findUsers: 'Find Users',
                findGroups: 'Find Groups',
                search: 'Search',
            },
        };
    }

    static get okButton() {
        return 'OK';
    }

    static get noButton() {
        return 'No';
    }

    static get agentLevelManagerForm() {
        return {
            newAgentLevelButton: 'New Agent Level',
            saveButton: 'Save',
            cancelButton: 'Cancel',
            nameTextbox: 'Name',
            deleteIcon: 'Delete icon',
        };
    }

    static get attributes() {
        return {
            id: {
                pushRightIcon: 'pushRight',
                pushLeftIcon: 'pushLeft',
                submitButton: 'saveBtn',
                selectButton: 'userSelectBtn',
                cancelButton: 'cancelBtn',
                newRoleButton: 'newRole',
                showAllButton: 'showAllBtn',
                newAgentLevelButton: 'agentlevelID',
                cancelButtonAgentDetailForm: 'cancelID',
                saveButtonAgentDetailForm: 'saveID',
                memberCount: 'memberCount',
                username: 'username',
                maintable: 'maintable',
                submitBtn: 'submitBtn',
            },
            value: {
                ksc: 'KSC',
                kss: 'KSS',
                deleteRole: 'deleteRole',
            },
            name: {
                name: 'name',
                description: 'desc',
                selectedPermissions: 'selectPerms',
            },
            class: {
                roleManagerKkc: 'pop_hd_text',
                rolesTable: 'aptean-table',
            },
        };
    }

    static get popUps() {
        return {
            titles: {
                selectAccessLevels: 'Select Access Levels',
                selectedAccessLevel: 'Selected Access Level',
            },
            buttons: {
                add: 'Add',
                remove: 'Remove',
                ok: 'OK',
                cancel: 'Cancel',
                browse: 'Browse',
            },
            languagePopUp: {
                available: 'Available Language',
                included: 'Included Language',
            },
        };
    }
}
