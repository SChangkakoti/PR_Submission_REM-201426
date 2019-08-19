import { StepLogger } from '../../../../../core/logger/step-logger';
import { DropDownHelper } from '../../../../components/html/dropdown-helper';
import { ElementHelper } from '../../../../components/html/element-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { RandomHelper } from '../../../../components/misc-utils/random-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { CommonPageHelper } from '../../common/common-page.helper';

import { KnowledgeModelConstant } from './knowledge-model.constant';
import { KnowledgeModelPage } from './knowledge-model.po';

export class KnowledgeModelHelper {

    static async verifyFeedbackMetadataManagerDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await KnowledgeModelPage.titles.feedbackMetadataManager.verifyDisplayedStatus();
    }

    static async clickOnCategories() {
        await CommonPageHelper.switchToFmtreeFrame();
        StepLogger.subStep('Click on Categories');
        await KnowledgeModelPage.feedbackMetadataManager.category.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.category.hoverOverAndClick();
    }

    static async verifyCategoryFormDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmeditFrame();
        await KnowledgeModelPage.feedbackMetadataManager.classificationDropdown.verifyDisplayedStatus();
    }

    static async clickOnClassificationDropdown() {
        StepLogger.subStep('Click on Classification dropdown');
        await KnowledgeModelPage.feedbackMetadataManager.classificationDropdown.hoverOverAndClick();
    }

    static async verifyClassificationOptionsDisplayed() {
        const option = KnowledgeModelConstant.classificationOptions;
        await KnowledgeModelPage.getClassificationOption(option.negative).verifyDisplayedStatus();
        await KnowledgeModelPage.getClassificationOption(option.positive).verifyDisplayedStatus();
        await KnowledgeModelPage.getClassificationOption(option.neutral).verifyDisplayedStatus();
    }

    static async selectClassificationOption(option: string) {
        StepLogger.subStep(`Select ${option} from Classification dropdown`);
        await DropDownHelper.selectOptionByText(KnowledgeModelPage.feedbackMetadataManager.classificationDropdown, option);
    }

    static async verifySelectedClassificationOption(option: string) {
        const selected = await DropDownHelper.getTheSelectedOptionText(KnowledgeModelPage.feedbackMetadataManager.classificationDropdown);
        await ExpectationHelper.verifyStringEqualTo(selected, option);
    }

    static async typeName(name: string) {
        StepLogger.subStep(`Type ${name} in Name field`);
        await KnowledgeModelPage.feedbackMetadataManager.name.clearText();
        await KnowledgeModelPage.feedbackMetadataManager.name.sendKeys(name);
    }

    static async typeDescription(description: string) {
        StepLogger.subStep(`Type ${description} in Description field`);
        await KnowledgeModelPage.feedbackMetadataManager.description.clearText();
        await KnowledgeModelPage.feedbackMetadataManager.description.sendKeys(description);
    }

    static async typeNameAndDescription(name: string, description: string) {
        await KnowledgeModelHelper.typeName(name);
        await KnowledgeModelHelper.typeDescription(description);
    }

    static async verifyName(name: string) {
        await KnowledgeModelPage.feedbackMetadataManager.name.verifyTextEntered(name);
    }

    static async verifyDescription(description: string) {
        await KnowledgeModelPage.feedbackMetadataManager.description.verifyTextEntered(description);
    }

    static async verifyNameAndDescription(name: string, description: string) {
        await KnowledgeModelHelper.verifyName(name);
        await KnowledgeModelHelper.verifyDescription(description);
    }

    static async clickOnSaveButton() {
        await KnowledgeModelPage.feedbackMetadataManager.saveButton.hoverOverAndClick();
    }

    static async verifyErrorMessageIsClosed() {
        await CommonPageHelper.verifyNumberOfWindowsOpen(1);
    }

    static async clickOnACategory(category: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.getCategoryByText(category).hoverOverAndClick();
    }

    static async verifyCategoryDisplayed(category: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.getCategoryByText(category).verifyDisplayedStatus();
    }

    static async createCategory(name: string = RandomHelper.getRandomString(), description: string = RandomHelper.getRandomString()) {
        await AdminHomePageHelper.navigateToFeedbackMetadataManager();
        await KnowledgeModelHelper.clickOnCategories();
        await KnowledgeModelHelper.verifyCategoryFormDisplayed();
        await KnowledgeModelHelper.clickOnClassificationDropdown();
        await KnowledgeModelHelper.verifyClassificationOptionsDisplayed();
        await KnowledgeModelHelper.selectClassificationOption(KnowledgeModelConstant.classificationOptions.positive);
        await KnowledgeModelHelper.verifySelectedClassificationOption(KnowledgeModelConstant.classificationOptions.positive);
        await KnowledgeModelHelper.typeNameAndDescription(name, description);
        await KnowledgeModelHelper.verifyNameAndDescription(name, description);
        await KnowledgeModelHelper.clickOnSaveButton();
        await KnowledgeModelHelper.verifyCategoryDisplayed(name);
        await CommonPageHelper.switchToContentFrame();
        return name;
    }

    static async clickOnDeleteButton() {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmeditFrame();
        StepLogger.subStep('Click on Delete button');
        await KnowledgeModelPage.feedbackMetadataManager.deleteButton.hoverOverAndClick();
    }

    static async clickOnCancelButton() {
        StepLogger.subStep('Click on Cancel button');
        await KnowledgeModelPage.feedbackMetadataManager.cancelButton.hoverOverAndClick();
    }

    static async deleteCategory(category: string) {
        await AdminHomePageHelper.navigateToFeedbackMetadataManager();
        await KnowledgeModelHelper.clickOnCategories();
        await KnowledgeModelPage.getCategoryByText(category).verifyDisplayedStatus();
        await KnowledgeModelPage.getCategoryByText(category).hoverOverAndClick();
        await KnowledgeModelHelper.verifyCategoryFormDisplayed();
        await KnowledgeModelHelper.clickOnDeleteButton();
        await CommonPageHelper.verifyErrorMessageDisplayedAndClosePopup();
    }

    static async verifyCategoryNotDisplayed(category: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.getCategoryByText(category).verifyHiddenStatus();
    }

    static async verifyCategoryDetailsFormDisplayed(category: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmeditFrame();
        await KnowledgeModelPage.feedbackMetadataManager.classificationDropdown.verifyDisplayedStatus();
        await KnowledgeModelHelper.verifyName(category);
    }

    static async verifyPopupClosedAndInformationNotSaved(category: string) {
        await KnowledgeModelHelper.verifyErrorMessageIsClosed();
        await KnowledgeModelHelper.verifyCategoryDetailsFormDisplayed(category);
        await KnowledgeModelHelper.verifyCategoryNotDisplayed(category);
    }

    static async verifySelectedCategoryDisplayedInLeftPane(category: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmtreeFrame();
        const createdCategory = await KnowledgeModelPage.feedbackMetadataManager.selectedCategory.getText();
        await ExpectationHelper.verifyStringEqualTo(createdCategory, category);
    }

    static async deleteSelectedCategory() {
        await AdminHomePageHelper.navigateToFeedbackMetadataManager();
        await KnowledgeModelHelper.verifyCategoryFormDisplayed();
        await KnowledgeModelHelper.clickOnDeleteButton();
        await CommonPageHelper.verifyErrorMessageDisplayedAndClosePopup();
    }

    static async clickOnStatusOption() {
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.feedbackMetadataManager.statuses.verifyDisplayedStatus();
        StepLogger.subStep('Click on Statuses option');
        await KnowledgeModelPage.feedbackMetadataManager.statuses.hoverOverAndClick();
    }

    static async verifyStatusesListDisplayed() {
        await KnowledgeModelPage.feedbackMetadataManager.statusesList.verifyDisplayedStatus();
    }

    static async clickOnLanguageDropdown() {
        await CommonPageHelper.switchToContentFrame();
        StepLogger.subStep('Click on Languange Dropdown');
        await KnowledgeModelPage.feedbackMetadataManager.languageDropdown.hoverOverAndClick();
    }

    static async verifyLanguagesListDisplayed() {
        await KnowledgeModelPage.feedbackMetadataManager.languageDropdownList.verifyDisplayedStatus();
    }

    static async verifyFeedbackMetadataManagerScreen() {
        await KnowledgeModelPage.feedbackMetadataManager.createButton.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.deleteButtonHeaderButton.verifyDisplayedStatus();
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.feedbackMetadataManager.category.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.statuses.verifyDisplayedStatus();
    }

    static async verifyCreateButtonDisabled() {
        const disable = await ElementHelper.getDisabledAttributeValue(KnowledgeModelPage.feedbackMetadataManager.createButton);
        await ExpectationHelper.verifyStringEqualTo(disable.toString(), Constants.boolean.true.toString());
    }

    static async verifyStatusesOptionIsHighlightedInBold() {
        StepLogger.subStep('Statuses option is highlighted in bold');
        const fontValue = await KnowledgeModelPage.feedbackMetadataManager.statuses.getCssValue('font-weight');
        await ExpectationHelper.verifyStringEqualTo(fontValue, Constants.number.sevenHundred.toString());
    }

    static async verifyStatusForm() {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmeditFrame();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.english.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.english.verifyContainsText('*');
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.arabic.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.catalan.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.chineseSimplified.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.chineseTraditional.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.croatian.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.czech.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.deleteButton.scrollToElement();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.danish.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.dutch.verifyDisplayedStatus();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.french.verifyDisplayedStatus();
    }

    static async verifyStatusFormDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmeditFrame();
        await KnowledgeModelPage.feedbackMetadataManager.languagesLabels.english.verifyDisplayedStatus();
    }

    static async typeTextInEnglishField(text: string) {
        StepLogger.subStep(`Type ${text} in English field`);
        await KnowledgeModelPage.feedbackMetadataManager.languagesFields.english.clearText();
        await KnowledgeModelPage.feedbackMetadataManager.languagesFields.english.sendKeys(text);
    }

    static async verifyEnglishFieldValue(text: string) {
        await KnowledgeModelPage.feedbackMetadataManager.languagesFields.english.verifyTextEntered(text);
    }

    static async verifyStatusDisplayed(status: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.getStatusByText(status).verifyDisplayedStatus();
    }

    static async deleteSelectedStatus() {
        await AdminHomePageHelper.navigateToFeedbackMetadataManager();
        await KnowledgeModelHelper.clickOnStatusOption();
        await KnowledgeModelHelper.clickOnDeleteButton();
        await CommonPageHelper.verifyErrorMessageDisplayedAndClosePopup();
    }

    static async deleteStatus(statuses: string) {
        await AdminHomePageHelper.navigateToFeedbackMetadataManager();
        await KnowledgeModelHelper.clickOnStatusOption();
        await KnowledgeModelPage.getStatusByText(statuses).scrollToElement();
        await KnowledgeModelPage.getStatusByText(statuses).verifyDisplayedStatus();
        await KnowledgeModelPage.getStatusByText(statuses).hoverOverAndClick();
        await KnowledgeModelHelper.verifyStatusFormDisplayed();
        await KnowledgeModelHelper.clickOnDeleteButton();
        await CommonPageHelper.verifyErrorMessageDisplayedAndClosePopup();
    }

    static async createStatus(name: string = RandomHelper.getRandomString()) {
        await AdminHomePageHelper.navigateToFeedbackMetadataManager();
        await KnowledgeModelHelper.clickOnStatusOption();
        await KnowledgeModelHelper.verifyStatusFormDisplayed();
        await KnowledgeModelHelper.typeTextInEnglishField(name);
        await KnowledgeModelHelper.verifyEnglishFieldValue(name);
        await KnowledgeModelHelper.clickOnSaveButton();
        await KnowledgeModelHelper.verifyStatusDisplayed(name);
        await CommonPageHelper.switchToContentFrame();
        return name;
    }

    static async clickOnAStatus(status: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.getStatusByText(status).scrollToElement();
        await KnowledgeModelPage.getStatusByText(status).hoverOverAndClick();
    }

    static async verifyStatusNotDisplayed(status: string) {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmtreeFrame();
        await KnowledgeModelPage.getStatusByText(status).verifyHiddenStatus();
    }

    static async verifyAStatusHighlightedInBold(status: string) {
        const fontValue = await KnowledgeModelPage.getStatusTextElementByText(status).getCssValue('font-weight');
        await ExpectationHelper.verifyStringEqualTo(fontValue, Constants.number.sevenHundred.toString());
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmeditFrame();
    }

    static async verifydataSavedSuccessfullyMessageDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await CommonPageHelper.switchToFmeditFrame();
        await KnowledgeModelPage.feedbackMetadataManager.dataSavedSuccessfullyMessage.verifyDisplayedStatus();
    }
}
