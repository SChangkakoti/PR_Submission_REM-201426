export class KnowledgeCentralCollaborationConstant {
    static readonly dialogIFrame = 'Dialog IFrame';
    static readonly error = 'Error Meassage';
    static readonly delete = 'Delete';
    static readonly ok = 'OK';
    static readonly no = 'No';
    static readonly yes = 'Yes';
    static readonly addedMessage = 'Added Message';
    static readonly deleteMessage = 'Are you sure you want to delete this Collaboration?';

    static get titles() {
        return {
            collaboration: 'Collaboration',
        };
    }

    static get collaborationPageItems() {
        return {
            newCollaborationButton: 'New Collaboration Button',
            subject: 'Subject',
            originator: 'Originator',
            customer: 'Customer',
            caseId: 'Case ID',
            lastUpdate: 'Last Update',
            delete: 'Delete',
            collaboratorCreatorWindow: 'Collaborator Creator Window',
            collaborationBlueLink: 'Collaboration Blue Link',
        };
    }

    static get collaboratorCreatorWindowItems() {
        return {
            subject: 'title',
            message: 'text',
            urgent: 'yes',
            normal: 'no',
            addCollaborators: 'Add Collaborators',
            submit: 'Submit',
            cancel: 'Cancel',
        };
    }

    static get expertFinderItems() {
        return {
            expertFinderPane: 'Expert Finder',
            suggestedTab: 'Suggested Tab',
            mostRecentTab: 'Most Recent Tab',
            findTab: 'Find Tab',
            selectedCollaborators: 'Selected Collaborators',
            okButton: 'Ok Button',
            cancelButton: 'Cancel Button',
        };
    }

    static get findTabItems() {
        return {
            firstName: 'First Name',
            lastName: 'Last Name',
            groupName: ' Group Name',
            search: 'Image2',
            showAllButton: 'Show All',
            collaboratorsList: 'Collaborators List',
            checkbox: 'checkbox',
        };
    }

    static get errorMessages() {
        return {
            addCollaborators: 'Please add Collaborators.',
            subject: 'Please enter a Subject.',
            message: 'Please enter a Message.',
            collaborators: 'Please add Collaborators.',
        };
    }

    static get collaborationBuilderItems() {
        return {
            subject: 'Subject',
            collaborators: 'Collaborators',
            originator: 'Originator',
            message: 'Message',
            postMessage: 'Post Message',
            addCollaborator: 'Add Collaborator',
            okButton: 'OK',
            deleteButton: 'Delete',
        };
    }
}
