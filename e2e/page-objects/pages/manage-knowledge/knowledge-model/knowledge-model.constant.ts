
export class KnowledgeModelConstant {

    static get titles() {
        return {
            feedbackMetadataManager: 'Feedback Metadata Manager',
        };
    }

    static get attributes() {
        return {
            id: {
                nameCFC_root: 'nameCFC_root',
                classification: 'classification',
                wrapper_CFC_root: 'wrapper_CFC_root',
                nameLaEngUs: 'name_LA_eng_US',
                descLaEngUs: 'desc_LA_eng_US',
                detailSaveBtn: 'detailSaveBtn',
                detailDeleteBtn: 'detailDeleteBtn',
                detailCancelBtn: 'detailCancelBtn',
                nameCfsRoot: 'nameCFS_root',
                cfsRoot: 'CFS_root',
                createBtn: 'createBtn',
                deleteBtn: 'deleteBtn',
                name_LA_eng_US: 'name_LA_eng_US',
            },
            class: {
                treediv: 'treediv',
                selectedNode: 'selectedNode',
                aptean_body_bold: 'aptean_body_bold',
            },
            name: {
                language: 'language',
            },
        };
    }

    static get labels() {
        return {
            categories: 'Categories',
            classification: 'Classification',
            name: 'Name',
            description: 'Description',
            saveButton: 'Save',
            deleteButton: 'Delete',
            cancelButton: 'Cancel',
            selectedCategory: 'Selected category',
            statuses: 'Statuses',
            statusesList: 'Statuses list',
            language: 'Language',
            languagesList: 'Languages List',
            createButton: 'Create button',
            languages: {
                english: 'English',
                arabic: 'Arabic',
                catalan: 'Catalan',
                chineseSimplified: 'Chinese (Simplified)',
                chineseTraditional: 'Chinese (Traditional)',
                croatian: 'Croatian',
                czech: 'Czech',
                danish: 'Danish',
                dutch: 'Dutch:',
                french: 'French',
                german: 'German',
            },
        };
    }

    static get classificationOptions() {
        return {
            positive: 'Positive',
            neutral: 'Neutral',
            negative: 'Negative',
        };
    }

    static get messages() {
        return {
            dataSavedSuccessfully: 'Data saved successfully',
        };
    }
}
