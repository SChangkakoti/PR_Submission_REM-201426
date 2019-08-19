import { browser, protractor } from 'protractor';

import { StepLogger } from '../../../../core/logger/step-logger';
import { AlertHelper } from '../../../components/html/alert-helper';
import { ElementHelper } from '../../../components/html/element-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { Constants } from '../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { CommonPageHelper } from '../common/common-page.helper';
import { CommonPage } from '../common/common.po';
import { AgentMicrositeConstant } from '../manage-site-experience/agent-microsite/agent-microsite.constant';
import { AgentMicrositeSelfServicePage } from '../self-service/agent-microsite-tab/agent-microsite.po';

import { KnowledgeCentralContentManagerConstant } from './knowledge-central-content-manager.constant';
import { KnowledgeCentralContentManagerPage } from './knowledge-central-content-manager.po';

export class KnowledgeCentralContentManagerPageHelper {

    static async verifyContentManagerPageDisplayed() {
        await KnowledgeCentralContentManagerPage.titles.contentManager.verifyDisplayedStatus();
    }

    static async clickOnLifeclycleManagerTab() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('Click on Lifecycle Manager tab');
        await KnowledgeCentralContentManagerPage.elements.lifeclycleManagerTab.hoverOverAndClick();
        await PageHelper.switchToDefaultContent();
    }

    static async minimizeAndVerifyArea(area: string) {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep(`Click on ${area} area`);
        await KnowledgeCentralContentManagerPage.getScreenArea(area).hoverOverAndClick();
        const cls = await KnowledgeCentralContentManagerPage.getScreenArea(area).getAtttribute('class');
        await ExpectationHelper.verifyStringValueContain(cls, 'closed');
        await PageHelper.switchToDefaultContent();
    }

    static async expandAndVerifyArea(area: string) {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep(`Click on ${area} area`);
        await KnowledgeCentralContentManagerPage.getScreenArea(area).hoverOverAndClick();
        const cls = await KnowledgeCentralContentManagerPage.getScreenArea(area).getAtttribute('class');
        await ExpectationHelper.verifyStringValueContain(cls, 'opened');
        await PageHelper.switchToDefaultContent();
    }

    static async verifySearchResultsOptionsDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        await KnowledgeCentralContentManagerPage.elements.searchResultOptions.exportList.verifyDisplayedStatus();
        await KnowledgeCentralContentManagerPage.elements.searchResultOptions.printList.verifyDisplayedStatus();
        await KnowledgeCentralContentManagerPage.elements.searchResultOptions.saveView.verifyDisplayedStatus();
        await KnowledgeCentralContentManagerPage.elements.searchResultOptions.selectColumns.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async searchRandomDoc() {
        await CommonPageHelper.switchToContentFrame();
        StepLogger.subVerification('Verify search bar displayed');
        await KnowledgeCentralContentManagerPage.searchBar.verifyDisplayedStatus();
        StepLogger.subStep('send document name to search');
        await ElementHelper.sendKeys(KnowledgeCentralContentManagerPage.searchBar, AgentMicrositeConstant.recommendationManagerForm.document, true);
        StepLogger.subVerification('Verify Document displayed');
        await KnowledgeCentralContentManagerPage.getRandomDoc(KnowledgeCentralContentManagerConstant.elementNames.japanese).verifyDisplayedStatus();
        StepLogger.subStep('click on searched document');
        await KnowledgeCentralContentManagerPage.getRandomDoc(KnowledgeCentralContentManagerConstant.elementNames.japanese).clickLink();
    }

    static async verifyDocumentTitle() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.docFrame);
        await PageHelper.switchToiFrame(CommonPage.extiFrame);
        StepLogger.subVerification('Verify Document Title displayed');
        await KnowledgeCentralContentManagerPage.documentTitle.verifyDisplayedStatus();
    }

    static async verifyDocOptions() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subVerification('Verify highlight displayed');
        await KnowledgeCentralContentManagerPage.highlight.verifyDisplayedStatus();
        StepLogger.subVerification('Verify bookMarks displayed');
        await KnowledgeCentralContentManagerPage.bookMarks.verifyDisplayedStatus();
        StepLogger.subVerification('Verify full Screen displayed');
        await KnowledgeCentralContentManagerPage.fullScreen.verifyDisplayedStatus();
        StepLogger.subVerification('Verify email Document displayed');
        await KnowledgeCentralContentManagerPage.emailDocument.verifyDisplayedStatus();
        StepLogger.subVerification('Verify add To Favorites displayed');
        await KnowledgeCentralContentManagerPage.addToFavorites.verifyDisplayedStatus();
        StepLogger.subVerification('Verify subscribe To Document displayed');
        await KnowledgeCentralContentManagerPage.subscribeToDocument.verifyDisplayedStatus();
    }

    static async verifyHighlightOption() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subVerification('Verify highlight displayed');
        await KnowledgeCentralContentManagerPage.highlight.verifyDisplayedStatus();
    }

    static async clickOnHighlight() {
        StepLogger.subStep('click highlight');
        await KnowledgeCentralContentManagerPage.highlight.clickLink();
    }

    static async verifyHighlightOn() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subVerification('Verify highlight Off displayed');
        await KnowledgeCentralContentManagerPage.highlightOff.verifyDisplayedStatus();
    }

    static async clickOffHighlight() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subStep('Verify highlight Off displayed');
        await KnowledgeCentralContentManagerPage.highlightOff.clickLink();
    }

    static async verifyStringHighlighted() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.docFrame);
        await PageHelper.switchToiFrame(CommonPage.extiFrame);
        StepLogger.subStep('Verify highlight displayed');
        await KnowledgeCentralContentManagerPage.highlightedText.verifyDisplayedStatus();
    }

    static async verifyStringNotHighlighted() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.docFrame);
        await PageHelper.switchToiFrame(CommonPage.extiFrame);
        StepLogger.subStep('Verify highlight Not displayed');
        await KnowledgeCentralContentManagerPage.highlightedText.verifyHiddenStatus();
    }

    static async verifyFullScreenOption() {
        StepLogger.subVerification('Verify full Screen displayed');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await KnowledgeCentralContentManagerPage.fullScreen.verifyDisplayedStatus();
    }

    static async clickFullScreenAndVerifyOpen() {
        StepLogger.subStep('get tab count before click full screen');
        const windowsCountBeforeFullScreen = await PageHelper.getTabsCount();
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subStep('click full Screen');
        await KnowledgeCentralContentManagerPage.fullScreen.clickLink();
        const windowsCountAfterFullScreen = await PageHelper.getTabsCount();
        await ExpectationHelper.verifyValueGreaterOrEqualTo(windowsCountAfterFullScreen, windowsCountBeforeFullScreen);
    }

    static async verifyAddToFavoritesDisplayed() {
        StepLogger.subVerification('Verify add To Favorites displayed');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await KnowledgeCentralContentManagerPage.addToFavorites.verifyDisplayedStatus();
    }

    static async clickAddToFavorites() {
        StepLogger.subStep('click add To Favorites');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await KnowledgeCentralContentManagerPage.addToFavorites.clickLink();
    }

    static async verifyAlwaysUseDocumentTitleRadioButtonChecked() {
        StepLogger.subVerification('use title displayed');
        await PageHelper.executeInNewTab(async () => {
            const checked = await KnowledgeCentralContentManagerPage.alwaysUseTitle.getAtttribute('checked');
            await ExpectationHelper.verifyStringEqualTo(checked.toString(), Constants.boolean.true.toString());
        }, Constants.number.one, false);
    }

    static async verifyFavoriteOptionsDisplayed() {
        StepLogger.subVerification('verify favorite option displayed');
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeCentralContentManagerPage.alwaysUseTitle.verifyDisplayedStatus();
            await KnowledgeCentralContentManagerPage.specifyFavoriteLabel.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async verifyDocumentAddedMessageDisplayed() {
        StepLogger.subVerification('added to favorite message');
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeCentralContentManagerPage.documentAddedMessage.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async verifySubscribeToDocumentDisplayed() {
        StepLogger.subVerification('Verify subscribe To Document displayed');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await KnowledgeCentralContentManagerPage.subscribeToDocument.verifyDisplayedStatus();
    }

    static async clickSubscribeToDocument() {
        StepLogger.subVerification('click subscribe To Document');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await KnowledgeCentralContentManagerPage.subscribeToDocument.clickLink();
    }

    static async verifySubscribeToDocumentPageItems() {
        StepLogger.subVerification('verify Subscription page');
        await KnowledgeCentralContentManagerPage.synopsisText.verifyDisplayedStatus();
        await AgentMicrositeSelfServicePage.formControls.whatsPopular.sendEmailDropDown.verifyDisplayedStatus();
    }

    static async verifyEmailSubscriptionWindow() {
        StepLogger.subVerification('verify Subscription window');
        await PageHelper.executeInNewTab(async () => {
            const subscriptionDetails = KnowledgeCentralContentManagerConstant.elementNames.subscribeToDoc;
            await PageHelper.switchToNewTabIfAvailable();
            const currentUrl = await PageHelper.getCurrentUrl();
            await ExpectationHelper.verifyStringValueContain(currentUrl.toLowerCase(), subscriptionDetails.toLowerCase());
        }, Constants.number.one, false);
    }

    static async clickOnSubmit() {
        StepLogger.subStep('click Submit button');
        await PageHelper.executeInNewTab(async () => {
            await AgentMicrositeSelfServicePage.formControls.submitBtnDialogWindow.clickButton();
        }, Constants.number.one, false);
        await PageHelper.switchToFirstTab();
    }

    static async verifySendMailOptionsDisplayed() {
        StepLogger.subVerification('verify Send Mail Options Displayed');
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeCentralContentManagerPage.immediatelyOption.verifyDisplayedStatus();
            await KnowledgeCentralContentManagerPage.dailyOption.verifyDisplayedStatus();
            await KnowledgeCentralContentManagerPage.weeklyOption.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async verifySubscribeByRSSOption() {
        StepLogger.subVerification('Subscribe By RSS Displayed');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await AgentMicrositeSelfServicePage.formControls.whatsPopular.rssSubscribe.hoverOverAndClick();
    }

    static async clickOnSubscribeByRSS() {
        StepLogger.subStep('click Subscribe By RSS');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await AgentMicrositeSelfServicePage.formControls.whatsPopular.rssSubscribe.hoverOverAndClick();
    }

    static async verifySubscribeToDocumentRssItems() {
        StepLogger.subVerification('verify Subscription page');
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeCentralContentManagerPage.synopsisTextRss.verifyDisplayedStatus();
            await KnowledgeCentralContentManagerPage.titleText.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async clickOnPrintAndVerifyOpen() {
        const windowsCountBeforeFullScreen = await PageHelper.getTabsCount();
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subStep('click Print');
        await AgentMicrositeSelfServicePage.formControls.whatsPopular.printDoc.hoverOverAndClick();
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('verify Print Tab opened');
            const windowsCountAfterFullScreen = await PageHelper.getTabsCount();
            await ExpectationHelper.verifyValueGreaterOrEqualTo(windowsCountAfterFullScreen, windowsCountBeforeFullScreen);
        }, Constants.number.one, false);
    }

    static async verifyPrintOptionDisplayed() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subVerification('verify Print Option Displayed');
        await AgentMicrositeSelfServicePage.formControls.whatsPopular.printDoc.verifyDisplayedStatus();
    }

    static async clickOnManageAndVerifyOpen() {
        const windowsCountBeforeFullScreen = await PageHelper.getTabsCount();
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subStep('click Manage Document');
        await KnowledgeCentralContentManagerPage.manageDocument.hoverOverAndClick();
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('verify Manage Document Tab opened');
            const windowsCountAfterFullScreen = await PageHelper.getTabsCount();
            await ExpectationHelper.verifyValueGreaterOrEqualTo(windowsCountAfterFullScreen, windowsCountBeforeFullScreen);
        }, Constants.number.one, true);
    }

    static async verifyManageOptionDisplayed() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subVerification('verify Manage Document Option Displayed');
        await KnowledgeCentralContentManagerPage.manageDocument.verifyDisplayedStatus();
    }

    static async clickOnClipboardAndVerifyOpen() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subStep('click clipboard');
        await KnowledgeCentralContentManagerPage.copyClipBoard.hoverOverAndClick();
        StepLogger.subVerification('verify alert clipboard displayed');
        await ExpectationHelper.verifyAlertIsPresent();
        await browser.switchTo().alert().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, Constants.letters.c));
        await AlertHelper.acceptAlert();
    }

    static async verifyClipboardOptionDisplayed() {
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        StepLogger.subVerification('verify clipboard Option Displayed');
        await KnowledgeCentralContentManagerPage.copyClipBoard.verifyDisplayedStatus();
    }

    static async pasteClipBoardInNewTab() {
        StepLogger.subStep('Past clipboard in URL');
        await browser.executeScript('window.open()');
        await PageHelper.executeInNewTab(async () => {
            await PageHelper.goToUrl(protractor.Key.chord(protractor.Key.CONTROL, Constants.letters.v));
        }, Constants.number.one, true);
    }

    static async verifyDocumentTitleInNewTab() {
        await PageHelper.executeInNewTab(async () => {
            await PageHelper.switchToDefaultContent();
            await CommonPageHelper.switchToContentFrame();
            await PageHelper.switchToiFrame(CommonPage.docFrame);
            await PageHelper.switchToiFrame(CommonPage.extiFrame);
            StepLogger.subVerification('Verify Document Title displayed');
            await KnowledgeCentralContentManagerPage.documentTitle.verifyDisplayedStatus();
        }, Constants.number.one, true);
    }

    static async verifyUpToSearchResults() {
        StepLogger.subVerification('Up To Search results Displayed');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await KnowledgeCentralContentManagerPage.upToSearchResults.verifyDisplayedStatus();
    }

    static async clickUpToSearchResults() {
        StepLogger.subStep('click Up To Search results');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await PageHelper.switchToiFrame(CommonPage.headerFrame);
        await KnowledgeCentralContentManagerPage.upToSearchResults.hoverOverAndClick();
    }

    static async verifyUserNavigateBack() {
        StepLogger.subVerification('Search results Displayed');
        await PageHelper.switchToDefaultContent();
        await CommonPageHelper.switchToContentFrame();
        await KnowledgeCentralContentManagerPage.getRandomDoc(KnowledgeCentralContentManagerConstant.elementNames.japanese).verifyDisplayedStatus();
    }

    static async specifyFavoriteLabel() {
        StepLogger.subStep('click specify Favorite Label');
        await PageHelper.executeInNewTab(async () => {
            await KnowledgeCentralContentManagerPage.specifyFavoriteLabel.clickLink();
        }, Constants.number.one, false);
    }

    static async verifySpecifyEnabled() {
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subVerification('specify Favorite Label enabled');
            await ExpectationHelper.verifyCheckboxIsChecked(KnowledgeCentralContentManagerPage.specifyFavoriteLabel);
            await ExpectationHelper.verifyEnabledStatus(KnowledgeCentralContentManagerPage.specifyFavoriteLabelText);
        }, Constants.number.one, false);
    }

    static async enterSpecificLabel(prefix: string) {
        const label = `${prefix} ${KnowledgeCentralContentManagerConstant.elementNames.japanese}`;
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('enter specify Favorite Label');
            await KnowledgeCentralContentManagerPage.specifyFavoriteLabelText.sendKeys(label);
        }, Constants.number.one, false);
        return label;
    }

    static async verifySpecificLabel(expectedLabel: string) {
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subVerification('verify specify Favorite Label');
            await ExpectationHelper.verifyValue(KnowledgeCentralContentManagerPage.specifyFavoriteLabelText, expectedLabel);
        }, Constants.number.one, false);
    }

    static async clickOnTaskTab() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('Click on task tab');
        await KnowledgeCentralContentManagerPage.taskTab.hoverOverAndClick();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyTaskPageDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('verify task tab');
        await KnowledgeCentralContentManagerPage.taskPage.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickOnContentFeedbackTab() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('Click on content Feedback tab');
        await KnowledgeCentralContentManagerPage.contentFeedbackTab.hoverOverAndClick();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyContentFeedbackPageDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('verify content Feedback tab');
        await KnowledgeCentralContentManagerPage.contentFeedbackPage.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyLifecycleManagerPageDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('verify Lifecycle Manager tab');
        await KnowledgeCentralContentManagerPage.lifeClycleManagerPage.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickOnLockedDocumentManagerTab() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('Click on Locked Document Manager tab');
        await KnowledgeCentralContentManagerPage.lockedDocumentManagerTab.hoverOverAndClick();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyLockedDocumentManagerPageDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('verify Locked Document Manager tab');
        await KnowledgeCentralContentManagerPage.lockedDocumentManagerPage.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async enterSearch(search: string) {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('search content');
        await KnowledgeCentralContentManagerPage.lifeCycleSearch.sendKeys(search);
        await PageHelper.switchToDefaultContent();
    }

    static async getSearchFieldValue(search: string) {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('search content');
        await ExpectationHelper.verifyText(KnowledgeCentralContentManagerPage.lifeCycleSearch, search);
        await PageHelper.switchToDefaultContent();
    }

    static async verifyDeleteDraftDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subVerification('delete Draft Displayed');
        await KnowledgeCentralContentManagerPage.deleteDrafts.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickOnResultCheckBoxAndVerify() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('Click on resultCheckBox');
        await KnowledgeCentralContentManagerPage.resultCheckBox.clickLink();
        StepLogger.subVerification('verify on resultCheckBox checked');
        await ExpectationHelper.verifyCheckboxIsChecked(KnowledgeCentralContentManagerPage.resultCheckBox);
        await PageHelper.switchToDefaultContent();
    }

    static async clickDeleteDraftDisplayed() {
        await PageHelper.switchToiFrame(CommonPage.contentFrame);
        StepLogger.subStep('delete Draft click');
        await KnowledgeCentralContentManagerPage.deleteDrafts.clickLink();
        await PageHelper.switchToDefaultContent();
    }
}
