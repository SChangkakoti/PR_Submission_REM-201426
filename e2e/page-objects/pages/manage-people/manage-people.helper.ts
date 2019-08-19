import { browser } from 'protractor';

import { StepLogger } from '../../../../core/logger/step-logger';
import { CheckboxHelper } from '../../../components/html/checkbox-helper';
import { ElementHelper } from '../../../components/html/element-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { Constants } from '../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { RandomHelper } from '../../../components/misc-utils/random-helper';
import { AdminHomePageHelper } from '../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../admin-login-page/admin-login.helper';
import { CommonPageHelper } from '../common/common-page.helper';

import { ManagePeopleConstant } from './manage-people.constant';
import { ManagePeoplePage } from './manage-people.po';

export class ManagePeopleHelper {
    static async verifyManagePeopleSubmenuOptions() {
        const menu = ManagePeoplePage.managePeopleSubmenuOptions;
        await menu.agentLevelManager.verifyDisplayedStatus();
        await menu.enterpriseReputationLevelManager.verifyDisplayedStatus();
        await menu.groupCreator.verifyDisplayedStatus();
        await menu.roleManagerKkc.verifyDisplayedStatus();
        await menu.roleManagerKss.verifyDisplayedStatus();
        await menu.userAndGroupFinder.verifyDisplayedStatus();
        await menu.userCreator.verifyDisplayedStatus();
    }

    static async clickOnRoleManagerKkc() {
        StepLogger.subStep('Click on Role Manage KKC option');
        await ManagePeoplePage.managePeopleSubmenuOptions.roleManagerKkc.clickLink();
    }

    static async verifyRoleManagerKkcDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        const title = await ManagePeoplePage.titles.roleManagerKkc.getText();
        await ExpectationHelper.verifyStringEqualTo(title, ManagePeopleConstant.managePeopleSubmenuOptions.roleManagerKkc);
    }

    static async verifyRolesTableDisplayed() {
        await ManagePeoplePage.rolesTable.verifyDisplayedStatus();
    }

    static async navigateToRoleManageKkcPage() {
        StepLogger.subStep('Click on Burger button in top LHS');
        await AdminHomePageHelper.clickOnBurgerIcon();
        StepLogger.subVerification('The Menu Navigation is opened on the LHS of the page');
        await AdminHomePageHelper.verifySideMenuDisplayed();
        StepLogger.subStep('Click on the "Manage People" menu item on the LHS of the page');
        await AdminHomePageHelper.clickOnManagePeopleButton();
        StepLogger.subVerification(`The sub menu of the menu item is displayed for the "Manage People" menu with the following sub menu list
        "Agent Level Manager" "Enterprise Reputation Level Manager"
        "Group Creator"
        "User & Group Finder"
        "Role Manager (KCC)"
        "Role Manager (KSS)"
        "User Creator"`);
        await ManagePeopleHelper.verifyManagePeopleSubmenuOptions();
        StepLogger.subStep('Click the Role Manager (KCC) sub menu');
        await ManagePeopleHelper.clickOnRoleManagerKkc();
        StepLogger.subVerification('The Role Manager (KCC)  page is displayed with the list of Roles available');
        await ManagePeopleHelper.verifyRoleManagerKkcDisplayed();
        StepLogger.subStep('Verify the Role Manager KCC page is displayed with the list of Roles');
        StepLogger.subVerification('The Role Manager Page is displayed with the list of Roles available');
        await ManagePeopleHelper.verifyRolesTableDisplayed();
    }

    static async clickOnARole(role: string) {
        StepLogger.subStep(`Click on ${role}`);
        await CommonPageHelper.switchToContentFrame();
        await ElementHelper.getElementByText(role, true).click();
    }

    static async verifyRoleDetailsFormDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.manageRolesForm.title.verifyDisplayedStatus();
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
    }

    static async clickOnAvailablePermission(permission: string) {
        StepLogger.subStep(`Click on ${permission}`);
        await ManagePeoplePage.manageRolesForm.availablePermissions(permission).hoverOverAndClick();
    }

    static async verifyHighlightedAvailablePermission(permission: string) {
        const color = await ManagePeoplePage.manageRolesForm.availablePermissions(permission).getCssValue('backgroundColor');
        await ExpectationHelper.verifyStringEqualTo(color, Constants.colorCode.blue);
    }

    static async verifyHighlightedSelectedPermission(permission: string) {
        const color = await ManagePeoplePage.manageRolesForm.selectedPermissions(permission).getCssValue('backgroundColor');
        await ExpectationHelper.verifyStringEqualTo(color, Constants.colorCode.blue);
    }

    static async clickOnPushRightIcon() {
        StepLogger.subStep('Click on Push Right icon');
        await ManagePeoplePage.manageRolesForm.pushRightIcon.hoverOverAndClick();
    }

    static async clickOnPushLeftIcon() {
        StepLogger.subStep('Click on Push Left icon');
        await ManagePeoplePage.manageRolesForm.pushLeftIcon.hoverOverAndClick();
    }

    static async verifySelectedPermission(permission: string) {
        await ManagePeoplePage.manageRolesForm.selectedPermissions(permission).verifyDisplayedStatus();
    }

    static async clickOnSubmitButton() {
        StepLogger.subStep('Click on Submit button');
        await ManagePeoplePage.manageRolesForm.roleName.hoverOverAndClick();
        await ManagePeoplePage.manageRolesForm.submitButton.hoverOverAndClick();
    }

    static async verifyPermissionAddedSuccessfully(role: string, permission: string) {
        await ManagePeopleHelper.clickOnARole(role);
        await ManagePeoplePage.manageRolesForm.selectedPermissions(permission).verifyDisplayedStatus();
    }

    static async clickOnSelectButton() {
        StepLogger.subStep('Click on Select button');
        await ManagePeoplePage.manageRolesForm.selectButton.hoverOverAndClick();
    }

    static async clickOnShowAllButton() {
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        StepLogger.subStep('Click on Show All button');
        await ManagePeoplePage.selectUsersForm.showAllButton.hoverOverAndClick();
    }

    static async verifyUsersListDisplayedFromFindUsersPopup() {
        await CommonPageHelper.swithToFindUsersFrame(PageHelper.timeout.xs);
        await ExpectationHelper.verifyDisplayedElementFinder(
            ElementHelper.getElementByText(ManagePeopleConstant.labels.users, true),
            ManagePeopleConstant.labels.users);
    }

    static async selectAndVerifyUserFromFindUsersPopup(userName: string) {
        StepLogger.subStep(`Select ${userName} checkbox`);
        await CommonPageHelper.switchToFindUsersFrameBasic();
        await ManagePeoplePage.selectUsersForm.user(userName).hoverOverAndClick();
        await CommonPageHelper.switchToSelectedFrame(PageHelper.timeout.xs);
        await ManagePeoplePage.selectUsersForm.userSelected(userName).verifyDisplayedStatus();
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
    }

    static async clickOnNewRoleButton() {
        StepLogger.subStep('Click on New Role button');
        await ManagePeoplePage.newRoleButton.hoverOverAndClick();
    }

    static async navigateToManageRolesPage() {
        await ManagePeopleHelper.navigateToRoleManageKkcPage();
        await ManagePeopleHelper.clickOnNewRoleButton();
        await ManagePeopleHelper.verifyRoleDetailsFormDisplayed();
    }

    static async verifyManageRolesPageButtons() {
        await ManagePeoplePage.manageRolesForm.submitButton.verifyDisplayedStatus();
        await ManagePeoplePage.manageRolesForm.selectButton.verifyDisplayedStatus();
        await ManagePeoplePage.manageRolesForm.cancelButton.verifyDisplayedStatus();
    }

    static async clickOnCustomerApplicationOption() {
        StepLogger.subStep('Click on Customer Application option');
        await ManagePeoplePage.manageRolesForm.customerApplications.hoverOverAndClick();
    }

    static async clickOnEmployeedApplicationOption() {
        StepLogger.subStep('Click on Customer Application option');
        await ManagePeoplePage.manageRolesForm.employeeApplications.hoverOverAndClick();
    }

    static async verifyCustomerApplicationOption() {
        const selected = await CheckboxHelper.isCheckboxChecked(ManagePeoplePage.manageRolesForm.customerApplications);
        await ExpectationHelper.verifyStringEqualTo(selected.toString(), Constants.boolean.true.toString());
    }

    static async verifyEmployeeApplicationOption() {
        const selected = await CheckboxHelper.isCheckboxChecked(ManagePeoplePage.manageRolesForm.employeeApplications);
        await ExpectationHelper.verifyStringEqualTo(selected.toString(), Constants.boolean.true.toString());
    }

    static async typeRoleName(roleName: string) {
        StepLogger.subStep(`Type ${roleName} in Role Name field`);
        await ManagePeoplePage.manageRolesForm.roleName.hoverOverAndClick();
        await ManagePeoplePage.manageRolesForm.roleName.clearText();
        await ManagePeoplePage.manageRolesForm.roleName.sendKeys(roleName);
    }

    static async typeRoleDescription(description: string) {
        StepLogger.subStep(`Type ${description} in Description field`);
        await ManagePeoplePage.manageRolesForm.roleDescription.hoverOverAndClick();
        await ManagePeoplePage.manageRolesForm.roleDescription.clearText();
        await ManagePeoplePage.manageRolesForm.roleDescription.sendKeys(description);
    }

    static async verifyCreatedRoleDisplayed(role: string) {
        await CommonPageHelper.switchToContentFrame();
        await ExpectationHelper.verifyDisplayedElementFinder(ElementHelper.getElementByText(role, true), role);
    }

    static async verifyRoleDisplayedInTheList(role: string) {
        await CommonPageHelper.switchToContentFrame();
        await ExpectationHelper.verifyDisplayedElementFinder(ElementHelper.getElementByText(role, true), role);
    }

    static async removePermission(role: string, permission: string) {
        StepLogger.subStep('Click on the name of the Role');
        await ManagePeopleHelper.clickOnARole(role);
        StepLogger.subVerification('The Role Manager is displayed with the details of the Role');
        await ManagePeopleHelper.verifyRoleDetailsFormDisplayed();
        StepLogger.subStep('Click on a option on the "Permission Available" combo box');
        await ManagePeopleHelper.clickOnAvailablePermission(permission);
        StepLogger.subStep('Click the "<<" to remove the permission from the "Selected"  combo box section');
        await ManagePeopleHelper.clickOnPushLeftIcon();
        StepLogger.subVerification('The selected permission is moved to the Selected combo box');
        await ManagePeopleHelper.clickOnAvailablePermission(permission);
        StepLogger.subStep('Click on "Submit" button');
        await ManagePeopleHelper.clickOnSubmitButton();
    }

    static async createRole() {
        StepLogger.subStep('Navigate to Manage Roles page');
        await ManagePeopleHelper.navigateToManageRolesPage();
        StepLogger.subStep('Click on the radio button of the option of "Apply Role to" "Employee Applications"');
        await ManagePeopleHelper.clickOnEmployeedApplicationOption();
        StepLogger.subStep('Input role name in the "Role Name" textbox');
        const roleName = await RandomHelper.getRandomString(Constants.number.eight);
        StepLogger.subVerification('The Role Name is displayed in the textbox');
        await ManagePeopleHelper.typeRoleName(roleName);
        StepLogger.subStep('Input Description value in the "Description" textbox');
        const description = await RandomHelper.getRandomString(Constants.number.thirteen);
        StepLogger.subVerification('The inputted value is displayed in the "Description" textbox');
        await ManagePeopleHelper.typeRoleDescription(description);
        StepLogger.subStep('Click on a option on the "Permission Available" combo box');
        await ManagePeopleHelper.clickOnAvailablePermission(ManagePeopleConstant.availablePermissions.findUsers);
        StepLogger.subVerification('The selected permission option is highlighted');
        await ManagePeopleHelper.verifyHighlightedAvailablePermission(ManagePeopleConstant.availablePermissions.findUsers);
        StepLogger.subStep('Click the ">>" to add the permission to the Selected combo box section');
        await ManagePeopleHelper.clickOnPushRightIcon();
        StepLogger.subVerification('The selected permission is moved to the Selected combo box');
        await ManagePeopleHelper.verifySelectedPermission(ManagePeopleConstant.availablePermissions.findUsers);
        StepLogger.subStep('Click the "Submit" button');
        await ManagePeopleHelper.clickOnSubmitButton();
        StepLogger.subVerification('The Manage Roles page is closed and the role is created and saved to the list of roles on the Role Manager page');
        await ManagePeopleHelper.verifyRoleManagerKkcDisplayed();
        StepLogger.subStep('Verify the new role name is displayed on the Role Manager page');
        StepLogger.subVerification('The new role name is displayed on the Role manager page');
        await ManagePeopleHelper.verifyCreatedRoleDisplayed(roleName);
        return roleName;
    }

    static async typeNameAndDescription(name: string, description: string) {
        await ManagePeopleHelper.typeRoleName(name);
        await ManagePeopleHelper.typeRoleDescription(description);
    }

    static async verifyRoleNameValue(name: string) {
        await ManagePeoplePage.manageRolesForm.roleName.verifyTextBoxContains(name);
    }

    static async verifyRoleDescriptionValue(description: string) {
        await ManagePeoplePage.manageRolesForm.roleDescription.verifyTextBoxContains(description);
    }

    static async verifyNameAndDescription(name: string, description: string) {
        await ManagePeopleHelper.verifyRoleNameValue(name);
        await ManagePeopleHelper.verifyRoleDescriptionValue(description);
    }

    static async verifyManageNameRequiredPopup() {
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('Click on the Yes" button');
            await ManagePeoplePage.titles.roleNameRequired.verifyDisplayedStatus();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async clickOkButtonOnInformationRequiredPopup() {
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('Click on the Yes" button');
            await browser.executeScript('javascript:onClick();');
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async clickNoButtonOnDoYouWantToSavePopup() {
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('Click on the Yes" button');
            await browser.executeScript('onAction2();');
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async clickYesButtonOnDeleteConfirmationPopup() {
        StepLogger.subStep('Click on Yes button');
        await browser.executeScript('onAction1();');
    }

    static async clickOnCancelButton() {
        StepLogger.subStep('Click on Cancel button');
        await ManagePeoplePage.manageRolesForm.cancelButton.hoverOverAndClick();
    }

    static async verifyDoYouWantToSavedPopupDisplayed() {
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('Click on the Yes" button');
            await ManagePeoplePage.titles.doYouWantToSave.verifyDisplayedStatus();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async deleteRole(role: string) {
        StepLogger.subStep(`Click on the "Delete icon" for ${role}`);
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.getDeleteIconByRoleName(role).hoverOverAndClick();
        await PageHelper.executeInNewTab(async () => {
            await ManagePeopleHelper.clickYesButtonOnDeleteConfirmationPopup();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async deleteRoleAndSignOut(roleName: string) {
        await ManagePeopleHelper.deleteRole(roleName);
        await AdminLoginPageHelper.logout(true);
    }

    static async verifyRoleNameRequiredPopup() {
        await PageHelper.executeInNewTab(async () => {
            StepLogger.subStep('Click on the Yes" button');
            await ManagePeoplePage.titles.roleNameRequired.verifyDisplayedStatus();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async createRoleAndAddExtraPermission(permission: string) {
        const role = await ManagePeopleHelper.createRole();
        await ManagePeopleHelper.clickOnARole(role);
        await ManagePeopleHelper.verifyRoleDetailsFormDisplayed();
        await ManagePeopleHelper.clickOnAvailablePermission(permission);
        await ManagePeopleHelper.clickOnPushRightIcon();
        await ManagePeopleHelper.clickOnSubmitButton();
        return role;
    }

    static async clickOnSelectedPermission(permission: string) {
        StepLogger.subStep(`Click on ${permission}`);
        await ManagePeoplePage.manageRolesForm.selectedPermissions(permission).hoverOverAndClick();
    }

    static async verifyAvailablePermission(permission: string) {
        await ManagePeoplePage.manageRolesForm.availablePermissions(permission).verifyDisplayedStatus();
    }

    static async selectPermission(permission: string) {
        await ManagePeopleHelper.clickOnAvailablePermission(permission);
        await ManagePeopleHelper.clickOnPushRightIcon();
    }

    static async verifyDescriptionRequiredPopup() {
        await PageHelper.executeInNewTab(async () => {
            await ManagePeoplePage.titles.descriptionRequired.verifyDisplayedStatus();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async verifyPermissionRequiredPopup() {
        await PageHelper.executeInNewTab(async () => {
            await ManagePeoplePage.titles.permissionRequired.verifyDisplayedStatus();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async verifyAgentLevelManagerPageDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.titles.agentLevelManager.verifyDisplayedStatus();
    }

    static async clickOnNewAgentLevelButton() {
        StepLogger.subStep('Click on New Agent button');
        await ManagePeoplePage.agentLevelManagerForm.newAgentLevelButton.hoverOverAndClick();
    }

    static async verifyNewAgentDialogDisplayed() {
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.titles.agentLevelManager.verifyDisplayedStatus();
        await CommonPageHelper.switchToDialogFrame();
    }

    static async verifyRecordNotDisplayedInTheList(text: string) {
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.getAgentLevelLinkByName(text).verifyHiddenStatus();
    }

    static async clickOnCancelButtonFromAgentLevelManager() {
        StepLogger.subStep('Click on Cancel button');
        await ManagePeoplePage.agentLevelManagerForm.cancelButton.hoverOverAndClick();
    }

    static async clickOnSaveButtonFromAgentLevelManager() {
        StepLogger.subStep('Click on Save button');
        await ManagePeoplePage.agentLevelManagerForm.saveButton.hoverOverAndClick();
    }

    static async typeAgentLevelName(agentLevel: string) {
        StepLogger.subStep(`Type ${agentLevel} in Role Name field`);
        await ManagePeoplePage.agentLevelManagerForm.nameTextbox.hoverOverAndClick();
        await ManagePeoplePage.agentLevelManagerForm.nameTextbox.clearText();
        await ManagePeoplePage.agentLevelManagerForm.nameTextbox.sendKeys(agentLevel);
    }

    static async verifyAgentLevelNameValue(name: string) {
        await ManagePeoplePage.agentLevelManagerForm.nameTextbox.verifyTextBoxContains(name);
    }

    static async verifyAgentLevelDisplayedInTheList(agentLevelName: string) {
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.getAgentLevelLinkByName(agentLevelName).verifyDisplayedStatus();
    }

    static async clickOnAnAgentLevelFromTheList(AgentLevelName: string) {
        StepLogger.subStep(`Click on ${AgentLevelName}`);
        await ManagePeoplePage.getAgentLevelLinkByName(AgentLevelName).hoverOverAndClick();
    }

    static async createAgentLevel() {
        const agentLevelName = `Tier ${await RandomHelper.getRandomString(Constants.number.five)}`;
        await AdminHomePageHelper.navigateToAgentLevelManagerPage();
        await ManagePeopleHelper.clickOnNewAgentLevelButton();
        await ManagePeopleHelper.verifyNewAgentDialogDisplayed();
        await ManagePeopleHelper.typeAgentLevelName(agentLevelName);
        await ManagePeopleHelper.clickOnSaveButtonFromAgentLevelManager();
        await ManagePeopleHelper.verifyAgentLevelManagerPageDisplayed();
        await ManagePeopleHelper.verifyAgentLevelDisplayedInTheList(agentLevelName);
        return agentLevelName;
    }

    static async verifyAgentLevelDetailsDialogDisplayed(agentLevelName: string) {
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.titles.agentLevelManager.verifyDisplayedStatus();
        await CommonPageHelper.switchToDialogFrame();
        await ManagePeopleHelper.verifyAgentLevelNameValue(agentLevelName);
    }

    static async verifyAgentConfiguredLanguage(language: string) {
        await CommonPageHelper.switchToDialogFrame();
        await ManagePeoplePage.agentLevelManagerForm.languageField(language).verifyDisplayedStatus();
    }

    static async deleteAgentLevel(agentLevel: string) {
        StepLogger.subStep(`Click on the "Delete icon" for ${agentLevel}`);
        await CommonPageHelper.switchToContentFrame();
        await ManagePeoplePage.agentLevelManagerForm.getAgentDeleteIconByName(agentLevel).hoverOverAndClick();
        await PageHelper.executeInNewTab(async () => {
            await ManagePeopleHelper.clickYesButtonOnDeleteConfirmationPopup();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async deleteAgentNameAndSignOut(agentLevel: string) {
        await ManagePeopleHelper.deleteAgentLevel(agentLevel);
        await AdminLoginPageHelper.logout(true);
    }

    static async verifyGroupCreatorPageDisplayed() {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.s);
        const title = await ManagePeoplePage.titles.groupCreator.getText();
        await ExpectationHelper.verifyStringEqualTo(title, ManagePeopleConstant.managePeopleSubmenuOptions.groupCreator);
    }

    static async verifySubmitCancelButtons() {
        await ManagePeoplePage.groupCreatorForm.buttons.submit.verifyDisplayedStatus();
        await ManagePeoplePage.groupCreatorForm.buttons.cancel.verifyDisplayedStatus();
    }

    static async navigateToGroupCreator() {
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePage.hamburgerIcon.clickButton();
        await AdminHomePageHelper.clickOnManagePeopleButton();
        await ManagePeoplePage.managePeopleSubmenuOptions.groupCreator.hoverOverAndClick();
        await this.verifyGroupCreatorPageDisplayed();
    }

    static async verifyOwnerPopUp() {
        const attr = ManagePeoplePage.groupCreatorForm;
        await attr.dialogBox.owner.verifyDisplayedStatus();
        await CommonPageHelper.switchToSupervisorFrame(PageHelper.timeout.xs);
        await attr.dialogBox.usersTable.verifyDisplayedStatus();
    }

    static async verifyAdminUserSelected() {
        const attr = ManagePeoplePage.groupCreatorForm;
        const selected = await CheckboxHelper.isCheckboxChecked(attr.dialogBox.adminCheckbox);
        await ExpectationHelper.verifyStringEqualTo(selected.toString(), Constants.boolean.true.toString());
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
    }
}
