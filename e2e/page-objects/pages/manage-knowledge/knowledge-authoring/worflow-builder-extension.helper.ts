import { StepLogger } from '../../../../../core/logger/step-logger';
import { AlertHelper } from '../../../../components/html/alert-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { CommonPageHelper } from '../../common/common-page.helper';

import { WorkflowBuilderHelper } from './workflow-buider.helper';
import { WorkflowBuilderPage } from './workflow-builder.po';

const { executeInNewTab } = PageHelper;

export class WorkflowBuilderHelperExtension {

    static async selectSearchedGroup() {
        const name = await WorkflowBuilderPage.usersGroups.groupNameSearched.getText();
        await WorkflowBuilderPage.usersGroups.selectItem.clickButton();
        StepLogger.subStep('Switch to content frame');
        await PageHelper.switchToDefaultContentAndIFrame(AdminHomePage.contentIFrame);
        return name;
    }

    static async verifyDeleteStateWindow() {
        await executeInNewTab(async () => {
            await WorkflowBuilderPage.deleteStateWindow.dialog.verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async clickNoButtonDeleteStateWindow() {
        await WorkflowBuilderPage.deleteStateWindow.noBtn.clickButton();
    }

    static async clickYesButtonDeleteStateWindow() {
        await WorkflowBuilderPage.deleteStateWindow.yesBtn.clickButton();
    }

    static async verifyStateExists(name: string) {
        await CommonPageHelper.switchToTreeIFrame();
        await WorkflowBuilderPage.workflowStates.selectState(name).verifyDisplayedStatus();
    }

    static async verifyStateDeleted(name: string) {
        await CommonPageHelper.switchToTreeIFrame();
        await WorkflowBuilderPage.workflowStates.selectState(name).verifyHiddenStatus();
    }

    static async verifyDeleteButton() {
        const ruleFields = WorkflowBuilderPage.ruleFields;
        const rules = await ruleFields.all.item.count();
        const icons = await ruleFields.deleteRuleAll.item.count();
        await ExpectationHelper.verifyValueEqualTo(rules, icons);
    }

    static async clickDeleteButton() {
        await WorkflowBuilderPage.ruleFields.deleteRule.clickButton();
    }

    static async verifyDeleteAlert() {
        StepLogger.subVerification('Verify delete alert is present');
        const isPresent = await AlertHelper.checkAlertPresent();
        await ExpectationHelper.verifyStringEqualTo(isPresent.toString(), Constants.boolean.true.toString());
    }

    static async dismissDeleteAlert() {
        StepLogger.subStep('Dismiss delete alert');
        await AlertHelper.dismissAlertIfExists();
    }

    static async verifyDeleteAlertNotPresent() {
        StepLogger.subVerification('Verify delete alert is not present');
        const isPresent = await AlertHelper.checkAlertPresent();
        await ExpectationHelper.verifyStringEqualTo(isPresent.toString(), Constants.boolean.false.toString());
    }

    static async clickOkDeleteAlert() {
        await WorkflowBuilderHelper.clickDeleteButton();
        StepLogger.subStep('Click Ok');
        await AlertHelper.acceptAlertIfExists();
        await WorkflowBuilderPage.buttons.saveChanges.clickButton();
    }

    static async verifyDeletedRule(rule: string) {
        await WorkflowBuilderPage.getRuleByName(rule).verifyHiddenStatus();
    }
}
