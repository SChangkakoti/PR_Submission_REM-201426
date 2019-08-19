export class ContentAccessLevelManagerConstant {

    static get elementNames() {
        return {
            title: 'Title',
            add: 'Add',
            submit: 'Submit',
            delete: 'Delete',
            ok: 'OK',
            edit: 'Edit',
            input: 'Input',
            yes: 'Yes',
            cancel: 'Cancel',
            no: 'No',
        };
    }

    static get classes() {
        return {
            title: 'pop_hd_text',
            category: 'aptean_pop_hd_text',
            uiDialog: 'ui-dialog',
        };
    }

    static get ids() {
        return {
            addBtn: 'addBtn',
            delBtn: 'delBtn',
            editBtn: 'editBtn',
            submitBtn: 'submitBtn',
            newAccessLevelDialogId: 'ui-id-1',
        };
    }

    static get levels() {
        return {
            internal: 'Internal',
            test: 'Test',
            edited: 'Edited',
            partner: 'Partner',
        };
    }

    static get titles() {
        return {
            pageTitle: 'Content Access Level Manager',
        };
    }

    static get languageDropdown() {
        return {
            language: 'language',
            option: 'select[name="language"] option',
            english: 'English',
            german: 'German',
            arabic: 'Arabic',
            french: 'French',
            croatian: 'Croatian',
            czech: 'Czech',
            chineseSimplified: 'Chinese (Simplified)',
            chineseTraditional: 'Chinese (Traditional)',
            catalan: 'Catalan',
            dutch: 'Dutch',
        };
    }

    static get newAccessLevelDialog() {
        return {
            title: 'New Access Level',
            input: 'input[name="name"]',
            iFrame: 'dialogIFrame',
            cancelBtn: 'input[value="Cancel"]',
        };
    }

    static get deleteWindow() {
        return {
            yesBtn: 'input[value="Yes"]',
            noBtn: 'input[value="No"]',
        };
    }

    static get errorMessages() {
        return {
            blankNameErrorMessage: 'The following properties cannot be blank: Name.',
            alreadyExitsErrorMessage: 'A Content Access Level with this Name already exists.',
            deleteLevelMessage: 'Are you sure you want to delete this Access Level?',
        };
    }

    static get editLevelDialog() {
        return {
            title: 'Edit Content Access Level',
            input: 'input[name="name"]',
            iFrame: 'dialogIFrame',
            cancelBtn: 'input[value="Cancel"]',
            dialogId: 'ui-id-1',
        };
    }
}
