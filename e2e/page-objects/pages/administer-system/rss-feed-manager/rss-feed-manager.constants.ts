export class RssFeedManagerConstant {
    static get elementNames() {
        return {
            title: 'Title',
            contentFrame: 'contentframe',
            create: 'Create',
            delete: 'Delete',
            name: 'Name',
            description : 'Description',
            accessLevels : 'Access Levels',
            segments : 'Segments',
            knowledgeSources  : 'Knowledge Sources',
            language  : 'Language',
            text  : 'Text',
            uiDialog: 'UI Dialog',
            feedName: 'feedName',
            urlType: 'urlType',
            languageId: 'languageId',
            copy: 'Copy',
            cancel: 'Cancel',
            submit: 'Submit',
            no: 'No',
            yes: 'Yes',
            ok: 'OK',
            rssFeedId: 'rssFeedId',
            availableKnowledgeSource: 'availableKnowledgeSource',
            moving: 'moving',
            removing: 'removing',
            selectedKnowledgeSource: 'selectedKnowledgeSource',
            add: 'Add',
            selectedUM: 'selectedUM',
            remove: 'Remove',
            search: 'search',
            browse: 'browse',
            searchText: 'searchText',
            article: 'article',
            pending: 'pending',
        };
    }

    static get classes() {
        return {
            title: 'aptean_pop_hd_text',
            tableHeader: 'table_header',
            uiDialogTitle: 'ui-dialog-title',
            apeanSmallButton: 'aptean-small-button',
            apteanMiddle: 'aptean-middle-div',
            selectedNode: 'selectedNode',
            tableDataRow: 'table_data_row',
           };
    }

    static get ids() {
        return {
            contentFrame: 'contentframe',
            selectedKS: 'selectedKS',
            selectedAL: 'selectedAL',
            selectedMetadata: 'selectedMetadata',
            dialogIFrame: 'dialogIFrame',
            contentTable: 'content-table',
            content: 'content',
            tree: 'tree',
            salAgent: 'nameSAL_Agent',
            salAgentValue: 'SAL_Agent',
            salPublicvalue: 'SAL_Public',
            searchIcon: 'searchIcon',
            tableSearchResult: 'tableSearchResults',
            dtArticle: 'DT_Article',
            pending: 'UMAS_ARCHIVESTATE_PENDING',
        };
    }

    static get titles() {
        return {
            pageTitle: 'RSS Feed Manager',
            rssFeedDetail: 'RSS Feed Details',
            deleteSelectedTask: 'Are you sure you want to delete the selected RSS Feeds?',
            feedNameExist: 'A Feed with this Name already exists. Please enter a different Name.',
            knowledgeSource: 'Knowledge Source',
            selectAccessLevels: 'Select Access Levels',
            selectUniversalMeta: 'Select Universal Metadata',
        };
    }
}
