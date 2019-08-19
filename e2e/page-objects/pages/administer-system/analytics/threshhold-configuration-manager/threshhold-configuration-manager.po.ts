import { by } from 'protractor';

import { $ } from '../../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../../components/misc-utils/html-helper';

import { ThreshHoldConfigurationManagerConstant } from './threshhold-configuration-manager.constants';

export class ThreshHoldConfigurationManagerPage {
    private static readonly names = ThreshHoldConfigurationManagerConstant.elementNames;
    private static readonly ids = ThreshHoldConfigurationManagerConstant.ids;
    private static readonly classes = ThreshHoldConfigurationManagerConstant.classes;
    private static readonly tags = HtmlHelper.tags;
    private static readonly attributes = HtmlHelper.attributes;

    static get contentIFrame() {
        return $(by.id(this.ids.contentFrame), this.names.contentFrame);
    }

    static get titles() {
        return {
            pageTitle: $(by.css(`${this.tags.span}.${this.classes.title}`), this.names.title),
        };
    }

    static get buttons() {
        return {
            cancel: this.getElementByValue(this.names.cancel, this.names.cancel, this.tags.input),
            save: this.getElementByValue(this.names.save, this.names.save, this.tags.input),
            oK: this.getElementByValue(this.names.ok, this.names.ok, this.tags.input),
        };
    }

    static getElementByValue(value: string, name: string, tag = HtmlHelper.tags.input) {
        return $(by.css(`${tag}[${this.attributes.value}='${value}']`), name);
    }

    static get textBox() {
        return {
            lastLinked: this.getTexbox(this.ids.lastLinked, this.names.lastLinked, this.tags.td),
            lastUsedAsSolution: this.getTexbox(this.ids.lastUsedAsSolution, this.names.lastUsedSolution, this.tags.td),
            lastViewed: this.getTexbox(this.ids.lastViewed, this.names.lastViewed, this.tags.td),
            lastUsed: this.getTexbox(this.ids.lastUsed, this.names.lastUsed, this.tags.td),
            feedbacks: this.getTexbox(this.ids.negativeFeedBacks, this.names.negativeFeedBacks, this.tags.td),
            highRating: this.getTexbox(this.ids.highRating, this.names.highRating, this.tags.td),
            lowRating: this.getTexbox(this.ids.lowRating, this.names.lowRating, this.tags.td),
        };
    }

    static getTexbox(idValue: string, text: string, tag = HtmlHelper.tags.td) {
        return $(by.css(`${tag}#${idValue} ${this.tags.input}.${this.classes.apteanBody}`), text);
    }
}
