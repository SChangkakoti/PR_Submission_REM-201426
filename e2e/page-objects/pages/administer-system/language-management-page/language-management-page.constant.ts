export class LanguageManagementPageConstant {
    static get languages() {
        return {
            dutch: 'Dutch',
            catalan: 'Catalan',
            danish: 'Danish',
            english: 'English',
            speranto: 'Speranto',
            spanish: 'Spanish',
            italian: 'Italian',
            german: 'German',
            finnish: 'Finnish',
        };
    }

    static get elementNames() {
        return {
            contentIFrame: 'Content IFrame',
            languageTable: 'Languages Table',
            languageDropDownOptions: 'Language DropDown Options',
            addLanguage: 'Add Language',
            languagePropFields: {
                dialogIFrame: 'dialogIFrame',
                popUpWindows: 'Language Properties',
                locale: 'Locale',
                displayNames: 'Display Names',
                english: 'English',
                arabic: 'Arabic',
                french: 'French',
            },
            submit: 'Submit',
            cancel: 'Cancel',
            localeDd: 'locale',
            localeDdOptions: 'locale options',
        };
    }

    static get attributes() {
        return {
            id: {
                contentFrame: 'contentframe',
                dialogIFrame: 'dialogIFrame',
                apteanHeaderCal: 'aptean-header-cal',
                languagePropertiesId: 'overlay-dialog',
                englishName: 'english_name',
            },
            classes: {
                apteanMediumButton: 'aptean-medium-button',
                apteanBodyBold: 'aptean_body_bold',
                apteanBody: 'aptean_body',
                frenchInput: 'name_LA_fre_FR',
                arabicInput: 'name_LA_ara_SA',
            },
        };
    }
}
