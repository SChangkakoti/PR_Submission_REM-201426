import { StepLogger } from '../../../../../../core/logger/step-logger';
import { ElementHelper } from '../../../../../components/html/element-helper';
import { PageHelper } from '../../../../../components/html/page-helper';
import { WaitHelper } from '../../../../../components/html/wait-helper';
import { Constants } from '../../../../../components/misc-utils/constants';
import { DfElement } from '../../../../../components/misc-utils/df-elements-helper';
import { ExpectationHelper } from '../../../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../../../components/misc-utils/html-helper';
import { RandomHelper } from '../../../../../components/misc-utils/random-helper';
import { AdminHomePageHelper } from '../../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../../../admin-login-page/admin-login.helper';
import { CommonPageHelper } from '../../../common/common-page.helper';

import { ThreshHoldConfigurationManagerConstant } from './threshhold-configuration-manager.constants';
import { ThreshHoldConfigurationManagerPage } from './threshhold-configuration-manager.po';

export class ThreshHoldConfigurationManagerHelper {

    static async verifyNavigation() {
        StepLogger.subVerification('Verify Page heading of ThreshHold Configuration Manager');
        const titles = ThreshHoldConfigurationManagerConstant.titles;
        await PageHelper.switchToDefaultContentAndIFrame(ThreshHoldConfigurationManagerPage.contentIFrame);
        await ThreshHoldConfigurationManagerPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
    }

    static async navigateToThreshholdConfManager() {
        StepLogger.subStep('Login And Navigate to ThreshHold Configuration Manager');
        await AdminLoginPageHelper.loginAsAdmin();
        await AdminHomePage.hamburgerIcon.verifyDisplayedStatus();
        await this.clickBurgerIconAndNavigateToThreshHoldmanager();
        await this.verifyNavigation();
    }

    static async clickBurgerIconAndNavigateToThreshHoldmanager() {
        StepLogger.subStep('click BurgerIcon And Navigate to ThreshHold Configuration Manager');
        await PageHelper.switchToDefaultContent();
        await AdminHomePageHelper.clickOnBurgerIcon();
        // Require to load element
        await WaitHelper.sleep(PageHelper.timeout.xxs);
        const threshHoldDisplayed = await AdminHomePage.administerSystem.threshholdConfManager.item.isDisplayed();
        if (!threshHoldDisplayed) {
            await AdminHomePageHelper.verifySidebarFieldsDisplayed();
            await AdminHomePageHelper.clickAdministerSystem();
            await AdminHomePageHelper.verifyAdministerSystemSubMenu();
            await AdminHomePage.administerSystem.analytics.hoverOverAndClick();
        }
        await AdminHomePageHelper.verifyAnalyticsSubMenu();
        await AdminHomePage.administerSystem.threshholdConfManager.hoverOverAndClick();
        await this.verifyNavigation();
    }

    static async getUniqueThreshHoldNumber(size = Constants.number.three) {
        StepLogger.subStep('Get Unique TheshHold Number');
        const uniqueNumber = (Number(RandomHelper.getRandomNumber(size)) + 1).toString();
        return uniqueNumber;
    }

    static async getFieldValue(elem: DfElement) {
        StepLogger.subStep('Get TextBox Value');
        const actualValue = await ElementHelper.getAttributeValue(elem, HtmlHelper.attributes.value);
        return actualValue;
    }

    static async clickOk() {
        StepLogger.subStep('Click OK');
        const buttons = ThreshHoldConfigurationManagerPage.buttons;
        await buttons.oK.hoverOverAndClick();
        await CommonPageHelper.switchToWindow(0);
    }

    static async verifyErrorPopUpDisplayed() {
        StepLogger.subVerification('Verify Error PopUp');
        await CommonPageHelper.switchToWindow(1);
        const item = await ElementHelper.getElementByText(ThreshHoldConfigurationManagerConstant.titles.errorMessage, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, ThreshHoldConfigurationManagerConstant.titles.errorMessage);
    }

    static async enterfieldValueAndClickSave(elementDf: DfElement, elementValue: string) {
        StepLogger.subStep('Enter Value And Click Save');
        await elementDf.sendKeys(elementValue);
        await ThreshHoldConfigurationManagerPage.buttons.save.hoverOverAndClick();
    }

    static async getUniqueRatingValue(size = Constants.number.one , check = true) {
        StepLogger.subStep('Get Unique Rating decimal value');
        const floatValue = parseFloat(RandomHelper.getRandomNumber(size));
        let uniqueNumber = floatValue.toFixed(1);
        if (check && (floatValue >= 4 || floatValue === 0)) {
            uniqueNumber = parseFloat('1').toFixed(1);
        }
        return uniqueNumber;
    }

    static async verifyRatingErrorPopUpDisplayed() {
        StepLogger.subVerification('Verify Rating Error PopUp');
        await CommonPageHelper.switchToWindow(1);
        const item = await ElementHelper.getElementByText(ThreshHoldConfigurationManagerConstant.titles.errorMessageOneToFive, true);
        await ExpectationHelper.verifyDisplayedElementFinder(item, ThreshHoldConfigurationManagerConstant.titles.errorMessageOneToFive);
    }
}
