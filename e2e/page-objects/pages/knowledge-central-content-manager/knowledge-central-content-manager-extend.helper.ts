import { StepLogger } from '../../../../core/logger/step-logger';
import { CheckboxHelper } from '../../../components/html/checkbox-helper';
import { DropDownHelper } from '../../../components/html/dropdown-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { CommonPage } from '../common/common.po';
import { EmailTemplateBuilderPage } from '../email-template-builder-page/email-template-builder.po';
import { KnowledgeCentralCollaborationPage } from '../knowledge-central-collaboration/knowledge-central-collaboration.po';
import { AgentMicrositePage } from '../manage-site-experience/agent-microsite/agent-microsite.po';

import { KnowledgeCentralContentManagerPage } from './knowledge-central-content-manager.po';

export class KnowledgeCentralContentManagerPageHelperExtend {

    static async verifyDeletePopUp() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('delete Draft click');
        await KnowledgeCentralContentManagerPage.deletePopUp.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickDeleteConfirm() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('click Yes');
        await KnowledgeCentralContentManagerPage.yesDelete.clickLink();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyDeleteEntireDocDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('delete Entire Doc Displayed');
        await KnowledgeCentralContentManagerPage.deleteEntireDoc.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickDeleteEntireDoc() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('delete Entire click');
        await KnowledgeCentralContentManagerPage.deleteEntireDoc.clickLink();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyDeleteEntirePopUp() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('delete entire displayed');
        await KnowledgeCentralContentManagerPage.deleteEntirePopUp.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyProcessingPopUp() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('processing displayed');
        await KnowledgeCentralContentManagerPage.processingPopUp.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyContentManagerTabs() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('verify on task tab');
        await KnowledgeCentralContentManagerPage.taskTab.verifyDisplayedStatus();
        StepLogger.subVerification('verify on feedBack tab');
        await KnowledgeCentralContentManagerPage.contentFeedbackTab.verifyDisplayedStatus();
        StepLogger.subVerification('verify on lifecycle tab');
        await KnowledgeCentralContentManagerPage.elements.lifeclycleManagerTab.verifyDisplayedStatus();
        StepLogger.subVerification('verify on locked document tab');
        await KnowledgeCentralContentManagerPage.lockedDocumentManagerTab.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickSelectColumns() {
        StepLogger.subStep('Select Columns click');
        await KnowledgeCentralContentManagerPage.elements.searchResultOptions.selectColumns.verifyDisplayedStatus();
    }

    static async verifySelectColumnPopUp() {
        StepLogger.subVerification('Select Columns displayed');
        await KnowledgeCentralContentManagerPage.selectColumnPopUp.verifyDisplayedStatus();
    }

    static async clickOnAvailableColumn() {
        StepLogger.subStep('Click on access Levels Column');
        await KnowledgeCentralContentManagerPage.accessLevelsColumn.hoverOverAndClick();
    }

    static async verifySelectedColumnMovedRight() {
        StepLogger.subVerification('verify access Levels Column moved right');
        await KnowledgeCentralContentManagerPage.accessLevelsColumn.verifyDisplayedStatus();
        const movedOption = await DropDownHelper.getTheSelectedOptionText(
            KnowledgeCentralContentManagerPage.elements.searchResultOptions.selectColumns);
        await ExpectationHelper.verifyStringEqualTo(await KnowledgeCentralContentManagerPage.accessLevelsColumn.getText(), movedOption);
    }

    static async verifySelectedColumnMovedLeft() {
        StepLogger.subVerification('verify access Levels Column moved left');
        await KnowledgeCentralContentManagerPage.accessLevelsColumn.verifyDisplayedStatus();
        const movedOption = await DropDownHelper.getTheSelectedOptionText(KnowledgeCentralContentManagerPage.accessLevelsColumn);
        await ExpectationHelper.verifyStringEqualTo(await KnowledgeCentralContentManagerPage.accessLevelsColumn.getText(), movedOption);
    }

    static async verifyColumnReorder(initial: string[]) {
        StepLogger.subVerification('verify column reorder as in list');
        const reordered = await PageHelper.getTextOfElements(EmailTemplateBuilderPage.reorder.allItems);
        await ExpectationHelper.verifyStringEqualTo(initial[0], reordered[1]);
        await ExpectationHelper.verifyStringEqualTo(initial[1], reordered[0]);
    }

    static async clickSaveView() {
        StepLogger.subStep('click Save View');
        await KnowledgeCentralContentManagerPage.elements.searchResultOptions.saveView.clickLink();
    }

    static async saveViewPanel() {
        StepLogger.subVerification('Save View displayed');
        await KnowledgeCentralContentManagerPage.saveViewPopUp.verifyDisplayedStatus();
    }

    static async clickOnNewView(view: string) {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('click on new view');
        await KnowledgeCentralContentManagerPage.getSavedView(view).clickLink();
        await PageHelper.switchToDefaultContent();
    }

    static async markPublicCheckbox() {
        StepLogger.subStep('Mark as public');
        await CheckboxHelper.markCheckbox(KnowledgeCentralContentManagerPage.markPublic, true);
    }

    static async verifyMarkPublicCheckbox() {
        StepLogger.subVerification('verify Mark as public checked');
        await ExpectationHelper.verifyCheckboxIsChecked(KnowledgeCentralContentManagerPage.markPublic);
    }

    static async verifySavedViewDisplayed(view: string) {
        StepLogger.subVerification('verify saved Displayed');
        await KnowledgeCentralContentManagerPage.getSavedView(view).verifyDisplayedStatus();
    }

    static async verifyEnglishNameDisplayedAsMandatory() {
        StepLogger.subVerification('verify english name  Displayed');
        await KnowledgeCentralContentManagerPage.englishName.verifyDisplayedStatus();
        StepLogger.subVerification('verify Mandatory symbol  Displayed');
        await KnowledgeCentralContentManagerPage.mandatorySymbol.verifyDisplayedStatus();
    }

    static async errorMessageDisplayedWithOk() {
        StepLogger.subVerification('error displayed for blank field');
        await AgentMicrositePage.recommendationManagerForm.propertyLeftBlankMessage.verifyDisplayedStatus();
        StepLogger.subVerification('ok button displayed');
        await KnowledgeCentralCollaborationPage.okOnErrorPopup.verifyDisplayedStatus();
    }
}
