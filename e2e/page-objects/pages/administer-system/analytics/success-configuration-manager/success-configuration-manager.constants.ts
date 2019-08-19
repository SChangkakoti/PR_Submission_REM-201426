export class SuccessConfigurationManagerConstant {
    static get elementNames() {
        return {
            title: 'Title',
            contentFrame: 'contentframe',
            options: 'Options',
            submit: 'Submit',
            cancel: 'Cancel',
            help: 'question1',
            formsOfOptions: 'Pos = Positive, Neg = Negative, N/A = Not Applicable',
        };
    }

    static get ids() {
        return {
            contentFrame: 'contentframe',
        };
    }

    static get titles() {
        return {
            pageTitle: 'Analytics Success Configuration Manager',
        };
    }

    static get classes() {
        return {
            title: 'aptean_pop_hd_text',
            apteanBody: 'aptean_body',
        };
    }

    static get generalSection() {
        return {
            high: 'High',
            low: 'Low',
            negative : '-1',
            na : '0',
            positive: '1',
            positiveValue: 'Pos',
            negativeValue: 'Neg',
        };
    }

    static get resolutionFlow() {
        return {
            caseResolved: 'CaseResolved',
            caseEscalated: 'CaseEscalated',
            caseSaved: 'CaseSaved',
            collaborationCreated: 'CollaborationCreated',
            noDidThisHelp: 'NoDidThisHelp',
            yesDidThisHelp: 'YesDidThisHelp',
            returnedToExistingWebCase: 'ReturnedToExistingWebCase',
            unKnownOutcome: 'UnknownOutcome',
            negative : '-1',
            na : '0',
            positive: '1',
        };
    }

    static get searchSection() {
        return {
            viewedManyDocs: 'ViewedManyDocs',
            viewedOneDoc: 'ViewedOneDoc',
            viewedNoDocs: 'ViewedNoDocs',
            noDocsReturned: 'NoDocsReturned',
            noActivity: 'NoActivity',
            emailedDocument: 'EmailedDocument',
            savedDocument: 'SavedDocument',
            savedSearch: 'SavedSearch',
            selectedBB: 'SelectedBB',
            selectedRecommendation: 'SelectedRecommendation',
            selectedICs: 'SelectedICs',
            selectedChoices: 'SelectedChoices',
            negative : '-1',
            na : '0',
            positive: '1',
        };
    }

    static get workbenchSection() {
        return {
            noNewDocumentCreatedOrLinked: 'NoNewDocumentCreatedOrLinked',
            newDocumentCreatedOrLinked: 'NewDocumentCreatedOrLinked',
            saveForLater: 'SaveForLater',
            documentCreated: 'DocumentCreated',
            notSolved: 'Unresolved',
            icSelected: 'ICLinked',
            emailSent: 'EmailedUser',
            authoringSuggestionCreated: 'RecommendedForAuthoring',
            documentViewed: 'ViewedDocs',
            collaborationStarted: 'CollaborationStarted',
            interviewSearchUsed: 'SearchUsed',
            unknownOutcome: 'WORKBENCH#UnknownOutcome',
            negative: '-1',
            na: '0',
            positive: '1',
        };
    }

    static get communities() {
        return {
            communityBrowsed: 'BrowseForum',
            newThreadCreated: 'PostNewThread',
            problemSolved: 'PostPreviewSolved',
            repliedToThread: 'ReplyToThread',
            unknownOutcome: 'FORUM#UnknownOutcome',
        };
    }

    static get homeBrowse() {
        return {
            documentViewed: 'DocumentViewed',
            recommendationAccessed: 'RecommendationAccessed',
        };
    }
}
