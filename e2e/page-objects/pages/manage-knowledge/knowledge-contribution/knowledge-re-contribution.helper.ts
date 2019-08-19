import { StepLogger } from '../../../../../core/logger/step-logger';
import { CheckboxHelper } from '../../../../components/html/checkbox-helper';
import { ElementHelper } from '../../../../components/html/element-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { WaitHelper } from '../../../../components/html/wait-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { DfElement } from '../../../../components/misc-utils/df-elements-helper';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../../admin-login-page/admin-login.helper';
import { CommonPageHelper } from '../../common/common-page.helper';

import { KnowledgeReContributionHelperExtension } from './knowledge-re-contribution-extension.helper';
import { KnowledgeReContributionConstant } from './knowledge-re-contribution.constants';
import { KnowledgeReContributionPage } from './knowledge-re-contribution.po';

export class KnowledgeReContributionHelper extends KnowledgeReContributionHelperExtension {

    static async verifyPageContent() {
        StepLogger.subVerification('Verify Page heading of Knowledge Re-Contribution');
        const titles = KnowledgeReContributionConstant.titles;
        await PageHelper.switchToiFrame(KnowledgeReContributionPage.contentIFrame);
        await KnowledgeReContributionPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
    }

    static async navigateToKnowledgeReContribution() {
        StepLogger.subStep('Login And Navigate to Knowledge Re-Contribution');
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePage.hamburgerIcon.verifyDisplayedStatus();
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.verifySidebarFieldsDisplayed();
        await AdminHomePageHelper.clickManageKnowledge();
        await AdminHomePageHelper.verifyManageKnowledgeSubMenu();
        const knowledgeReContribution = await AdminHomePage.manageKnowledge.knowledgeReContribution.item.isDisplayed();
        if (!knowledgeReContribution) {
            await AdminHomePageHelper.clickSubMenu(AdminHomePage.manageKnowledge.knowledgeContribution);
        }
        await AdminHomePageHelper.verifyKnowledgeContributionSubMenu();
        await AdminHomePageHelper.clickSubMenu(AdminHomePage.manageKnowledge.knowledgeReContribution);
        await KnowledgeReContributionHelper.verifyPageContent();
    }

    static async clickContributeAuthoredDocuments() {
        StepLogger.subStep('Click Contribute Authored Document CheckBox');
        await KnowledgeReContributionPage.contributeAuthoredDocuments.checkBox.hoverOverAndClick();
    }

    static async verifyContributeAuthoredDocuments() {
        StepLogger.subVerification('Verify Contribute Authored Document is CheckBoxed And button enable');
        await ExpectationHelper.verifyCheckboxIsChecked(KnowledgeReContributionPage.contributeAuthoredDocuments.checkBox);
        await ExpectationHelper.verifyEnabledStatus(KnowledgeReContributionPage.buttons.generateBatFile);
        await ExpectationHelper.verifyEnabledStatus(KnowledgeReContributionPage.buttons.start);
    }

    static async enterFromAndTwoRange(fromNumber: string, toNumber: string) {
        StepLogger.subStep('Enter From and To number');
        const contributeAuthoredDocuments = KnowledgeReContributionPage.contributeAuthoredDocuments;
        await contributeAuthoredDocuments.fromInput.sendKeys(fromNumber);
        await contributeAuthoredDocuments.toInput.sendKeys(toNumber);
    }

    static async verifyFromAndTwoRange(fromNumber: string, toNumber: string) {
        StepLogger.subVerification('Verify From and To number');
        const contributeAuthoredDocuments = KnowledgeReContributionPage.contributeAuthoredDocuments;
        const value = HtmlHelper.attributes.value;
        await ExpectationHelper.verifyAttributeValue(contributeAuthoredDocuments.fromInput, value, fromNumber);
        await ExpectationHelper.verifyAttributeValue(contributeAuthoredDocuments.toInput, value, toNumber);
    }

    static async selectPublicationStatus(option: DfElement) {
        StepLogger.subStep('Select Publication Status Option');
        const publicationStatus = KnowledgeReContributionPage.publicationStatus;
        await publicationStatus.dropDown.hoverOverAndClick();
        await option.hoverOverAndClick();
    }

    static async selectPublicationStatusTemplateAndStyle() {
        StepLogger.subStep('Select Publication Status , Template and StyleSheet');
        const publicationStatus = KnowledgeReContributionPage.publicationStatus;
        await this.selectPublicationStatus(publicationStatus.draft);
        await KnowledgeReContributionPage.templates.firstTemplates.hoverOverAndClick();
        await KnowledgeReContributionPage.styleSheets.firstStyleSheets.hoverOverAndClick();
    }

    static async verifyPublicationStatusTemplateAndStyle() {
        StepLogger.subVerification('Verify Publication Status , Template and StyleSheet');
        const publicationStatus = KnowledgeReContributionPage.publicationStatus;
        const name = KnowledgeReContributionConstant.elementNames;
        const selectedPublicationStatus = await publicationStatus.dropDown.getSelectedOptionText();
        await ExpectationHelper.verifyStringValueContain(selectedPublicationStatus, name.draft);
        await ExpectationHelper.verifyDisplayedStatus(KnowledgeReContributionPage.templates.templatesList);
        await ExpectationHelper.verifyDisplayedStatus(KnowledgeReContributionPage.styleSheets.styleSheetList);
    }

    static async clickSelectUser() {
        StepLogger.subStep('Click Select User');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.button.clickButton();
    }

    static async verifySelectUserDialog() {
        StepLogger.subVerification('Verify Select User Dialog');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.dialogIFrame.verifyDisplayedStatus();
        await PageHelper.switchToiFrame(selectUser.dialogIFrame);
    }

    static async clickShowAllUser() {
        StepLogger.subStep('Click Show All User');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.showAllBtn.clickButton();
    }

    static async verifyUserList() {
        StepLogger.subVerification('Verify User List');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await PageHelper.switchToiFrame(selectUser.findUserFrame);
        await selectUser.userList.verifyDisplayedStatus();
    }

    static async enterLastname(lastName: string) {
        StepLogger.subStep('Enter Last Name');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.lastname.sendKeys(lastName);
    }

    static async enterLastnameAndSearch(lastName: string) {
        StepLogger.subStep('Enter Last Name and search');
        await this.enterLastname(lastName);
        await this.searchUser();
    }

    static async searchUser() {
        StepLogger.subStep('Click Search User');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.search.clickButton();
    }

    static async enterFirstName(firstname: string) {
        StepLogger.subStep('Enter First Name');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.firstname.sendKeys(firstname);
    }

    static async enterFirstNameAndSearch(firstname: string) {
        StepLogger.subStep('Enter First Name and Search');
        await this.enterFirstName(firstname);
        await this.searchUser();
    }

    static async enterUserName(username: string) {
        StepLogger.subStep('Enter User Name');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.username.sendKeys(username);
    }

    static async enterUserNameAndSearch(username: string) {
        StepLogger.subStep('Enter User Name And Search');
        await this.enterUserName(username);
        await this.searchUser();
    }

    static async verifyNoUserMessage() {
        StepLogger.subVerification('Verify No User Found Text');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await PageHelper.switchToiFrame(selectUser.findUserFrame);
        await selectUser.noUserMessage.verifyDisplayedStatus();
    }

    static async clickStart() {
        StepLogger.subStep('Click Start');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.start.clickButton();
    }

    static async verifyIdRangePopUpDisplayed() {
        StepLogger.subVerification('Verify Id Range message appear');
        await CommonPageHelper.switchToWindow(1);
        const item = await ElementHelper.getElementByText(KnowledgeReContributionConstant.titles.iDrangeMessage, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, KnowledgeReContributionConstant.titles.iDrangeMessage);
    }

    static async verifyIdRangePopUpNotDisplayed() {
        StepLogger.subVerification('Verify Message window close');
        const buttons = KnowledgeReContributionPage.buttons;
        await ExpectationHelper.verifyHiddenStatus(buttons.alertOK);
    }

    static async clickAlertOk() {
        StepLogger.subStep('Click Alert OK');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.alertOK.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async pageRefreshAndLogOut() {
        StepLogger.subStep('Refresh page and logout');
        await PageHelper.refreshPage(false);
        await AdminLoginPageHelper.logout(true);
    }

    static async verifyAlertPopUpDisplayed() {
        StepLogger.subVerification('Verify Alert Message');
        await CommonPageHelper.switchToWindow(1);
        const item = await ElementHelper.getElementByText(KnowledgeReContributionConstant.titles.enterValue, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, KnowledgeReContributionConstant.titles.enterValue);
    }

    static async verifyAlertPopUpNotDisplayed() {
        StepLogger.subVerification('Verify Message window close');
        const buttons = KnowledgeReContributionPage.buttons;
        await ExpectationHelper.verifyHiddenStatus(buttons.alertOK);
    }

    static async clickUser() {
        StepLogger.subStep('Click User');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.userList.hoverOverAndClick();
    }

    static async verifyProfileEditorDisplayed() {
        StepLogger.subVerification('Verify Profile Editor Window');
        await CommonPageHelper.switchToWindow(1);
        const titles = KnowledgeReContributionConstant.titles;
        await WaitHelper.waitForElementToBeDisplayed(KnowledgeReContributionPage.titles.pageTitle.item);
        await KnowledgeReContributionPage.titles.pageTitle.verifyContainsText(titles.profileEditor);
    }

    static async clickCancel() {
        StepLogger.subStep('Click Cancel');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.cancel.hoverOverAndClick();
    }

    static async verifyProfileEditorDisplayedAndCancel() {
        StepLogger.subVerification('Verify Profile Window And cancel');
        await this.verifyProfileEditorDisplayed();
        await this.clickCancel();
    }

    static async switchToDialogFrameAndclickCancel() {
        StepLogger.subStep('Switch Dialog Frame And Click Click cancel');
        await this.switchToDialogFrame();
        await this.clickCancel();
    }

    static async switchToDialogFrame() {
        StepLogger.subStep('Switch to Dialog Frame');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await PageHelper.switchToFirstTab();
        await PageHelper.switchToiFrame(KnowledgeReContributionPage.contentIFrame);
        await PageHelper.switchToiFrame(selectUser.dialogIFrame);
    }

    static async clickGenerateBat() {
        StepLogger.subStep('Click Generate Bat');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.generateBatFile.hoverOverAndClick();
    }

    static async verifySaveBatPopUpDisplayed() {
        StepLogger.subVerification('Verify Save bat File Pop Up');
        const titles = KnowledgeReContributionConstant.titles;
        await WaitHelper.waitForElementToBeDisplayed(KnowledgeReContributionPage.uiDialog.uiDialogTitle.item);
        await KnowledgeReContributionPage.uiDialog.uiDialogTitle.verifyContainsText(titles.saveBatFile);
    }

    static async verifyPopClosed() {
        StepLogger.subVerification('Verify PopUp is closed');
        const uiDialog = KnowledgeReContributionPage.uiDialog;
        await ExpectationHelper.verifyHiddenStatus(uiDialog.uiDialogTitle);
    }

    static async enterFileName() {
        StepLogger.subStep('Enter File Name');
        const uiDialog = KnowledgeReContributionPage.uiDialog;
        await uiDialog.fileNameTextBox.sendKeys(PageHelper.getUniqueId());
    }

    static async clickSubmit() {
        StepLogger.subStep('Click Submit');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.submit.hoverOverAndClick();
    }

    static async switchToDialogFrameAndclickSubmit() {
        StepLogger.subStep('Switch Dialog Frame And Click Submit');
        await this.switchToDialogFrame();
        await this.clickSubmit();
    }

    static async enterFileNameAndclickSubmit() {
        StepLogger.subStep('Enter File Name and Click Submit');
        await this.switchToDialogFrame();
        await this.enterFileName();
        await this.clickSubmit();
    }

    static async switchToFirstTabAndLogOut() {
        StepLogger.subStep('Switch to first tab and LogOut');
        await PageHelper.switchToFirstTab();
        await this.pageRefreshAndLogOut();
    }

    static async selectUser() {
        StepLogger.subStep('Select User');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.userCheckBox.hoverOverAndClick();
    }

    static async verifySelectedUserList() {
        StepLogger.subVerification('Verify Selected User List');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await this.switchToDialogFrame();
        await PageHelper.switchToiFrame(selectUser.selectedFrame);
        await selectUser.selectedUserList.verifyDisplayedStatus();
    }

    static async verifyNoUserSelected() {
        StepLogger.subVerification('Verify No user is selected');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.selectedUser.verifyHiddenStatus();
    }

    static async verifySelectedUser() {
        StepLogger.subVerification('Verify Selected User in Main Page');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await PageHelper.switchToFirstTab();
        await PageHelper.switchToiFrame(KnowledgeReContributionPage.contentIFrame);
        await selectUser.selectedUser.verifyDisplayedStatus();
    }

    static async clickRemoveUser() {
        StepLogger.subStep('Click Remove');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.removeSelectedUser.hoverOverAndClick();
    }

    static async verifySelectedUserRemoved() {
        StepLogger.subVerification('Verify User is Removed from selected User List');
        const selectUser = KnowledgeReContributionPage.selectUser;
        await selectUser.selectedUserList.verifyHiddenStatus();
    }

    static async switchToDialogFrameAndclickOk() {
        StepLogger.subStep('Switch To Dialog Frame And Click Ok');
        await this.switchToDialogFrame();
        await this.clickOk();
    }

    static async verifyPerformTaskPopUpDisplayed() {
        StepLogger.subVerification('Verify Perform Task Pop');
        await CommonPageHelper.switchToWindow(1);
        const item = await ElementHelper.getElementByText(KnowledgeReContributionConstant.titles.performSelectedTask, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, KnowledgeReContributionConstant.titles.performSelectedTask);
    }

    static async clickNoButtonOnPopUp() {
        StepLogger.subStep('Click on No button');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.no.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async clickYesButtonOnPopUp() {
        StepLogger.subStep('Click on Yes button');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.yes.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async verifyContributionProgressMonitorDisplayed() {
        StepLogger.subVerification('Verify Contribution Progress Monitor Window');
        const contributionProgressMonitor = KnowledgeReContributionPage.contributionProgressMonitor;
        await CommonPageHelper.switchToWindow(1);
        await contributionProgressMonitor.contribution.verifyDisplayedStatus();
        await contributionProgressMonitor.queued.verifyDisplayedStatus();
        await contributionProgressMonitor.previousRuns.verifyDisplayedStatus();
    }

    static async verifyContributionProgressMonitorDisplayedAndClickOk() {
        StepLogger.subVerification('Verify Contribution Progress Monitor Window And Click Ok');
        await this.verifyContributionProgressMonitorDisplayed();
        await this.clickOk();
    }

    static async navigateToContributionProgressMonitorDisplayedAndClickOk() {
        StepLogger.subStep('Login And Navugate to Contribution Progress Monitor Window');
        await this.navigateToKnowledgeReContribution();
        await this.clickContributeAuthoredDocuments();
        await this.verifyContributeAuthoredDocuments();
        await this.enterFromAndTwoRange(Constants.stringNumber.one, Constants.stringNumber.two);
        await this.verifyFromAndTwoRange(Constants.stringNumber.one, Constants.stringNumber.two);
        await this.selectPublicationStatusTemplateAndStyle();
        await this.verifyPublicationStatusTemplateAndStyle();
        await this.clickStart();
        await this.verifyPerformTaskPopUpDisplayed();
        await this.clickYesButtonOnPopUp();
        await this.verifyContributionProgressMonitorDisplayed();
    }

    static async clickOk() {
        StepLogger.subStep('Click OK');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.alertOK.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async clickViewDetails() {
        StepLogger.subStep('Click View Details');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.viewDetails.scrollToElement();
        await buttons.viewDetails.hoverOverAndClick();
    }

    static async verifyContributionTabDetail() {
        StepLogger.subVerification('Verify Configuration Tab');
        const contributionProgressMonitor = KnowledgeReContributionPage.contributionProgressMonitor;
        await contributionProgressMonitor.updatedLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.statusLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.totalProcessedLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.itemsProcessedLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.sucessfulLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.failedLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.processingLabel.verifyDisplayedStatus();
    }

    static async verifyViewDetailAndClickOk() {
        StepLogger.subVerification('Verify View Detail and click Ok');
        await PageHelper.switchToNewTabIfAvailable();
        await this.verifyContributionTabDetail();
        await this.clickOk();
    }

    static async clickStop() {
        StepLogger.subStep('Click Stop');
        const buttons = KnowledgeReContributionPage.buttons;
        await buttons.stop.clickButton();
    }

    static async clickViewDetailAndStop() {
        StepLogger.subStep('Click View Detail And Stop');
        await this.clickViewDetails();
        await PageHelper.switchToNewTabIfAvailable();
        await this.clickStop();
    }

    static async verifyStopDocumentPopUpDisplayed() {
        StepLogger.subVerification('Verify Stop Queued Document PopUp');
        await PageHelper.switchToNewTabIfAvailable(2);
        const item = await ElementHelper.getElementByText(KnowledgeReContributionConstant.titles.stopQueuingDoc, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, KnowledgeReContributionConstant.titles.stopQueuingDoc);
    }

    static async verifyProcessStatusAndPage() {
        StepLogger.subVerification('Verify Progress status and Knowledge re-contributor page');
        await this.verifyContributionProgressMonitorDisplayedAndClickOk();
        await this.verifyPageContent();
    }

    static async clickQueuedTab() {
        StepLogger.subStep('Click Queued Tab');
        const contributionProgressMonitor = KnowledgeReContributionPage.contributionProgressMonitor;
        await contributionProgressMonitor.queued.hoverOverAndClick();
    }

    static async verifyQueuedTab() {
        StepLogger.subVerification('Verify Queued Tab');
        const contributionProgressMonitor = KnowledgeReContributionPage.contributionProgressMonitor;
        await contributionProgressMonitor.updatedLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.statusLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.totalQueuedLabel.verifyDisplayedStatus();
        await contributionProgressMonitor.queued.verifyDisplayedStatus();
    }

    static async markContributeFailedItemsCheckBox() {
        await CheckboxHelper.markCheckbox(
            KnowledgeReContributionPage.knowledgeContributionElements.contributeFailedItemsCheckbox,
            true);
    }

    static async verifyContributeFailedItemsCheckBoxIsMarked() {
        const isMarked = await CheckboxHelper.isCheckboxChecked(
            KnowledgeReContributionPage.knowledgeContributionElements.contributeFailedItemsCheckbox);
        await ExpectationHelper.verifyStringEqualTo(isMarked.toString(), true.toString());
    }

    static async verifyStartButonIsEnabled() {
        const disable = await ElementHelper.getDisabledAttributeValue(KnowledgeReContributionPage.buttons.start);
        await ExpectationHelper.verifyStringEqualTo(disable,
            null);
    }
}
