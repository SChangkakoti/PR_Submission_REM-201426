import { by } from 'protractor';
import { By } from 'selenium-webdriver';

import { $ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';

import { AdministerSystemConstant } from './administer-system.costant';

export class AdministerSystemPage {

    static get languageManagerForm() {
        const form = AdministerSystemConstant.languageManagerForm;
        return {
            addLanguageButton: $(By.css(`input[value="${form.addLanguageButton}"]`), form.addLanguageButton),
        };
    }

    static get languagePropertiesForm() {
        const form = AdministerSystemConstant.languagePropertiesForm;
        return {
            localeDropdown: $(By.css(`select[name="${form.localeDropdown}"]`), form.localeDropdown),
            submitButton: $(By.css(`input[value="${form.submitButton}"]`), form.submitButton),
        };
    }

    static get titles() {
        const title = AdministerSystemConstant.titles;
        return {
            languageManager: $(by.cssContainingText(HtmlHelper.tags.span, title.languageManager), title.languageManager),
            languageProperties: $(by.cssContainingText(HtmlHelper.tags.span, title.languageProperties), title.languageProperties),
        };
    }
}
