import { by } from 'protractor';

import { $ } from '../../../components/misc-utils/df-elements-helper';
import { CommonPageHelper } from '../common/common-page.helper';

import { KnowledgeCentralHomePageConstant } from './knowledge-central-home.constants';

export class KnowledgeCentralHomePage {
    private static readonly names = KnowledgeCentralHomePageConstant.elementNames;
    private static readonly attr = KnowledgeCentralHomePageConstant.attributes;

    static get hamburgerIcon() {
        return $(by.id(this.attr.id.apteanHamburger), this.names.hamburger);
    }

    static get sidebar() {
        return {
            settings: CommonPageHelper.getElementByIdEndsWith(this.attr.id.buttonSettings,
                this.names.settings),
            logout: $(by.cssContainingText(`.${this.attr.classes.apteanSideMenuButtonText}`,
                this.names.logout), this.names.logout),
            microsites: CommonPageHelper.getElementByIdEndsWith(this.attr.id.microsites,
                this.names.microsites),
            caseManager: $(by.cssContainingText(`.${this.attr.classes.apteanSideMenuButtonText}`,
                this.names.caseManager), this.names.caseManager),
            collaboration: $(by.cssContainingText(`.${this.attr.classes.apteanSideMenuButtonText}`,
                this.names.collaboration), this.names.collaboration),
            contentManager: $(by.cssContainingText(`.${this.attr.classes.apteanSideMenuButtonText}`,
                this.names.contentManager), this.names.contentManager),
        };
    }

    static get headerBanner() {
        return $(by.className(this.attr.classes.apteanWelcome), 'Header Banner');
    }

    static get homePageProperties() {
        const label = KnowledgeCentralHomePageConstant.homePageProperties;
        return {
            menuButton: $(by.id('aptean-hamburger'), label.menuButton),
            searchBar: $(by.id('searchFieldCell'), label.searchBar),
            products: $(by.id('product_table'), label.products),
            myFavorites: $(by.xpath(`//td[text()='${label.myFavorites}']`), label.myFavorites),
            workInProgress: $(by.id('msrwIncidentsWidget'), label.workInProgress),
            answerWizards: $(by.id('msbrowseanswerwizards'), label.answerWizards),
            mySubscriptions: $(by.id('mssubscriptionlist'), label.mySubscriptions),
            hotTopics: $(by.id('searchresultdiv'), label.hotTopics),
        };
    }

    static get button() {
        return {
            dialogClose: $(by.css(`button[class*='${this.attr.classes.dialogClose}'] span[class*='${this.attr.classes.uiIconClose}']`),
                this.names.close),
        };
    }

    private static getSecondLevelMenuLink(name: string) {
        return $(by.cssContainingText(`[class*='${this.attr.classes.apteanSecondLevelMenuLink}']`,
            name), name);
    }

    static get settings() {
        return {
            about: this.getSecondLevelMenuLink(this.names.about),
            help: this.getSecondLevelMenuLink(this.names.help),
        };
    }

    static get helpPane() {
        return {
            toolbarFrame: $(by.css(`frame[name='${this.names.mctoolbar}']`),
                this.names.mctoolbar),
            navigationFrame: $(by.css(`frame[name='${this.names.navigation}']`),
                this.names.navigation),
            bodyFrame: $(by.css(`frame[name='${this.names.body}']`),
                this.names.body),
            titleLabel: $(by.css(`span#${this.attr.id.accordionTitleLabel}`),
                this.attr.id.accordionTitleLabel),
            tocIframe: $(by.css(`iframe#${this.attr.id.toc}`),
                this.attr.id.toc),
            indexIframe: $(by.css(`iframe#${this.attr.id.index}`),
                this.attr.id.index),
            searchIframe: $(by.css(`iframe#${this.attr.id.search}`),
                this.attr.id.search),
            toc: $(by.css(`div#${this.attr.id.tocAccordion}`),
                this.attr.id.tocAccordion),
            index: $(by.css(`div#${this.attr.id.indexAccordion}`),
                this.attr.id.indexAccordion),
            search: $(by.css(`div#${this.attr.id.searchAccordion}`),
                this.attr.id.searchAccordion),
            knovaCentralHelp: $(by.css(`div#${this.attr.id.catapultToc} a[title='${this.names.knovaCentralHelp}']`),
                this.names.knovaCentralHelp),
            introToKnovaCentral: $(by.css(`div#${this.attr.id.catapultToc} a[title='${this.names.introToKnovaCentral}']`),
                this.names.introToKnovaCentral),
            navigateKnovaCentral: $(by.css(`div#${this.attr.id.catapultToc} a[title='${this.names.navigateKnovaCentral}']`),
                this.names.navigateKnovaCentral),
            workingWithMicroSite: $(by.css(`div#${this.attr.id.catapultToc} a[title='${this.names.workingWithMicroSite}']`),
                this.names.workingWithMicroSite),
            introToKnovaCentralTitle: $(by.cssContainingText('h1', this.names.introToKnovaCentral),
                this.names.introToKnovaCentral),
            navigateKnovaCentralTitle: $(by.cssContainingText('h1', this.names.navigateKnovaCentral),
                this.names.navigateKnovaCentral),
            searchToolBar: $(by.css(`input#${this.attr.id.quickSearchField}`),
                this.attr.id.quickSearchField),
            searchIcon: $(by.css(`button[title='${this.names.searchTopic}']`),
                this.names.searchTopic),
            removeHighlight: $(by.css(`button[title='${this.names.removeSearchHighlight}']`),
                this.names.removeSearchHighlight),
            searchHighlight: $(by.xpath(`(//span[contains(@class,'${this.attr.classes.searchHighlight}')])[1]`),
                this.attr.classes.searchHighlight),
            back: $(by.css(`button[title='${this.names.back}']`),
                this.names.back),
            forward: $(by.css(`button[title='${this.names.forward}']`),
                this.names.forward),
            navigateKnovaCentralBreadCrumb: $(by.cssContainingText(`a[class*='${this.attr.classes.mcBreadCrumbsLink}']`, this.names.navigateKnovaCentral),
                this.names.navigateKnovaCentral),
            caseManagerTitle: $(by.cssContainingText('h2', this.names.caseManager),
                this.names.caseManager),
            caseManagement: $(by.css(`div#${this.attr.id.catapultToc} a[title='${this.names.caseManagement}']`),
                this.names.caseManagement),
            accessLevels: $(by.cssContainingText(`div#${this.attr.id.catapultIndex} a`, this.names.accessLevels),
                this.names.accessLevels),
            accessLevelsTitle: $(by.cssContainingText('h3', this.names.accessLevels),
                this.names.accessLevels),
            alerts: $(by.cssContainingText(`div#${this.attr.id.catapultIndex} a`, this.names.alerts),
                this.names.alerts),
            alertsTitle: $(by.cssContainingText('h3', this.names.alertTitle),
                this.names.alertTitle),
            searchField: $(by.css(`input[name='${this.names.searchField}']`),
                this.names.searchField),
            searchButton: $(by.css(`input#${this.attr.id.searchButton}`),
                this.attr.id.searchButton),
            searchResults: $(by.css(`div#${this.attr.id.searchResults}`),
                this.attr.id.searchResults),
            contentEditorBreadCrumb: $(by.cssContainingText(`a[class*='${this.attr.classes.mcBreadCrumbsLink}']`, this.names.contentEditor),
                this.names.contentEditor),
            contentEditorTitle: $(by.cssContainingText('h1', this.names.contentEditor),
                this.names.contentEditor),
            indexSearchField: $(by.css(`input#${this.names.searchField}`),
                this.names.searchField),
        };
    }
}
