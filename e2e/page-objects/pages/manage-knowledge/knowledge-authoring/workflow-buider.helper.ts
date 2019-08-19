import { StepLogger } from '../../../../../core/logger/step-logger';
import { AlertHelper } from '../../../../components/html/alert-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../../admin-login-page/admin-login.helper';
import { CommonPageHelper } from '../../common/common-page.helper';
import { CommonPage } from '../../common/common.po';

import { WorkflowBuilderHelperExtension } from './worflow-builder-extension.helper';
import { WorkflowBuilderConstant } from './workflow-builder.constants';
import { WorkflowBuilderPage } from './workflow-builder.po';

const { executeInNewTab, getTextOfElements } = PageHelper;

export class WorkflowBuilderHelper extends WorkflowBuilderHelperExtension {

    static async clickEditButton() {
        await WorkflowBuilderPage.buttons.edit.clickButton();
    }

    static async clickNewRuleButton() {
        await WorkflowBuilderPage.buttons.newRule.clickButton();
    }

    static async clickNewStateButton() {
        await WorkflowBuilderPage.buttons.newState.clickButton();
    }

    static async clickReorderButton() {
        await WorkflowBuilderPage.buttons.reorder.clickButton();
    }

    static async clickSaveChangesButton() {
        await WorkflowBuilderPage.buttons.saveChanges.clickButton();
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
    }

    static async clickReorderOkButton() {
        await WorkflowBuilderPage.reorder.ok.clickButton();
    }

    static async clickReorderCancelButton() {
        await WorkflowBuilderPage.reorder.cancel.clickButton();
    }

    static async verifyPageTitle() {
        const titles = WorkflowBuilderConstant.titles;
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        await WorkflowBuilderPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
    }

    static async goToKnowledgeAuthoring() {
        await AdminHomePageHelper.clickOnManageKnowledgeMenu();
        await AdminHomePageHelper.verifyManageKnowledgeSubMenu();
        await AdminHomePageHelper.clickOnKnowledgeAuthoring();
    }

    static async navigateToKnowledgeAuthoring() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        StepLogger.subVerification('Verify sidebar');
        await AdminHomePageHelper.verifySidebarFieldsDisplayed();
        await AdminHomePageHelper.clickOnManageKnowledgeMenu();
        await AdminHomePageHelper.verifyManageKnowledgeSubMenu();
        await AdminHomePageHelper.clickOnKnowledgeAuthoring();
    }

    static async navigateToWorkflowBuilder() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        StepLogger.subVerification('Verify sidebar');
        await AdminHomePageHelper.verifySidebarFieldsDisplayed();
        await AdminHomePageHelper.clickOnManageKnowledgeMenu();
        await AdminHomePageHelper.verifyManageKnowledgeSubMenu();
        await AdminHomePageHelper.clickOnKnowledgeAuthoring();
        await AdminHomePageHelper.clickSubMenu(AdminHomePage.knowledgeAuthoring.workflowBuilder);
        await WorkflowBuilderHelper.verifyPageTitle();
    }

    static async verifyNewRuleFields() {
        await WorkflowBuilderPage.ruleFields.name.verifyDisplayedStatus();
        await WorkflowBuilderPage.ruleFields.products.verifyDisplayedStatus();
        await WorkflowBuilderPage.ruleFields.accessLevel.verifyDisplayedStatus();
        await WorkflowBuilderPage.ruleFields.locale.verifyDisplayedStatus();
        await WorkflowBuilderPage.ruleFields.unifiedTemplate.verifyDisplayedStatus();
        await WorkflowBuilderPage.ruleFields.event.verifyDisplayedStatus();
        await WorkflowBuilderPage.ruleFields.documentLifecycle.verifyDisplayedStatus();
        await WorkflowBuilderPage.ruleFields.nextState.verifyDisplayedStatus();
    }

    static async cancelAndLogout() {
        StepLogger.subStep('Cancel changes');
        await WorkflowBuilderPage.buttons.cancel.clickButton();
        await executeInNewTab(async () => {
            await WorkflowBuilderPage.saveChangesWindow.noBtn.clickButton();
        }, Constants.number.one, false);

        StepLogger.subStep('Switch to first tab');
        await PageHelper.switchToFirstTab();
        StepLogger.subStep('Log out');
        await AdminLoginPageHelper.logout(true);
    }

    static async cancelChanges() {
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
        StepLogger.subStep('Cancel changes');
        await WorkflowBuilderPage.buttons.cancel.clickButton();
        await executeInNewTab(async () => {
            await WorkflowBuilderPage.saveChangesWindow.noBtn.clickButton();
        }, Constants.number.one, false);

        StepLogger.subStep('Switch to first tab');
        await PageHelper.switchToFirstTab();
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
    }

    static async enterName(rule: string) {
        await WorkflowBuilderPage.ruleFields.name.sendKeys(rule);
    }

    static async enterNameAndSave(rule: string, toEdit: boolean = true) {
        if (toEdit) {
            await WorkflowBuilderHelper.clickEditButton();
        }

        await WorkflowBuilderPage.ruleFields.name.sendKeys(rule);
        await WorkflowBuilderPage.buttons.saveChanges.clickButton();
    }

    static async verifyName(rule: string) {
        await WorkflowBuilderPage.ruleFields.name.verifyTextBoxContains(rule);
    }

    static async verifySavedName(rule: string) {
        await WorkflowBuilderPage.ruleFields.savedName.verifyContainsText(rule);
    }

    static async selectNextStateOption(state: string) {
        StepLogger.subStep('Select Next State');
        await WorkflowBuilderPage.getNextStateOption(state).clickButton();
    }

    static async verifySelectedNextState(expected: string) {
        const selected = await WorkflowBuilderPage.ruleFields.nextStateSelect.getSelectedOptionText();
        await ExpectationHelper.verifyStringEqualTo(selected.trim(), expected);
    }

    static async selectEventOption(state: string) {
        StepLogger.subStep('Select Event');
        await WorkflowBuilderPage.getEventOption(state).clickButton();
    }

    static async verifySelectedEvent(expected: string) {
        const selected = await WorkflowBuilderPage.ruleFields.eventSelect.getSelectedOptionText();
        await ExpectationHelper.verifyStringEqualTo(selected.trim(), expected);
    }

    static async verifyCreatedRule(rule: string) {
        await WorkflowBuilderPage.getRuleByName(rule).verifyDisplayedStatus();
    }

    static async deleteRuleAndLogout() {
        await WorkflowBuilderPage.ruleFields.deleteRule.clickButton();
        StepLogger.subStep('Click Ok');
        await AlertHelper.acceptAlertIfExists();
        await WorkflowBuilderPage.buttons.saveChanges.clickButton();
        StepLogger.subStep('Logout');
        await AdminLoginPageHelper.logout(true);
    }

    static async deleteRulesAndLogout() {
        await WorkflowBuilderPage.ruleFields.deleteRule.clickButton();
        StepLogger.subStep('Click Ok');
        await AlertHelper.acceptAlertIfExists();
        await WorkflowBuilderPage.ruleFields.deleteRule.clickButton();
        StepLogger.subStep('Click Ok');
        await AlertHelper.acceptAlertIfExists();
        await WorkflowBuilderPage.buttons.saveChanges.clickButton();
        StepLogger.subStep('Logout');
        await AdminLoginPageHelper.logout(true);
    }

    static async selectAuthorWorkflowState(switchToIFrame = false) {
        if (switchToIFrame) {
            await CommonPageHelper.switchToTreeIFrame();
        }
        await WorkflowBuilderPage.workflowStates.author.clickButton();
    }

    static async selectSuggestionWorkflowState() {
        await CommonPageHelper.switchToTreeIFrame();
        await WorkflowBuilderPage.workflowStates.suggestion.clickButton();
        StepLogger.subStep('Switch to frame');
        await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
    }

    static async verifySelectedWorkflowState(expected: string, switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to frame');
            await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
        }
        await WorkflowBuilderPage.workflowStates.state.verifyContainsText(expected);
    }

    static async createNewRule(ruleName: string, toNavigate: boolean = true) {
        if (toNavigate) {
            StepLogger.subStep('Navigate to Workflow Builder');
            await WorkflowBuilderHelper.navigateToWorkflowBuilder();
            await CommonPageHelper.switchToTreeIFrame();
            StepLogger.subStep('Select Author state');
            await WorkflowBuilderHelper.selectAuthorWorkflowState();
            StepLogger.subStep('Switch to frame');
            await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
            StepLogger.subVerification('Verify state');
            await WorkflowBuilderHelper.verifySelectedWorkflowState(WorkflowBuilderConstant.workflowStates.author);
        }

        await WorkflowBuilderPage.buttons.newRule.clickButton();
        StepLogger.subStep('Enter name');
        await WorkflowBuilderHelper.enterName(ruleName);
        StepLogger.subStep('Click Save Changes');
        await WorkflowBuilderHelper.clickSaveChangesButton();
        StepLogger.subVerification('Verify created rule');
        await WorkflowBuilderHelper.verifyCreatedRule(ruleName);
    }

    static async verifyNotUniqueNameWindow() {
        await executeInNewTab(async () => {
            await WorkflowBuilderPage.rowNameNotUniqueMessage().verifyDisplayedStatus();
        });
    }

    static async verifyAtLeastTwoRulesWindow() {
        await executeInNewTab(async () => {
            await WorkflowBuilderPage.atLeastTwoRulesMessage.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async clickOkButton() {
        await WorkflowBuilderPage.atLeastTwoRulesMessage.okBtn.clickButton();
        StepLogger.subStep('Switch to first window');
        await PageHelper.switchToFirstTab();
    }

    static async verifyErrorWindowClosed() {
        StepLogger.subStep('Get window handles');
        const handles = await PageHelper.getAllWindowHandles();
        await ExpectationHelper.verifyStringEqualTo(handles.length.toString(), Constants.stringNumber.one);
        await CommonPageHelper.switchToWindow(Constants.number.zero);
        StepLogger.subStep('Switch to iframe');
        await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
    }

    static async verifyReorderModalDisplayed(switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToiFrame(WorkflowBuilderPage.reorder.dialogIFrame);
        }

        await WorkflowBuilderPage.reorder.ok.verifyDisplayedStatus();
    }

    static async moveRule(rule: string, moveUp: boolean = true) {
        StepLogger.subVerification('Move rule');
        const itemsInitialOrder = await getTextOfElements(WorkflowBuilderPage.reorder.allItems);
        if (moveUp) {
            await WorkflowBuilderHelper.moveItemUp(rule);
        } else {
            await WorkflowBuilderHelper.moveItemDown(rule);
        }

        await WorkflowBuilderPage.reorder.selectItem(rule).clickButton();
        return itemsInitialOrder;
    }

    static async moveItemUp(name: string) {
        await WorkflowBuilderPage.reorder.selectItem(name).clickButton();
        await WorkflowBuilderPage.reorder.moveUp.clickButton();
    }

    static async moveItemDown(name: string) {
        await WorkflowBuilderPage.reorder.selectItem(name).clickButton();
        await WorkflowBuilderPage.reorder.moveDown.clickButton();
    }

    static async verifyItemsReorderedOnReorderModal(initial: string[], switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(WorkflowBuilderPage.reorder.dialogIFrame);
        }

        const reordered = await getTextOfElements(WorkflowBuilderPage.reorder.allItems);
        await ExpectationHelper.verifyStringEqualTo(initial[0], reordered[1]);
        await ExpectationHelper.verifyStringEqualTo(initial[1], reordered[0]);
    }

    static async verifyRulesNotReordered(initial: string[], switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
        }

        const reordered = await getTextOfElements(WorkflowBuilderPage.ruleFields.all);
        await ExpectationHelper.verifyStringEqualTo(initial[0], reordered[0]);
        await ExpectationHelper.verifyStringEqualTo(initial[1], reordered[1]);
    }

    static async verifyRulesReordered(initial: string[], switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToDefaultContentAndIFrame(CommonPage.contentFrame);
        }

        const reordered = await getTextOfElements(WorkflowBuilderPage.ruleFields.all);
        await ExpectationHelper.verifyStringEqualTo(initial[0], reordered[1]);
        await ExpectationHelper.verifyStringEqualTo(initial[1], reordered[0]);
    }

    static async verifyWorkflowStateDialog() {
        await WorkflowBuilderPage.worflowState.dialog.verifyDisplayedStatus();
    }

    static async enterStateName(name: string, switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        }

        await WorkflowBuilderPage.worflowState.inputName.sendKeys(name);
    }

    static async verifyStateName(name: string, switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        }

        await WorkflowBuilderPage.worflowState.inputName.verifyTextBoxContains(name);
    }

    static async clickSelectUsersGroupsButton(switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        }

        await WorkflowBuilderPage.worflowState.selectBtn.clickButton();
    }

    static async verifyUsersGroupsDialog(switchToIFrame = false) {
        if (switchToIFrame) {
            StepLogger.subStep('Switch to iframe');
            await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.dialogIFrame);
        }

        await WorkflowBuilderPage.usersGroups.ok.verifyDisplayedStatus();
    }

    static async selectUsersGroups(toSelect = true) {
        await WorkflowBuilderPage.usersGroups.showAllBtn.clickButton();
        StepLogger.subStep('Switch to users iframe');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.findUsersFrame);
        const name = await WorkflowBuilderPage.usersGroups.userName.getText();
        if (toSelect) {
            await WorkflowBuilderPage.usersGroups.selectItem.clickButton();
        }

        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        return name;
    }

    static async verifySelectedUserGroup(name: string) {
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.dialogIFrame);
        StepLogger.subStep('Switch to selected iframe');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.selectedFrame);
        const allSelectedItems = await getTextOfElements(WorkflowBuilderPage.usersGroups.allSelectedItems);
        await ExpectationHelper.verifyStringArrayContainsValue(allSelectedItems, name);
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async clickOkUsersGroupsButton() {
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.dialogIFrame);
        await WorkflowBuilderPage.usersGroups.ok.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async verifyUsersGroupsSelected(name: string) {
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        await WorkflowBuilderPage.worflowState.selectedUsersGroups.verifyContainsText(name);
    }

    static async setOtherStateOptionsAndSubmit() {
        await WorkflowBuilderPage.worflowState.timeLimit.sendKeys(Constants.stringNumber.two);
        await WorkflowBuilderPage.worflowState.submitBtn.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async verifyCreatedState(name: string) {
        await CommonPageHelper.switchToTreeIFrame();
        await WorkflowBuilderPage.workflowStates.selectedState(name).verifyDisplayedStatus();
    }

    static async selectWorkflowState(name: string) {
        await CommonPageHelper.switchToTreeIFrame();
        await WorkflowBuilderPage.workflowStates.selectState(name).clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async clickSelectedState() {
        await WorkflowBuilderPage.workflowStates.state.clickButton();
    }

    static async navigateToGroupsAndUsers(stateName: string) {
        await WorkflowBuilderHelper.navigateToWorkflowBuilder();
        await WorkflowBuilderHelper.selectWorkflowState(stateName);
        await WorkflowBuilderHelper.clickSelectedState();
    }

    static async clickShowAll() {
        await WorkflowBuilderPage.usersGroups.showAllBtn.clickButton();
    }

    static async clickShowAllGroups() {
        await WorkflowBuilderPage.usersGroups.showAllGroupsBtn.clickButton();
    }

    static async verifyUsersList() {
        StepLogger.subStep('Switch to users iframe');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.findUsersFrame);
        await WorkflowBuilderPage.usersGroups.searchList.verifyDisplayedStatus();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async verifyGroupList() {
        StepLogger.subStep('Switch to groups iframe');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.findGroupsFrame);
        await WorkflowBuilderPage.usersGroups.searchList.verifyDisplayedStatus();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
    }

    static async enterNameAndSearch() {
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.dialogIFrame);
        await WorkflowBuilderPage.usersGroups.firstName.sendKeys(WorkflowBuilderConstant.nextState.author);
        await WorkflowBuilderPage.usersGroups.searchBtn.clickButton();
    }

    static async enterGroupNameAndSearch() {
        StepLogger.subStep('Switch to first dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.worflowState.dialogIFrame);
        StepLogger.subStep('Switch to second dialog');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.dialogIFrame);
        await WorkflowBuilderPage.usersGroups.groupName.sendKeys(WorkflowBuilderConstant.labels.all);
        await WorkflowBuilderPage.usersGroups.searchGroupBtn.clickButton();
    }

    static async verifySearchedUsers() {
        StepLogger.subStep('Switch to users iframe');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.findUsersFrame);
        await WorkflowBuilderPage.usersGroups.searchList.verifyDisplayedStatus();
    }

    static async selectSearchedUser() {
        const name = await WorkflowBuilderPage.usersGroups.userName.getText();
        await WorkflowBuilderPage.usersGroups.selectItem.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        return name;
    }

    static async verifySearchedGroups() {
        StepLogger.subStep('Switch to group iframe');
        await PageHelper.switchToiFrame(WorkflowBuilderPage.usersGroups.findGroupsFrame);
        await WorkflowBuilderPage.usersGroups.searchList.verifyDisplayedStatus();
    }
}
