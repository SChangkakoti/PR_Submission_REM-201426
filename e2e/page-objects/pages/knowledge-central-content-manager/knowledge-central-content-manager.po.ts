import { by } from 'protractor';
import { By } from 'selenium-webdriver';

import { $ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { xpath } from '../../../components/misc-utils/xpath-builder';

import { KnowledgeCentralContentManagerConstant } from './knowledge-central-content-manager.constant';

export class KnowledgeCentralContentManagerPage {
    private static tags = HtmlHelper.tags;
    private static title = KnowledgeCentralContentManagerConstant.titles;
    private static names = KnowledgeCentralContentManagerConstant.elementNames;

    static get titles() {
        return {
            contentManager: $(by.cssContainingText(this.tags.div, this.title.contentManager), this.title.contentManager),
        };
    }

    static get elements() {
        return {
            lifeclycleManagerTab: $(by.cssContainingText(this.tags.td, this.names.lifecycleManager), this.names.lifecycleManager),
            searchResultOptions: {
                exportList: $(by.cssContainingText(this.tags.div, this.names.exportList), this.names.exportList),
                selectColumns: $(by.cssContainingText(this.tags.div, this.names.selectColumns), this.names.selectColumns),
                saveView: $(by.cssContainingText(this.tags.div, this.names.saveView), this.names.saveView),
                printList: $(by.cssContainingText(this.tags.div, this.names.printList), this.names.printList),
            },
        };
    }

    static getScreenArea(area: string) {
        return $(xpath(this.tags.div)
            .textContains(area)
            .parent(this.tags.td)
            .buildByObject(), this.names.searchCriteria);
    }

    static get searchBar() {
        return $(by.id('aptean-search-input'), KnowledgeCentralContentManagerConstant.elementNames.searchBar);
    }

    static getRandomDoc(docName: string) {
        return $(by.cssContainingText('a', docName), KnowledgeCentralContentManagerConstant.elementNames.searchBar);
    }

    static get documentTitle() {
        return $(by.css('.document_title'), KnowledgeCentralContentManagerConstant.elementNames.documentTitle);
    }

    static get highlight() {
        return $(by.css("[title='Turn Highlight On']"), KnowledgeCentralContentManagerConstant.elementNames.highlight);
    }

    static get highlightOff() {
        return $(by.css("[title='Turn Highlight Off']"), KnowledgeCentralContentManagerConstant.elementNames.highlightOff);
    }

    static get fullScreen() {
        return $(by.css("[title='Full Screen']"), KnowledgeCentralContentManagerConstant.elementNames.fullScreen);
    }

    static get addToFavorites() {
        return $(by.css("[title='Add to Favorites']"), KnowledgeCentralContentManagerConstant.elementNames.addToFavorites);
    }

    static get bookMarks() {
        return $(by.css("[title='Bookmark']"), KnowledgeCentralContentManagerConstant.elementNames.bookMarks);
    }

    static get subscribeToDocument() {
        return $(by.css("[title='Subscribe to Document through email']"), KnowledgeCentralContentManagerConstant.elementNames.subscribeToDocument);
    }

    static get emailDocument() {
        return $(by.css("[title='Email Document']"), KnowledgeCentralContentManagerConstant.elementNames.emailDocument);
    }

    static get highlightedText() {
        return $(by.cssContainingText(this.tags.font, 'Document'),
            KnowledgeCentralContentManagerConstant.elementNames.emailDocument);
    }

    static get alwaysUseTitle() {
        return $(by.css("[value='dynamic']"), KnowledgeCentralContentManagerConstant.elementNames.documentTitle);
    }

    static get specifyFavoriteLabel() {
        return $(by.css("[value='static']"), KnowledgeCentralContentManagerConstant.elementNames.addToFavorites);
    }

    static get documentAddedMessage() {
        return $(by.cssContainingText('b', KnowledgeCentralContentManagerConstant.elementNames.documentAddedMessage),
            KnowledgeCentralContentManagerConstant.elementNames.documentAddedMessage);
    }

    static get synopsisText() {
        return $(by.cssContainingText(this.tags.span, 'Synopsis:'), KnowledgeCentralContentManagerConstant.elementNames.emailDocument);
    }

    static get immediatelyOption() {
        return $(by.cssContainingText(this.tags.option, 'Immediately'), KnowledgeCentralContentManagerConstant.elementNames.immediately);
    }

    static get dailyOption() {
        return $(by.cssContainingText(this.tags.option, 'Daily'), KnowledgeCentralContentManagerConstant.elementNames.daily);
    }

    static get weeklyOption() {
        return $(by.cssContainingText(this.tags.option, 'Weekly'), KnowledgeCentralContentManagerConstant.elementNames.weekly);
    }

    static get titleText() {
        return $(by.cssContainingText(this.tags.b, 'Title:'), KnowledgeCentralContentManagerConstant.elementNames.documentTitle);
    }

    static get synopsisTextRss() {
        return $(by.cssContainingText(this.tags.b, 'Synopsis:'), KnowledgeCentralContentManagerConstant.elementNames.japanese);
    }

    static get manageDocument() {
        return $(by.css("[title='Manage Document']"), KnowledgeCentralContentManagerConstant.elementNames.manage);
    }

    static get copyClipBoard() {
        return $(by.css("[title='Copy Document URL to Clipboard']"), KnowledgeCentralContentManagerConstant.elementNames.clipboard);
    }

    static get upToSearchResults() {
        return $(by.css("[title='Up to Search Results']"), KnowledgeCentralContentManagerConstant.elementNames.upToSearchResults);
    }

    static get specifyFavoriteLabelText() {
        return $(by.css('#Title'), KnowledgeCentralContentManagerConstant.elementNames.addToFavorites);
    }

    static get taskTab() {
        return $(by.cssContainingText(this.tags.td, this.names.tasks), this.names.tasks);
    }

    static get taskPage() {
        return $(by.cssContainingText(this.tags.div, this.names.inbox), this.names.inbox);
    }

    static get contentFeedbackTab() {
        return $(by.cssContainingText(this.tags.td, this.names.contentFeedback), this.names.contentFeedback);
    }

    static get contentFeedbackPage() {
        return $(by.cssContainingText(this.tags.div, this.names.searches), this.names.searches);
    }

    static get lifeClycleManagerPage() {
        return $(by.cssContainingText(this.tags.div, this.names.savedSearches), this.names.savedSearches);
    }

    static get lockedDocumentManagerTab() {
        return $(by.cssContainingText(this.tags.td, this.names.lockedDocumentManager), this.names.lockedDocumentManager);
    }

    static get lockedDocumentManagerPage() {
        return $(by.cssContainingText(this.tags.div, this.names.unlock), this.names.unlock);
    }

    static get lifeCycleSearch() {
        return $(by.css('#isc_KI'), this.names.searches);
    }

    static get deleteDrafts() {
        return $(by.cssContainingText(this.tags.div, 'Delete Drafts'), this.names.deleteDrafts);
    }

    static get resultCheckBox() {
        return $(by.css("span[eventpart='valueicon']"), this.names.resultCheckBox);
    }

    static get deletePopUp() {
        return $(by.cssContainingText(this.tags.td, this.names.deleteDraftsPopUp), this.names.deleteDraftsPopUp);
    }

    static get yesDelete() {
        return $(by.cssContainingText(this.tags.div, 'Yes'), 'Yes');
    }

    static get deleteEntireDoc() {
        return $(by.cssContainingText(this.tags.div, this.names.deleteEntireDoc), this.names.deleteEntireDoc);
    }

    static get deleteEntirePopUp() {
        return $(by.cssContainingText(this.tags.td, this.names.deleteEntirePopUp), this.names.deleteEntirePopUp);
    }

    static get processingPopUp() {
        return $(by.cssContainingText(this.tags.td, this.names.processing), this.names.processing);
    }

    static get selectColumnPopUp() {
        return $(by.cssContainingText(this.tags.td, this.names.selectColumns), this.names.selectColumns);
    }

    static get accessLevelsColumn() {
        return $(by.cssContainingText(this.tags.div, this.names.accessLevels), this.names.accessLevels);
    }

    static get saveViewPopUp() {
        return $(by.cssContainingText(this.tags.td, this.names.saveView), this.names.saveView);
    }

    static getSavedView(view: string) {
        return $(by.css(`pre[text='${view}']`), this.names.saveView);
    }

    static get markPublic() {
        return $(By.css(`table#${this.names.publicCheckBox} tbody tr td input[type="${this.names.publicCheckBox}"]`), this.names.publicCheckBox);
    }

    static get englishName() {
        return $(by.cssContainingText(this.tags.label, this.names.englishName), this.names.englishName);
    }

    static get mandatorySymbol() {
        return $(by.cssContainingText('nobr', this.names.mandatorySymbol), this.names.mandatorySymbol);
    }
}
