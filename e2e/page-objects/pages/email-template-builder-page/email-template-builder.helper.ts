import { ElementFinder } from 'protractor';

import { VerboseLogger } from '../../../../core/logger/verbose-logger';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { AdminHomePageHelper } from '../admin-home-page/admin-home.helper';
import { BasePageHelper } from '../base-page.helper';

import { EmailTemplateBuilderPage } from './email-template-builder.po';

const { executeInIFrame, executeInNewTab, getTextOfElements } = PageHelper;
const { greetingSelections, signatureSelections } = EmailTemplateBuilderPage;
export class EmailTemplateBuilderPageHelper extends BasePageHelper {

    /**
     * It returns id of newly added SignatureSelection
     * @param switchToIFrame
     */
    private static async addNewSignatureSelection(switchToIFrame = false): Promise<number> {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        const { signatureOrderedIds } = EmailTemplateBuilderPage.signatureSelections;
        await EmailTemplateBuilderPage.signatureSelections.new.clickButton();
        await EmailTemplateBuilderPageHelper.verifyNewSignatureSelectionIsAdded();
        const ids = await signatureOrderedIds.getAtttribute(HtmlHelper.attributes.value);
        const idsArray = ids.split(',');
        return Number(idsArray[idsArray.length - 2]);
    }

    /**
     * It returns id of newly added GreetingSelection
     * @param switchToIFrame
     */
    private static async addNewGreetingSelection(switchToIFrame = false): Promise<number> {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        const { greetingOrderedIds } = EmailTemplateBuilderPage.greetingSelections;
        await EmailTemplateBuilderPage.greetingSelections.new.clickButton();
        await EmailTemplateBuilderPageHelper.verifyNewGreetingSelectionIsAdded();
        const ids = await greetingOrderedIds.getAtttribute(HtmlHelper.attributes.value);
        const idsArray = ids.split(',');
        return Number(idsArray[idsArray.length - 2]);
    }

    static async verifyDisplayed(switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await EmailTemplateBuilderPage.pageTitle.verifyDisplayedStatus();
    }

    static async updateSubject(subject: string, switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await EmailTemplateBuilderPage.subject.sendKeys(subject);
    }

    /**
     * Clean up  method to delete 'GreetingSelections' created by test automation
     */
    static async deleteTestGreetingSelections() {
        try {
            const { greetingOrderedIds } = EmailTemplateBuilderPage.greetingSelections;

            // filter data added by test runs
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
            const ids: string = await greetingOrderedIds.getAtttribute(HtmlHelper.attributes.value);
            const newIds = ids.split(',').filter((id: string) => (id.length > 0 && !(Number(id) <= 3)));
            await PageHelper.switchToDefaultContent();

            // delete data by test runs
            for (let count = 0; count < newIds.length; count++) {
                await executeInIFrame(EmailTemplateBuilderPage.contentIFrame, async () => {
                    await EmailTemplateBuilderPage.greetingSelections.specificDelete(Number(newIds[count])).clickButton();
                    await executeInNewTab(async () => {
                        await EmailTemplateBuilderPage.deleteModal.yes.clickButton();
                    }, 1, false);
                    await PageHelper.switchToFirstTab();
                });
            }
            // save the details
            await executeInIFrame(EmailTemplateBuilderPage.contentIFrame, async () => {
                await EmailTemplateBuilderPage.save.clickButton();
            });
        } catch (e) {
            // catch error when cleanup cannot be completed
            VerboseLogger.log(`Error while deleting GreetingSelections: ${e}`);
        }
    }

    static async verifyNewGreetingSelectionIsAdded(index = 4) {
        await EmailTemplateBuilderPage.greetingSelections.specificDelete(index).verifyDisplayedStatus();
    }

    static async verifyNewSignatureSelectionIsAdded(index = 5) {
        await EmailTemplateBuilderPage.greetingSelections.specificDelete(index).verifyDisplayedStatus();
    }

    static async verifyLanguagesDisplayed() {
        const { dropDownOptions } = EmailTemplateBuilderPage.language;
        await dropDownOptions.item.each(async (option: ElementFinder) => {
            await ExpectationHelper.verifyDisplayedElementFinder(option, dropDownOptions.name);
        });
    }

    static async verifyGreetingSelectionTextErrorDisplayed() {
        await executeInNewTab(async () => {
            await EmailTemplateBuilderPage.errorModal.greetingSelectionText.verifyDisplayedStatus();
        });
    }

    static async verifyGreetingInsertedTextErrorDisplayed() {
        await executeInNewTab(async () => {
            await EmailTemplateBuilderPage.errorModal.greetingInsertedText.verifyDisplayedStatus();
        });
    }

    static async verifySignatureSelectionTextErrorDisplayed() {
        await executeInNewTab(async () => {
            await EmailTemplateBuilderPage.errorModal.signatureSelectionText.verifyDisplayedStatus();
        });
    }

    static async addNewGreetingAndSignatureSelections(addGreeting = true,
                                                      addSignature = true) {
        let greetingSelectionId = -1;
        let signatureSelectionId = -1;
        await AdminHomePageHelper.navigateToEmailTemplateBuilderPage();
        await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        if (addGreeting) {
            greetingSelectionId = await this.addNewGreetingSelection();
        }
        if (addSignature) {
            signatureSelectionId = await this.addNewSignatureSelection();
        }
        await PageHelper.switchToDefaultContent();
        return { greetingId: greetingSelectionId, signatureId: signatureSelectionId };
    }

    static async verifySignatureInsertedTextErrorDisplayed() {
        await executeInNewTab(async () => {
            await EmailTemplateBuilderPage.errorModal.signatureInsertedText.verifyDisplayedStatus();
        });
    }

    static async verifyGreetingSelectionsIsReordered(initial: string[], switchToIFrame = false) {
        await WaitHelper.sleep(PageHelper.timeout.xs);
        if (switchToIFrame) {
            await PageHelper.switchToDefaultContent();
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        const reordered = await getTextOfElements(EmailTemplateBuilderPage.greetingSelections.all);
        await ExpectationHelper.verifyStringEqualTo(initial[0], reordered[1]);
        await ExpectationHelper.verifyStringEqualTo(initial[1], reordered[0]);
    }

    static async verifyItemsReorderedOnReorderModal(initial: string[], switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.reorder.dialogIFrame);
        }
        const reordered = await getTextOfElements(EmailTemplateBuilderPage.reorder.allItems);
        await ExpectationHelper.verifyStringEqualTo(initial[0], reordered[1]);
        await ExpectationHelper.verifyStringEqualTo(initial[1], reordered[0]);
    }

    static async moveItemUp(name: string) {
        await EmailTemplateBuilderPage.reorder.selectItem(name).hoverOverAndClick();
        await EmailTemplateBuilderPage.reorder.moveUp.hoverOverAndClick();
    }

    static async verifyReorderModalDisplayed(switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.reorder.dialogIFrame);
        }
        await EmailTemplateBuilderPage.reorder.ok.verifyDisplayedStatus();
    }

    static async getInitialOrderOfGreetingSelections() {
        await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        return await getTextOfElements(EmailTemplateBuilderPage.greetingSelections.all);
    }

    static async verifyNewAndReorderButtonsOnGreetingSelections(switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await EmailTemplateBuilderPage.greetingSelections.new.verifyDisplayedStatus();
        await EmailTemplateBuilderPage.greetingSelections.reorder.verifyDisplayedStatus();
    }

    static async verifyNewAndReorderButtonsOnSignatureSelections(switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await EmailTemplateBuilderPage.signatureSelections.new.verifyDisplayedStatus();
        await EmailTemplateBuilderPage.signatureSelections.reorder.verifyDisplayedStatus();
    }

    static async getIdOfNewlyAddedGreetingSelection(switchToIFrame = false) {
        const { greetingOrderedIds } = EmailTemplateBuilderPage.greetingSelections;
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        const ids = await greetingOrderedIds.getAtttribute(HtmlHelper.attributes.value);
        const idsArray = ids.split(',');
        return Number(idsArray[idsArray.length - 2]);
    }

    static async clearGreetingSelectionText(greetingSelectionId: number, switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await greetingSelections.specificGreeting(greetingSelectionId).selectionText.clearText();
    }

    private static async clearSignatureSelectionText(signatureSelectionId: number, switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await EmailTemplateBuilderPage.signatureSelections.specific(signatureSelectionId).selectionText.clearText();
    }

    private static async enterGreetingSelectionText(greetingSelectionId: number, text: string, switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await greetingSelections.specificGreeting(greetingSelectionId).selectionText.sendKeys(text);
    }

    private static async enterSignatureSelectionText(signatureSelectionId: number, text: string, switchToIFrame = false) {
        if (switchToIFrame) {
            await PageHelper.switchToiFrame(EmailTemplateBuilderPage.contentIFrame);
        }
        await signatureSelections.specific(signatureSelectionId).selectionText.sendKeys(text);
    }

    static async clearGreetingSelectionTextAndSave(greetingSelectionId: number, switchToIFrame = false) {
        await this.clearGreetingSelectionText(greetingSelectionId, switchToIFrame);
        await EmailTemplateBuilderPage.save.clickButton();
    }

    static async clearSignatureSelectionTextAndSave(signatureSelectionId: number, switchToIFrame = false) {
        await this.clearSignatureSelectionText(signatureSelectionId, switchToIFrame);
        await EmailTemplateBuilderPage.save.clickButton();
    }

    static async enterGreetingSelectionTextAndSave(greetingSelectionId: number, text: string, switchToIFrame = false) {
        await this.enterGreetingSelectionText(greetingSelectionId, text, switchToIFrame);
        await EmailTemplateBuilderPage.save.clickButton();
    }

    static async enterSignatureSelectionTextAndSave(signatureSelectionId: number, text: string, switchToIFrame = false) {
        await this.enterSignatureSelectionText(signatureSelectionId, text, switchToIFrame);
        await EmailTemplateBuilderPage.save.clickButton();
    }

    url(): string {
        return EndpointHelper.home;
    }
}
