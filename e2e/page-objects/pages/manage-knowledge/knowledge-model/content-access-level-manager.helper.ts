import { StepLogger } from '../../../../../core/logger/step-logger';
import { PageHelper } from '../../../../components/html/page-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../../admin-login-page/admin-login.helper';
import { BasePageHelper } from '../../base-page.helper';

import { ContentAccessLevelManagerConstant } from './content-access-level-manager.contants';
import { ContentAccessLevelManagerPage } from './content-access-level-manager.po';
const { executeInNewTab } = PageHelper;

export class ContentAccessLevelManagerHelper extends BasePageHelper {

    static async navigateToContentAccessLevelManager() {
        await AdminHomePage.hamburgerIcon.clickButton();
        await AdminHomePageHelper.verifySidebarFieldsDisplayed();
        await AdminHomePageHelper.clickOnManageKnowledgeMenu();
        await AdminHomePageHelper.clickOnKnowledgeModelSubmenu();
        await AdminHomePageHelper.clickContentAccessLevelManager();
        await PageHelper.switchToiFrame(AdminHomePage.contentIFrame);
    }

    static async verifyPageTitle() {
        const titles = ContentAccessLevelManagerConstant.titles;
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await ContentAccessLevelManagerPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
    }

    static async verifyLanguages() {
        const lanDropdown = ContentAccessLevelManagerConstant.languageDropdown;
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.english).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.french).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.catalan).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.czech).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.chineseSimplified).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.chineseTraditional).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.arabic).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.croatian).verifyDisplayedStatus();
        await ContentAccessLevelManagerPage.getLanguageOptions(lanDropdown.dutch).verifyDisplayedStatus();
    }

    static async verifySelectedLanguage(expected: string) {
        const selected = await ContentAccessLevelManagerPage.languageDropdown.getSelectedOptionText();
        await ExpectationHelper.verifyStringEqualTo(selected.trim(), expected);
    }

    static async verifySelectedLevel(expected: string) {
        await ContentAccessLevelManagerPage.getCategorySelected(expected).verifyDisplayedStatus();
    }

    static async addNewAccessLevelNameAndSubmit(levelName: string) {
        const newAccessLevel = ContentAccessLevelManagerPage.newAccessLevel;

        await PageHelper.switchToiFrame(newAccessLevel.iFrame);
        await newAccessLevel.input.sendKeys(levelName);
        await ContentAccessLevelManagerPage.buttons.submitBtn.clickButton();
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async addNewAccessLevelNameAndCancel(levelName: string) {
        const newAccessLevel = ContentAccessLevelManagerPage.newAccessLevel;

        await PageHelper.switchToiFrame(newAccessLevel.iFrame);
        await newAccessLevel.input.sendKeys(levelName);
        await ContentAccessLevelManagerPage.buttons.cancelBtn.clickButton();
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async addNewAccessLevelName(levelName: string) {
        const newAccessLevel = ContentAccessLevelManagerPage.newAccessLevel;

        await PageHelper.switchToiFrame(newAccessLevel.iFrame);
        await newAccessLevel.input.sendKeys(levelName);
    }

    static async verifyLevelNameLength() {
        const level = await ContentAccessLevelManagerPage.newAccessLevel.input.getAtttribute(HtmlHelper.tags.value);
        await ExpectationHelper.verifyValueLessOrEqualTo(level.length, Constants.number.eighty);
    }

    static async verifyBlankNameErrorWindow() {
        await executeInNewTab(async () => {
            await ContentAccessLevelManagerPage.blankNameErrorMessage().verifyDisplayedStatus();
        });
    }

    static async verifyAlreadyExistsErrorWindow() {
        await executeInNewTab(async () => {
            await ContentAccessLevelManagerPage.alreadyExistsErrorMessage().verifyDisplayedStatus();
        });
    }

    static async verifyLevelNotCreatedAndPage(levelName: string) {
        await ContentAccessLevelManagerPage.levels(levelName).verifyHiddenStatus();
        await ContentAccessLevelManagerHelper.verifyPageTitle();
    }

    static async deleteLevelAndLogout(levelName: string, toCancel: boolean = false, toSelect: boolean = true) {
        if (toCancel) {
            await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
            await PageHelper.switchToiFrame(ContentAccessLevelManagerPage.newAccessLevel.iFrame);
            await ContentAccessLevelManagerPage.buttons.cancelBtn.clickButton();
            await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        }
        if (toSelect) {
            await ContentAccessLevelManagerPage.levels(levelName).clickButton();
        }
        await ContentAccessLevelManagerPage.buttons.deleteBtn.clickButton();

        await executeInNewTab(async () => {
            await ContentAccessLevelManagerPage.deleteWindow.yesBtn.clickButton();
        }, Constants.number.one, false);
        await PageHelper.switchToFirstTab();

        await AdminLoginPageHelper.logout(true);
    }

    static async createNewAccessLevelName(levelName: string) {
        const newAccessLevel = ContentAccessLevelManagerPage.newAccessLevel;

        await ContentAccessLevelManagerPage.levels(ContentAccessLevelManagerConstant.levels.internal).clickButton();
        await ContentAccessLevelManagerPage.buttons.addBtn.clickButton();
        await ContentAccessLevelManagerPage.newAccessLevel.dialog.verifyDisplayedStatus();
        await PageHelper.switchToiFrame(newAccessLevel.iFrame);
        await newAccessLevel.input.sendKeys(levelName);
        await ContentAccessLevelManagerPage.buttons.submitBtn.clickButton();
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async clickLanguagesDropdown() {
        await ContentAccessLevelManagerPage.languageDropdown.clickButton();
    }

    static async selectLanguage(language: string) {
        await ContentAccessLevelManagerPage.getLanguageOptions(language).clickButton();
    }

    static async verifyLanguagesDisplayedStatus() {
        await ContentAccessLevelManagerPage.languageDropdown.verifyDisplayedStatus();
    }

    static async selectLevel(level: string) {
        await ContentAccessLevelManagerPage.levels(level).clickButton();
    }

    static async clickAddButton() {
        await ContentAccessLevelManagerPage.buttons.addBtn.clickButton();
    }

    static async verifyNewAccessDialogDisplayedStatus() {
        await ContentAccessLevelManagerPage.newAccessLevel.dialog.verifyDisplayedStatus();
    }

    static async verifyCreatedLevel(level: string) {
        await ContentAccessLevelManagerPage.levels(level).verifyDisplayedStatus();
    }

    static async clickDeleteButton() {
        await ContentAccessLevelManagerPage.buttons.deleteBtn.clickButton();
    }

    static async clickEditButton() {
        await ContentAccessLevelManagerPage.buttons.editBtn.clickButton();
    }

    static async verifyEditDialogDisplayedStatus() {
        await ContentAccessLevelManagerPage.editLevel.dialog.verifyDisplayedStatus();
    }

    static async editLevelNameAndSubmit(level: string) {
        const editLevel = ContentAccessLevelManagerPage.editLevel;

        await PageHelper.switchToiFrame(editLevel.iFrame);
        await editLevel.input.sendKeys(level);
        await ContentAccessLevelManagerPage.buttons.submitBtn.clickButton();
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async editLevelNameAndCancel(level: string) {
        const editLevel = ContentAccessLevelManagerPage.editLevel;

        await PageHelper.switchToiFrame(editLevel.iFrame);
        await editLevel.input.sendKeys(level);
        await ContentAccessLevelManagerPage.buttons.cancelBtn.clickButton();
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async editLevelName(level: string) {
        const editLevel = ContentAccessLevelManagerPage.editLevel;

        await PageHelper.switchToiFrame(editLevel.iFrame);
        await editLevel.input.sendKeys(level);
    }

    static async verifyEditedLevel(level: string) {
        await ContentAccessLevelManagerPage
            .levels(ContentAccessLevelManagerConstant.levels.internal).clickButton();
        await ContentAccessLevelManagerPage.levels(level).verifyDisplayedStatus();
    }

    static async verifyEditLevelNameLength() {
        const level = await ContentAccessLevelManagerPage.editLevel.input.getAtttribute(HtmlHelper.tags.value);
        await ExpectationHelper.verifyValueLessOrEqualTo(level.length, Constants.number.eighty);
    }

    static async verifyDeleteLevelWindow() {
        await executeInNewTab(async () => {
            await ContentAccessLevelManagerPage.deleteWindow.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async clickYesButton() {
        await ContentAccessLevelManagerPage.deleteWindow.yesBtn.clickButton();
        StepLogger.subStep('Switch to first window');
        await PageHelper.switchToFirstTab();
    }

    static async clickNoButton() {
        await ContentAccessLevelManagerPage.deleteWindow.noBtn.clickButton();
        StepLogger.subStep('Switch to first window');
        await PageHelper.switchToFirstTab();
    }

    static async verifyLevelNotDeleted(level: string) {
        StepLogger.subStep('Switch to iframe');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await ContentAccessLevelManagerPage
            .levels(ContentAccessLevelManagerConstant.levels.partner).clickButton();
        await ContentAccessLevelManagerPage.levels(level).verifyDisplayedStatus();
    }

    url(): string {
        throw new Error('Method not implemented.');
    }
}
