import { StepLogger } from '../../../../core/logger/step-logger';
import { AlertHelper } from '../../../components/html/alert-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { BasePageHelper } from '../base-page.helper';
import { KnowledgeCentralHomePage } from '../knowledge-central-home-page/knowledge-central-home.po';
import { User } from '../models/user.model';

import { KnowledgeCentralLoginPageConstant } from './knowledge-central-login.constants';
import { KnowledgeCentralLoginPage } from './knowledge-central-login.po';

export class KnowledgeCentralLoginPageHelper extends BasePageHelper {
    private static _instance: KnowledgeCentralLoginPageHelper;

    private constructor() {
        super();
    }

    public static getInstance(): KnowledgeCentralLoginPageHelper {
        return this._instance || (this._instance = new this());
    }

    private static async login({ username, password }: User) {
        await KnowledgeCentralLoginPage.loginForm.username.sendKeys(username);
        await KnowledgeCentralLoginPage.loginForm.password.sendKeys(password);
        await KnowledgeCentralLoginPage.loginForm.login.hoverOver();
        await KnowledgeCentralLoginPage.loginForm.login.clickButtonJs();
        await AlertHelper.acceptAlertIfExists();
        await KnowledgeCentralHomePage.hamburgerIcon.verifyDisplayedStatus();
    }

    static async enterUserNameAndPassword({ username, password }: User) {
        await KnowledgeCentralLoginPage.loginForm.username.sendKeys(username);
        await KnowledgeCentralLoginPage.loginForm.password.sendKeys(password);
    }

    static async verifyEnteredUsernameAndPassword({ username, password }: User) {
        await KnowledgeCentralLoginPage.loginForm.username.verifyTextEntered(username);
        await KnowledgeCentralLoginPage.loginForm.username.verifyTextEntered(password);
    }

    static async loginAsAdmin() {
        await this.login(CredentialsHelper.admin);
    }

    static async logout() {
        await AlertHelper.acceptAlertIfExists();
        if (await KnowledgeCentralHomePage.hamburgerIcon.item.isPresent()) {
            // sleep is necessary to let the element load properly
            await WaitHelper.sleep(PageHelper.timeout.xs);
            await KnowledgeCentralHomePage.hamburgerIcon.hoverOverAndClick();
            await KnowledgeCentralHomePage.sidebar.logout.clickButton();
        }
    }

    static async enterAndVerifyUserName(userName: string) {
        await KnowledgeCentralLoginPage.loginForm.username.sendKeys(userName);
        await KnowledgeCentralLoginPage.loginForm.username.verifyTextEntered(userName);
    }

    static async enterAndVerifyPassword(password: string) {
        await KnowledgeCentralLoginPage.loginForm.password.sendKeys(password);
        await KnowledgeCentralLoginPage.loginForm.password.verifyTextEntered(password);
    }

    static async verifyAlertMessageDisplay() {
        await ExpectationHelper.verifyAlertMessage(KnowledgeCentralLoginPageConstant.messages.loginError);
    }

    static async verifyLoginSuccessfully() {
        StepLogger.subVerification('verify Login Successfully');
        await KnowledgeCentralHomePage.hamburgerIcon.verifyDisplayedStatus();
    }

    url(): string {
        return EndpointHelper.knowledgecentral;
    }
}
