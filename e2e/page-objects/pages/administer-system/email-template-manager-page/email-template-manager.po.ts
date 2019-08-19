import { by } from 'protractor';

import { $ } from '../../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../../components/misc-utils/html-helper';

import { EmailTemplateManagerPageConstant } from './email-template-manager.constants';

export class EmailTemplateManagerPage {
    private static readonly ids = EmailTemplateManagerPageConstant.ids;
    private static readonly names = EmailTemplateManagerPageConstant.elementNames;
    private static readonly title = EmailTemplateManagerPageConstant.titles;
    private static readonly tags = HtmlHelper.tags;
    private static readonly attribs = HtmlHelper.attributes;
    private static readonly classes = EmailTemplateManagerPageConstant.classes;
    private static readonly btns = EmailTemplateManagerPageConstant.buttons;

    static get contentIFrame() {
        return $(by.id(this.ids.contentFrame), this.names.contentFrame);
    }

    static get titles() {
        return {
            pageTitle: $(by.css(`${this.tags.span}.${this.classes.title}`), this.names.title),
            errorMsg(msg: string) {
                return $(by.cssContainingText('span[id="text"]', msg), msg);
            },
        };
    }

    static get buttons() {
        return {
            createTemplate: $(by.css(`input[${this.attribs.value}="${this.btns.createTemplate}"]`), this.btns.createTemplate),
            submit: $(by.id('submitID'), this.btns.submit),
            alertOK: $(by.css(`${this.tags.input}[${this.attribs.value}="${this.btns.ok}"]`), this.btns.ok),
            cancel: $(by.id('cancelID'), this.btns.cancel),
        };
    }

    static get popUp() {
        return {
            emailTemplateProperties: $(by
                .cssContainingText(`${this.tags.span}[${this.attribs.class}="${this.classes.windowDialogTitle}"]`,
                    this.title.emailTemplateProperties
                ),
                this.title.emailTemplateProperties
            ),
            element: {
                templateTypeDropDown: {
                    templateTypeDd: $(by.css(`${this.tags.select}[${this.attribs.name}="type"]`),
                        this.names.templateTypeDd
                    ),
                    templateTypeDdOptions: $(by
                        .css(`${this.tags.select}[${this.attribs.name}="type"] ${this.tags.option}`),
                            this.names.templateTypeDd
                        ),
                },
                languageDropDown: {
                    languageDd: $(by.css(`${this.tags.select}[${this.attribs.name}="language"]`),
                        this.names.languageDd
                    ),
                    languageDdOptions: $(by
                        .css(`${this.tags.select}[${this.attribs.name}="language"] ${this.tags.option}`),
                            this.names.languageDd
                        ),
                },
                subjectTextBox: $(by.css(`${this.tags.input}[${this.attribs.name}="subject"]`),
                    this.names.subjectTextBox
                ),
                bodyContentsTextarea: $(by.css(`${this.tags.textArea}[${this.attribs.name}="content"]`),
                    this.names.bodyContentsTextarea
                ),
            },
        };
    }

    static getTemplatesTableElement(subject: string) {
        return $(by.xpath(`//table[@class='aptean-table']//tbody/tr/td/a[contains(text(),"${subject}")]`), subject);
    }

    static getDeleteButtonTemplateBySubject(subject: string) {
        return $(by
            .xpath(`//table[@class='aptean-table']//a[contains(text(),"${subject}")]//parent::td//following-sibling::td/a`),
            subject
        );
    }

    static getTemplatesTableElementByLanguage(subject: string, language: string) {
        return $(by
            .xpath(`//a[contains(text(),"${subject}")]//parent::td//preceding-sibling::td[contains(text(),"${language}")]`),
            subject
        );
    }

    static getTemplatesTableElementByTemplateType(subject: string,
                                                  language: string,
                                                  templateType: string
    ) {
        return $(by
            .xpath(`//td[contains(text(),"${templateType}")]//following-sibling::td[text()="${language}"]//following-sibling::td/a[text()="${subject}"]`),
            subject
        );
    }

    static getDeleteButtonTemplateBySubjectAndLanguage(subject: string, language: string) {
        return $(by
            .xpath(`//td[contains(text(),"${language}")]//following-sibling::td//a[contains(text(),"${subject}")]//parent::td//following-sibling::td/a`),
            subject
        );
    }
}
