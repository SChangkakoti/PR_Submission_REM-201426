export class ThreshHoldConfigurationManagerConstant {
    static get elementNames() {
        return {
            title: 'Title',
            contentFrame: 'contentframe',
            cancel: 'Cancel',
            save: 'Save',
            lastLinked: 'Last Linked Threshold',
            lastUsedSolution: 'Last Used as Solution Threshold',
            lastViewed: 'Last Viewed Threshold',
            lastUsed: 'Last Used Threshold',
            ok: 'OK',
            alphabets: 'abc',
            specialCharacter: '@#',
            decimalValue: '0.4',
            negativeFeedBacks: 'Negative Feedback Threshold',
            highRating: 'Rating: High Threshold',
            lowRating: 'Rating: Low Threshold',
        };
    }

    static get classes() {
        return {
            title: 'aptean_pop_hd_text',
            apteanBody: 'aptean_body',
        };
    }

    static get ids() {
        return {
            contentFrame: 'contentframe',
            lastLinked: 'LastLinked',
            lastUsedAsSolution: 'LastUsedAsSolution',
            lastViewed: 'LastViewed',
            lastUsed: 'LastUsed',
            negativeFeedBacks: 'Feedbacks',
            highRating: 'HighRating',
            lowRating: 'LowRating',
        };
    }

    static get titles() {
        return {
            pageTitle: 'Analytics Threshold Configuration Manager',
            errorMessage: 'can be Integers from 1 to 9999 .',
            errorMessageOneToFive: 'can be Numbers as tenths from 1 to 5 .',
        };
    }

    static get errorConditionTestData() {
        return {
            tenLakh: '100000',
            minusFive: '-5',
            zero: '0',
            blank: '',
            alphabets: 'abc',
            specialCharacter: '@#',
            doubleDigit: '10',
            ratingDecimalValue: '7.7',
            decimalValue: '0.4',
        };
    }
}
