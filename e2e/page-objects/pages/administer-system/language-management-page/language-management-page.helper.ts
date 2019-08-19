import { ElementFinder } from 'protractor';

import { StepLogger } from '../../../../../core/logger/step-logger';
import { PageHelper } from '../../../../components/html/page-helper';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminLoginPageHelper } from '../../admin-login-page/admin-login.helper';
import { CommonPageHelper } from '../../common/common-page.helper';

import { LanguageManagementPageConstant } from './Language-management-page.constant';
import { LanguageManagementPage } from './Language-management-page.po';

export class LanguageManagementPageHelper {
    static async navigateToLanguageManagement() {
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePageHelper.navigateToLanguageManager();
        await CommonPageHelper.switchToContentFrame();
    }

    static async validateLanguagePropertiesFields() {
        await LanguageManagementPage.LanguagesProperties.locale.verifyDisplayedStatus();
        await LanguageManagementPage.LanguagesProperties.dispNames.verifyDisplayedStatus();
        await LanguageManagementPage.LanguagesProperties.english.verifyDisplayedStatus();
        await LanguageManagementPage.LanguagesProperties.arabic.verifyDisplayedStatus();
        await LanguageManagementPage.LanguagesProperties.french.verifyDisplayedStatus();
    }

    static async validateLanguagePropertiesButtons() {
        await LanguageManagementPage.buttons.submit.verifyDisplayedStatus();
        await LanguageManagementPage.buttons.cancel.verifyDisplayedStatus();
    }

    static async verifyListLanguagesDisplayed() {
        const { localeDdOption } = LanguageManagementPage.localeDropDown;
        await localeDdOption.item.each(async (option: ElementFinder) => {
            await ExpectationHelper.verifyDisplayedElementFinder(option, localeDdOption.name);
        });
    }

    static async verifySelectedLanguage(expected: string) {
        const selected = await LanguageManagementPage.localeDropDown.localeDd.getSelectedOptionText();
        await ExpectationHelper.verifyStringEqualTo(selected.trim(), expected);
    }

    static async verifyLanguageLinkInList(language: string) {
        await CommonPageHelper.switchToContentFrame();
        await LanguageManagementPage.LanguagesTable.verifyDisplayedStatus();
        await LanguageManagementPage.getlanguageLinkInList(language).verifyDisplayedStatus();
    }

    static async editDisplayNamesForlanguages(language: string) {
        const attr = LanguageManagementPage.LanguagesProperties;
        await attr.frenchTextBox.sendKeys(language);
        await attr.arabicTextBox.sendKeys(language);
        await attr.englishTextBox.sendKeys(language);
    }

    static async verifyDisplayNamesForlanguages(language: string) {
        const attr = LanguageManagementPage.LanguagesProperties;
        await attr.frenchTextBox.verifyTextBoxContains(language);
        await attr.arabicTextBox.verifyTextBoxContains(language);
        await attr.englishTextBox.verifyTextBoxContains(language);
    }

    static async selectLanguageToModify(testLanguage: string) {
        const attr = LanguageManagementPage.LanguagesProperties;
        await LanguageManagementPage.getlanguageLinkInList(testLanguage).clickButton();
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        return await attr.englishTextBox.getAtttribute(HtmlHelper.attributes.value);
    }

    static async verifyDisplayedName(language: string) {
        await LanguageManagementPage.getlanguageLinkInList(language).verifyDisplayedStatus();
    }

    static async clickCancel() {
        await LanguageManagementPage.buttons.cancel.clickButton();
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
    }

    static async clickSubmit() {
        await LanguageManagementPage.buttons.submit.clickButton();
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
    }

    static async clickAdd() {
        await LanguageManagementPage.buttons.addLanguage.clickButton();
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.s);
    }

    static async verifyLanguageNotPresent(language: string) {
        await LanguageManagementPage.getDisplayedName(language).verifyHiddenStatus();
    }

    static async modifyLanguage(language: string, displayName: string) {
        const attr = LanguageManagementPage.LanguagesProperties;
        await this.selectLanguageToModify(language);
        await attr.englishTextBox.sendKeys(displayName);
        await this.clickSubmit();
    }

    static async setLanguageEnvironmentForTesting(logOut = false) {
        const language = LanguageManagementPageConstant.languages;
        if (logOut) {
            await AdminLoginPageHelper.logout(true);
        }

        StepLogger.preCondition('Navigate To Language Management');
        await LanguageManagementPageHelper.navigateToLanguageManagement();
        StepLogger.preCondition('Set Original Configuration');
        await this.modifyLanguage(language.english, language.english);
        await this.modifyLanguage(language.german, language.german);
    }
}
