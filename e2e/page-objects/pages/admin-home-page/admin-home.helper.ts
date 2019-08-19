import { StepLogger } from '../../../../core/logger/step-logger';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { DfElement } from '../../../components/misc-utils/df-elements-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { AdminLoginPageHelper } from '../admin-login-page/admin-login.helper';
import { LanguageManagementPage } from '../administer-system/language-management-page/language-management-page.po';
import { BasePageHelper } from '../base-page.helper';
import { CommonPageHelper } from '../common/common-page.helper';
import { KnowledgeModelHelper } from '../manage-knowledge/knowledge-model/knowledge-model.helper';
import { ManagePeopleHelper } from '../manage-people/manage-people.helper';
import { ManagePeoplePage } from '../manage-people/manage-people.po';
import { ManagePeople1Helper } from '../manage-people/manage-people1.helper';
import { UserAndGroupFinderHelper } from '../manage-people/user-and-group-finder/user-and-group-finder.helper';
import { UserAndGroupFinderPage } from '../manage-people/user-and-group-finder/user-and-group-finder.po';
import { UserCreatorHelper } from '../manage-people/user-creator/user-creator.helper';
import { AgentMicrositeHelper } from '../manage-site-experience/agent-microsite/agent-microsite.helper';
import { ProfileEditorHelper } from '../profile-editor/profile-editor.helper';

import { AdminHomePageConstant } from './admin-home.constants';
import { AdminHomePage } from './admin-home.po';

export class AdminHomePageHelper extends BasePageHelper {

    static async clickManageWorkbenchButton() {
        await AdminHomePage.sidebar.manageWorkbench.scrollToElement();
        await AdminHomePage.sidebar.manageWorkbench.hoverOverAndClick();
    }

    static async verifySidebarFieldsDisplayed() {
        const sidebar = AdminHomePage.sidebar;
        await sidebar.home.verifyDisplayedStatus();
        await sidebar.manageWorkbench.verifyDisplayedStatus();
        await sidebar.manageCommunities.verifyDisplayedStatus();
        await sidebar.manageKnowledge.verifyDisplayedStatus();
        await sidebar.managePeople.verifyDisplayedStatus();
        await sidebar.manageSiteExp.scrollToElement();
        await sidebar.manageSiteExp.verifyDisplayedStatus();
        await sidebar.administerSystem.verifyDisplayedStatus();
        await sidebar.settings.verifyDisplayedStatus();
        await sidebar.logout.verifyDisplayedStatus();
    }

    static async clickManageCommunities() {
        await AdminHomePage.sidebar.manageCommunities.hoverOver();
        await AdminHomePage.sidebar.manageCommunities.clickButton();
    }

    static async clickAdministerSystem() {
        await AdminHomePage.sidebar.administerSystem.scrollToElement();
        await AdminHomePage.sidebar.administerSystem.hoverOver();
        await AdminHomePage.sidebar.administerSystem.clickButton();
    }

    static async clickHomeButton() {
        await AdminHomePage.sidebar.homeButton.scrollToElement();
        await AdminHomePage.sidebar.homeButton.hoverOverAndClick();
    }

    static async clickSettings() {
        await AdminHomePage.sidebar.settings.scrollToElement();
        await AdminHomePage.sidebar.settings.hoverOverAndClick();
    }

    static async clickManageCommunitiesSubMenu(subMenu: DfElement) {
        await subMenu.hoverOverAndClick();
    }

    static async navigateToEmailTemplateBuilderPage() {
        await AdminHomePage.hamburgerIcon.clickButton();
        await AdminHomePageHelper.clickManageWorkbenchButton();
        await AdminHomePage.manageWorkbench.masterEmailTemplateBuilder.hoverOver();
        await AdminHomePage.manageWorkbench.masterEmailTemplateBuilder.clickLink();
    }

    static async navigateToLanguageManager() {
        await AdminHomePage.hamburgerIcon.clickButton();
        await AdminHomePageHelper.clickAdministerSystem();
        await AdminHomePage.administerSystem.LanguageManager.hoverOverAndClick();
        await LanguageManagementPage.contentIFrame.verifyDisplayedStatus();
    }

    static async verifyManageCommunitiesMenu() {
        StepLogger.subVerification('Verify Manage Communities menu');
        const manageCommunities = AdminHomePage.manageCommunities;
        await manageCommunities.contentAlertManager.verifyDisplayedStatus();
        await manageCommunities.communitiesManager.verifyDisplayedStatus();
        await manageCommunities.pollManager.verifyDisplayedStatus();
        await manageCommunities.rewardPointsManager.verifyDisplayedStatus();
    }

    static async verifyManageKnowledgeSubMenu() {
        await AdminHomePage.manageKnowledge.knowledgeModel.verifyDisplayedStatus();
        await AdminHomePage.manageKnowledge.knowledgeAuthoring.verifyDisplayedStatus();
        await AdminHomePage.manageKnowledge.knowledgeContribution.verifyDisplayedStatus();
    }

    static async verifyManagePeopleSubMenu() {
        await AdminHomePage.managePeople.agentLevelManager.verifyDisplayedStatus();
        await AdminHomePage.managePeople.enterpriseReputationLevelManager.verifyDisplayedStatus();
        await AdminHomePage.managePeople.groupCreator.verifyDisplayedStatus();
        await AdminHomePage.managePeople.userGroupFinder.verifyDisplayedStatus();
        await AdminHomePage.managePeople.roleManagerKKC.verifyDisplayedStatus();
        await AdminHomePage.managePeople.roleManagerKSS.verifyDisplayedStatus();
        await AdminHomePage.managePeople.userCreator.verifyDisplayedStatus();
    }

    static async verifyManageSiteExpSubMenu() {
        await AdminHomePage.manageSiteExp.savedQueryManager.verifyDisplayedStatus();
        await AdminHomePage.manageSiteExp.agentMicrosite.verifyDisplayedStatus();
        await AdminHomePage.manageSiteExp.customerMicrosite.verifyDisplayedStatus();
        await AdminHomePage.manageSiteExp.tdMicrosite.verifyDisplayedStatus();
    }

    static async verifyAdministerSystemSubMenu() {
        await AdminHomePage.administerSystem.analytics.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.configurationSettings.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.nofiticationsAndSubscriptions.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.systemMaintenanceAndTroubleshooting.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.transferDataManager.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.LanguageManager.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.changeLogViewer.verifyDisplayedStatus();
    }

    static async verifySettingsSubMenu() {
        await AdminHomePage.settings.about.verifyDisplayedStatus();
        await AdminHomePage.settings.help.verifyDisplayedStatus();
    }

    static async verifyUserNameAtTheTopRightCorner(userName: string) {
        const nameFound = await AdminHomePage.welcomeUserNameLabel.getText();
        await ExpectationHelper.verifyStringValueContain(
            nameFound.toLowerCase(),
            userName);
    }

    static async clickOnBurgerIcon() {
        StepLogger.subStep('Click on the "Burger" icon');
        await AdminHomePage.hamburgerIcon.hoverOverAndClick();
    }

    static async clickOnManagePeopleButton() {
        StepLogger.subStep('Click on Manage People button');
        await AdminHomePage.sidebar.managePeople.clickLink();
    }

    static async verifySideMenuDisplayed() {
        await ExpectationHelper.verifyDisplayedElementFinder(
            AdminHomePage.sideBar,
            AdminHomePageConstant.elementNames.sidebarMenu);
    }

    static async verifyWelcomePage(switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(AdminHomePage.contentIFrame);
        }

        await AdminHomePage.mainTitles.adminHomePageWelcome.verifyDisplayedStatus();
    }

    static async verifyManageWorkbenchSubMenu() {
        await AdminHomePage.manageWorkbench.interviewBuilder.verifyDisplayedStatus();
        await AdminHomePage.manageWorkbench.masterEmailTemplateBuilder.verifyDisplayedStatus();
        await AdminHomePage.manageWorkbench.resolutionFlowDesigner.verifyDisplayedStatus();
    }

    static async verifyManageCommunitiesSubMenu() {
        await AdminHomePage.manageCommunities.contentAlertManager.verifyDisplayedStatus();
        await AdminHomePage.manageCommunities.communitiesManager.verifyDisplayedStatus();
        await AdminHomePage.manageCommunities.pollManager.verifyDisplayedStatus();
        await AdminHomePage.manageCommunities.rewardPointsManager.verifyDisplayedStatus();
    }

    static async clickOnAgentLevelManager() {
        StepLogger.subStep('Click on Agent Level Manager');
        await AdminHomePage.managePeople.agentLevelManager.hoverOverAndClick();
    }

    static async clickOnLanguageManagerOption() {
        StepLogger.subStep('Click on Languange');
        await AdminHomePage.administerSystem.LanguageManager.hoverOverAndClick();
    }

    static async navigateToLanguageManagerPage() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.clickSettings();
        await AdminHomePageHelper.clickAdministerSystem();
        await AdminHomePageHelper.clickOnLanguageManagerOption();
    }

    static async verifyAgentLevelManagerSubmenuOption() {
        await AdminHomePage.managePeople.agentLevelManager.verifyDisplayedStatus();
    }

    static async navigateToAgentLevelManagerPage() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.clickSettings();
        await AdminHomePageHelper.clickOnManagePeopleButton();
        await AdminHomePageHelper.clickOnAgentLevelManager();
        await ManagePeopleHelper.verifyAgentLevelManagerPageDisplayed();
    }

    static async clickOnManageKnowledgeMenu() {
        // wait is necessary to let the element load properly
        await WaitHelper.sleep(PageHelper.timeout.xs);
        await AdminHomePage.sidebar.manageKnowledge.scrollToElement();
        await AdminHomePage.sidebar.manageKnowledge.hoverOverAndClick();
    }

    static async clickOnKnowledgeModelSubmenu() {
        await AdminHomePage.manageKnowledge.knowledgeModel.scrollToElement();
        await AdminHomePage.manageKnowledge.knowledgeModel.hoverOverAndClick();
    }

    static async clickOnKnowledgeAuthoring() {
        await AdminHomePage.manageKnowledge.knowledgeAuthoring.hoverOverAndClick();
    }

    static async verifyKnowledgeModelSubmenuOptions() {
        await AdminHomePage.knowledgeModel.contentAccessLevelManager.verifyDisplayedStatus();
        await AdminHomePage.knowledgeModel.customerDictionary.verifyDisplayedStatus();
        await AdminHomePage.knowledgeModel.documentTaggingReport.verifyDisplayedStatus();
        await AdminHomePage.knowledgeModel.feedbackMetadataManager.verifyDisplayedStatus();
        await AdminHomePage.knowledgeModel.universalMetadataManager.verifyDisplayedStatus();
    }

    static async verifyKnowledgeAuthoringSubmenuOptions() {
        const knowledgeAuthoring = AdminHomePage.knowledgeAuthoring;
        await knowledgeAuthoring.workflowBuilder.verifyDisplayedStatus();
        await knowledgeAuthoring.documentStyleSheetsUploader.verifyDisplayedStatus();
        await knowledgeAuthoring.knowledgeSourceManager.verifyDisplayedStatus();
        await knowledgeAuthoring.unifiedTemplateBuilder.verifyDisplayedStatus();
        await knowledgeAuthoring.documentTransferManager.verifyDisplayedStatus();
    }

    static async verifyFeedbackMetadataManagerOptionDisplayed() {
        await AdminHomePage.knowledgeModel.feedbackMetadataManager.scrollToElement();
        await AdminHomePage.knowledgeModel.feedbackMetadataManager.verifyDisplayedStatus();
    }

    static async clickOnfeedbackMetadataManager() {
        StepLogger.subStep('Click on Feedback Metadata manager');
        // wait is necessary to let the element load properly
        await WaitHelper.sleep(PageHelper.timeout.xxs);
        await AdminHomePage.knowledgeModel.feedbackMetadataManager.scrollToElement();
        await AdminHomePage.knowledgeModel.feedbackMetadataManager.hoverOverAndClick();
    }

    static async navigateToFeedbackMetadataManager() {
        await PageHelper.refreshPage();
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.verifyManageKnowledgeOptionDisplayed();
        await AdminHomePageHelper.clickOnManageKnowledgeMenu();
        await AdminHomePageHelper.verifyManageKnowledgeSubMenu();
        await AdminHomePageHelper.clickOnKnowledgeModelSubmenu();
        await AdminHomePageHelper.verifyFeedbackMetadataManagerOptionDisplayed();
        await AdminHomePageHelper.clickOnfeedbackMetadataManager();
        await KnowledgeModelHelper.verifyFeedbackMetadataManagerDisplayed();
    }

    static async clickContentAccessLevelManager() {
        await AdminHomePage.knowledgeModel.contentAccessLevelManager.clickButton();
    }

    static async clickSubMenu(subMenu: DfElement) {
        StepLogger.subStep('Click Sub Menu');
        await subMenu.hoverOverAndClick();
        await WaitHelper.sleep(PageHelper.timeout.xs);
    }

    static async verifyKnowledgeContributionSubMenu() {
        StepLogger.subVerification('Verify Knowledge Contribution menu');
        await AdminHomePage.manageKnowledge.knowledgeReContribution.verifyDisplayedStatus();
    }

    static async clickManageKnowledge() {
        StepLogger.subStep('Click on Manage knowledge.');
        const knowledgeContributionPresent = await AdminHomePage.manageKnowledge.knowledgeContribution.item.isDisplayed();
        if (!knowledgeContributionPresent) {
            await AdminHomePage.sidebar.manageKnowledge.scrollToElement();
            await AdminHomePage.sidebar.manageKnowledge.hoverOverAndClick();
        }
        // wait is necessary to let the element load properly
        await WaitHelper.sleep(PageHelper.timeout.xxs);
    }

    static async verifyManageKnowledgeOptionDisplayed() {
        await AdminHomePage.sidebar.manageKnowledge.scrollToElement();
        await AdminHomePage.sidebar.manageKnowledge.verifyDisplayedStatus();
    }

    static async verifyModelKnowledgeOptionDisplayed() {
        await AdminHomePage.sidebar.manageKnowledge.scrollToElement();
        await AdminHomePage.manageKnowledge.knowledgeModel.verifyDisplayedStatus();
    }

    static async navigateToUserGroupFinder(loginAsAdmin = true) {
        if (loginAsAdmin) {
            await AdminLoginPageHelper.loginAsAdmin();
        }

        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.clickOnManagePeopleButton();
        await ManagePeoplePage.managePeopleSubmenuOptions.userAndGroupFinder.clickButton();
        await ManagePeople1Helper.verifyUserAndGroupFinderPageDisplayed();
    }

    static async clickOnManageSiteExperienceMenu() {
        await WaitHelper.sleep(PageHelper.timeout.xs);
        await AdminHomePage.sidebar.manageSiteExp.scrollToElement();
        await AdminHomePage.sidebar.manageSiteExp.hoverOverAndClick();
    }

    static async clickOnAgentMicrositeOption() {
        await AdminHomePage.manageSiteExp.agentMicrosite.scrollToElement();
        await AdminHomePage.manageSiteExp.agentMicrosite.hoverOverAndClick();
    }

    static async verifyResolutionFlowDesignerDisplayed() {
        await AdminHomePage.AgentMicrosite.resolutionFlowDesigner.verifyDisplayedStatus();
    }

    static async clickOnResolutionFlowDesignerOption() {
        await AdminHomePage.AgentMicrosite.resolutionFlowDesigner.scrollToElement();
        await AdminHomePage.AgentMicrosite.resolutionFlowDesigner.hoverOverAndClick();
    }

    static async navigateToResolutionFlowDesignerPage() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.clickOnManageSiteExperienceMenu();
        await AdminHomePageHelper.verifyManageSiteExpSubMenu();
        await AdminHomePageHelper.clickOnAgentMicrositeOption();
        await AdminHomePageHelper.clickOnResolutionFlowDesignerOption();
        await AgentMicrositeHelper.verifyResolutionFlowDesignerPageDisplayed();
    }

    static async navigateToProfileEditor(loginAsAdmin = true) {
        if (loginAsAdmin) {
            await AdminLoginPageHelper.loginAsAdmin();
        }

        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.clickOnManagePeopleButton();
        await ManagePeoplePage.managePeopleSubmenuOptions.userCreator.clickButton();
        await ProfileEditorHelper.verifyProfileEditorPageDisplayed();
    }

    static async clickOnUserCreatorOption() {
        await AdminHomePage.managePeople.userCreator.hoverOverAndClick();
    }

    static async navigateToEditProfilePage() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.verifySideMenuDisplayed();
        await AdminHomePageHelper.clickOnManagePeopleButton();
        await AdminHomePageHelper.verifyManagePeopleSubMenu();
        await AdminHomePage.managePeople.userCreator.verifyDisplayedStatus();
        await AdminHomePageHelper.clickOnUserCreatorOption();
        await UserCreatorHelper.verifyProfileEditorPageDisplayed();
    }

    static async clickOnUserGroupFinderOption() {
        await AdminHomePage.managePeople.userGroupFinder.hoverOverAndClick();
    }

    static async searchAndDisplayUser(userName: string, loginAsAdmin = false) {
        const attr = UserAndGroupFinderPage.controlForm;
        await this.navigateToUserAndGroupFinder(loginAsAdmin);
        await attr.textBoxes.userName.sendKeys(userName);
        await attr.buttons.search.clickButton();
        await CommonPageHelper.switchToUserFrame(PageHelper.timeout.xs);
        await attr.userList(userName).clickLink();
    }

    static async navigateToUserAndGroupFinder(loginAsAdmin = false) {
        if (loginAsAdmin) {
            await AdminLoginPageHelper.loginAsAdmin();
        }

        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.verifySideMenuDisplayed();
        await AdminHomePageHelper.clickOnManagePeopleButton();
        await AdminHomePage.managePeople.userCreator.verifyDisplayedStatus();
        await AdminHomePage.managePeople.userGroupFinder.verifyDisplayedStatus();
        await AdminHomePageHelper.clickOnUserGroupFinderOption();
        await UserAndGroupFinderHelper.verifyUserAndGroupFinderPageDisplayed();
    }

    static async verifyNotificationAndSubscriptionSubMenu() {
        StepLogger.subVerification('Verify Notification And Subscription sub Menu');
        await AdminHomePage.administerSystem.rssFeedManager.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.emailTemplateManager.verifyDisplayedStatus();
    }

    static async verifyUserCreatorDisplayed() {
        await AdminHomePage.managePeople.userCreator.verifyDisplayedStatus();
    }

    static async verifyUserAndGroupFinderOptionIsAvailable() {
        await AdminHomePage.managePeople.userGroupFinder.verifyDisplayedStatus();
    }

    static async verifyAnalyticsSubMenu() {
        StepLogger.subVerification('Verify Analytics sub Menu');
        await AdminHomePage.administerSystem.dateConfManager.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.successConfManager.verifyDisplayedStatus();
        await AdminHomePage.administerSystem.threshholdConfManager.verifyDisplayedStatus();
    }

    static async verifyAgentMicrositeMenuOptions() {
        await AdminHomePage.AgentMicrosite.resolutionFlowDesigner.verifyDisplayedStatus();
        await AdminHomePage.AgentMicrosite.micrositeBuilder.verifyDisplayedStatus();
        await AdminHomePage.AgentMicrosite.recommendationManager.verifyDisplayedStatus();
        await AdminHomePage.AgentMicrosite.visualSearchManager.verifyDisplayedStatus();
    }

    static async clickOnRecomendationManagerOption() {
        await AdminHomePage.AgentMicrosite.recommendationManager.hoverOverAndClick();
    }

    static async navigateToRecommendationPage() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.clickOnManageSiteExperienceMenu();
        await AdminHomePageHelper.verifyManageSiteExpSubMenu();
        await AdminHomePageHelper.clickOnAgentMicrositeOption();
        await AdminHomePageHelper.verifyAgentMicrositeMenuOptions();
        await AdminHomePageHelper.clickOnRecomendationManagerOption();
        await AgentMicrositeHelper.verifyRecomendationManagerPageDisplayed();
    }

    static async clickOnKnowledgeContributionOption() {
        StepLogger.subStep('Click on Contribution menu');
        await WaitHelper.waitForElementToBeClickable(AdminHomePage.manageKnowledge.knowledgeContribution.item);
        await AdminHomePage.manageKnowledge.knowledgeContribution.hoverOverAndClick();
    }

    static async verifyknowledgeReContributionOptionDisplayed() {
        await AdminHomePage.manageKnowledge.knowledgeReContribution.verifyDisplayedStatus();
    }

    url(): string {
        return EndpointHelper.home;
    }
}
