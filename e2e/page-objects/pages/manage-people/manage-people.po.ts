import { by } from 'protractor';

import { Constants } from '../../../components/misc-utils/constants';
import { $ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';
import { xpath } from '../../../components/misc-utils/xpath-builder';

import { ManagePeopleConstant } from './manage-people.constant';

const attr = ManagePeopleConstant.attributes;
const { attributes, tags } = HtmlHelper;
export class ManagePeoplePage {

    static get managePeopleSubmenuOptions() {
        const menu = ManagePeopleConstant.managePeopleSubmenuOptions;
        return {
            agentLevelManager: $(by.linkText(menu.agentLevelManager), menu.agentLevelManager),
            enterpriseReputationLevelManager: $(by.linkText(menu.enterpriseReputationLevelManager), menu.enterpriseReputationLevelManager),
            groupCreator: $(by.linkText(ManagePeopleConstant.managePeopleSubmenuOptions.groupCreator),
                ManagePeopleConstant.managePeopleSubmenuOptions.groupCreator),
            userAndGroupFinder: $(by.linkText(menu.userAndGroupFinder), menu.userAndGroupFinder),
            roleManagerKkc: $(by.partialLinkText(menu.roleManagerKkcSufix), menu.roleManagerKkcSufix),
            roleManagerKss: $(by.partialLinkText(menu.roleManagerKssSufix), menu.roleManagerKssSufix),
            userCreator: $(by.linkText(menu.userCreator), menu.userCreator),
        };
    }

    static get titles() {
        const title = ManagePeopleConstant.titles;
        return {
            roleManagerKkc: $(by.css(`.${attr.class.roleManagerKkc}`), title.roleManagerKkc),
            selectUsers: $(by.cssContainingText(HtmlHelper.tags.span, ManagePeopleConstant.titles.selectUsers), ManagePeopleConstant.titles.selectUsers),
            agentLevelManager: $(by.cssContainingText(HtmlHelper.tags.span, ManagePeopleConstant.titles.agentLevelManager), title.agentLevelManager),
            roleNameRequired: $(by.cssContainingText(HtmlHelper.tags.span, ManagePeopleConstant.titles.roleNameRequired), title.roleNameRequired),
            doYouWantToSave: $(by.cssContainingText(HtmlHelper.tags.td, ManagePeopleConstant.titles.doYouWantToSave), title.doYouWantToSave),
            descriptionRequired: $(by.cssContainingText(HtmlHelper.tags.span, ManagePeopleConstant.titles.descriptionRequired), title.descriptionRequired),
            permissionRequired: $(by.cssContainingText(HtmlHelper.tags.span, ManagePeopleConstant.titles.permissionRequired), title.permissionRequired),
            groupCreator: $(by.css('.aptean_pop_hd_text'), ManagePeopleConstant.titles.groupCreator),
            userGroupFinder: $(by.css('.pop_hd_text'), ManagePeopleConstant.managePeopleSubmenuOptions.userAndGroupFinder),
            titleValidation(titleVal: string) {
                return $(by.cssContainingText('#ui-id-1', titleVal), titleVal);
            },
        };
    }

    static get rolesTable() {
        return $(by.css(`.${attr.class.rolesTable}`), ManagePeopleConstant.rolesTable);
    }

    static get newRoleButton() {
        return $(by.id(attr.id.newRoleButton), ManagePeopleConstant.newRoleButton);
    }

    static get selectUsersForm() {
        return {
            showAllButton: $(by.id(attr.id.showAllButton), ManagePeopleConstant.selectUsersForm.showAllButton),
            user(user: string) {
                return $(xpath(HtmlHelper.tags.a)
                    .textContains(user)
                    .parent(HtmlHelper.tags.div)
                    .parent(HtmlHelper.tags.td)
                    .precendingSibling(HtmlHelper.tags.td)
                    .descendant(HtmlHelper.tags.input)
                    .buildByObject(), user);
            },
            userSelected(user: string) {
                return $(xpath(tags.div)
                    .textContains(user)
                    .parent(tags.td)
                    .precendingSibling(tags.td)
                    .descendant(tags.a)
                    .buildByObject(), user);
            },
            username: $(by.id(attr.id.username), ManagePeopleConstant.selectUsersForm.username),
            okButton: $(by.id(attr.id.submitBtn), ManagePeopleConstant.selectUsersForm.okButton),
            availableUsers: $(xpath(tags.a).buildByObject(), ManagePeopleConstant.selectUsersForm.availableUsers),
        };
    }

    static get manageRolesForm() {
        const form = ManagePeopleConstant.manageRolesForm;
        return {
            employeeApplications: $(by.css(`input[value="${attr.value.ksc}"]`), form.employeeApplications),
            customerApplications: $(by.css(`input[value="${attr.value.kss}"]`), form.customerApplications),
            title: $(xpath(HtmlHelper.tags.div)
                .contains('class', 'ui-dialog-titlebar')
                .descendant(HtmlHelper.tags.span)
                .text(form.title)
                .buildByObject(), form.title),
            roleDescription: $(by.css(`textarea[name="${attr.name.description}"]`), form.description),
            roleName: $(by.css(`input[name="${attr.name.name}"]`), form.name),
            availablePermissions(permission: string) {
                return $(xpath(HtmlHelper.tags.select)
                    .contains('name', 'availPerms')
                    .descendant(HtmlHelper.tags.option)
                    .textContains(permission)
                    .buildByObject(), permission);
            },
            selectedPermissions(permission: string) {
                return $(xpath(HtmlHelper.tags.select)
                    .where('name', attr.name.selectedPermissions)
                    .descendant(HtmlHelper.tags.option)
                    .textContains(permission)
                    .buildByObject(), permission);
            },
            pushRightIcon: $(by.id(attr.id.pushRightIcon), form.pushrightIcon),
            pushLeftIcon: $(by.id(attr.id.pushLeftIcon), form.pushLeftIcon),
            submitButton: $(by.id(attr.id.submitButton), form.submitButton),
            selectButton: $(by.id(attr.id.selectButton), form.selectButton),
            cancelButton: $(by.id(attr.id.cancelButton), form.cancelButton),
            memberCount: $(by.id(attr.id.memberCount),
                ManagePeopleConstant.groupCreatorForm.labels.members),
        };
    }

    static get okButton() {
        return $(by.css('button[name="btn1"]'), ManagePeopleConstant.okButton);
    }

    static get yesButton() {
        return $(by.css('button[value="Yes"]'), ManagePeopleConstant.okButton);
    }

    static get noButton() {
        return $(by.css('button[name="btn2"]'), ManagePeopleConstant.noButton);
    }

    static get groupCreatorForm() {
        const labels = ManagePeopleConstant.groupCreatorForm;
        return {
            buttons: {
                submit: $(by.id('submitID'), labels.buttons.submit),
                cancel: $(by.id('cancelID'), labels.buttons.cancel),
                owner: $(by.id('ownerID'), labels.buttons.owner),
                supervisor: $(by.id('supervisorID'), labels.buttons.supervisor),
                members: $(by.id('memberID'), labels.buttons.members),
                expertiseProfile: $(by.id('expertiseProfileID'), labels.buttons.expertiseProfile),
                accessLevel: $(by.id('accesslevelID'), labels.buttons.accessLevels),
                languages: $(by.id('languageID'), labels.buttons.languages),
                unifiedTemplates: $(by.id('utID'), labels.buttons.unifiedTemplates),
                universalMetadata: $(by.id('umID'), labels.buttons.universalMetadata),
                imagesDirectory: $(by.id('image'), labels.buttons.imagesDirectory),
                mediaDirectory: $(by.id('media'), labels.buttons.mediasDirectory),
                okButton: $(by.id('okID'), labels.buttons.ok),
                okUsersButton: $(by.id('submitBtn'), labels.buttons.ok),
                cancelUsersButton: $(by.id('cancelBtn'), labels.buttons.cancel),
                radioExpertiseLevel(position: string) {
                    return $(by.xpath(`(//input[@name="${labels.labels.experienceLevel}"])[${position}]`),
                        labels.labels.experienceLevel);
                },
                radioSkillLevel(level: string) {
                    return $(by.xpath(`//input[@name="level"][@value="${level}"]`),
                        labels.labels.skillLevel);
                },
                addMetadataButton: $(by.xpath(`//input[@value="${labels.addMetadata}"]`), labels.addMetadata),
                selectMetadataButton: $(by
                    .xpath(`//${tags.input}[@type="button"][contains(@onclick,"Select Universal Metadata")]`),
                    ManagePeopleConstant.titles.selectUniversalMetadata),
                submitDialog: $(by.id('submitDialogID'), labels.buttons.ok),
            },
            textElement: {
                groupName: $(by.css(`${tags.input}[${attributes.name}="name"]`), labels.textElements.groupName),
                description: $(by.css(`${tags.textArea}[${attributes.name}="desc"]`), labels.textElements.description),
                skill: $(by.css(`${tags.input}[${attributes.name}="skill1"`), labels.textElements.skills),
            },
            dialogBox: {
                owner: $(by.id('ui-id-1'), labels.buttons.owner),
                members: $(by.id('ui-id-1'), labels.buttons.members),
                usersTable: $(by.className('aptean-table'), labels.usersTable),
                adminCheckbox: this.getUserCheckbox(labels.adminUserCheckboxValue),
                adminSelectedOwner(username: string) {
                    return $(by.cssContainingText(`#${labels.labels.owner}`, username), labels.labels.owner);
                },
                adminSelectedSupervisor(username: string) {
                    return $(by.cssContainingText(`#${labels.labels.supervisor}`, username), labels.labels.supervisor);
                },
                amountSelectedMembers(amount: string) {
                    return $(by.cssContainingText(`#${labels.labels.members}`, amount), labels.labels.members);
                },
                metaDataProduct(index: number) {
                    return $(by.xpath(`(//div[contains(@id,"${labels.productMetadata}")])[${index}]`),
                        labels.productMetadata);
                },
                adminSelectedAccessLevel(accessLevel: string) {
                    return $(by.cssContainingText(`#${labels.labels.accessLevel}`, accessLevel),
                        labels.labels.accessLevel);
                },
                adminSelectedLanguage(language: string) {
                    return $(by.cssContainingText(`#${labels.labels.language}`, language),
                        labels.labels.language);
                },
                adminSelectedTemplate(template: string) {
                    return $(by.cssContainingText(`#${labels.labels.unifiedTemplate}`, template),
                        labels.labels.unifiedTemplate);
                },
                adminSelectedMetadata(metadata: string) {
                    return $(by.cssContainingText(`#${labels.labels.metadata}`, metadata),
                        labels.labels.metadata);
                },
                selectedMetadata: $(by.id('selectedMetadata'), labels.addMetadata),
                okAddExperience: $(by.css(`${tags.input}[${attributes.value}="OK"]`), labels.buttons.ok),
                submitButton: $(by.id('submitButton'), labels.buttons.submit),
                get firstRadioButton() {
                    return $(xpath(tags.input)
                        .where('name', labels.buttons.radioButton)
                        .nthChild(Constants.number.one)
                        .buildByObject(), labels.buttons.radioButton);
                },
                get firstRadioButtonLabel() {
                    return $(xpath(tags.input)
                        .where('name', labels.buttons.radioButton)
                        .nthChild(Constants.number.one)
                        .parent(tags.td)
                        .followingSibling(tags.td)
                        .descendant(tags.a)
                        .buildByObject(), labels.buttons.radioButton);
                },
            },
            tableDialogBox: {
                metaDataProduct(product: string) {
                    return $(by.xpath(`//${tags.a}[contains(text(),"${product}")]`), labels.labels.addedMetadata);
                },
            },
        };
    }

    static get dropDowns() {
        const labels = ManagePeopleConstant.groupCreatorForm;
        return {
            reputationLevelDd: $(by.css(`${tags.select}[${attributes.name}=${labels.reputationLevelDd}]`),
                labels.reputationLevel
            ),
        };
    }

    static getReputationLevelOption(reputationLevel: string) {
        const labels = ManagePeopleConstant.groupCreatorForm;
        return $(by.cssContainingText(`${tags.select}[${attributes.name}=${labels.reputationLevelDd}] ${tags.option}`,
            reputationLevel), reputationLevel);
    }

    static getDeleteIconByRoleName(role: string) {
        return $(xpath(HtmlHelper.tags.a)
            .textContains(role)
            .parent(HtmlHelper.tags.td)
            .parent(HtmlHelper.tags.tr)
            .descendant(HtmlHelper.tags.td)
            .descendant(HtmlHelper.tags.a)
            .contains('onclick', ManagePeopleConstant.attributes.value.deleteRole)
            .buildByObject(), role);
    }

    static get agentLevelManagerForm() {
        const form = ManagePeopleConstant.agentLevelManagerForm;
        return {
            newAgentLevelButton: $(by.id(attr.id.newAgentLevelButton), form.newAgentLevelButton),
            cancelButton: $(by.id(attr.id.cancelButtonAgentDetailForm), form.cancelButton),
            saveButton: $(by.id(attr.id.saveButtonAgentDetailForm), form.saveButton),
            languageField(language: string) {
                return $(by.cssContainingText(HtmlHelper.tags.td, language), language);
            },
            nameTextbox: $(xpath(HtmlHelper.tags.input)
                .where('name', 'name')
                .contains('type', 'text')
                .buildByObject(), form.nameTextbox),
            getAgentDeleteIconByName(name: string) {
                return $(xpath(HtmlHelper.tags.a)
                    .text(name)
                    .parent(HtmlHelper.tags.td)
                    .followingSibling(HtmlHelper.tags.td)
                    .descendant(HtmlHelper.tags.a)
                    .buildByObject(), name);
            },
        };
    }

    static getAgentLevelLinkByName(agentLevelName: string) {
        return $(by.cssContainingText(HtmlHelper.tags.a, agentLevelName), agentLevelName);
    }

    private static getUserCheckbox(value: string) {
        return $(by.xpath(`//input[@name="radiobutton" and @value="${value}"]`),
            ManagePeopleConstant.groupCreatorForm.userchk);
    }

    static get userGroupFinderForm() {
        const form = ManagePeopleConstant.userGroupFinderForm;
        return {
            findUsers: this.getLanguageBoldLabel(form.labels.findUsers),
            findGroups: this.getLanguageBoldLabel(form.labels.findGroups),
            groupName: $(by.id('groupname'), ManagePeopleConstant.groupCreatorForm.textElements.groupName),
            searchIconGroup: $(by.xpath(`(//${HtmlHelper.tags.input}[@${HtmlHelper.attributes.id}="Image2"])[2]`), form.labels.search),
            searchIconUser: $(by.xpath(`(//${HtmlHelper.tags.input}[@${HtmlHelper.attributes.id}="Image2"])[1]`), form.labels.search),
        };
    }

    private static getLanguageBoldLabel(name: string) {
        const attrs = ManagePeopleConstant.userGroupFinderForm;
        return $(xpath(HtmlHelper.tags.td)
            .where(HtmlHelper.attributes.class, attrs.classes.apteanBodyBold)
            .textContains(name)
            .buildByObject(), name);
    }

    static getGroup(groupName: string) {
        const attrs = ManagePeopleConstant.userGroupFinderForm;
        return $(xpath(HtmlHelper.tags.div)
            .where(HtmlHelper.attributes.class, attrs.classes.apteanBody)
            .descendant(HtmlHelper.tags.a)
            .textContains(groupName)
            .buildByObject(), groupName);
    }

    static getSelectedUserByText(text: string) {
        return $(xpath(HtmlHelper.tags.div)
            .textContains(text)
            .buildByObject(), text);
    }

    static get popUps() {
        const popUps = ManagePeopleConstant.popUps;
        return {
            titles: {
                selectAccessLevels: $(by.id('ui-id-1'), popUps.titles.selectAccessLevels),
            },
            buttons: {
                add: $(by.id('addButonDiv'), popUps.buttons.add),
                remove: $(by
                    .xpath(`//input[@type="button"][@value="${popUps.buttons.remove}"]`), popUps.buttons.remove
                ),
                ok: $(by.id('submitDialogID'), popUps.buttons.ok),
                cancel: $(by.id('cancelFrameID'), popUps.buttons.cancel),
                addPopUp: $(by.id('addID'), popUps.buttons.add),
                removePopUp: $(by.id('removeID'), popUps.buttons.remove),
                browse: $(by.id('browseId'), popUps.buttons.browse),
                okId: $(by.id('okId'), popUps.buttons.ok),
            },
            publicAccessLevel: $(by.id('nameSAL_Public'), ManagePeopleConstant.labels.publicAccessLevel),
            accessLevelSelected(accessLevel: string) {
                return $(by.xpath(`//option[contains(@value,"SAL_${accessLevel}")]`), accessLevel);
            },
            languagePopUp: {
                availableLanguage(language: string) {
                    return $(by
                        .xpath(`//parent::select[contains(@name,"available")]//option[contains(@value,"LA_")][contains(text(),"${language}")]`)
                        , language);
                },
                includedLanguage(language: string) {
                    return $(by
                        .xpath(`//parent::select[contains(@name,"included")]//option[contains(@value,"LA_")][contains(text(),"${language}")]`)
                        , language);
                },
            },
            unifiedTemplatesPopUp: {
                availableTemplates(template: string) {
                    return $(by
                        .xpath(`//select[contains(@name,"available")]//option[contains(text(),"${template}")]`),
                        template);
                },
                includedTemplates(template: string) {
                    return $(by
                        .xpath(`//select[contains(@name,"included")]//option[contains(text(),"${template}")]`)
                        , template);
                },
                includedTemplatesDropdown: $(by.name('included'),
                    popUps.languagePopUp.included),
            },
            metadataPopUp: {
                toSelectMetadata(name: string) {
                    return $(by
                        .xpath(`(//div[contains(text(),"${name}")]//parent::div[contains(@id,"wrapper_SG")])[1]`)
                        , name);
                },
                selectedMetadata(name: string) {
                    return $(by
                        .xpath(`(//option[contains(@value,"SG_")][contains(text(),"${name}")])[1]`), name);
                },
                addButton: $(by.css(`input[value=${ManagePeopleConstant.popUps.buttons.add}`),
                    ManagePeopleConstant.popUps.buttons.add),
            },
            directoryPopUp: {
                selectedPath(name: string) {
                    return $(by
                        .xpath(`//tr[@class="table_data_row1"]//child::td[contains(text(),"${name}")]`), name);
                },
            },
        };
    }

    static errorMessages() {
        return {
            noGroupName: $(by.cssContainingText(tags.span, ManagePeopleConstant.errorMessages.noGroupName),
                ManagePeopleConstant.errorMessages.noGroupName),
        };
    }

    static get externalBrowser() {
        return {
            sharedFolder: $(by.id('isc_UITreeGrid_0_valueCell0'), ManagePeopleConstant.titles.folder),
            okButton: $(by.id('isc_B'), ManagePeopleConstant.okButton),
        };
    }
}
