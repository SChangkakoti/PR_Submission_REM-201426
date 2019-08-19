import { StepLogger } from '../../../../../core/logger/step-logger';
import { ElementHelper } from '../../../../components/html/element-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { CommonPageHelper } from '../../common/common-page.helper';
import { CommonPage } from '../../common/common.po';

import { KnowledgeReContributionHelper } from './knowledge-re-contribution.helper';
import { KnowledgeReContributionPage } from './knowledge-re-contribution.po';

export class KnowledgeReContributionHelperExtension {
    static async verifyGenerateBatFileButonIsEnabled() {
        const disable = await ElementHelper.getDisabledAttributeValue(KnowledgeReContributionPage.buttons.generateBatFile);
        await ExpectationHelper.verifyStringEqualTo(disable,
            null);
    }

    static async verifyGenerateBatFileAndStartButtonsAreEnabled() {
        await KnowledgeReContributionHelper.verifyStartButonIsEnabled();
        await this.verifyGenerateBatFileButonIsEnabled();
    }

    static async verifyViewListButtonDisplayed() {
        await KnowledgeReContributionPage.buttons.viewList.verifyDisplayedStatus();
    }

    static async clickOnViewListButton() {
        StepLogger.subStep('Click on View List button');
        await KnowledgeReContributionPage.buttons.viewList.hoverOverAndClick();
    }

    static async verifyContributionFailedListDialogDisplayed() {
        await KnowledgeReContributionPage.titles.cotributionFailedList.verifyDisplayedStatus();
    }

    static async clickOkButtonFromContributionFailedDialog() {
        await PageHelper.switchToiFrame(CommonPage.dialogFrame);
        StepLogger.subStep('Click on Ok button');
        await KnowledgeReContributionPage.buttons.okButtonFromContributionFailedDialog.scrollToElement();
        await KnowledgeReContributionPage.buttons.okButtonFromContributionFailedDialog.hoverOverAndClick();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyStartProcessConfirmationPopUpDisplayedAndClickYes(tabNumberToSwitchTo = Constants.number.zero) {
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeReContributionPage.messages.areYouSureYouWantToPerformSelectedTasks.verifyDisplayedStatus();
            await CommonPageHelper.executeScriptOnActionOne();
        }, 1, false);
        await PageHelper.switchToTab(tabNumberToSwitchTo);
    }

    static async verifyStartProcessConfirmationPopUpDisplayedAndClickNo(tabNumberToSwitchTo = Constants.number.zero) {
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeReContributionPage.messages.areYouSureYouWantToPerformSelectedTasks.verifyDisplayedStatus();
            await CommonPageHelper.executeScriptOnActionTwo();
        }, 1, false);
        await PageHelper.switchToTab(tabNumberToSwitchTo);
    }

    static async verifyStopButonIsEnabled() {
        const disable = await KnowledgeReContributionPage.buttons.stop.item.getAttribute('disable');
        await ExpectationHelper.verifyStringEqualTo(disable,
            null);
    }

    static async verifyStopProcessConfirmationPopUpDisplayedAndClickYes(tabNumberToSwitchTo = Constants.number.zero) {
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeReContributionPage
                .messages
                .areYouSureYouWantToStopTheCurrentProcess
                .verifyDisplayedStatus();
            await CommonPageHelper.executeScriptOnActionOne();
        }, 1, false);
        await PageHelper.switchToTab(tabNumberToSwitchTo);
    }

    static async verifyStopProcessConfirmationPopUpDisplayedAndClickNo(tabNumberToSwitchTo = Constants.number.zero) {
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeReContributionPage.messages.areYouSureYouWantToStopTheCurrentProcess.verifyDisplayedStatus();
            await CommonPageHelper.executeScriptOnActionTwo();
        }, 1, false);
        await PageHelper.switchToTab(tabNumberToSwitchTo);
    }

    static async startRecontributionForFailedItems() {
        await KnowledgeReContributionHelper.markContributeFailedItemsCheckBox();
        await KnowledgeReContributionHelper.verifyContributeFailedItemsCheckBoxIsMarked();
        await KnowledgeReContributionHelper.verifyGenerateBatFileAndStartButtonsAreEnabled();
        await KnowledgeReContributionHelper.clickStart();
        await KnowledgeReContributionHelper.verifyStartProcessConfirmationPopUpDisplayedAndClickYes();
        await KnowledgeReContributionHelper.verifyPageContent();
    }

    static async switchToDialogAndClickStop(pageNumber: number = Constants.number.one) {
        StepLogger.subStep('Switch To Dialog Frame And Click Ok');
        await PageHelper.switchToTab(pageNumber);
        await KnowledgeReContributionHelper.clickStop();
    }

    static async verifyStopCurrentBatchConfirmationPopUpDisplayedAndClickYes(tabNumberToSwitchTo = Constants.number.zero) {
        await CommonPageHelper.switchToWindow(Constants.number.two);
        await KnowledgeReContributionPage
            .messages
            .areYouSureYouWantToStopContributingTheCurrentBatch
            .verifyDisplayedStatus();
        await CommonPageHelper.executeScriptOnActionOne();
        await PageHelper.switchToTab(tabNumberToSwitchTo);
    }
}
