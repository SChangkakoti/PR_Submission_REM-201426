import { StepLogger } from '../../../../../../core/logger/step-logger';
import { DropDownHelper } from '../../../../../components/html/dropdown-helper';
import { ElementHelper } from '../../../../../components/html/element-helper';
import { PageHelper } from '../../../../../components/html/page-helper';
import { WaitHelper } from '../../../../../components/html/wait-helper';
import { DfElement } from '../../../../../components/misc-utils/df-elements-helper';
import { ExpectationHelper } from '../../../../../components/misc-utils/expectation-helper';
import { AdminHomePageHelper } from '../../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../../../admin-login-page/admin-login.helper';

import { SuccessConfigurationManagerConstant } from './success-configuration-manager.constants';
import { SuccessConfigurationManagerPage } from './success-configuration-manager.po';

export class SuccessConfigurationManagerHelper {

    static async verifyNavigation() {
        StepLogger.subVerification('Verify Page heading of Success Configuration Manager');
        const titles = SuccessConfigurationManagerConstant.titles;
        await PageHelper.switchToDefaultContentAndIFrame(SuccessConfigurationManagerPage.contentIFrame);
        await SuccessConfigurationManagerPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
    }

    static async navigateToSuccessConfManager() {
        StepLogger.subStep('Login And Navigate to ThreshHold Configuration Manager');
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePage.hamburgerIcon.verifyDisplayedStatus();
        await this.clickBurgerIconAndNavigateToSuccessmanager();
        await this.verifyNavigation();
    }

    static async clickBurgerIconAndNavigateToSuccessmanager() {
        StepLogger.subStep('click BurgerIcon And Navigate to ThreshHold Configuration Manager');
        await PageHelper.switchToDefaultContent();
        await AdminHomePageHelper.clickOnBurgerIcon();
        // Require to load element
        await WaitHelper.sleep(PageHelper.timeout.xxs);
        const successDisplayed = await AdminHomePage.administerSystem.successConfManager.item.isDisplayed();
        if (!successDisplayed) {
            await AdminHomePageHelper.verifySidebarFieldsDisplayed();
            await AdminHomePageHelper.clickAdministerSystem();
            await AdminHomePageHelper.verifyAdministerSystemSubMenu();
            await AdminHomePage.administerSystem.analytics.hoverOverAndClick();
        }
        await AdminHomePageHelper.verifyAnalyticsSubMenu();
        await AdminHomePage.administerSystem.successConfManager.hoverOverAndClick();
        await this.verifyNavigation();
    }

    static async clickOnContentRatedHigh() {
        StepLogger.subStep('Click On Content Rated High');
        await PageHelper.click(SuccessConfigurationManagerPage.generalSection.high);
    }

    static async clickOnContentRatedLow() {
        StepLogger.subStep('Click On Content Rated High');
        await PageHelper.click(SuccessConfigurationManagerPage.generalSection.low);
    }

    static async clickOnCaseResolved() {
        StepLogger.subStep('Click On Case Resolved');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.caseResolved);
    }

    static async clickOnCaseEscalated() {
        StepLogger.subStep('Click On Case Escalated');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.caseEscalated);
    }

    static async clickOnCaseSaved() {
        StepLogger.subStep('Click On Case Saved');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.caseSaved);
    }

    static async clickOnCollaborationCreated() {
        StepLogger.subStep('Click On Collaboration Created');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.collaborationCreated);
    }

    static async clickOnMoreThanOneDocmentViewed() {
        StepLogger.subStep('Click On More Than One Document Viewed');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.viewedManyDocs);
    }

    static async clickOnExactlyOneDocumentViewed() {
        StepLogger.subStep('Click On Exactly One Document Viewed');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.viewedOneDoc);
    }

    static async clickOnNoDocumentViewed() {
        StepLogger.subStep('Click On No Document Viewed');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.viewedNoDocs);
    }

    static async clickOnNoDocumentsReturned() {
        StepLogger.subStep('Click On No Documents Returned');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.returnedNoDocs);
    }

    static async clickOnNoDidThisHelp() {
        StepLogger.subStep('Click On No Did This Help');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.noDidThisHelp);
    }

    static async clickOnYesDidThisHelp() {
        StepLogger.subStep('Click On Yes Did This Help');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.yesDidThisHelp);
    }

    static async clickOnUserReturnedToExistingWebcase() {
        StepLogger.subStep('Click On User Returned To Existing Webcase');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.returnedToExistingWebCase);
    }

    static async clickOnUnknownOutcome() {
        StepLogger.subStep('Click On Unknown Outcome');
        await PageHelper.click(SuccessConfigurationManagerPage.resolutionFlow.unKnownOutcome);
    }

    static async clickOnUserDidNothing() {
        StepLogger.subStep('Click On User Did Nothing');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.noActivity);
    }

    static async clickOnDocumentEmailed() {
        StepLogger.subStep('Click On Document Emailed');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.emailedDocument);
    }

    static async clickOnDocumentSaved() {
        StepLogger.subStep('Click On Document Saved');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.savedDocument);
    }

    static async clickOnSearchSaved() {
        StepLogger.subStep('Click On Search Saved');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.savedSearch);
    }

    static async clickOnBestBetAccessed() {
        StepLogger.subStep('Click On Best Bet Accessed');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.selectedBB);
    }

    static async clickOnRecommendationAccessed() {
        StepLogger.subStep('Click On Recommendation Accessed');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.selectedRecommendation);
    }

    static async clickOnInformationComponentSelected() {
        StepLogger.subStep('Click On Information Component Selected');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.selectedICs);
    }

    static async clickOnNavigationChoiceSelected() {
        StepLogger.subStep('Click On Navigation Choice Selected');
        await PageHelper.click(SuccessConfigurationManagerPage.searchSection.selectedChoices);
    }

    static async clickOnNoDocumentCreatedOrLinked() {
        StepLogger.subStep('Click On Solved');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.noNewDocumentCreatedOrLinked);
    }

    static async clickOnDocumentCreatedOrLinked() {
        StepLogger.subStep('Click On Document Created Or Linked');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.newDocumentCreatedOrLinked);
    }

    static async clickOnSaveForLater() {
        StepLogger.subStep('Click On Save For Later');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.saveForLater);
    }

    static async clickOnNewDocumentCreated() {
        StepLogger.subStep('Click On New Document Created');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.newDocumentCreated);
    }

    static async clickOnNotSolved() {
        StepLogger.subStep('Click On Not Solved');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.notSolved);
    }

    static async clickOnIcSelected() {
        StepLogger.subStep('Click On Information Component Selected');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.icSelected);
    }

    static async clickOnEmailSent() {
        StepLogger.subStep('Click On Email Sent');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.emailSent);
    }

    static async clickOnProblemSolved() {
        StepLogger.subStep('Click On Problem Solved');
        await PageHelper.click(SuccessConfigurationManagerPage.communities.problemSolved);
    }

    static async clickOnRepliedToThread() {
        StepLogger.subStep('Click On Replied To Thread');
        await PageHelper.click(SuccessConfigurationManagerPage.communities.repliedToThread);
    }

    static async clickOnForumUnknownOutcome() {
        StepLogger.subStep('Click On Unknown Outcome');
        await PageHelper.click(SuccessConfigurationManagerPage.communities.unknownOutcome);
    }

    static async clickOnDocumentViewed() {
        StepLogger.subStep('Click On Document Viewed');
        await PageHelper.click(SuccessConfigurationManagerPage.homeBrowse.documentViewed);
    }

    static async clickOnRecommendation() {
        StepLogger.subStep('Click On Recpmmendation Accessed');
        await PageHelper.click(SuccessConfigurationManagerPage.homeBrowse.recommendationAccessed);
    }

    static async clickOnAuthoringSuggestionCreated() {
        StepLogger.subStep('Click On Authoring Suggestion Created');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.authoringSuggestionCreated);
    }

    static async clickOnCollaborationStarted() {
        StepLogger.subStep('Click On Collaboration Created');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.collaborationStarted);
    }

    static async clickOnInterviewSearchUsed() {
        StepLogger.subStep('Click On Interview Search Used');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.interviewSearchUsed);
    }

    static async clickUnknownOutcome() {
        StepLogger.subStep('Click Unknown Outcome');
        await PageHelper.click(SuccessConfigurationManagerPage.workbenchSection.unknownOutcome);
    }

    static async clickOnCommunityBrowsed() {
        StepLogger.subStep('Click On Community Browsed');
        await PageHelper.click(SuccessConfigurationManagerPage.communities.communityBrowsed);
    }

    static async clickOnNewThreadCreated() {
        StepLogger.subStep('Click On New Thread Created');
        await PageHelper.click(SuccessConfigurationManagerPage.communities.newThreadCreated);
    }

    static async verifyGeneralDropDownOptions() {
        const label = SuccessConfigurationManagerPage.generalSection;
        StepLogger.subVerification('Verify Options in General Drop Down');
        await ExpectationHelper.verifyDisplayedStatus(label.highNegative);
        await ExpectationHelper.verifyDisplayedStatus(label.highNa);
        await ExpectationHelper.verifyDisplayedStatus(label.highPositive);
    }

    static async verifyResolutionFlowDropDownOptions() {
        const label = SuccessConfigurationManagerPage.resolutionFlow;
        StepLogger.subVerification('Verify Resolution Flow Drop Down Options');
        await ExpectationHelper.verifyDisplayedStatus(label.negative);
        await ExpectationHelper.verifyDisplayedStatus(label.positive);
        await ExpectationHelper.verifyDisplayedStatus(label.na);
    }

    static async verifySearchSectionDropDownProperties() {
        const label = SuccessConfigurationManagerPage.searchSection;
        StepLogger.subVerification('Verify Search Section Drop Down Properties');
        await ExpectationHelper.verifyDisplayedStatus(label.negative);
        await ExpectationHelper.verifyDisplayedStatus(label.positive);
        await ExpectationHelper.verifyDisplayedStatus(label.na);
    }

    static async verifyWorkbenchDropDownProperties() {
        const label = SuccessConfigurationManagerPage.workbenchSection;
        StepLogger.subVerification('Verify Workbench Drop Down Properties');
        await ExpectationHelper.verifyDisplayedStatus(label.negative);
        await ExpectationHelper.verifyDisplayedStatus(label.positive);
        await ExpectationHelper.verifyDisplayedStatus(label.na);
    }

    static async selectOptionFromDropDown(element: DfElement, value: string) {
        StepLogger.subStep('Select Option From Drop Down');
        await DropDownHelper.selectOptionByText(element, value);
        return await DropDownHelper.getTheSelectedOptionText(element);
    }

    static async verifySelectedOptionFromDropDown(element: DfElement, value: string) {
        const selectedOption = await DropDownHelper.getTheSelectedOptionText(element);
        await ExpectationHelper.verifyStringEqualTo(selectedOption, value);
    }

    static async clickOnSaveButton() {
        StepLogger.subStep('Click On Save Button');
        await ElementHelper.clickUsingJs(SuccessConfigurationManagerPage.buttons.save);
    }

    static async clickOnCancelButton() {
        StepLogger.subStep('Click On Cancel Button');
        await ElementHelper.clickUsingJs(SuccessConfigurationManagerPage.buttons.cancel);
    }

    static async verifyHelpIconDisplayed() {
        StepLogger.subVerification('Verify Help Icon');
        await ExpectationHelper.verifyDisplayedStatus(SuccessConfigurationManagerPage.buttons.help);
    }

    static async hoverOverHelpIcon() {
        StepLogger.subStep('Hover Over Help Icon');
        await ElementHelper.actionHoverOver(SuccessConfigurationManagerPage.buttons.help);
    }

    static async verifyFullFormsOfOptions() {
        StepLogger.subVerification('Verify Full Forms Of Options');
        await ExpectationHelper.verifyDisplayedStatus(SuccessConfigurationManagerPage.buttons.formsOfOptions);
    }
}
