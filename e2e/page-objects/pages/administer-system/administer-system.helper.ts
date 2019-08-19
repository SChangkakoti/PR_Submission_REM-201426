import { StepLogger } from '../../../../core/logger/step-logger';
import { DropDownHelper } from '../../../components/html/dropdown-helper';
import { ElementHelper } from '../../../components/html/element-helper';
import { Constants } from '../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { AdminHomePageHelper } from '../admin-home-page/admin-home.helper';
import { AdminLoginPageHelper } from '../admin-login-page/admin-login.helper';
import { CommonPageHelper } from '../common/common-page.helper';

import { AdministerSystemPage } from './administer-system.po';

export class AdministerSystemHelper {

    static async verifyLaguagePageDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await AdministerSystemPage.titles.languageManager.verifyDisplayedStatus();
    }

    static async clickOnAddLanguage() {
        StepLogger.subStep('Click on Add Languange button');
        await AdministerSystemPage.languageManagerForm.addLanguageButton.hoverOverAndClick();
    }

    static async verifyLanguagePropertiesPageDisplayed() {
        await AdministerSystemPage.titles.languageProperties.verifyDisplayedStatus();
        await CommonPageHelper.switchToDialogFrame();
    }

    static async selectLocale(language: string) {
        await DropDownHelper.selectOptionByText(
            AdministerSystemPage.languagePropertiesForm.localeDropdown,
            language);
        return await DropDownHelper.getTheSelectedOptionText(AdministerSystemPage.languagePropertiesForm.localeDropdown);
    }

    static async verifySelectedLocaleValue(language: string) {
        const selectedOption = await DropDownHelper.getTheSelectedOptionText(AdministerSystemPage.languagePropertiesForm.localeDropdown);
        await ExpectationHelper.verifyStringEqualTo(selectedOption, language);
    }

    static async clickSubmitButton() {
        StepLogger.subStep('Click on Submit button');
        await AdministerSystemPage.languagePropertiesForm.submitButton.hoverOverAndClick();
    }

    static async verifyLanguangeDisplayedInTheList(language: string) {
        await CommonPageHelper.switchToContentFrame();
        await ExpectationHelper.verifyDisplayedElementFinder(ElementHelper.getElementByText(language), language);
    }

    static async configureLanguage(language: string) {
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePageHelper.navigateToLanguageManagerPage();
        await AdministerSystemHelper.verifyLaguagePageDisplayed();
        await AdministerSystemHelper.clickOnAddLanguage();
        await AdministerSystemHelper.verifyLanguagePropertiesPageDisplayed();
        await AdministerSystemHelper.selectLocale(language);
        await AdministerSystemHelper.clickSubmitButton();
        await AdministerSystemHelper.verifyLanguangeDisplayedInTheList(language);
        await AdminLoginPageHelper.logout();
        return language;
    }

    static async configureRandomLanguage() {
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePageHelper.navigateToLanguageManagerPage();
        await AdministerSystemHelper.verifyLaguagePageDisplayed();
        await AdministerSystemHelper.clickOnAddLanguage();
        await AdministerSystemHelper.verifyLanguagePropertiesPageDisplayed();
        const language = await AdministerSystemHelper.selectRandomLocale();
        await AdministerSystemHelper.clickSubmitButton();
        await AdministerSystemHelper.verifyLanguangeDisplayedInTheList(language);
        await AdminLoginPageHelper.logout();
        return language;
    }

    static async selectRandomLocale(index: number = Constants.number.zero) {
        await DropDownHelper.getTheSelectedOptionTextWithIndex(
            AdministerSystemPage.languagePropertiesForm.localeDropdown,
            index);
        return await DropDownHelper.getTheSelectedOptionText(AdministerSystemPage.languagePropertiesForm.localeDropdown);
    }
}
