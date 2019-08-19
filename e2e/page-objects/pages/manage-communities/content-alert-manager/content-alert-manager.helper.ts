import { StepLogger } from '../../../../../core/logger/step-logger';
import { DropDownHelper } from '../../../../components/html/dropdown-helper';
import { ElementHelper } from '../../../../components/html/element-helper';
import { PageHelper } from '../../../../components/html/page-helper';
import { WaitHelper } from '../../../../components/html/wait-helper';
import { Constants } from '../../../../components/misc-utils/constants';
import { DfElement } from '../../../../components/misc-utils/df-elements-helper';
import { ExpectationHelper } from '../../../../components/misc-utils/expectation-helper';
import { AdminHomePageHelper } from '../../admin-home-page/admin-home.helper';
import { AdminHomePage } from '../../admin-home-page/admin-home.po';
import { AdminLoginPageHelper } from '../../admin-login-page/admin-login.helper';
import { BasePageHelper } from '../../base-page.helper';
import { CommonPageHelper } from '../../common/common-page.helper';

import { ContentAlertManagerConstant } from './content-alert-manager.constants';
import { ContentAlertManagerPage } from './content-alert-manager.po';

const { executeInNewTab } = PageHelper;

export class ContentAlertManagerHelper extends BasePageHelper {

    static async navigateToContentAlertManager() {
        await AdminHomePage.hamburgerIcon.clickButton();
        await AdminHomePageHelper.clickManageCommunities();
        await AdminHomePageHelper.clickManageCommunitiesSubMenu(AdminHomePage.manageCommunities.contentAlertManager);
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame);
    }

    static async verifyPageContent() {
        const titles = ContentAlertManagerConstant.titles;
        await PageHelper.switchToiFrame(ContentAlertManagerPage.contentIFrame);
        await ContentAlertManagerPage.titles.pageTitle.verifyContainsText(titles.pageTitle);
        await ContentAlertManagerPage.getTitleText(titles.automaticRejectionExactMatch).verifyDisplayedStatus();
        await ContentAlertManagerPage.getTitleText(titles.automaticRejectionPartialMatch).verifyDisplayedStatus();
        await ContentAlertManagerPage.getTitleText(titles.highAlertExactMatch).verifyDisplayedStatus();
        await ContentAlertManagerPage.getTitleText(titles.highAlertPartialMatch).verifyDisplayedStatus();
        await ContentAlertManagerPage.getTitleText(titles.mediumAlertExactMatch).verifyDisplayedStatus();
        await ContentAlertManagerPage.getTitleText(titles.mediumAlertPartialMatch).verifyDisplayedStatus();
    }

    static async verifyLanguages() {
        const lanDropdown = ContentAlertManagerConstant.languageDropdown;
        await ContentAlertManagerPage.getLanguageOptions(lanDropdown.english).verifyDisplayedStatus();
        await ContentAlertManagerPage.getLanguageOptions(lanDropdown.russian).verifyDisplayedStatus();
    }

    static async verifySelectedLanguage(expected: string) {
        const selected = await ContentAlertManagerPage.languageDropdown.getSelectedOptionText();
        await ExpectationHelper.verifyStringEqualTo(selected.trim(), expected);
    }

    static async enterWordInTextArea(textArea: DfElement, word: string) {
        StepLogger.subStep('Switch to iFrame');
        await PageHelper.switchToDefaultContentAndIFrame(ContentAlertManagerPage.contentIFrame);
        await textArea.sendKeys(word);
    }

    static async verifyAddedWord(textArea: string, word: string) {
        await ContentAlertManagerPage.getTextAreaOptions(textArea, word).verifyDisplayedStatus();
    }

    static async addWord(level: string, addBtn: DfElement, word: string) {
        const level1Exact = ContentAlertManagerPage.getTextArea(level);
        StepLogger.subStep('Enter word');
        await ContentAlertManagerHelper.enterWordInTextArea(level1Exact, word);
        StepLogger.subStep('Click on Add');
        await addBtn.clickButton();
        StepLogger.subStep('Click on Submit button at the end if the page');
        await ContentAlertManagerPage.buttons.submit.clickButton();
        StepLogger.subStep('Wait for element to display again');
        await WaitHelper.waitForElementToBeDisplayed(addBtn.item);
    }

    static async addTwoWords(level: string, addBtn: DfElement, word1: string, word2: string,
                             level2: string = level, addBtn2: DfElement = addBtn) {
        StepLogger.subStep('Enter first word');
        await ContentAlertManagerHelper.addWord(level, addBtn, word1);
        StepLogger.subStep('Enter second word');
        await ContentAlertManagerHelper.addWord(level2, addBtn2, word2);
    }

    static async addThreeWords(level: string, addBtn: DfElement, select: string, word1: string, word2: string, word3: string) {
        StepLogger.subStep('Enter first word');
        await ContentAlertManagerHelper.addWord(level, addBtn, word1);
        StepLogger.subStep('Enter second word');
        await ContentAlertManagerHelper.addWord(level, addBtn, word2);
        StepLogger.subStep('Enter third word');
        await ContentAlertManagerHelper.addWord(level, addBtn, word3);
        await ContentAlertManagerHelper.verifyAddedWord(select, word1);
        await ContentAlertManagerHelper.verifyAddedWord(select, word2);
        await ContentAlertManagerHelper.verifyAddedWord(select, word3);
    }

    static async verifySelectedWord(level: string, expected: string, index: number) {
        StepLogger.subVerification(`Selected word should be ${expected}`);
        const selected = await ContentAlertManagerPage
            .getTextAreaSelect(level)
            .getTheSelectedOptionTextWithIndex(index);
        await ExpectationHelper.verifyStringEqualTo(selected.trim(), expected);
    }

    static async verifySelectedWords(level: string, word1: string, word2: string) {
        if (word1.localeCompare(word2) < 0) {
            await ContentAlertManagerHelper.verifySelectedWord(level, word1, Constants.number.zero);
            await ContentAlertManagerHelper.verifySelectedWord(level, word2, Constants.number.one);
        } else {
            await ContentAlertManagerHelper.verifySelectedWord(level, word2, Constants.number.zero);
            await ContentAlertManagerHelper.verifySelectedWord(level, word1, Constants.number.one);
        }
    }

    static async verifyMultipleSelectedWords(level: string, word1: string, word2: string, word3: string) {
        StepLogger.subStep('Get all selected options');
        const selected = await PageHelper.getTextOfElementsArray(
            DropDownHelper.getAllSelectedOptions(
            ContentAlertManagerPage.getTextAreaSelect(level)));
        await ExpectationHelper.verifyStringArrayContainsValue(selected, word1);
        await ExpectationHelper.verifyStringArrayContainsValue(selected, word2);
        await ExpectationHelper.verifyStringArrayContainsValue(selected, word3);
    }

    static async verifyThreeWordsDeleted(level: string, word1: string, word2: string, word3: string) {
        await ContentAlertManagerPage.getTextAreaOptions(level, word1).verifyHiddenStatus();
        await ContentAlertManagerPage.getTextAreaOptions(level, word2).verifyHiddenStatus();
        await ContentAlertManagerPage.getTextAreaOptions(level, word3).verifyHiddenStatus();
    }

    static async selectMultipleWords(level: string, word1: string, word2: string) {
        StepLogger.subStep('Select multiple words');
        const elem1 = ContentAlertManagerPage.getTextAreaOptions(level, word1);
        const elem2 = ContentAlertManagerPage.getTextAreaOptions(level, word2);
        await ElementHelper.clickButton(elem1);
        await ElementHelper.shiftClick(elem2);
    }

    static async selectWordsWithShift(level: string, word1: string, word2: string, word3: string) {
        const elem1 = await ContentAlertManagerPage.getTextAreaOptions(level, word1);
        const elem2 = await ContentAlertManagerPage.getTextAreaOptions(level, word2);
        const elem3 = await ContentAlertManagerPage.getTextAreaOptions(level, word3);
        StepLogger.subStep('Select words');
        await ElementHelper.shiftClick(elem1);
        await ElementHelper.shiftClick(elem2);
        await ElementHelper.shiftClick(elem3);
    }

    static async verifyWordsDeleted(level: string, word1: string, word2: string) {
        await ContentAlertManagerPage.getTextAreaOptions(level, word1).verifyHiddenStatus();
        await ContentAlertManagerPage.getTextAreaOptions(level, word2).verifyHiddenStatus();
    }

    static async verifyDuplicationErrorWindow(word: string) {
        await executeInNewTab(async () => {
            await ContentAlertManagerPage.duplicateErrorMessage(word).verifyDisplayedStatus();
        });
    }

    static async deleteWordsAndLogout(level1: string, level2: string, word1: string, word2: string,
                                      deleteBtn1: DfElement, deleteBtn2: DfElement) {
        StepLogger.subStep('Switch to iFrame');
        await PageHelper.switchToDefaultContentAndIFrame(ContentAlertManagerPage.contentIFrame);
        await ContentAlertManagerPage.getTextAreaOptions(level1, word1).clickButton();
        await deleteBtn1.clickButton();
        await ContentAlertManagerPage.getTextAreaOptions(level2, word2).clickButton();
        await deleteBtn2.clickButton();
        await ContentAlertManagerPage.buttons.submit.clickButton();
        await AdminLoginPageHelper.logout(true);
    }

    static async verifyBlankErrorWindow() {
        await executeInNewTab(async () => {
            await ContentAlertManagerPage.blankErrorMessage().verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async verifyErrorWindowClosed() {
        StepLogger.subStep('Get window handles');
        const handles = await PageHelper.getAllWindowHandles();
        await ExpectationHelper.verifyStringEqualTo(handles.length.toString(), Constants.stringNumber.one);
        await CommonPageHelper.switchToWindow(Constants.number.zero);
        await PageHelper.switchToDefaultContentAndIFrame(ContentAlertManagerPage.contentIFrame);
    }

    static async verifyNoneDeletedErrorWindow() {
        await executeInNewTab(async () => {
            await ContentAlertManagerPage.noneDeletedErrorMessage().verifyDisplayedStatus();
        }, Constants.number.one, false);
    }

    static async closeErrorWindow() {
        await ContentAlertManagerPage.buttons.okButton.clickButton();
        StepLogger.subStep('Wait for window to close');
        await WaitHelper.sleep(PageHelper.timeout.xs);
    }

    url(): string {
        throw new Error('Method not implemented.');
    }
}
