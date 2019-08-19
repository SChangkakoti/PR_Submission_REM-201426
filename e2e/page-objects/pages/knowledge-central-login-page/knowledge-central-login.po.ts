import { by } from 'protractor';

import { $ } from '../../../components/misc-utils/df-elements-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { BasePageHelper } from '../base-page.helper';

import { KnowledgeCentralLoginPageConstant } from './knowledge-central-login.constants';

export class KnowledgeCentralLoginPage extends BasePageHelper {
    private static readonly names = KnowledgeCentralLoginPageConstant.elementNames;
    private static readonly attr = KnowledgeCentralLoginPageConstant.attributes;

    static get loginForm() {
        return {
            username: $(by.id(this.attr.id.username), this.names.username),
            password: $(by.id(this.attr.id.password), this.names.password),
            login: $(by.id(this.attr.id.login), this.names.login),
        };
    }

    url(): string {
        return EndpointHelper.knowledgecentral;
    }
}
