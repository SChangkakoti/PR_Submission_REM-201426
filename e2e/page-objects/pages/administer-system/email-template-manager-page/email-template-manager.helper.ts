import { StepLogger } from '../../../../../core/logger/step-logger';
import { DropDownHelper } from '../../../../components/html/dropdown-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { EndpointHelper } from '../../../../components/misc-utils/endpoint-helper';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { BasePageHelper } from '../../base-page.helper';
import { CommonPageHelper } from '../../common/common-page.helper';

import { EmailTemplateManagerPageConstant } from './email-template-manager.constants';
import { EmailTemplateManagerPage } from './email-template-manager.po';

export class EmailTemplateManagerPageHelper extends BasePageHelper {

    static async verifyNavigation() {
        StepLogger.subVerification('Verify Page heading of Email Template Manager');
        const titles = EmailTemplateManagerPageConstant.titles;
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
        await EmailTemplateManagerPage.buttons.createTemplate.verifyDisplayedStatus();
    }

    static async navigateToEmailTemplateManager() {
        await AdminHomePageHelper.clickOnBurgerIcon();
        await AdminHomePageHelper.verifySidebarFieldsDisplayed();
        await AdminHomePageHelper.clickAdministerSystem();
        await AdminHomePageHelper.verifyAdministerSystemSubMenu();
        await AdminHomePage.administerSystem.nofiticationsAndSubscriptions.hoverOverAndClick();
        await AdminHomePage.administerSystem.emailTemplateManager.hoverOverAndClick();
        await EmailTemplateManagerPageHelper.verifyNavigation();
    }

    static async clickOnEmailTemplateAndVerify() {
        await EmailTemplateManagerPage.buttons.createTemplate.hoverOverAndClick();
        await EmailTemplateManagerPage.popUp.emailTemplateProperties.verifyDisplayedStatus();
    }

    static async selectAndVerifyTemplateTypeDd() {
        const elem = EmailTemplateManagerPage.popUp.element;
        const vals = EmailTemplateManagerPageConstant.testData;
        await elem.templateTypeDropDown.templateTypeDd.clickButton();
        await DropDownHelper.selectOptionByText(elem.templateTypeDropDown.templateTypeDd, vals.templateType);
        const selected = await DropDownHelper.getTheSelectedOptionText(elem.templateTypeDropDown.templateTypeDd);
        await ExpectationHelper.verifyStringEqualTo(selected, vals.templateType);
    }

    static async selectAndVerifyLanguageDd(language: string) {
        const elem = EmailTemplateManagerPage.popUp.element;
        await elem.languageDropDown.languageDd.clickButton();
        await DropDownHelper.selectOptionByText(elem.languageDropDown.languageDd, language);
        const selected = await DropDownHelper.getTheSelectedOptionText(elem.languageDropDown.languageDd);
        await ExpectationHelper.verifyStringEqualTo(selected, language);
    }

    static async enterAndVerifySubjectTxt(text: string) {
        const elem = EmailTemplateManagerPage.popUp.element;
        await elem.subjectTextBox.sendKeys(text);
        await elem.subjectTextBox.verifyTextEntered(text);
    }

    static async enterAndVerifyBodyContentsTxt(text: string) {
        const elem = EmailTemplateManagerPage.popUp.element;
        await elem.bodyContentsTextarea.sendKeys(text);
        await elem.bodyContentsTextarea.verifyTextEntered(text);
    }

    static async enterAndverifyTemplatePropertiesFields(
        templateSubject: string,
        language: string
    ) {
        const vals = EmailTemplateManagerPageConstant.testData;
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        await this.selectAndVerifyTemplateTypeDd();
        await this.selectAndVerifyLanguageDd(language);
        await this.enterAndVerifySubjectTxt(templateSubject);
        await this.enterAndVerifyBodyContentsTxt(vals.defBodyContents);
    }

    static async enterAndverifyTemplatePropertiesFieldsExceptTemplateType(
        templateSubject: string,
        language: string
    ) {
        const vals = EmailTemplateManagerPageConstant.testData;
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        await this.selectAndVerifyLanguageDd(language);
        await this.enterAndVerifySubjectTxt(templateSubject);
        await this.enterAndVerifyBodyContentsTxt(vals.defBodyContents);
    }

    static async clickOnSubmit() {
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage.buttons.submit.clickButton();
    }

    static async verifyTemplateIsVisibleInTemplateListing(templateSubject: string) {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage.getTemplatesTableElement(templateSubject).verifyDisplayedStatus();
    }

    static async verifyTemplateIsVisibleInTemplateListingByLanguage(templateSubject: string, language: string) {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage
            .getTemplatesTableElementByLanguage(templateSubject, language).verifyDisplayedStatus();
    }

    static async verifyTemplateIsVisibleInTemplateListingByTemplateType(
        templateSubject: string,
        language: string,
        templateType: string
    ) {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage
            .getTemplatesTableElementByTemplateType(templateSubject, language, templateType).verifyDisplayedStatus();
    }

    static async verifyTemplateIsNotVisibleInTemplateListing(templateSubject: string) {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage.getTemplatesTableElement(templateSubject).verifyHiddenStatus();
    }

    static async verifyAlertErrorPopUpDisplayed(message: string) {
        await PageHelper.executeInNewTab(async () => {
            await EmailTemplateManagerPage.titles
            .errorMsg(message)
            .verifyDisplayedStatus();
        }, 1, false);
    }

    static async verifyAlertErrorPopUpNoDisplayed(message: string) {
        await EmailTemplateManagerPage.titles
            .errorMsg(message)
            .verifyHiddenStatus();
    }

    static async clickOnOkAlert() {
        const buttons = EmailTemplateManagerPage.buttons;
        await PageHelper.executeInNewTab(async () => {
            await buttons.alertOK.clickButton();
        }, 1, false);
        await PageHelper.switchToFirstTab();
    }

    static async clickOnCancel() {
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage.buttons.cancel.clickButton();
    }

    static async enterAndverifyTemplatePropertiesFieldsExceptSubject(language: string) {
        const vals = EmailTemplateManagerPageConstant.testData;
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        await this.selectAndVerifyTemplateTypeDd();
        await this.selectAndVerifyLanguageDd(language);
        await this.enterAndVerifyBodyContentsTxt(vals.defBodyContents);
    }

    static async enterAndverifyTemplatePropertiesFieldsExceptBodyContent(
        templateSubject: string,
        language: string
    ) {
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
        await this.selectAndVerifyTemplateTypeDd();
        await this.selectAndVerifyLanguageDd(language);
        await this.enterAndVerifySubjectTxt(templateSubject);
    }

    static async deleteTemplateBySubject(templateSubject: string) {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage.getDeleteButtonTemplateBySubject(templateSubject).clickButton();
    }

    static async deleteTemplateBySubjectAndLanguage(
        templateSubject: string,
        language: string
    ) {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage
            .getDeleteButtonTemplateBySubjectAndLanguage(templateSubject, language).clickButton();
    }

    static async verifyDeleteTemplate() {
        await CommonPageHelper.verifyConfirmatioMessageDisplayedAndClickYes();
    }

    static async createTemplateDefaultValues(subject: string, language: string) {
        await EmailTemplateManagerPageHelper.clickOnEmailTemplateAndVerify();
        await EmailTemplateManagerPageHelper.enterAndverifyTemplatePropertiesFields(subject, language);
        await EmailTemplateManagerPageHelper.clickOnSubmit();
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
    }

    static async clickAndVerifyOnSpecificEmailTemplate(subject: string) {
        await CommonPageHelper.switchToContentFrame(PageHelper.timeout.xs);
        await EmailTemplateManagerPage.getTemplatesTableElement(subject).clickButton();
        await EmailTemplateManagerPage.popUp.emailTemplateProperties.verifyDisplayedStatus();
        await CommonPageHelper.switchToDialogFrame(PageHelper.timeout.xs);
    }

    static async selectAndVerifySpecificTemplateTypeDd(templateType: string) {
        const elem = EmailTemplateManagerPage.popUp.element;
        await elem.templateTypeDropDown.templateTypeDd.clickButton();
        await DropDownHelper.selectOptionByText(elem.templateTypeDropDown.templateTypeDd, templateType);
        const selected = await DropDownHelper.getTheSelectedOptionText(elem.templateTypeDropDown.templateTypeDd);
        await ExpectationHelper.verifyStringEqualTo(selected, templateType);
    }

    static async enterAndVerifySubjectAndBody(subject: string, bodyContent: string) {
        await this.enterAndVerifySubjectTxt(subject);
        await this.enterAndVerifyBodyContentsTxt(bodyContent);
    }

    url(): string {
        return EndpointHelper.home;
    }
}
