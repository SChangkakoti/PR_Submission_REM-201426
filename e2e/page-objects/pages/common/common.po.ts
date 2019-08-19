import { by } from 'protractor';

import { $, DfElement } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { xpath } from '../../../components/misc-utils/xpath-builder';
import { KnowledgeCentralCollaborationPage } from '../knowledge-central-collaboration/knowledge-central-collaboration.po';

import { CommonPageConstant } from './common-page.constant';

export class CommonPage {

    static getLocatorByPlaceHolder(value: string) {
        return by.css(`[${HtmlHelper.attributes.placeholder}='${value}']`);
    }

    static get contentFrame() {
        return $(by.id('contentframe'), CommonPageConstant.frames.contentFrame);
    }

    static get contentIFrame() {
        return $(by.id('content'), CommonPageConstant.frames.content);
    }

    static get dialogFrame() {
        return $(by.id('dialogIFrame'), CommonPageConstant.frames.dialogFrame);
    }

    static get supervisorFrame() {
        return $(by.id('supervisorFrame'), CommonPageConstant.frames.supervisorFrame);
    }

    static get selectedFrame() {
        return $(by.id('selectedFrame'), CommonPageConstant.frames.selectedFrame);
    }

    static get groupFrame() {
        return $(by.id('groupFrame'), CommonPageConstant.frames.groupFrame);
    }

    static get findUsersFrame() {
        return $(by.id('findUsersFrame'), CommonPageConstant.frames.findUsersFrame);
    }

    static get usersFrame() {
        return $(by.id('userFrame'), CommonPageConstant.frames.usersFrame);
    }

    static get findGroupsFrame() {
        return $(by.id('findGroupsFrame'), CommonPageConstant.frames.findGroupsFrame);
    }

    static get fmtreeFrame() {
        return $(by.name('fmtree'), CommonPageConstant.frames.fmtreeFrame);
    }

    static get treeFrame() {
        return $(by.name('tree'), CommonPageConstant.frames.treeFrame);
    }

    static get fmeditFrame() {
        return $(by.name('fmedit'), CommonPageConstant.frames.fmeditFrame);
    }

    static get expertiseTableFrame() {
        return $(by.name('expertiseTable'), CommonPageConstant.frames.expertiseTableFrame);
    }

    static get treeIFrame() {
        return $(by.id(CommonPageConstant.frames.frameTree), CommonPageConstant.frames.frameTree);
    }

    static get whatsPopularIFrame() {
        return $(by.id(CommonPageConstant.frames.whatsPopularFrame), CommonPageConstant.frames.whatsPopularFrame);
    }

    static get headerFrame() {
        return $(by.id(CommonPageConstant.frames.headerFrame), CommonPageConstant.frames.headerFrame);
    }

    static get extiFrame() {
        return $(by.id(CommonPageConstant.frames.extiFrame), CommonPageConstant.frames.extiFrame);
    }

    static get docFrame() {
        return $(by.id(CommonPageConstant.frames.docFrame), CommonPageConstant.frames.docFrame);
    }

    static get errorMessageIcon() {
        return $(xpath(HtmlHelper.tags.img)
            .where('alt', CommonPageConstant.names.errorMessageIcon)
            .buildByObject(), CommonPageConstant.names.errorMessageIcon);
    }

    static get contentAndDialogueIFrames(): DfElement[] {
        return [this.contentFrame, this.dialogFrame];
    }

    static get contentDialogueAndSupervisorIFrames(): DfElement[] {
        return [this.contentFrame, this.dialogFrame, this.supervisorFrame];
    }

    static get contentDialogueAndFindUsersIFrames(): DfElement[] {
        return [this.contentFrame, this.dialogFrame, this.findUsersFrame];
    }

    static get contentDialogueLevelTwoInnerContentTreeIFrames(): DfElement[] {
        return [this.contentFrame, this.dialogFrame, this.dialogFrame, this.contentIFrame, this.treeFrame];
    }

    static get contentDialogueLevelTwoInnerContentIFrames(): DfElement[] {
        return [this.contentFrame, this.dialogFrame, this.dialogFrame, this.contentIFrame];
    }

    static get userFrame() {
        return $(by.id('userFrame'), CommonPageConstant.frames.usersFrame);
    }

    static get linkDOCEntryFrame() {
        return $(by.id('linkDOCEntryFrame'), CommonPageConstant.frames.linkDOCEntryFrame);
    }

    static get editorFrame() {
        return $(by.css('.cke_wysiwyg_frame.cke_reset'), CommonPageConstant.frames.editorFrame);
    }

    /**
     * Returns an array of Four iFrames: contentframe, dialogIFrame, dialogIFrame & findFrame
     */
    static get contentDialogDialogFindIFrames() {
        const iframes = this.contentDialogDialogIFrames;
        iframes.push(KnowledgeCentralCollaborationPage.findIFrame);
        return iframes;
    }

    /**
     * Returns an array of three iFrames: contentframe, dialogIFrame & dialogIFrame
     */
    static get contentDialogDialogIFrames() {
        return [
            this.contentFrame,
            this.dialogFrame,
            this.dialogFrame
        ];
    }

    /**
     * Returns an array of iFrames: dialogIFrame, dialogIFrame
     */
    static get contentDialogFindIFrames() {
        const iframes = this.contentDialogIFrames;
        return iframes;
    }

    /**
     * Returns an array of iFrames: dialogIFrame & dialogIFrame
     */
    static get contentDialogIFrames() {
        return [
            this.dialogFrame
        ];
    }

    /**
     * Returns an array of iFrames: ContentIFrame
     */
    static get contentFindIFrames() {
        const iframes = this.contentIFrames;
        return iframes;
    }

    static get contentIFrames() {
        return [
            this.contentFrame
        ];
    }

    static get myMicrositesFrame() {
        return $(by.name(CommonPageConstant.names.mymicrositesJsp),
            CommonPageConstant.frames.mymicrosites);
    }

    static get mySubscriptionsFrame() {
        return $(by.name(CommonPageConstant.names.mssubscriptionlistJsp),
            CommonPageConstant.frames.mySubscriptionsFrame);
    }

    static get myAnswerWizardsFrame() {
        return $(by.name(CommonPageConstant.names.msbrowseanswerwizardsJsp),
            CommonPageConstant.frames.answerWizard);
    }

    static get WatsPopularFrame() {
        return $(by.name(CommonPageConstant.names.msWhatsPopularJsp),
            CommonPageConstant.frames.whatsPopularFrame);
    }
}
