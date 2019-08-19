import { StepLogger } from '../../../../../core/logger/step-logger';
import { ElementHelper } from '../../../../components/html/element-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { WaitHelper } from '../../../../components/html/wait-helper';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../../admin-login-page/admin-login.helper';
import { CommonPageHelper } from '../../common/common-page.helper';

import { RssFeedManagerConstant } from './rss-feed-manager.constants';
import { RssFeedManagerPage } from './rss-feed-manager.po';

export class RssFeedManagerHelper {

    static async verifyNavigation() {
        StepLogger.subVerification('Verify Page heading of RSS Feed Manager');
        const titles = RssFeedManagerConstant.titles;
        await PageHelper.switchToDefaultContentAndIFrame(RssFeedManagerPage.contentIFrame);
        await RssFeedManagerPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
    }

    static async verifyPageOption() {
        StepLogger.subVerification('Verify Page Option of RSS Feed Manager');
        const buttons = RssFeedManagerPage.buttons;
        const tableDetail = RssFeedManagerPage.tableDetail;
        await buttons.create.verifyDisplayedStatus();
        await buttons.delete.verifyDisplayedStatus();
        await tableDetail.name.verifyDisplayedStatus();
        await tableDetail.accessLevels.verifyDisplayedStatus();
        await tableDetail.description.verifyDisplayedStatus();
        await tableDetail.knowledgeSources.verifyDisplayedStatus();
        await tableDetail.language.verifyDisplayedStatus();
        await tableDetail.name.verifyDisplayedStatus();
        await tableDetail.segments.verifyDisplayedStatus();
        await tableDetail.text.verifyDisplayedStatus();
    }

    static async navigateToRssFeedManager() {
        StepLogger.subStep('Login And Navigate to RSS Feed Manager');
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePage.hamburgerIcon.verifyDisplayedStatus();
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.verifySidebarFieldsDisplayed();
        await AdminHomePageHelper.clickAdministerSystem();
        await AdminHomePageHelper.verifyAdministerSystemSubMenu();
        await AdminHomePage.administerSystem.nofiticationsAndSubscriptions.hoverOverAndClick();
        await AdminHomePageHelper.verifyNotificationAndSubscriptionSubMenu();
        await AdminHomePage.administerSystem.rssFeedManager.hoverOverAndClick();
        await this.verifyNavigation();
        await this.verifyPageOption();
    }

    static async verifyRssFeedDetailPopUp() {
        StepLogger.subVerification('Verify Rss Feed Detail PopUp');
        const titles = RssFeedManagerConstant.titles;
        await WaitHelper.waitForElementToBeDisplayed(RssFeedManagerPage.uiDialog.uiDialogTitle.item);
        await RssFeedManagerPage.uiDialog.uiDialogTitle.verifyContainsText(titles.rssFeedDetail);
    }

    static async verifyPopClosed() {
        StepLogger.subVerification('Verify PopUp is closed');
        const uiDialog = RssFeedManagerPage.uiDialog;
        await uiDialog.uiDialogTitle.verifyHiddenStatus();
    }

    static async verifyRssFeedDetailOption() {
        StepLogger.subVerification('Verify Rss Feed Detail Option');
        const rssFeedDetail = RssFeedManagerPage.rssFeedDetail;
        const buttons = RssFeedManagerPage.buttons;
        await this.switchToDialogFrame();
        await buttons.copy.verifyPresentStatus();
        await buttons.delete.verifyPresentStatus();
        await buttons.cancel.verifyPresentStatus();
        await buttons.submit.verifyPresentStatus();
        await rssFeedDetail.name.verifyDisplayedStatus();
        await rssFeedDetail.description.verifyDisplayedStatus();
        await rssFeedDetail.language.verifyDisplayedStatus();
        await rssFeedDetail.urlRoot.verifyDisplayedStatus();
        await rssFeedDetail.knowledgeSourcesInput.verifyDisplayedStatus();
        await rssFeedDetail.accessLevelsInput.verifyDisplayedStatus();
        await rssFeedDetail.segmentsInput.verifyDisplayedStatus();
        await rssFeedDetail.knowledgeSourcesSpan.verifyPresentStatus();
        await rssFeedDetail.accessLevelsSpan.verifyPresentStatus();
        await rssFeedDetail.segmentsSpan.verifyPresentStatus();
        await rssFeedDetail.title.verifyDisplayedStatus();
    }

    static async clickCancel() {
        StepLogger.subStep('Click Cancel');
        const buttons = RssFeedManagerPage.buttons;
        await buttons.cancel.scrollToElement();
        await buttons.cancel.hoverOverAndClick();
    }

    static async switchToDialogFrame() {
        StepLogger.subStep('Switch to Dialog Frame');
        const rssFeedDetail = RssFeedManagerPage.rssFeedDetail;
        await PageHelper.switchToFirstTab();
        await PageHelper.switchToiFrame(RssFeedManagerPage.contentIFrame);
        await PageHelper.switchToiFrame(rssFeedDetail.dialogIFrame);
    }

    static async verifySubmitNotEnabled() {
        StepLogger.subVerification('Verify Submit Button is not Enabled');
        const buttons = RssFeedManagerPage.buttons;
        await ExpectationHelper.verifyAttributePresent(buttons.submit, HtmlHelper.attributes.disabled);
    }

    static async selectUrlRootOption() {
        StepLogger.subStep('Select Url Root Option');
        await RssFeedManagerPage.rssFeedDetail.urlRoot.hoverOverAndClick();
        await RssFeedManagerPage.rssFeedDetail.urlRootOption.clickButton();
        const selectedUrlRootOption = await RssFeedManagerPage.rssFeedDetail.urlRoot.getSelectedOptionText();
        return selectedUrlRootOption;
    }

    static async selectLanguageOption() {
        StepLogger.subStep('Select URL option');
        await RssFeedManagerPage.rssFeedDetail.language.hoverOverAndClick();
        await RssFeedManagerPage.rssFeedDetail.languageOption.clickButton();
        const selectedLanguageOption = await RssFeedManagerPage.rssFeedDetail.language.getSelectedOptionText();
        return selectedLanguageOption;
    }

    static async verifySelectedUrlRootOption(expected: string) {
        StepLogger.subVerification('Verify Selected URL Root Option');
        const actual = await RssFeedManagerPage.rssFeedDetail.urlRoot.getSelectedOptionText();
        await ExpectationHelper.verifyStringValueContain(actual, expected);
    }

    static async verifySelectedLanguageOption(expected: string) {
        StepLogger.subVerification('Verify Selected Language Option');
        const actual = await RssFeedManagerPage.rssFeedDetail.language.getSelectedOptionText();
        await ExpectationHelper.verifyStringValueContain(actual, expected);
    }

    static async verifyCreatedRssFeed(feedName: string, language: string) {
        StepLogger.subVerification('Verify Created Rss Feed Record Name and Language');
        await this.verifyCreatedRssFeedByName(feedName);
        await ExpectationHelper.verifyContainsText(RssFeedManagerPage.getRssFeed(feedName).record, language);
    }

    static async verifyCreatedRssFeedByName(feedName: string) {
        StepLogger.subVerification('Verify Created Rss Feed');
        await RssFeedManagerPage.getRssFeed(feedName).record.verifyDisplayedStatus();
    }

    static async deleteRssFeed(feedName: string) {
        StepLogger.subStep('Delete the Rss Feed');
        await this.verifyCreatedRssFeedByName(feedName);
        await RssFeedManagerPage.getRssFeed(feedName).recordCheckBox.hoverOverAndClick();
        await RssFeedManagerPage.buttons.delete.hoverOverAndClick();
        await this.verifyDeletedPopUpDisplayed();
        await this.clickYesButtonOnPopUp();
    }

    static async verifyCreatedRssFeedAndDelete(feedName: string, language: string) {
        StepLogger.subVerification('Verify Created Rss Feed And Delete');
        await this.verifyCreatedRssFeed(feedName, language );
        await this.deleteRssFeed(feedName);
    }

    static async verifyCreatedRssFeedByNameAndDelete(feedName: string) {
        StepLogger.subVerification('Verify Created Rss Feed By name And Delete');
        await PageHelper.switchToDefaultContentAndIFrame(RssFeedManagerPage.contentIFrame);
        await this.verifyCreatedRssFeedByName(feedName);
        await this.deleteRssFeed(feedName);
    }

    static async verifyDeletedPopUpDisplayed() {
        StepLogger.subVerification('Verify Deleted PopUp');
        await CommonPageHelper.switchToWindow(1);
        const item = await ElementHelper.getElementByText(RssFeedManagerConstant.titles.deleteSelectedTask, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, RssFeedManagerConstant.titles.deleteSelectedTask);
    }

    static async clickNoButtonOnPopUp() {
        StepLogger.subStep('Click on No button');
        const buttons = RssFeedManagerPage.buttons;
        await buttons.no.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async clickYesButtonOnPopUp() {
        StepLogger.subStep('Click on Yes button');
        const buttons = RssFeedManagerPage.buttons;
        await buttons.yes.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async createNewRssFeed() {
        StepLogger.subStep('Create as New Rss Feed');
        await RssFeedManagerPage.buttons.create.hoverOverAndClick();
        await RssFeedManagerHelper.verifyRssFeedDetailOption();
        const feedName = PageHelper.getUniqueId();
        await RssFeedManagerPage.rssFeedDetail.name.sendKeys(feedName);
        await RssFeedManagerPage.rssFeedDetail.name.verifyTextEntered(feedName);
        await RssFeedManagerPage.buttons.submit.hoverOverAndClick();
        await RssFeedManagerHelper.verifyNavigation();
        await RssFeedManagerHelper.verifyCreatedRssFeedByName(feedName);
        return feedName;
    }

    static async clickOk() {
        StepLogger.subStep('Click OK');
        const buttons = RssFeedManagerPage.buttons;
        await buttons.oK.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async verifyDuplicatePopUpDisplayed() {
        StepLogger.subVerification('Verify Duplicate Record PopUp');
        await CommonPageHelper.switchToWindow(1);
        const item = await ElementHelper.getElementByText(RssFeedManagerConstant.titles.feedNameExist, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, RssFeedManagerConstant.titles.feedNameExist);
    }

    static async clickRssFeed(feedName: string) {
        StepLogger.subStep('Click Rss Feed name');
        await this.verifyCreatedRssFeedByName(feedName);
        await RssFeedManagerPage.getRssFeed(feedName).recordName.hoverOverAndClick();
    }

    static async verifyRssFeedDetailOptionAndClickCancel() {
        StepLogger.subVerification('Verify Rss Feed Detail PopUp and click cancel');
        await this.verifyRssFeedDetailOption();
        await this.clickCancel();
    }

    static async enterFeedNameAndClickSubmit(feedName: string) {
        StepLogger.subStep('Enter Rss Feed name And Click Submit');
        await RssFeedManagerPage.rssFeedDetail.name.sendKeys(feedName);
        await RssFeedManagerPage.buttons.submit.hoverOverAndClick();
    }

    static async verifyKnowledgeSourcePopUp() {
        StepLogger.subVerification('Verify Knowledge Source PopUp');
        const titles = RssFeedManagerConstant.titles;
        await WaitHelper.waitForElementToBeDisplayed(RssFeedManagerPage.uiDialog.uiDialogTitle.item);
        await RssFeedManagerPage.uiDialog.uiDialogTitle.verifyContainsText(titles.knowledgeSource);
    }

    static async switchToFrameAndSelectKnowledgeSourceOption() {
        StepLogger.subStep('Switch to frame and Select Knowledge Source Option');
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
        const knowledgeOptionText = await this.selectKnowledgeSourceOption();
        return knowledgeOptionText;
    }

    static async selectKnowledgeSourceOption() {
        StepLogger.subStep('Select Knowledge Source Option');
        const knowledgeOptionText = await RssFeedManagerPage.rssFeedDetail.availableKnowledgeSourceOption.getText();
        await RssFeedManagerPage.rssFeedDetail.availableKnowledgeSourceOption.hoverOverAndClick();
        await RssFeedManagerPage.rssFeedDetail.move.hoverOverAndClick();
        return knowledgeOptionText;
    }

    static async switchToFrameAndSelectMultiKnowledgeSourceOption() {
        StepLogger.subStep('Switch to Frame and Select multiple Knowledge Source Option');
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
        const knowledgeOptionText = await this.selectKnowledgeSourceOption();
        await this.selectKnowledgeSourceOption();
        return knowledgeOptionText;
    }

    static async selectKnowledgeSourceForNewRssFeed() {
        StepLogger.subStep('Select Knowledge Source for New Rss');
        await RssFeedManagerPage.buttons.create.hoverOverAndClick();
        await RssFeedManagerHelper.verifyRssFeedDetailOption();
        const feedName = PageHelper.getUniqueId();
        await RssFeedManagerPage.rssFeedDetail.name.sendKeys(feedName);
        await RssFeedManagerPage.rssFeedDetail.name.verifyTextEntered(feedName);
        await RssFeedManagerPage.rssFeedDetail.knowledgeSourcesInput.hoverOverAndClick();
        await RssFeedManagerHelper.verifyKnowledgeSourcePopUp();
        await this.switchToFrameAndSelectKnowledgeSourceOption();
        return feedName;
    }

    static async verifySelectedKnowledgeOption() {
        StepLogger.subVerification('Verify Knowledge Source Selected Option');
        const rssFeedDetail = RssFeedManagerPage.rssFeedDetail;
        await rssFeedDetail.selectedKnowledgeSourceOption.verifyDisplayedStatus();
    }

    static async verifyRssFeedLanguageKnowldgeAndDelete(feedName: string, language: string, knowledgeSource: string ) {
        StepLogger.subVerification('Verify Rss Feed Language, knowledge And Delete');
        await this.verifyCreatedRssFeed(feedName, language );
        await this.verifyCreatedRssFeed(feedName, knowledgeSource );
        await this.deleteRssFeed(feedName);
    }

    static async verifyRssDetailAndDisplayedKnowledgeSource() {
        StepLogger.subVerification('Verify Knowledge Source Displayed in Rss Detail');
        await RssFeedManagerHelper.verifyRssFeedDetailOption();
        await RssFeedManagerPage.rssFeedDetail.knowledgeSourcesSpan.verifyDisplayedStatus();
    }

    static async selectSelectedKnowledgeSource() {
        StepLogger.subStep('Select selected Knowledge Source');
        await RssFeedManagerHelper.selectKnowledgeSourceOption();
        await RssFeedManagerPage.rssFeedDetail.selectedKnowledgeSourceOption.hoverOverAndClick();
    }

    static async verifyRemovedSelectedKnowledgeSource() {
        StepLogger.subVerification('Verify displayed available Option and removed selected option');
        await RssFeedManagerPage.rssFeedDetail.selectedKnowledgeSourceOption.verifyHiddenStatus();
        await RssFeedManagerPage.rssFeedDetail.availableKnowledgeSourceOption.verifyDisplayedStatus();
    }

    static async verifyAccessLevelPopUp() {
        StepLogger.subVerification('Verify Access Level PopUp');
        const titles = RssFeedManagerConstant.titles;
        await WaitHelper.waitForElementToBeDisplayed(RssFeedManagerPage.uiDialog.uiDialogTitle.item);
        await RssFeedManagerPage.uiDialog.uiDialogTitle.verifyContainsText(titles.selectAccessLevels);
    }

    static async switchToContentFrame() {
        StepLogger.subStep('Switch to Content Frame');
        const rssFeedDetail = RssFeedManagerPage.rssFeedDetail;
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(rssFeedDetail.dialogIFrame);
        await PageHelper.switchToiFrame(rssFeedDetail.content);
    }

    static async switchToTreeFrame() {
        StepLogger.subStep('Switch to Tree frame');
        await this.switchToContentFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.tree);
    }

    static async switchToFrameAndSelectAccessLevelOption() {
        StepLogger.subStep('Select Access Level Option');
        await this.switchToTreeFrame();
        await RssFeedManagerPage.rssFeedDetail.salAgent.hoverOverAndClick();
        await this.switchToContentFrame();
        await RssFeedManagerPage.buttons.add.hoverOverAndClick();
    }

    static async verifySelectedAccessLevelOption() {
        StepLogger.subVerification('Verify Selected Access Level Option');
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
        await RssFeedManagerPage.rssFeedDetail.childOption.verifyDisplayedStatus();
    }

    static async removeChildLevelAccessLevelOption() {
        StepLogger.subStep('Removed Child Level Access Level');
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
        await RssFeedManagerPage.rssFeedDetail.childOption.hoverOverAndClick();
        await RssFeedManagerPage.buttons.remove.hoverOverAndClick();
    }

    static async verifyRemovedChildLevelAccessLevelOption() {
        StepLogger.subVerification('Verify Removed Child level Access Level Option');
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
        await RssFeedManagerPage.rssFeedDetail.childOption.verifyHiddenStatus();
    }

    static async selectAccessLevelForNewRssFeed() {
        StepLogger.subStep('Select Knowledge Source for New Rss');
        await RssFeedManagerPage.buttons.create.hoverOverAndClick();
        await RssFeedManagerHelper.verifyRssFeedDetailOption();
        const feedName = PageHelper.getUniqueId();
        await RssFeedManagerPage.rssFeedDetail.name.sendKeys(feedName);
        await RssFeedManagerPage.rssFeedDetail.name.verifyTextEntered(feedName);
        await RssFeedManagerPage.rssFeedDetail.accessLevelsInput.hoverOverAndClick();
        await RssFeedManagerHelper.verifyAccessLevelPopUp();
        await this.switchToFrameAndSelectAccessLevelOption();
        await this.verifySelectedAccessLevelOption();
        return feedName;
    }

    static async removeParentLevelAccessLevelOption() {
        StepLogger.subStep('Removed Parent Level Access Level');
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
        await RssFeedManagerPage.rssFeedDetail.parentOption.hoverOverAndClick();
        await RssFeedManagerPage.buttons.remove.hoverOverAndClick();
    }

    static async verifyRemovedParentLevelAccessLevelOption() {
        StepLogger.subVerification('Verify Removed Parent level Access Level Option');
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
        await RssFeedManagerPage.rssFeedDetail.parentOption.verifyHiddenStatus();
    }

    static async verifySegmentPopUp() {
        StepLogger.subVerification('Verify Segment PopUp');
        const titles = RssFeedManagerConstant.titles;
        await WaitHelper.waitForElementToBeDisplayed(RssFeedManagerPage.uiDialog.uiDialogTitle.item);
        await RssFeedManagerPage.uiDialog.uiDialogTitle.verifyContainsText(titles.selectUniversalMeta);
    }

    static async clickSearchOption() {
        StepLogger.subStep('Click Search Option');
        await this.switchToDialogToDialogFrame();
        await RssFeedManagerPage.rssFeedDetail.search.hoverOverAndClick();
    }

    static async switchToDialogToDialogFrame() {
        StepLogger.subStep('Switch Dialog ->Dialog Frame');
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.dialogIFrame);
    }

    static async switchToSearchFrame() {
        StepLogger.subStep('Switch to search Frame');
        await this.switchToDialogToDialogFrame();
        await PageHelper.switchToiFrame(RssFeedManagerPage.rssFeedDetail.searchIFrame);
    }

    static async enterAndSearchSegment(searchText: string) {
        StepLogger.subStep('Enter And Search segment');
        await this.switchToSearchFrame();
        await RssFeedManagerPage.rssFeedDetail.searchText.sendKeys(searchText);
        await RssFeedManagerPage.rssFeedDetail.searchIcon.hoverOverAndClick();
    }

    static async verifySegmentSearchResult() {
        StepLogger.subVerification('Verify Searched Segment Result');
        await RssFeedManagerPage.rssFeedDetail.searchResultTable.verifyDisplayedStatus();
    }

    static async addSearchedSegment() {
        StepLogger.subStep('Click Add to Searched Segment');
        await RssFeedManagerPage.rssFeedDetail.searchResultAdd.hoverOverAndClick();
    }

    static async verifySearchTextBox() {
        StepLogger.subVerification('Verify Searched Text Box');
        await this.switchToSearchFrame();
        await RssFeedManagerPage.rssFeedDetail.searchText.verifyDisplayedStatus();
    }

    static async verifySelectedSegment() {
        StepLogger.subVerification('Verify Selected Segment is displayed');
        await this.switchToDialogToDialogFrame();
        await RssFeedManagerPage.rssFeedDetail.selectedSegmentOption.verifyDisplayedStatus();
    }

    static async selectAndRemoveSelectedSegment() {
        StepLogger.subStep('Remove the selected Segment');
        await RssFeedManagerPage.rssFeedDetail.selectedSegmentOption.hoverOverAndClick();
        await RssFeedManagerPage.buttons.remove.hoverOverAndClick();
    }

    static async verifySelectedSegmentRemoved() {
        StepLogger.subVerification('Verify Selected Segment is removed');
        await RssFeedManagerPage.rssFeedDetail.selectedSegmentOption.verifyHiddenStatus();
    }

    static async selectSegmentForNewRssFeed() {
        StepLogger.subStep('Select Segment for New Rss Feed');
        await RssFeedManagerPage.buttons.create.hoverOverAndClick();
        await this.verifyRssFeedDetailOption();
        const feedName = PageHelper.getUniqueId();
        await RssFeedManagerPage.rssFeedDetail.name.sendKeys(feedName);
        await RssFeedManagerPage.rssFeedDetail.name.verifyTextEntered(feedName);
        await RssFeedManagerPage.rssFeedDetail.segmentsInput.hoverOverAndClick();
        await this.verifySegmentPopUp();
        await this.clickSearchOption();
        await this.verifySearchTextBox();
        await this.enterAndSearchSegment(RssFeedManagerConstant.elementNames.article);
        await this.verifySegmentSearchResult();
        await this.addSearchedSegment();
        await this.verifySelectedSegment();
        return feedName;
    }

    static async clickSearchAndEnterSegment(searchText: string) {
        StepLogger.subStep('Click Search Option and Enter Search text');
        await this.clickSearchOption();
        await this.verifySearchTextBox();
        await this.enterAndSearchSegment(searchText);
    }

    static async verifySelectedPendingSegment() {
        StepLogger.subVerification('Verify Selected Pending Segment is displayed');
        await this.switchToDialogToDialogFrame();
        await RssFeedManagerPage.rssFeedDetail.selectedPendingSegmentOption.verifyDisplayedStatus();
    }
}
