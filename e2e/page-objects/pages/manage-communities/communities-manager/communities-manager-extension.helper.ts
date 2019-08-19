import { StepLogger } from '../../../../../core/logger/step-logger';
import { PageHelper } from '../../../../components/html/page-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';

import { CommunitiesManagerConstant } from './communities-manager.constants';
import { CommunitiesManagerHelper } from './communities-manager.helper';
import { CommunitiesManagerPage } from './communities-manager.po';

const { executeInNewTab, getTextOfElements } = PageHelper;

export class CommunitiesManagerHelperExtension {

    static async createCommunityWithManagedCollaboration(community: string) {
        await CommunitiesManagerHelper.navigateToCommunitiesManager(true);
        await CommunitiesManagerHelper.clickCreateCommunity();
        await CommunitiesManagerHelper.verifyNewCommunityDialog(true);
        await CommunitiesManagerHelper.enterCommunityName(community);
        await CommunitiesManagerPage.communityDialog.managedCollaboration.clickButton();
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

    static async clickEditCollaborationProcess() {
        await CommunitiesManagerPage.communityDialog.editCollaboration.clickButton();
    }

    static async verifyCollaborationWorkflowDialog() {
        await CommunitiesManagerPage.collaborationWorkflowDialog.dialog.verifyDisplayedStatus();
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.collaborationWorkflowDialog.dialogIFrame);
    }

    static async clickAddActionCollaborationWorkflowDialog() {
        const dialog = CommunitiesManagerPage.collaborationWorkflowDialog;
        await dialog.addAction.clickButton();
        await dialog.actionTypeOption(CommunitiesManagerConstant.collaborationWorkflowDialog.expertsOption).clickButton();
    }

    static async verifyActionAdded() {
        await CommunitiesManagerPage.collaborationWorkflowDialog.actionTwo.verifyDisplayedStatus();
    }

    static async verifyActionNotAdded() {
        await CommunitiesManagerPage.collaborationWorkflowDialog.actionTwo.verifyHiddenStatus();
    }

    static async clickSaveCollaborationWorkflowDialog() {
        await CommunitiesManagerPage.collaborationWorkflowDialog.saveBtn.clickButton();
    }

    static async clickCancelCollaborationWorkflowDialog() {
        await CommunitiesManagerPage.collaborationWorkflowDialog.cancelBtn.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async closeWindowsAndDeleteCommunity(name: string) {
        await CommunitiesManagerHelper.clickCancelCollaborationWorkflowDialog();
        await CommunitiesManagerHelper.clickCancelCommunity(true);
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await CommunitiesManagerHelper.deleteCommunity(name, false);
    }

    static async clickCreatePrivateCommunity() {
        await CommunitiesManagerPage.buttons.privateCommunity.clickButton();
    }

    static async verifyPrivateCommunityDialog(switchToFrame = false) {
        await CommunitiesManagerPage.privateCommunityDialog.dialog.verifyDisplayedStatus();
        if (switchToFrame) {
            StepLogger.subStep('Switch to dialog frame');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.dialogIFrame);
        }
    }

    static async enterPrivateCommunityName(name: string) {
        await CommunitiesManagerPage.privateCommunityDialog.nameInput.sendKeys(name);
    }

    static async verifyPrivateCommunityName(name: string) {
        await CommunitiesManagerPage.privateCommunityDialog.nameInput.verifyTextBoxContains(name);
    }

    static async enterPrivateCommunityDescription(desc: string) {
        await CommunitiesManagerPage.privateCommunityDialog.description.sendKeys(desc);
    }

    static async verifyPrivateCommunityDescription(desc: string) {
        await CommunitiesManagerPage.privateCommunityDialog.description.verifyTextBoxContains(desc);
    }

    static async clickSelectModeratorPrivate() {
        await CommunitiesManagerPage.privateCommunityDialog.selectBtn.clickButton();
    }

    static async verifyModeratorDialogPrivate() {
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.dialogIFrame);
        StepLogger.subStep('Switch to moderator frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.moderatorIFrame);
        await CommunitiesManagerPage.privateCommunityDialog.moderatorTable.verifyDisplayedStatus();
    }

    static async selectModeratorAndClickOkPrivate() {
        const moderator = await CommunitiesManagerPage.privateCommunityDialog.moderatorName.getText();
        await CommunitiesManagerPage.privateCommunityDialog.selectModerator.clickButtonJs();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.dialogIFrame);
        await CommunitiesManagerPage.privateCommunityDialog.ok.clickButton();
        return moderator;
    }

    static async verifySelectedModeratorPrivate(moderator: string) {
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.dialogIFrame);
        await CommunitiesManagerPage.privateCommunityDialog.selectedModerator.verifyContainsText(moderator);
    }

    static async clickPrivateCommunitySubmitButton() {
        await CommunitiesManagerPage.privateCommunityDialog.submitBtn.clickButton();
    }

    static async enterInputTemplatePrivate(template: string) {
        await CommunitiesManagerPage.privateCommunityDialog.templateInput.sendKeys(template);
    }

    static async verifyInputTemplatePrivate(template: string) {
        await CommunitiesManagerPage.privateCommunityDialog.templateInput.verifyTextBoxContains(template);
    }

    static async createPrivateCommunity(community: string) {
        await CommunitiesManagerHelper.navigateToCommunitiesManager(true);
        await CommunitiesManagerHelper.clickCreatePrivateCommunity();
        await CommunitiesManagerHelper.verifyPrivateCommunityDialog(true);
        await CommunitiesManagerHelper.enterPrivateCommunityName(community);
        await CommunitiesManagerHelper.clickSelectModeratorPrivate();
        await CommunitiesManagerHelper.verifyModeratorDialogPrivate();
        await CommunitiesManagerHelper.selectModeratorAndClickOkPrivate();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        StepLogger.subStep('Switch to dialog frame');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.dialogIFrame);
        await CommunitiesManagerHelper.clickPrivateCommunitySubmitButton();
        await CommunitiesManagerHelper.verifyCreatedCommunity(community);
    }

    static async verifyCommunityNameAlreadyExits(toCancel: boolean = false) {
        await executeInNewTab(async () => {
            await CommunitiesManagerPage.communityNameAlreadyExists.dialog.verifyDisplayedStatus();
        });

        if (toCancel) {
            StepLogger.subStep('Switch firt window');
            await PageHelper.switchToFirstTab();
            await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
            await CommunitiesManagerHelper.clickCancelCommunity(true);
            StepLogger.subStep('Switch to content frame');
            await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        }
    }

    static async clickPrivateCommunityCancelButton() {
        await CommunitiesManagerPage.privateCommunityDialog.cancelBtn.clickButton();
    }

    static async clickAddUserPrivate() {
        await CommunitiesManagerPage.privateCommunityDialog.addUser.clickButton();
    }

    static async verifyUsersGroupsDialog(switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToiFrame(CommunitiesManagerPage.usersGroups.dialogIFrame);
        }

        await CommunitiesManagerPage.usersGroups.ok.verifyDisplayedStatus();
    }

    static async clickShowAllUsers() {
        await CommunitiesManagerPage.usersGroups.showAllBtn.clickButton();
    }

    static async verifyUsersList() {
        StepLogger.subStep('Switch to users iframe');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.usersGroups.findUsersFrame);
        await CommunitiesManagerPage.usersGroups.searchList.verifyDisplayedStatus();
    }

    static async selectSearchedUser() {
        const name = await CommunitiesManagerPage.usersGroups.userName.getText();
        await CommunitiesManagerPage.usersGroups.selectItem.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        return name;
    }

    static async verifySelectedUserGroup(name: string) {
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.usersGroups.dialogIFrame);
        StepLogger.subStep('Switch to selected iframe');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.usersGroups.selectedFrame);
        const allSelectedItems = await getTextOfElements(CommunitiesManagerPage.usersGroups.allSelectedItems);
        await ExpectationHelper.verifyStringArrayContainsValue(allSelectedItems, name);
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async clickOkUsersGroupsButton() {
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.usersGroups.dialogIFrame);
        await CommunitiesManagerPage.usersGroups.ok.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async clickShowAllGroups() {
        await CommunitiesManagerPage.usersGroups.showAllGroupsBtn.clickButton();
    }

    static async verifyGroupList() {
        StepLogger.subStep('Switch to groups iframe');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.usersGroups.findGroupsFrame);
        await CommunitiesManagerPage.usersGroups.searchList.verifyDisplayedStatus();
    }

    static async selectSearchedGroup() {
        const name = await CommunitiesManagerPage.usersGroups.groupNameSearched.getText();
        await CommunitiesManagerPage.usersGroups.selectItem.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        return name;
    }

    static async createPrivateCommunityWithUser(community: string) {
        await CommunitiesManagerHelper.navigateToCommunitiesManager(true);
        await CommunitiesManagerHelper.clickCreatePrivateCommunity();
        await CommunitiesManagerHelper.verifyPrivateCommunityDialog(true);
        await CommunitiesManagerHelper.enterPrivateCommunityName(community);
        await CommunitiesManagerHelper.clickSelectModeratorPrivate();
        await CommunitiesManagerHelper.verifyModeratorDialogPrivate();
        const moderator = await CommunitiesManagerHelper.selectModeratorAndClickOkPrivate();
        await CommunitiesManagerHelper.verifySelectedModeratorPrivate(moderator);
        await CommunitiesManagerHelper.clickAddUserPrivate();
        await CommunitiesManagerHelper.verifyUsersGroupsDialog(true);
        await CommunitiesManagerHelper.clickShowAllUsers();
        await CommunitiesManagerHelper.verifyUsersList();
        const user = await CommunitiesManagerHelper.selectSearchedUser();
        await CommunitiesManagerHelper.verifySelectedUserGroup(user);
        await CommunitiesManagerHelper.clickOkUsersGroupsButton();
        await CommunitiesManagerHelper.verifyNewCommunityDialog(true);
        await CommunitiesManagerHelper.clickPrivateCommunitySubmitButton();
        await CommunitiesManagerHelper.verifyCreatedCommunity(community);
    }

    static async clickEditUserPrivate() {
        await CommunitiesManagerPage.privateCommunityDialog.viewEditUsers.clickButton();
    }

    static async selectLastSearchedUser() {
        const name = await CommunitiesManagerPage.usersGroups.userName.getText();
        await CommunitiesManagerPage.usersGroups.selectLastItem.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        return name;
    }

    static async deleteMember() {
        StepLogger.subStep('Switch to selected iframe');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.usersGroups.selectedFrame);
        await CommunitiesManagerPage.usersGroups.deleteMember.clickButton();
    }

    static async verifyDeletedMember() {
        StepLogger.subStep('Get number of users');
        const count = await CommunitiesManagerPage.usersGroups.allSelectedItems.item.count();
        await ExpectationHelper.verifyValueEqualTo(count, Constants.number.zero);
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async verifyNumberOfMembers() {
        StepLogger.subStep('Switch to member count iframe');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.privateCommunityDialog.memberCountFrame);
        await CommunitiesManagerPage.privateCommunityDialog.memberCount.verifyDisplayedStatus();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(CommunitiesManagerPage.communityDialog.dialogIFrame);
    }

    static async createPrivateCommunityWithGroup(community: string) {
        await CommunitiesManagerHelper.navigateToCommunitiesManager(true);
        await CommunitiesManagerHelper.clickCreatePrivateCommunity();
        await CommunitiesManagerHelper.verifyPrivateCommunityDialog(true);
        await CommunitiesManagerHelper.enterPrivateCommunityName(community);
        await CommunitiesManagerHelper.clickSelectModeratorPrivate();
        await CommunitiesManagerHelper.verifyModeratorDialogPrivate();
        const moderator = await CommunitiesManagerHelper.selectModeratorAndClickOkPrivate();
        await CommunitiesManagerHelper.verifySelectedModeratorPrivate(moderator);
        await CommunitiesManagerHelper.clickAddUserPrivate();
        await CommunitiesManagerHelper.verifyUsersGroupsDialog(true);
        await CommunitiesManagerHelper.clickShowAllGroups();
        await CommunitiesManagerHelper.verifyGroupList();
        const group = await CommunitiesManagerHelper.selectSearchedGroup();
        await CommunitiesManagerHelper.verifySelectedUserGroup(group);
        await CommunitiesManagerHelper.clickOkUsersGroupsButton();
        await CommunitiesManagerHelper.verifyNewCommunityDialog(true);
        await CommunitiesManagerHelper.clickPrivateCommunitySubmitButton();
        await CommunitiesManagerHelper.verifyCreatedCommunity(community);
    }
}
