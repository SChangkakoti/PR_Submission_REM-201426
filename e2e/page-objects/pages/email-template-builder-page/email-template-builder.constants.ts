export class EmailTemplateBuilderPageConstant {

    private static errorMessage = (table: string, field: string) => {
        return `The following properties cannot be blank: ${table} selections, ${field} text`;
    }

    static greetingText(index: number) {
        return {
            greetingSelectionText: `greeting-${index}-selectionText`,
            greetingInsertedText: `greeting-${index}-insertedText`,
            greetingAutoInsert: `greeting-${index}-autoInsert`,
        };
    }

    static signatureText(index: number) {
        return {
            signatureSelectionText: `signature-${index}-selectionText`,
            signatureInsertedText: `signature-${index}-insertedText`,
            signatureAutoInsert: `signature-${index}-autoInsert`,
        };
    }

    static get elementNames() {
        return {
            emailTemplateBuilder: 'Email Template Builder',
            selectedLanguage: 'Selected Language',
            languageDropDownOptions: 'Language DropDown Options',
            contentIFrame: 'Content IFrame',
            subject: 'Subject',
            greetingSelection: 'Greeting Selection',
            greetingOrderedIds: 'Greeting Ordered Ids',
            signatureOrderedIds: 'Signature Ordered Ids',
            new: 'New',
            yes: 'Yes',
            no: 'No',
            reorder: 'Reorder',
            customers: 'Customers',
            delete: 'Delete',
            selectionText: 'Selection Text',
            insertedText: 'Inserted Text',
            autoInsertThisSelection: 'Auto Insert This Selection',
            mr: 'Mr',
            ms: 'Ms',
            signatureSelections: 'Signature Selections',
            sincerely: 'Sincerely',
            save: 'Save',
            dialogIFrame: 'Dialog IFrame',
            moveUp: 'Move Up',
            moveDown: 'Move Down',
            ok: 'OK',
            cancel: 'Cancel',
            selectItem: 'Select Item To Reorder',
        };
    }

    static get attributes() {
        const greeting1 = this.greetingText(1);
        const greeting2 = this.greetingText(2);
        const greeting3 = this.greetingText(3);
        const signature1 = this.signatureText(4);
        return {
            id: {
                contentFrame: 'contentframe',
                newID: 'newID',
                reorderID: 'reorderID',
                shown: '_shown',
                dialogIFrame: 'dialogIFrame',
                okID: 'okID',
                saveID: 'saveID',
                cancelIFrameID: 'cancelIFrameID',
            },
            name: {
                subject: 'subject',
                selectedLanguage: 'SelectedLanguage',
                btn1: 'btn1',
                btn2: 'btn2',
                greetingOrderedIds: 'greeting-orderedIds',
                signatureOrderedIds: 'signature-orderedIds',
                selectItem: 'selectItem',
                greeting1SelectionText: greeting1.greetingSelectionText,
                greeting1InsertedText: greeting1.greetingInsertedText,
                greeting1AutoInsert: greeting1.greetingAutoInsert,
                greeting2SelectionText: greeting2.greetingSelectionText,
                greeting2InsertedText: greeting2.greetingInsertedText,
                greeting2AutoInsert: greeting2.greetingAutoInsert,
                greeting3SelectionText: greeting3.greetingSelectionText,
                greeting3InsertedText: greeting3.greetingInsertedText,
                greeting3AutoInsert: greeting3.greetingAutoInsert,
                signature4SelectionText: signature1.signatureSelectionText,
                signature4InsertedText: signature1.signatureInsertedText,
                signature4AutoInsert: signature1.signatureAutoInsert,
            },
            href: {
                moveUp: 'moveup',
                moveDown: 'movedown',
            },
            classes: {
                uiDialog: 'ui-dialog',
                apteanBodyBold: 'aptean_body_bold',
            },
            error: {
                signature: 'Signature',
                greeting: 'Greeting',
                selection: 'selection',
                inserted: 'inserted',
            },
        };
    }

    static get errorMessages() {
        const { signature, greeting, selection, inserted } = this.attributes.error;
        return {
            signatureSelectionText: this.errorMessage(signature, selection),
            signatureInsertedText: this.errorMessage(signature, inserted),
            greetingSelectionText: this.errorMessage(greeting, selection),
            greetingInsertedText: this.errorMessage(greeting, inserted),
        };
    }
}
