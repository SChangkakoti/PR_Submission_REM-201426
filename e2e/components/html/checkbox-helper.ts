import { DfElement } from '../misc-utils/df-elements-helper';

import { WaitHelper } from './wait-helper';

export class CheckboxHelper {

    static async markCheckbox(target: DfElement, markChecked: boolean) {
        await WaitHelper.waitForElementToBeClickable(target.item);

        const isSelected = await target.item.isSelected();
        if (isSelected !== markChecked) {
            await target.item.click();
        }
        return;
    }

    static async unCheckCheckbox(target: DfElement, markChecked: boolean) {
        await WaitHelper.waitForElementToBeClickable(target.item);

        const isSelected = await target.item.isSelected();
        if (isSelected === markChecked) {
            await target.item.click();
        }
    }

    static async isCheckboxChecked(target: DfElement) {
        await WaitHelper.waitForElementToBeDisplayed(target.item);
        return target.item.isSelected();
    }
}
