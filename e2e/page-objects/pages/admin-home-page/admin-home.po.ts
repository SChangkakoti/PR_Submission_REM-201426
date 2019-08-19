import { by, element } from 'protractor';
import { By } from 'selenium-webdriver';

import { $ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { xpath } from '../../../components/misc-utils/xpath-builder';
import { CommonPageHelper } from '../common/common-page.helper';

import { AdminHomePageConstant } from './admin-home.constants';

const { tags } = HtmlHelper;
export class AdminHomePage {
    private static readonly names = AdminHomePageConstant.elementNames;
    private static readonly attr = AdminHomePageConstant.attributes;
    private static readonly labels = AdminHomePageConstant.labels;

    private static getManageWorkbenchFields(name: string) {
        return $(xpath(HtmlHelper.tags.li)
            .where(HtmlHelper.attributes.class, this.attr.classes.apteanSecondLevelMenuLink)
            .descendant(HtmlHelper.tags.a)
            .text(name)
            .buildByObject(), name);
    }

    private static getManageKnowledge(name: string) {
        return $(by.cssContainingText(`.${this.attr.classes.apteanSecondLevelMenuLink}`,
            name), name);
    }

    static get hamburgerIcon() {
        return $(by.id(this.attr.id.apteanHamburger), this.names.hamburger);
    }

    static get sidebar() {
        return {
            home: $(by.cssContainingText(`.${this.attr.classes.apteanSideMenuButtonText}`,
                this.names.home), this.names.home),
            manageWorkbench: CommonPageHelper.getElementByIdEndsWith(this.attr.id.manageWorkbench,
                this.names.manageWorkbench),
            manageCommunities: CommonPageHelper.getElementByIdEndsWith(this.attr.id.manageCommunities,
                this.names.manageCommunities),
            manageKnowledge: CommonPageHelper.getElementByIdEndsWith(this.attr.id.manageKnowledge,
                this.names.manageKnowledge),
            managePeople: CommonPageHelper.getElementByIdEndsWith(this.attr.id.managePeople,
                this.names.managePeople),
            manageSiteExp: CommonPageHelper.getElementByIdEndsWith(this.attr.id.manageSiteExp,
                this.names.manageSiteExp),
            administerSystem: CommonPageHelper.getElementByIdEndsWith(this.attr.id.administerSystem,
                this.names.administerSystem),
            settings: CommonPageHelper.getElementByIdEndsWith(this.attr.id.buttonSettings,
                this.names.settings),
            logout: $(by.cssContainingText(`.${this.attr.classes.apteanSideMenuButtonText}`,
                this.names.logout), this.names.logout),
            homeButton: $(by.cssContainingText(`.${this.attr.classes.apteanSideMenuButton}`,
                this.names.home), this.names.home),
        };
    }

    static get manageWorkbench() {
        return {
            interviewBuilder: this.getManageWorkbenchFields(this.names.interviewBuilder),
            resolutionFlowDesigner: this.getManageWorkbenchFields(this.names.resolutionFlowDesigner),
            masterEmailTemplateBuilder: this.getManageWorkbenchFields(this.names.masterEmailTemplateBuilder),
        };
    }

    static get manageCommunities() {
        return {
            contentAlertManager: this.getManageWorkbenchFields(this.names.contentAlertManager),
            communitiesManager: this.getManageWorkbenchFields(this.names.communitiesManager),
            pollManager: this.getManageWorkbenchFields(this.names.pollManager),
            rewardPointsManager: this.getManageWorkbenchFields(this.names.rewardPointsManager),
        };
    }

    static get welcomeUserNameLabel() {
        return element(By.css('.aptean-HD-welcome'));
    }

    static get sideBar() {
        return element(By.css('#aptean-side-menu'));
    }

    static get manageKnowledge() {
        return {
            knowledgeModel: this.getManageKnowledge(this.names.knowledgeModel),
            knowledgeAuthoring: this.getManageKnowledge(this.names.knowlegdeAuthoring),
            knowledgeContribution: this.getManageKnowledge(this.names.knowledgeContribution),
            knowledgeReContribution: this.getknowledgeModel(this.names.knowledgeReContribution),
        };
    }

    static get managePeople() {
        return {
            agentLevelManager: this.getManageWorkbenchFields(this.names.agentLevelManager),
            enterpriseReputationLevelManager: this.getManageWorkbenchFields(
                this.names.enterpriseReputationLevelManager
            ),
            groupCreator: this.getManageWorkbenchFields(this.names.groupCreator),
            userGroupFinder: this.getManageWorkbenchFields(this.names.userGroupFinder),
            roleManagerKKC: this.getManageKnowledge(this.names.roleManagerKKC),
            roleManagerKSS: this.getManageKnowledge(this.names.roleManagerKSS),
            userCreator: this.getManageWorkbenchFields(this.names.userCreator),
        };
    }

    static get manageSiteExp() {
        return {
            savedQueryManager: this.getManageKnowledge(this.names.savedQueryManager),
            agentMicrosite: this.getManageKnowledge(this.names.agentMicrosite),
            customerMicrosite: this.getManageKnowledge(this.names.customerMicrosite),
            tdMicrosite: this.getManageKnowledge(this.names.tdMicrosite),
        };
    }

    static get administerSystem() {
        return {
            analytics: this.getManageKnowledge(this.names.analytics),
            configurationSettings: this.getManageKnowledge(this.names.configurationSettings),
            nofiticationsAndSubscriptions: this.getManageKnowledge(this.names.nofiticationsAndSubscriptions),
            systemMaintenanceAndTroubleshooting: this.getManageKnowledge(this.names.systemMaintenanceAndTroubleshooting),
            transferDataManager: this.getManageKnowledge(this.names.transferDataManager),
            LanguageManager: this.getManageKnowledge(this.names.LanguageManager),
            changeLogViewer: this.getManageKnowledge(this.names.changeLogViewer),
            rssFeedManager: this.getknowledgeModel(this.names.rssFeedManager),
            emailTemplateManager: this.getknowledgeModel(this.names.emailTemplateManager),
            dateConfManager: this.getknowledgeModel(this.names.dateConfManager),
            successConfManager: this.getknowledgeModel(this.names.successConfManager),
            threshholdConfManager: this.getknowledgeModel(this.names.threshholdConfManager),
        };
    }

    static get settings() {
        return {
            about: this.getManageWorkbenchFields(this.names.about),
            help: this.getManageWorkbenchFields(this.names.help),
        };
    }

    static get contentIFrame() {
        return $(by.id(this.attr.id.contentFrame), this.names.contentIFrame);
    }

    static get mainTitles() {
        return {
            adminHomePageWelcome: $(xpath(tags.b)
                .textContains(this.labels.welcomeToKnovaAdmin)
                .buildByObject(), this.labels.welcomeToKnovaAdmin),
        };
    }

    private static getknowledgeModel(name: string) {
        return $(by.cssContainingText(`.${this.attr.classes.apteanThirdLevelMenuLink}`,
            name), name);
    }

    static get knowledgeModel() {
        return {
            contentAccessLevelManager: this.getknowledgeModel(this.names.contentAccessLevelManager),
            customerDictionary: this.getknowledgeModel(this.names.customerDictionary),
            documentTaggingReport: this.getknowledgeModel(this.names.documentTaggingReport),
            universalMetadataManager: this.getknowledgeModel(this.names.universalMetadataManager),
            feedbackMetadataManager: this.getknowledgeModel(this.names.feedbackMetadataManager),
        };
    }

    static get knowledgeAuthoring() {
        return {
            workflowBuilder: this.getknowledgeModel(this.names.workflowBuilder),
            documentStyleSheetsUploader: this.getknowledgeModel(this.names.documentStyleSheetsUploader),
            knowledgeSourceManager: this.getknowledgeModel(this.names.knowledgeSourceManager),
            unifiedTemplateBuilder: this.getknowledgeModel(this.names.unifiedTemplateBuilder),
            documentTransferManager: this.getknowledgeModel(this.names.documentTransferManager),
        };
    }

    private static getAgentMicrositeFields(name: string) {
        return $(xpath(HtmlHelper.tags.a)
            .textContains(this.names.agentMicrosite)
            .parent(tags.li)
            .followingSibling(tags.div)
            .descendant(tags.ul)
            .descendant(tags.li)
            .descendant(tags.a)
            .textContains(name)
            .buildByObject(),
            name);
    }

    static get AgentMicrosite() {
        return {
            micrositeBuilder: this.getAgentMicrositeFields(this.names.micrositeBuilder),
            resolutionFlowDesigner: this.getAgentMicrositeFields(this.names.resolutionFlowDesigner),
            recommendationManager: this.getAgentMicrositeFields(this.names.recommendationManager),
            visualSearchManager: this.getAgentMicrositeFields(this.names.visualSearchManager),
        };
    }
}
