export class ContentAlertManagerConstant {

    static get elementNames() {
        return {
            title: 'Title',
            header: 'Header',
            contentFrame: 'contentframe',
            add: 'Add',
            submit: 'Submit',
            delete: 'Delete',
            ok: 'OK',
        };
    }

    static get classes() {
        return {
            title: 'aptean_pop_hd_text',
        };
    }

    static get ids() {
        return {
            contentFrame: 'contentframe',
            add1ID: 'add1ID',
            add2ID: 'add2ID',
            add3ID: 'add3ID',
            add4ID: 'add4ID',
            add5ID: 'add5ID',
            add6ID: 'add6ID',
            submitID: 'submitID',
            delete1ID: 'delete1ID',
            delete2ID: 'delete2ID',
            delete3ID: 'delete3ID',
            delete4ID: 'delete4ID',
            delete5ID: 'delete5ID',
            delete6ID: 'delete6ID',
        };
    }

    static get titles() {
        return {
            pageTitle: 'Content Alert Manager',
            automaticRejection: 'Automatic Rejection',
            highAlert: 'High Alert',
            mediumAlert: 'Medium Alert',
            automaticRejectionExactMatch: 'Level 1 Automatic Rejection - Exact Match',
            automaticRejectionPartialMatch: 'Level 1 Automatic Rejection - Partial Match',
            highAlertExactMatch: 'Level 2 High Alert - Exact Match',
            highAlertPartialMatch: 'Level 2 High Alert - Partial Match',
            mediumAlertExactMatch: 'Level 3 Medium Alert - Exact Match',
            mediumAlertPartialMatch: 'Level 3 Medium Alert - Partial Match',
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

    static get textArea() {
        return {
            level1Exact: 'addlvl1exact',
            level1ExactSelect: 'lvl1exact',
            test: 'Test',
            level1Partial: 'addlvl1partial',
            level1PartialSelect: 'lvl1partial',
            level2Exact: 'addlvl2exact',
            level2ExactSelect: 'lvl2exact',
            level2Partial: 'addlvl2partial',
            level2PartialSelect: 'lvl2partial',
            level3Exact: 'addlvl3exact',
            level3ExactSelect: 'lvl3exact',
            level3Partial: 'addlvl3partial',
            level3PartialSelect: 'lvl3partial',
        };
    }

    static get errorMessages() {
        return {
            duplicateErrorMessage: 'has already been defined!',
            blankErrorMessage: 'Please input a term before adding!',
            noneDeletedErrorMessage: 'No elements selected - none deleted',
        };
    }
}
