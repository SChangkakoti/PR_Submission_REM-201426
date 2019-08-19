import { by } from 'protractor';

import { $ } from '../../../components/misc-utils/df-elements-helper';

import { AdminLoginPageConstant } from './admin-login.constants';

export class AdminLoginPage {
    private static readonly names = AdminLoginPageConstant.elementNames;
    private static readonly attr = AdminLoginPageConstant.attributes;

    static get loginForm() {
        return {
            username: $(by.id(this.attr.id.username), this.names.username),
            password: $(by.id(this.attr.id.password), this.names.password),
            login: $(by.id(this.attr.id.login), this.names.login),
        };
    }
}
