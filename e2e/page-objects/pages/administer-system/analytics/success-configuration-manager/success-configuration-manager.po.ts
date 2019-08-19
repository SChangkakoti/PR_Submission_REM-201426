import { by } from 'protractor';

import { $ } from '../../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../../components/misc-utils/html-helper';

import { SuccessConfigurationManagerConstant } from './success-configuration-manager.constants';

export class SuccessConfigurationManagerPage {
    private static readonly names = SuccessConfigurationManagerConstant.elementNames;
    private static readonly ids = SuccessConfigurationManagerConstant.ids;
    private static readonly classes = SuccessConfigurationManagerConstant.classes;
    private static readonly tags = HtmlHelper.tags;

    static get contentIFrame() {
        return $(by.id(this.ids.contentFrame), this.names.contentFrame);
    }

    static get titles() {
        return {
            pageTitle: $(by.css(`${this.tags.span}.${this.classes.title}`), this.names.title),
        };
    }

    static get generalSection() {
        const form = SuccessConfigurationManagerConstant.generalSection;
        return {
            high: $(by.css(`select[name*='${form.high}']`), form.high),
            low: $(by.css(`select[name*='${form.low}']`), form.low),
            highNegative: $(by.css(`select[name*='${form.high}'] option[value='${form.negative}']`), form.high),
            highNa: $(by.css(`select[name*='${form.high}'] option[value='${form.na}']`), form.high),
            highPositive: $(by.css(`select[name*='${form.high}'] option[value='${form.positive}']`), form.high),
            lowNegative: $(by.css(`select[name*='${form.low}'] option[value='${form.negative}']`), form.low),
            lowNa: $(by.css(`select[name*='${form.low}'] option[value='${form.na}']`), form.low),
            lowPositive: $(by.css(`select[name*='${form.low}'] option[value='${form.positive}']`), form.low),
        };
    }

    static get resolutionFlow() {
        const form = SuccessConfigurationManagerConstant.resolutionFlow;
        return {
            caseResolved: $(by.css(`select[name*='${form.caseResolved}']`), form.caseResolved),
            caseEscalated: $(by.css(`select[name*='${form.caseEscalated}']`), form.caseEscalated),
            caseSaved: $(by.css(`select[name*='${form.caseSaved}']`), form.caseSaved),
            collaborationCreated: $(by.css(`select[name*='${form.collaborationCreated}']`), form.collaborationCreated),
            noDidThisHelp: $(by.css(`select[name*='${form.noDidThisHelp}']`), form.noDidThisHelp),
            yesDidThisHelp: $(by.css(`select[name*='${form.yesDidThisHelp}']`), form.yesDidThisHelp),
            returnedToExistingWebCase: $(by.css(`select[name*='${form.returnedToExistingWebCase}']`), form.returnedToExistingWebCase),
            unKnownOutcome: $(by.css(`select[name*='${form.unKnownOutcome}']`), form.unKnownOutcome),
            negative: $(by.css(`select[name*='${form.caseResolved}'] option[value='${form.negative}']`), form.negative),
            na: $(by.css(`select[name*='${form.caseResolved}'] option[value='${form.na}']`), form.na),
            positive: $(by.css(`select[name*='${form.caseResolved}'] option[value='${form.positive}']`), form.positive),
        };
    }

    static get searchSection() {
        const form = SuccessConfigurationManagerConstant.searchSection;
        return {
            viewedManyDocs: $(by.css(`select[name*='${form.viewedManyDocs}']`), form.viewedManyDocs),
            viewedOneDoc: $(by.css(`select[name*='${form.viewedOneDoc}']`), form.viewedOneDoc),
            viewedNoDocs: $(by.css(`select[name*='${form.viewedNoDocs}']`), form.viewedNoDocs),
            returnedNoDocs: $(by.css(`select[name*='${form.noDocsReturned}']`), form.noDocsReturned),
            noActivity: $(by.css(`select[name*='${form.noActivity}']`), form.noActivity),
            emailedDocument: $(by.css(`select[name*='${form.emailedDocument}']`), form.emailedDocument),
            savedDocument: $(by.css(`select[name*='${form.savedDocument}']`), form.savedDocument),
            savedSearch: $(by.css(`select[name*='${form.savedSearch}']`), form.savedSearch),
            selectedBB: $(by.css(`select[name*='${form.selectedBB}']`), form.selectedBB),
            selectedRecommendation: $(by.css(`select[name*='${form.selectedRecommendation}']`), form.selectedRecommendation),
            selectedICs: $(by.css(`select[name*='${form.selectedICs}']`), form.selectedICs),
            selectedChoices: $(by.css(`select[name*='${form.selectedChoices}']`), form.selectedChoices),
            negative: $(by.css(`select[name*='${form.viewedManyDocs}'] option[value='${form.negative}']`), form.negative),
            na: $(by.css(`select[name*='${form.viewedManyDocs}'] option[value='${form.na}']`), form.na),
            positive: $(by.css(`select[name*='${form.viewedManyDocs}'] option[value='${form.positive}']`), form.positive),
        };
    }

    static get workbenchSection() {
        const form = SuccessConfigurationManagerConstant.workbenchSection;
        return {
            noNewDocumentCreatedOrLinked: $(by.css(`select[name*='${form.noNewDocumentCreatedOrLinked}']`), form.noNewDocumentCreatedOrLinked),
            newDocumentCreatedOrLinked: $(by.css(`select[name*='${form.newDocumentCreatedOrLinked}']`), form.newDocumentCreatedOrLinked),
            saveForLater: $(by.css(`select[name*='${form.saveForLater}']`), form.saveForLater),
            newDocumentCreated: $(by.css(`select[name*='${form.documentCreated}']`), form.documentCreated),
            notSolved: $(by.css(`select[name*='${form.notSolved}']`), form.notSolved),
            icSelected: $(by.css(`select[name*='${form.icSelected}']`), form.icSelected),
            emailSent: $(by.css(`select[name*='${form.emailSent}']`), form.emailSent),
            authoringSuggestionCreated: $(by.css(`select[name*='${form.authoringSuggestionCreated}']`), form.authoringSuggestionCreated),
            documentViewed: $(by.css(`select[name*='${form.documentViewed}']`), form.documentViewed),
            collaborationStarted: $(by.css(`select[name*='${form.collaborationStarted}']`), form.collaborationStarted),
            interviewSearchUsed: $(by.css(`select[name*='${form.interviewSearchUsed}']`), form.interviewSearchUsed),
            unknownOutcome: $(by.css(`select[name*='${form.unknownOutcome}']`), form.unknownOutcome),
            negative: $(by.css(`select[name*='${form.noNewDocumentCreatedOrLinked}'] option[value='${form.negative}']`), form.negative),
            na: $(by.css(`select[name*='${form.noNewDocumentCreatedOrLinked}'] option[value='${form.na}']`), form.na),
            positive: $(by.css(`select[name*='${form.noNewDocumentCreatedOrLinked}'] option[value='${form.positive}']`), form.positive),
        };
    }

    static get communities() {
        const form = SuccessConfigurationManagerConstant.communities;
        return {
            communityBrowsed: $(by.css(`select[name*='${form.communityBrowsed}']`), form.communityBrowsed),
            newThreadCreated: $(by.css(`select[name*='${form.newThreadCreated}']`), form.newThreadCreated),
            problemSolved: $(by.css(`select[name*='${form.problemSolved}']`), form.problemSolved),
            repliedToThread: $(by.css(`select[name*='${form.repliedToThread}']`), form.repliedToThread),
            unknownOutcome: $(by.css(`select[name*='${form.unknownOutcome}']`), form.unknownOutcome),
        };
    }

    static get homeBrowse() {
        const form = SuccessConfigurationManagerConstant.homeBrowse;
        return {
            documentViewed: $(by.css(`select[name*='${form.documentViewed}']`), form.documentViewed),
            recommendationAccessed: $(by.css(`select[name*='${form.recommendationAccessed}']`), form.recommendationAccessed),
        };
    }

    static get buttons() {
        const form = this.names;
        return {
            save: $(by.id('submitID'), this.names.submit),
            cancel: $(by.id('cancelID'), this.names.cancel),
            help: $(by.css(`img[src*='${form.help}']`), this.names.help),
            formsOfOptions: $(by.css(`img[title='${form.formsOfOptions}']`), this.names.formsOfOptions),
        };
    }
}
