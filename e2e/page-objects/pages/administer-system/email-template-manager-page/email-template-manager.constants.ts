export class EmailTemplateManagerPageConstant {

    static get testData() {
        return {
            templateType: 'Subscription: Daily',
            newTemplateType: 'Subscription: Document',
            language: 'Arabic',
            newLanguage: 'French',
            defSubject: 'Default Subject',
            defBodyContents: 'Default Body Contents',
            newSubject: 'MODIFIED Subject',
            newBodyContents: 'MODIFIED Body Contents',
        };
    }

    static get elementNames() {
        return {
            title: 'Title',
            contentFrame: 'contentframe',
            templateTypeDd: 'Template Type',
            languageDd: 'Language',
            subjectTextBox: 'Subject',
            bodyContentsTextarea: 'Body Contents',
            templateTableBySubject: 'Template by Subject',
        };
    }

    static get ids() {
        return {
            contentFrame: 'contentframe',
        };
    }

    static get titles() {
        return {
            pageTitle: 'Email Template Manager',
            emailTemplateProperties: 'Email Template Properties',
            errorMsgBlankTemplateType: 'The following properties cannot be blank:  Template Type.',
            errorMsgBlankSubject: 'The following properties cannot be blank:  Subject.',
            errorTemplateExists: 'The maximum of 1 Email Template already exist. A new one cannot be created.',
            errorMsgBlankBodyContents: 'The following properties cannot be blank:  Body Contents.',
            errorMsgAllBlank: 'The following properties cannot be blank:  Subject, Template Type, Body Contents.',
        };
    }

    static get classes() {
        return {
            title: 'aptean_pop_hd_text',
            tableHeader: 'table_header',
            windowDialogTitle: 'ui-dialog-title',
        };
    }

    static get buttons() {
        return {
            createTemplate: 'Create Template',
            submit: 'Submit',
            ok: 'OK',
            cancel: 'Cancel',
        };
    }
}
