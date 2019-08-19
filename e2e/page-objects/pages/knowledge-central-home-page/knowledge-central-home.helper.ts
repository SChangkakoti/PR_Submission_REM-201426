import { StepLogger } from '../../../../core/logger/step-logger';
import { AlertHelper } from '../../../components/html/alert-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { Constants } from '../../../components/misc-utils/constants';
import { DfElement } from '../../../components/misc-utils/df-elements-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { AdminHomePageHelper } from '../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../admin-home-page/admin-home.po';
import { RssFeedManagerPage } from '../administer-system/rss-feed-manager/rss-feed-manager.po';
import { BasePageHelper } from '../base-page.helper';
import { CommonPageHelper } from '../common/common-page.helper';
import { KnowledgeCentralContentManagerPageHelper } from '../knowledge-central-content-manager/knowledge-central-content-manager.helper';

import { KnowledgeCentralHomePageConstant } from './knowledge-central-home.constants';
import { KnowledgeCentralHomePage } from './knowledge-central-home.po';

export class KnowledgeCentralHomePageHelper extends BasePageHelper {

    static async verifySidebarFieldsDisplayed() {
        await KnowledgeCentralHomePage.sidebar.microsites.verifyDisplayedStatus();
        await KnowledgeCentralHomePage.sidebar.caseManager.verifyDisplayedStatus();
        await KnowledgeCentralHomePage.sidebar.collaboration.verifyDisplayedStatus();
        await KnowledgeCentralHomePage.sidebar.contentManager.verifyDisplayedStatus();
        await KnowledgeCentralHomePage.sidebar.settings.verifyDisplayedStatus();
        await KnowledgeCentralHomePage.sidebar.logout.verifyDisplayedStatus();
    }

    static async verifyHeaderBannerDisplayed() {
        await KnowledgeCentralHomePage.headerBanner.verifyDisplayedStatus();
    }

    static async clickOnMenuIcon() {
        StepLogger.subStep('Click on menu icon');
        await KnowledgeCentralHomePage.hamburgerIcon.clickButton();
    }

    static async verifyContentManagerMenuDisplayed() {
        await KnowledgeCentralHomePage.sidebar.contentManager.verifyDisplayedStatus();
    }

    static async clickOnContentManagerMenu() {
        StepLogger.subStep('Click on Content Manager menu');
        await KnowledgeCentralHomePage.sidebar.contentManager.hoverOverAndClick();
    }

    static async navigateToContentManagerPage() {
        await KnowledgeCentralHomePageHelper.clickOnMenuIcon();
        await KnowledgeCentralHomePageHelper.verifyContentManagerMenuDisplayed();
        await KnowledgeCentralHomePageHelper.clickOnContentManagerMenu();
        await KnowledgeCentralContentManagerPageHelper.verifyContentManagerPageDisplayed();
    }

    static async verifyHomePageProperties() {
        StepLogger.subVerification('Verify Home Page Properties');
        const label = KnowledgeCentralHomePage.homePageProperties;
        await label.menuButton.verifyDisplayedStatus();
        await PageHelper.switchToiFrame(AdminHomePage.contentIFrame);
        await label.searchBar.verifyDisplayedStatus();
        await label.myFavorites.verifyDisplayedStatus();
        await label.workInProgress.verifyDisplayedStatus();
        await label.answerWizards.verifyDisplayedStatus();
        await label.mySubscriptions.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickOnCollaboration() {
        StepLogger.subStep('Click On Collaboration');
        await KnowledgeCentralHomePage.sidebar.collaboration.clickLink();
    }

    static async clickAbout() {
        StepLogger.subStep('Click About');
        await KnowledgeCentralHomePage.settings.about.clickButton();
    }

    static async clickHelp() {
        StepLogger.subStep('Click Help');
        await KnowledgeCentralHomePage.settings.help.clickButton();
    }

    static async verifySettingsSubMenu() {
        StepLogger.subVerification('Verify Setting Sub Menu');
        await KnowledgeCentralHomePage.settings.about.verifyDisplayedStatus();
        await KnowledgeCentralHomePage.settings.help.verifyDisplayedStatus();
    }

    static async verifyPopUp(title: string) {
        StepLogger.subVerification('Verify PopUp');
        await WaitHelper.waitForElementToBeDisplayed(RssFeedManagerPage.uiDialog.uiDialogTitle.item);
        await RssFeedManagerPage.uiDialog.uiDialogTitle.verifyContainsText(title);
    }

    static async clickPopupClose() {
        StepLogger.subStep('Click Popup Close');
        await KnowledgeCentralHomePage.button.dialogClose.clickButton();
    }

    static async switchToFirstTabAndLogOut() {
        StepLogger.subStep('Switch to first Tab and Log Out');
        await PageHelper.closeAllWindowsAndSwitchToFirst();
        await this.logout();
    }

    static async logout() {
        StepLogger.subStep('Click Log Out');
        await AlertHelper.acceptAlertIfExists();
        if (await KnowledgeCentralHomePage.hamburgerIcon.item.isPresent()) {
            // sleep is necessary to let the element load properly
            await WaitHelper.sleep(PageHelper.timeout.xs);
            await KnowledgeCentralHomePage.hamburgerIcon.hoverOverAndClick();
            await this.verifySidebarFieldsDisplayed();
            await KnowledgeCentralHomePage.sidebar.logout.clickButton();
        }
    }

    static async verifyHelpPane() {
        StepLogger.subVerification('Verify Help Pane');
        const help = KnowledgeCentralHomePageConstant.elementNames.help;
        await PageHelper.switchToNewTabIfAvailable();
        const currentUrl = await PageHelper.getCurrentUrl();
        await ExpectationHelper.verifyStringValueContain(currentUrl.toLowerCase(), help.toLowerCase());
    }

    static async verifyWindowClosed() {
        StepLogger.subVerification('Verify Window is closed');
        const tabCount = await PageHelper.getTabsCount();
        await ExpectationHelper.verifyStringEqualTo(tabCount.toString(), Constants.stringNumber.one);
        await CommonPageHelper.switchToWindow(Constants.number.zero);
    }

    static async clickToc() {
        StepLogger.subStep('Click TOC');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.navigationFrame, async () => {
            await helpPane.toc.clickButton();
        });
    }

    static async verifyTocSection() {
        StepLogger.subVerification('Verify TOC Section');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.navigationFrame, async () => {
            await helpPane.tocIframe.verifyDisplayedStatus();
        });
    }

    static async clickIndex() {
        StepLogger.subStep('Click Index');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.navigationFrame, async () => {
            await helpPane.index.clickButton();
        });
    }

    static async verifyIndexSection() {
        StepLogger.subVerification('Verify Index Section');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.navigationFrame, async () => {
            await helpPane.indexIframe.verifyDisplayedStatus();
        });
    }

    static async clickSearch() {
        StepLogger.subStep('Click Search');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.navigationFrame, async () => {
            await helpPane.search.clickButton();
        });
    }

    static async verifySearchSection() {
        StepLogger.subVerification('Verify Search Section');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.navigationFrame, async () => {
            await helpPane.searchIframe.verifyDisplayedStatus();
        });
    }

    static async navigateToHelp() {
        StepLogger.subStep('Navigate to Help Menu');
        await this.clickOnMenuIcon();
        await this.verifySidebarFieldsDisplayed();
        await AdminHomePageHelper.clickSettings();
        await this.verifySettingsSubMenu();
    }

    static async clickTocOption(target: DfElement) {
        StepLogger.subStep('Click TOC Option');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.tocIframe]);
        await target.clickButton();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyTocOption() {
        StepLogger.subVerification('Verify TOC Option');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.tocIframe]);
        await helpPane.knovaCentralHelp.verifyDisplayedStatus();
        await helpPane.introToKnovaCentral.verifyDisplayedStatus();
        await helpPane.navigateKnovaCentral.verifyDisplayedStatus();
        await helpPane.workingWithMicroSite.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyTocPage(target: DfElement) {
        StepLogger.subVerification('Verify TOC Page');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.bodyFrame, async () => {
            await target.verifyDisplayedStatus();
        });
    }

    static async verifySearchBox() {
        StepLogger.subVerification('Verify Search Box');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.toolbarFrame, async () => {
            await helpPane.searchToolBar.verifyDisplayedStatus();
        });
    }

    static async enterTextInSearchBoxAndClickSearch(text: string) {
        StepLogger.subStep('Enter Search String in search Box and click search icon');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.toolbarFrame, async () => {
            await helpPane.searchToolBar.sendKeys(text);
            await helpPane.searchIcon.clickButton();
        });
    }

    static async verifyHighlightedResult(text: string) {
        StepLogger.subVerification('Verify Highlighted Result');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.bodyFrame, async () => {
            await helpPane.searchHighlight.verifyDisplayedStatus();
            await helpPane.searchHighlight.verifyContainsText(text);
        });
    }

    static async navigateToHelpPage() {
        StepLogger.subStep('Navigate to Help Page');
        await this.navigateToHelp();
        await this.clickHelp();
        await this.verifyHelpPane();
    }

    static async clickRemoveHighlight() {
        StepLogger.subStep('Click Remove Highlight');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.toolbarFrame, async () => {
            await helpPane.removeHighlight.clickButton();
        });
    }

    static async verifyHighlightedRemoved() {
        StepLogger.subVerification('Verify Highlight removed');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.bodyFrame, async () => {
            await helpPane.searchHighlight.verifyHiddenStatus();
        });
    }

    static async clickBack() {
        StepLogger.subStep('Click Back');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.toolbarFrame, async () => {
            await helpPane.back.clickButton();
        });
    }

    static async clickForward() {
        StepLogger.subStep('Click Forward');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.toolbarFrame, async () => {
            await helpPane.forward.clickButton();
        });
    }

    static async verifyBreadCrumb(target: DfElement) {
        StepLogger.subVerification('Verify BreadCrumb Link');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.bodyFrame, async () => {
            await target.verifyDisplayedStatus();
        });
    }

    static async clickBreadCrumb(target: DfElement) {
        StepLogger.subStep('Click BreadCrumb Link');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.executeInIFrame(helpPane.bodyFrame, async () => {
            await target.clickButton();
        });
    }

    static async clickIndexOption(target: DfElement) {
        StepLogger.subStep('Click Index Option');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.indexIframe]);
        await target.clickButton();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyIndexOption() {
        StepLogger.subVerification('Verify Index Option');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.indexIframe]);
        await helpPane.accessLevels.verifyDisplayedStatus();
        await helpPane.alerts.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async enterTextAndClickSearch(search: string) {
        StepLogger.subStep('Enter Text in search and click Search');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.searchIframe]);
        await helpPane.searchField.sendKeys(search);
        await helpPane.searchButton.clickButton();
        await PageHelper.switchToDefaultContent();
    }

    static async verifySearchField() {
        StepLogger.subVerification('Verify Search Field');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.searchIframe]);
        await helpPane.searchField.verifyDisplayedStatus();
        await helpPane.searchButton.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async verifyTextInSearchField(search: string) {
        StepLogger.subVerification('Verify Text in search field');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.searchIframe]);
        await helpPane.searchField.verifyTextEntered(search);
        await PageHelper.switchToDefaultContent();
    }

    static async verifySearchResults() {
        StepLogger.subVerification('Verify Search results');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.searchIframe]);
        await helpPane.searchResults.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async enterTextInIndexSearchField(search: string) {
        StepLogger.subStep('Enter text in index search field');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.indexIframe]);
        await helpPane.indexSearchField.sendKeys(search);
        await PageHelper.switchToDefaultContent();
    }

    static async verifySearchedIndexOption(target: DfElement) {
        StepLogger.subVerification('Verify Access level');
        const helpPane = KnowledgeCentralHomePage.helpPane;
        await PageHelper.switchToDefaultContent();
        await PageHelper.switchToiFrames([helpPane.navigationFrame, helpPane.indexIframe]);
        await target.verifyDisplayedStatus();
        await PageHelper.switchToDefaultContent();
    }

    static async clickOnMenuAndCollaboration() {
        await this.clickOnMenuIcon();
        await this.verifySidebarFieldsDisplayed();
        await this.clickOnCollaboration();
    }

    url(): string {
        return EndpointHelper.home;
    }
}
