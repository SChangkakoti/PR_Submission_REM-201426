import { StepLogger } from '../../../../../core/logger/step-logger';
import { CheckboxHelper } from '../../../../components/html/checkbox-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { CommonPageHelper } from '../../common/common-page.helper';
import { CommonPage } from '../../common/common.po';

import { CommunitiesManagerHelperExtension } from './communities-manager-extension.helper';
import { CommunitiesManagerConstant } from './communities-manager.constants';
import { CommunitiesManagerPage } from './communities-manager.po';

const { executeInNewTab } = PageHelper;

export class CommunitiesManagerHelper extends CommunitiesManagerHelperExtension {

    static async clickLanguageDropdown() {
        await CommunitiesManagerPage.languageDropdown.clickButton();
    }

    static async clickCreateCommunity() {
        await CommunitiesManagerPage.buttons.createForum.clickButton();
    }

    static async clickCreateSubcategory() {
        await CommunitiesManagerPage.buttons.subcategory.clickButton();
    }

    static async clickManagedCollaboration() {
        await CommunitiesManagerPage.communityDialog.managedCollaboration.clickButton();
    }

    static async clickSelectModerator() {
        await CommunitiesManagerPage.communityDialog.selectBtn.clickButton();
    }

    static async clickCommunitySubmitButton() {
        await CommunitiesManagerPage.communityDialog.submitBtn.clickButton();
    }

    static async clickSubcategorySubmitButton() {
        await CommunitiesManagerPage.subcategoryDialog.submitBtn.clickButton();
    }

    static async verifyPageTitle() {
        const titles = CommunitiesManagerConstant.titles;
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
    }

    static async verifyPageContent() {
        const buttons = CommunitiesManagerPage.buttons;
        await buttons.createForum.verifyDisplayedStatus();
        await buttons.privateCommunity.verifyDisplayedStatus();
        await buttons.subcategory.verifyDisplayedStatus();
    }

    static async verifyLanguages() {
        const lanDropdown = CommunitiesManagerConstant.languageDropdown;
        await CommunitiesManagerPage.getLanguageOptions(lanDropdown.english).verifyDisplayedStatus();
        await CommunitiesManagerPage.getLanguageOptions(lanDropdown.russian).verifyDisplayedStatus();
    }

    static async selectLanguage(language: string) {
        StepLogger.subStep('Select language');
        await CommunitiesManagerPage.getLanguageOptions(language).clickButton();
    }

    static async verifyCommunitiesList() {
        const list = CommunitiesManagerPage.communitiesList;
        await list.title.verifyDisplayedStatus();
        await list.communities.verifyDisplayedStatus();
    }

    static async navigateToCommunitiesManager(switchToFrame = false) {
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.clickManageCommunities();
        await AdminHomePageHelper.clickManageCommunitiesSubMenu(AdminHomePage.manageCommunities.communitiesManager);

        if (switchToFrame) {
            StepLogger.subStep('Switch to content frame');
            await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        }
    }

    static async verifyNewCommunityDialog(switchToFrame = false) {
        await CommunitiesManagerPage.communityDialog.dialog.verifyDisplayedStatus();
        if (switchToFrame) {
            StepLogger.subStep('Switch to dialog frame');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        }
    }

    static async enterCommunityName(name: string) {
        await CommunitiesManagerPage.communityDialog.nameInput.sendKeys(name);
    }

    static async verifyCommunityName(name: string) {
        await CommunitiesManagerPage.communityDialog.nameInput.verifyTextBoxContains(name);
    }

    static async enterCommunityDescription(desc: string) {
        await CommunitiesManagerPage.communityDialog.description.sendKeys(desc);
    }

    static async verifyCommunityDescription(desc: string) {
        await CommunitiesManagerPage.communityDialog.description.verifyTextBoxContains(desc);
    }

    static async verifyModeratorDialog() {
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        StepLogger.subStep('Switch to moderator frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.moderatorIFrame);
        await CommunitiesManagerPage.communityDialog.moderatorTable.verifyDisplayedStatus();
    }

    static async selectModeratorAndClickOk() {
        const moderator = await CommunitiesManagerPage.communityDialog.moderatorName.getText();
        await CommunitiesManagerPage.communityDialog.selectModerator.clickButtonJs();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        await CommunitiesManagerPage.communityDialog.ok.clickButton();
        return moderator;
    }

    static async verifySelectedModerator(moderator: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        await CommunitiesManagerPage.communityDialog.selectedModerator.verifyContainsText(moderator);
    }

    static async verifyCreatedCommunity(name: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.communitiesList.community(name).verifyDisplayedStatus();
    }

    static async verifyCreateSubcategoryDialog(switchToFrame = false) {
        await CommunitiesManagerPage.subcategoryDialog.dialog.verifyDisplayedStatus();
        if (switchToFrame) {
            StepLogger.subStep('Switch to dialog frame');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.subcategoryDialog.dialogIFrame);
        }
    }

    static async enterSubcategoryName(name: string) {
        await CommunitiesManagerPage.subcategoryDialog.nameInput.sendKeys(name);
    }

    static async verifySubcategoryName(name: string) {
        await CommunitiesManagerPage.subcategoryDialog.nameInput.verifyTextBoxContains(name);
    }

    static async enterSubcategoryDescription(name: string) {
        await CommunitiesManagerPage.subcategoryDialog.description.sendKeys(name);
    }

    static async verifySubcategoryDescription(name: string) {
        await CommunitiesManagerPage.subcategoryDialog.description.verifyTextBoxContains(name);
    }

    static async verifyCreatedSubcategory(name: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.subcategoryDialog.subcategory(name).verifyDisplayedStatus();
    }

    static async createSubcategory(category: string) {
        await CommunitiesManagerHelper.navigateToCommunitiesManager(true);
        await CommunitiesManagerHelper.clickCreateSubcategory();
        await CommunitiesManagerHelper.verifyCreateSubcategoryDialog(true);
        await CommunitiesManagerHelper.enterSubcategoryName(category);
        await CommunitiesManagerHelper.clickSubcategorySubmitButton();
        await CommunitiesManagerHelper.verifyCreatedSubcategory(category);
    }

    static async selectSubcategory(category: string) {
        await CommunitiesManagerPage.subcategoryDialog.subcategory(category).clickButton();
    }

    static async verifySubcategorySelected(category: string) {
        await CommunitiesManagerPage.titles.bottomTitle(category).verifyDisplayedStatus();
        const buttons = CommunitiesManagerPage.buttons;
        await buttons.createForum.verifyDisplayedStatus();
        await buttons.privateCommunity.verifyDisplayedStatus();
        await buttons.subcategory.verifyDisplayedStatus();
        await buttons.rename.verifyDisplayedStatus();
        await buttons.delete.verifyDisplayedStatus();
    }

    static async enterInputTemplate(template: string) {
        await CommunitiesManagerPage.communityDialog.templateInput.sendKeys(template);
    }

    static async verifyInputTemplate(template: string) {
        await CommunitiesManagerPage.communityDialog.templateInput.verifyTextBoxContains(template);
    }

    static async verifyManagedCollaboration() {
        const selected = await CheckboxHelper.isCheckboxChecked(CommunitiesManagerPage.communityDialog.managedCollaboration);
        await ExpectationHelper.verifyStringEqualTo(selected.toString(), Constants.boolean.true.toString());
    }

    static async verifyCommunityNameRequired() {
        await executeInNewTab(async () => {
            await CommunitiesManagerPage.communityNameRequired.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async clickOkButton() {
        await CommunitiesManagerPage.communityNameRequired.okBtn.clickButton();
        StepLogger.subStep('Switch to first window');
        await PageHelper.switchToFirstTab();
    }

    static async verifyWindowClosed() {
        StepLogger.subStep('Get window handles');
        const handles = await PageHelper.getAllWindowHandles();
        await ExpectationHelper.verifyStringEqualTo(handles.length.toString(), Constants.stringNumber.one);
        await CommonPageHelper.switchToWindow(Constants.number.zero);
        StepLogger.subStep('Switch to iframe');
        await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
    }

    static async deleteCommunity(name: string, toClick: boolean = true) {
        if (toClick) {
            await CommunitiesManagerPage.communitiesList.community(name).clickButton();
        }

        await CommunitiesManagerPage.titles.bottomTitle(name).verifyDisplayedStatus();
        await CommunitiesManagerPage.buttons.delete.clickButton();
        await executeInNewTab(async () => {
            await CommunitiesManagerPage.deleteCommunity.yesBtn.clickButton();
        }, Constants.number.one, false);

        StepLogger.subStep('Switch to first window');
        await PageHelper.switchToFirstTab();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async deleteCategoryAndCommunity(category: string, community: string) {
        await CommunitiesManagerHelper.deleteCommunity(community);
        await CommunitiesManagerHelper.deleteCommunity(category, false);
    }

    static async verifySelectModeratorWindow() {
        await executeInNewTab(async () => {
            await CommunitiesManagerPage.selectModerator.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async verifySubcategoryNameWindow() {
        await executeInNewTab(async () => {
            await CommunitiesManagerPage.subcategoryName.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async createCommunity(community: string) {
        await CommunitiesManagerHelper.navigateToCommunitiesManager(true);
        await CommunitiesManagerHelper.clickCreateCommunity();
        await CommunitiesManagerHelper.verifyNewCommunityDialog(true);
        await CommunitiesManagerHelper.enterCommunityName(community);
        await CommunitiesManagerHelper.clickSelectModerator();
        await CommunitiesManagerHelper.verifyModeratorDialog();
        await CommunitiesManagerHelper.selectModeratorAndClickOk();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        await CommunitiesManagerHelper.clickCommunitySubmitButton();
        await CommunitiesManagerHelper.verifyCreatedCommunity(community);
    }

    static async clickCommunity(community: string) {
        await CommunitiesManagerPage.communitiesList.community(community).clickButton();
    }

    static async verifyCommunityAndButtons(name: string) {
        const buttons = CommunitiesManagerPage.buttons;
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.titles.bottomTitle(name).verifyDisplayedStatus();
        await buttons.editProperties.verifyDisplayedStatus();
        await buttons.editVisibility.verifyDisplayedStatus();
        await buttons.editHomeOptions.verifyDisplayedStatus();
        await buttons.delete.verifyDisplayedStatus();
    }

    static async clickEditPropertiesButton() {
        await CommunitiesManagerPage.buttons.editProperties.clickButton();
    }

    static async clickEditVisibilityButton() {
        await CommunitiesManagerPage.buttons.editVisibility.clickButton();
    }

    static async verifyEditCommunityDialog(switchToFrame = false) {
        await CommunitiesManagerPage.communityDialog.dialog.verifyDisplayedStatus();
        if (switchToFrame) {
            StepLogger.subStep('Switch to dialog frame');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        }
    }

    static async verifyEditedCommunity(name: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.communitiesList.selectedCommunity(name).verifyDisplayedStatus();
    }

    static async verifyEditVisibilityDialog(switchToFrame = false) {
        await CommunitiesManagerPage.communityVisibilityDialog.dialog.verifyDisplayedStatus();
        if (switchToFrame) {
            StepLogger.subStep('Switch to dialog frame');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        }
    }

    static async clickVisibilityDropdown() {
        await CommunitiesManagerPage.communityVisibilityDialog.visibilityDropdown.clickButton();
    }

    static async verifyVisibilityDropdown() {
        const dialog = CommunitiesManagerPage.communityVisibilityDialog;
        await dialog.visibilityOption(CommunitiesManagerConstant.visibilityDropdown.private).verifyDisplayedStatus();
        await dialog.visibilityOption(CommunitiesManagerConstant.visibilityDropdown.private).verifyDisplayedStatus();
    }

    static async selectVisibility(visibility: string) {
        await CommunitiesManagerPage.communityVisibilityDialog.visibilityOption(visibility).clickButton();
    }

    static async verifySelectedVisibility(visibility: string) {
        const selected = await CommunitiesManagerPage.communityVisibilityDialog.visibilityDropdown.getSelectedOptionText();
        await ExpectationHelper.verifyStringEqualTo(selected, visibility);
    }

    static async clickVisibilitySubmitButton() {
        await CommunitiesManagerPage.communityVisibilityDialog.submitBtn.clickButton();
    }

    static async verifyCommunityVisibility(visibility: string) {
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.buttons.editVisibility.clickButton();
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityVisibilityDialog.dialogIFrame);
        await CommunitiesManagerHelper.verifySelectedVisibility(visibility);
        await CommunitiesManagerPage.communityVisibilityDialog.cancelBtn.clickButton();
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async clickEditHomePageButton() {
        await CommunitiesManagerPage.buttons.editHomeOptions.clickButton();
    }

    static async verifyHomePageDialog(switchToFrame = false) {
        await CommunitiesManagerPage.homePageDialog.dialog.verifyDisplayedStatus();
        if (switchToFrame) {
            StepLogger.subStep('Switch to dialog frame');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        }
    }

    static async clickPageUsesTemplateButton() {
        await CommunitiesManagerPage.homePageDialog.templateBtn.clickButton();
    }

    static async verifyPageUsesTemplateSelected() {
        const selected = await CheckboxHelper.isCheckboxChecked(CommunitiesManagerPage.homePageDialog.templateBtn);
        await ExpectationHelper.verifyStringEqualTo(selected.toString(), Constants.boolean.true.toString());
    }

    static async selectHomeTemplate(template: string) {
        await CommunitiesManagerPage.homePageDialog.templateInput.sendKeys(template);
    }

    static async verifyHomeTemplate(template: string) {
        await CommunitiesManagerPage.homePageDialog.templateInput.verifyTextBoxContains(template);
    }

    static async clickHomePageSubmitButton() {
        await CommunitiesManagerPage.homePageDialog.submitBtn.clickButton();
    }

    static async verifyCommunityTemplate(community: string) {
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.buttons.editHomeOptions.clickButton();
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        await CommunitiesManagerPage.homePageDialog.templateInput.verifyTextBoxContains(community);
        await CommunitiesManagerPage.homePageDialog.cancelBtn.clickButton();
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async cancelEditPropertiesButton() {
        await CommunitiesManagerPage.communityDialog.cancelBtn.clickButton();
    }

    static async clickDeleteButton() {
        await CommunitiesManagerPage.buttons.delete.clickButton();
    }

    static async verifyDeleteWindow() {
        await executeInNewTab(async () => {
            await CommunitiesManagerPage.deleteCommunity.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async clickYesDeleteWindow() {
        await CommunitiesManagerPage.deleteCommunity.yesBtn.clickButton();
        StepLogger.subStep('Switch to first window');
        await PageHelper.switchToFirstTab();
    }

    static async clickNoDeleteWindow() {
        await CommunitiesManagerPage.deleteCommunity.noBtn.clickButton();
        StepLogger.subStep('Switch to first window');
        await PageHelper.switchToFirstTab();
    }

    static async verifyCommunityDeleted(name: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.communitiesList.community(name).verifyHiddenStatus();
    }

    static async clickRenameButton() {
        await CommunitiesManagerPage.buttons.rename.clickButton();
    }

    static async enterSubcategoryNameAndDescription(name: string) {
        await CommunitiesManagerPage.subcategoryDialog.nameInput.sendKeys(name);
        await CommunitiesManagerPage.subcategoryDialog.description.sendKeys(name);
    }

    static async verifySubcategoryNameAndDescription(name: string) {
        await CommunitiesManagerPage.subcategoryDialog.nameInput.verifyTextBoxContains(name);
        await CommunitiesManagerPage.subcategoryDialog.description.verifyTextBoxContains(name);
    }

    static async verifySelectedSubcategory(name: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.subcategoryDialog.selectedSubcategory(name).verifyDisplayedStatus();
    }

    static async verifyDeleteCategoryWindow() {
        await executeInNewTab(async () => {
            await CommunitiesManagerPage.deleteCategory.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async verifyCategoryDeleted(name: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerPage.communitiesList.community(name).verifyHiddenStatus();
    }

    static async clickCancelCommunity(switchToFrame: boolean = false) {
        if (switchToFrame) {
            StepLogger.subStep('Switch to dialog frame');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        }

        await CommunitiesManagerHelper.cancelEditPropertiesButton();
    }

    static async clickCancelCategory() {
        await CommunitiesManagerPage.subcategoryDialog.cancelBtn.clickButton();
    }
}
