import { StepLogger } from '../../../../core/logger/step-logger';
import { CheckboxHelper } from '../../../components/html/checkbox-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { AdminHomePage } from '../admin-home-page/admin-home.po';
import { CommonPage } from '../common/common.po';

import { KnowledgeCentralCollaborationPage } from './knowledge-central-collaboration.po';

export class KnowledgeCentralCollaborationHelper {

    static async verifyCollaborationPageDisplayed() {
        await KnowledgeCentralCollaborationPage.titles.collaboration.verifyDisplayedStatus();
    }

    static async verifyCollaborationPageItems() {
        StepLogger.subVerification('Verify Collaboration Page Items');
        const label = KnowledgeCentralCollaborationPage.collaborationPageItems;
        await PageHelper.switchToiFrame(AdminHomePage.contentIFrame);
        await label.newCollaborationButton.verifyDisplayedStatus();
        await label.subject.verifyDisplayedStatus();
        await label.originator.verifyDisplayedStatus();
        await label.customer.verifyDisplayedStatus();
        await label.caseId.verifyDisplayedStatus();
        await label.lastUpdate.verifyDisplayedStatus();
        await label.delete.verifyDisplayedStatus();
    }

    static async clickOnNewCollaborationButton() {
        StepLogger.subStep('Click On New Collaboration Button');
        await PageHelper.switchToiFrame(AdminHomePage.contentIFrame);
        await KnowledgeCentralCollaborationPage.collaborationPageItems.newCollaborationButton.clickButton();
    }

    static async verifyCollaboratorCreatorWindow() {
        StepLogger.subVerification('Verify Collaborator Creator Window');
        await WaitHelper.waitForElementToBeDisplayed(KnowledgeCentralCollaborationPage.collaborationPageItems.collaboratorCreatorWindow.item);
        await KnowledgeCentralCollaborationPage.collaborationPageItems.collaboratorCreatorWindow.verifyDisplayedStatus();
    }

    static async verifyCollaboratorCreatorWindowClosed() {
        StepLogger.subVerification('Verify Collaborator Creator Window Closed');
        await KnowledgeCentralCollaborationPage.collaborationPageItems.collaboratorCreatorWindow.verifyHiddenStatus();
    }

    static async verifyCollaboratorCreatorWindowItems() {
        StepLogger.subVerification('Verify Collaborator Creator Window Items');
        const label = KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems;
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await label.subject.verifyDisplayedStatus();
        await label.message.verifyDisplayedStatus();
        await label.urgent.verifyDisplayedStatus();
        await label.normal.verifyDisplayedStatus();
        await label.addCollaborators.verifyDisplayedStatus();
        await label.submit.verifyDisplayedStatus();
        await label.cancel.verifyDisplayedStatus();
    }

    static async clickOnAddCollaboratorButton() {
        StepLogger.subStep('Click On Add Collaborator Button');
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.addCollaborators.clickButton();
    }

    static async verifyExpertFinderPaneDisplayed() {
        StepLogger.subVerification('Verify Expert Finder Pane Displayed');
        await KnowledgeCentralCollaborationPage.expertFinderItems.expertFinderPane.verifyDisplayedStatus();
    }

    static async verifyExpertFinderItems() {
        StepLogger.subVerification('Verify Expert Finder Items');
        const label = KnowledgeCentralCollaborationPage.expertFinderItems;
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await label.suggestedTab.verifyDisplayedStatus();
        await label.mostRecentTab.verifyDisplayedStatus();
        await label.findTab.verifyDisplayedStatus();
        await label.selectedCollaborators.verifyDisplayedStatus();
        await label.okButton.verifyDisplayedStatus();
        await label.cancelButton.verifyDisplayedStatus();
    }

    static async clickOnFindTab() {
        StepLogger.subStep('Click On Find Tab');
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await KnowledgeCentralCollaborationPage.expertFinderItems.findTab.clickLink();
    }

    static async verifyFindTabItems() {
        StepLogger.subVerification('Verify Find Tab Items');
        const label = KnowledgeCentralCollaborationPage.findTabItems;
        await label.firstName.verifyDisplayedStatus();
        await label.lastName.verifyDisplayedStatus();
        await label.groupName.verifyDisplayedStatus();
        await label.search.verifyDisplayedStatus();
        await label.showAllButton.verifyDisplayedStatus();
    }

    static async clickOnShowAllButton() {
        StepLogger.subStep('Click On Show All Button');
        await KnowledgeCentralCollaborationPage.findTabItems.showAllButton.clickButton();
    }

    static async verifyCollaboratorsList() {
        StepLogger.subVerification('Verify Collaborators List');
        await PageHelper.executeInIFrame(KnowledgeCentralCollaborationPage.findIFrame, async () => {
            await KnowledgeCentralCollaborationPage.findTabItems.collaboratorsList.verifyDisplayedStatus();
        });
    }

    static async selectCollaboratorAndVerify() {
        StepLogger.subStep('Select Collaborator');
        const item = KnowledgeCentralCollaborationPage.findTabItems.collaboratorsList;
        await PageHelper.switchToDefaultContent();
        await PageHelper.executeInIFrames(CommonPage.contentDialogDialogFindIFrames, async () => {
            await CheckboxHelper.markCheckbox(item, true);
            StepLogger.subVerification('Verify Collaborator Selected');
            await ExpectationHelper.verifyCheckboxIsChecked(item);
        });
    }

    static async deSelectCollaboratorAndVerify() {
        StepLogger.subStep('De Select Collaborator');
        const item = KnowledgeCentralCollaborationPage.findTabItems.collaboratorsList;
        await CheckboxHelper.unCheckCheckbox(item, true);
        StepLogger.subVerification('Verify Collaborator Selected');
        await ExpectationHelper.verifyCheckBoxNotSelected(item);
    }

    static async clickOkInExpertFinderPane() {
        StepLogger.subStep('Click Ok In Expert Finder Pane');
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await KnowledgeCentralCollaborationPage.expertFinderItems.okButton.clickButton();
    }

    static async clickOkInExpertFinderPaneNew(switchBack = true) {
        await PageHelper.executeInIFrames(CommonPage.contentDialogDialogIFrames, async () => {
            await KnowledgeCentralCollaborationPage.expertFinderItems.okButton.clickButton();
        }, switchBack);
    }

    static async verifyErrorPopup(error: string) {
        StepLogger.subVerification('Verify Error Message With Ok Button');
        await PageHelper.switchToNewTabIfAvailable();
        await KnowledgeCentralCollaborationPage.errorPopup(error).verifyDisplayedStatus();
        await KnowledgeCentralCollaborationPage.okOnErrorPopup.verifyDisplayedStatus();
    }

    static async clickOkOnErrorPopup() {
        StepLogger.subStep('Click OK On Error Popup');
        await KnowledgeCentralCollaborationPage.okOnErrorPopup.clickButton();
        await PageHelper.switchToFirstTab();
    }

    static async verifyErrorPopupClosed(error: string) {
        StepLogger.subVerification('Verify Error Message With Ok Button Closed');
        await PageHelper.switchToNewTabIfAvailable();
        await KnowledgeCentralCollaborationPage.errorPopup(error).verifyHiddenStatus();
        await KnowledgeCentralCollaborationPage.okOnErrorPopup.verifyHiddenStatus();
    }

    static async clickSubmitOnCollaboratorCreatorWindow() {
        StepLogger.subStep('Click Submit On Collaborator Creator Window');
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.submit.clickButton();
    }

    static async enterMessage(message: string) {
        StepLogger.subStep('Enter Message');
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.message.sendKeys(message);
    }

    static async enterSubject(message: string) {
        StepLogger.subStep('Enter Subject');
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.subject.sendKeys(message);
    }

    static async selectUrgent() {
        StepLogger.subStep('Select Urgent');
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.urgent.clickButton();
    }

    static async selectNormal() {
        StepLogger.subStep('Select Normal');
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.normal.clickButton();
    }

    static async verifyMessage(message: string) {
        StepLogger.subVerification('Verify Message');
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.message.verifyTextEntered(message);
    }

    static async verifySubject(message: string) {
        StepLogger.subVerification('Verify Subject');
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.subject.verifyTextEntered(message);
    }

    static async verifyUrgentSelected() {
        StepLogger.subVerification('Verify Urgent Selected');
        await ExpectationHelper.verifyCheckboxIsChecked(KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.urgent);
    }

    static async verifyNormalSelected() {
        StepLogger.subVerification('Verify Normal Selected');
        await ExpectationHelper.verifyCheckboxIsChecked(KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.normal);
    }

    static async clickOnAddCollaboratorButtonAfterData() {
        StepLogger.subStep('Click On Add Collaborator Button');
        await KnowledgeCentralCollaborationPage.collaboratorCreatorWindowItems.addCollaborators.clickButton();
    }

    static async clickOnCollaborationBlueLink() {
        StepLogger.subStep('Click On Collaboration Blue Link');
        await PageHelper.switchToiFrame(AdminHomePage.contentIFrame);
        await KnowledgeCentralCollaborationPage.collaborationPageItems.collaborationBlueLink.clickLink();
    }

    static async verifyCollaborationBuilderWindow() {
        StepLogger.subVerification('Verify Collaboration Builder Window');
        await KnowledgeCentralCollaborationPage.collaborationPageItems.collaboratorCreatorWindow.verifyDisplayedStatus();
    }

    static async verifyCollaborationBuilderWindowClosed() {
        StepLogger.subVerification('Verify Collaboration Builder Window Closed');
        await KnowledgeCentralCollaborationPage.collaborationPageItems.collaboratorCreatorWindow.verifyHiddenStatus();
    }

    static async verifyCollaborationBuilderItems() {
        StepLogger.subVerification('Verify Collaboration Builder Items');
        const label = KnowledgeCentralCollaborationPage.collaborationBuilderItems;
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await label.subject.verifyDisplayedStatus();
        await label.collaborators.verifyDisplayedStatus();
        await label.originator.verifyDisplayedStatus();
        await label.message.verifyDisplayedStatus();
        await label.postMessage.verifyDisplayedStatus();
        await label.collaborators.verifyDisplayedStatus();
        await label.okButton.verifyDisplayedStatus();
        await label.deleteButton.verifyDisplayedStatus();
    }

    static async enterMessageInCollaborationBuilderWindow(message: string) {
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        StepLogger.subStep('Enter Message In Collaboration Builder Window');
        await KnowledgeCentralCollaborationPage.collaborationBuilderItems.message.sendKeys(message);
    }

    static async verifyMessageInCollaborationBuilderWindow(message: string) {
        StepLogger.subVerification('Verify Message In Collaboration Builder Window');
        await KnowledgeCentralCollaborationPage.collaborationBuilderItems.message.verifyTextEntered(message);
    }

    static async clickPostMessageInCollaborationBuilderWindow() {
        StepLogger.subStep('Click Post Message In Collaboration Builder Window');
        await KnowledgeCentralCollaborationPage.collaborationBuilderItems.postMessage.clickButton();
    }
    static async verifyAddedMessage(message: string) {
        StepLogger.subVerification('Verify Added Message');
        await PageHelper.switchToiFrame(KnowledgeCentralCollaborationPage.dialogIFrame);
        await KnowledgeCentralCollaborationPage.addedMessage(message).verifyDisplayedStatus();
    }

    static async enterValuesWithUrgent(value: string) {
        StepLogger.subStep('Enter Values With Urgent');
        await this.enterSubject(value);
        await this.enterMessage(value);
        await this.selectUrgent();
    }

    static async verifyValuesWithUrgent(value: string) {
        StepLogger.subVerification('Verify Values With Urgent');
        await this.verifySubject(value);
        await this.verifyMessage(value);
        await this.verifyUrgentSelected();
    }

    static async enterValuesWithNormal(value: string) {
        StepLogger.subStep('Enter Values With Urgent');
        await this.enterSubject(value);
        await this.enterMessage(value);
        await this.selectNormal();
    }

    static async verifyValuesWithNormal(value: string) {
        StepLogger.subVerification('Verify Values With Urgent');
        await this.verifySubject(value);
        await this.verifyMessage(value);
        await this.verifyNormalSelected();
    }

    static async verifyDeletePopup(message: string) {
        StepLogger.subVerification('Verify Delete Popup');
        await PageHelper.switchToNewTabIfAvailable();
        await KnowledgeCentralCollaborationPage.deletePopup(message).verifyDisplayedStatus();
    }

    static async verifyDeletePopupClosed(message: string) {
        StepLogger.subVerification('Verify Delete Popup Closed');
        await PageHelper.switchToNewTabIfAvailable();
        await KnowledgeCentralCollaborationPage.deletePopup(message).verifyHiddenStatus();
    }

    static async clickNoOnDeletePopup() {
        StepLogger.subStep('Click No On Delete Popup');
        await KnowledgeCentralCollaborationPage.noOnDeletePopup.clickButton();
        await PageHelper.switchToFirstTab();
    }

    static async clickYesOnDeletePopup() {
        StepLogger.subStep('Click Yes On Delete Popup');
        await KnowledgeCentralCollaborationPage.yesOnDeletePopup.clickButton();
        await PageHelper.switchToFirstTab();
    }

    static async clickDeleteOnCollaborationBuilderPage() {
        StepLogger.subStep('Click Delete On Collaboration Page');
        await PageHelper.executeInIFrames(CommonPage.contentDialogFindIFrames, async () => {
            await KnowledgeCentralCollaborationPage.collaborationBuilderItems.deleteButton.clickLink();
        }, true);
    }

    static async switchToContentIFrame() {
        await PageHelper.switchToiFrame(AdminHomePage.contentIFrame);
    }

    static async clickDeleteButtonOnCollaborationPage() {
        StepLogger.subStep('Click Delete Button On Collaboration Page');
        await PageHelper.executeInIFrames(CommonPage.contentFindIFrames, async () => {
            await KnowledgeCentralCollaborationPage.collaborationPageItems.deleteButton.clickLink();
        }, true);
    }
}
