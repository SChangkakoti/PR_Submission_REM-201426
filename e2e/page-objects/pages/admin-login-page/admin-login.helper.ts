import { AlertHelper } from '../../../components/html/alert-helper';
import { PageHelper } from '../../../components/html/page-helper';
import { WaitHelper } from '../../../components/html/wait-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { EndpointHelper } from '../../../components/misc-utils/endpoint-helper';
import { AdminHomePage } from '../admin-home-page/admin-home.po';
import { BasePageHelper } from '../base-page.helper';
import { User } from '../models/user.model';

import { AdminLoginPage } from './admin-login.po';

export class AdminLoginPageHelper extends BasePageHelper {

    private static _instance: AdminLoginPageHelper;

    private constructor() {
        super();
    }

    public static getInstance(): AdminLoginPageHelper {
        return this._instance || (this._instance = new this());
    }

    private static async login({ username, password }: User) {
        await AdminLoginPage.loginForm.username.sendKeys(username);
        await AdminLoginPage.loginForm.password.sendKeys(password);
        await AdminLoginPage.loginForm.login.hoverOver();
        await AdminLoginPage.loginForm.login.clickButtonJs();
        await AlertHelper.acceptAlertIfExists();
        await AdminHomePage.hamburgerIcon.verifyDisplayedStatus();
    }

    static async enterUserNameAndPassword({ username, password }: User) {
        await AdminLoginPage.loginForm.username.sendKeys(username);
        await AdminLoginPage.loginForm.password.sendKeys(password);
    }

    static async verifyEnteredUsernameAndPassword({ username, password }: User) {
        await AdminLoginPage.loginForm.username.verifyTextEntered(username);
        await AdminLoginPage.loginForm.username.verifyTextEntered(password);
    }

    static async enterAndVerifyUserName(userName: string) {
        await AdminLoginPage.loginForm.username.sendKeys(userName);
        await AdminLoginPage.loginForm.username.verifyTextEntered(userName);
    }

     static async enterAndVerifyPassword(password: string) {
        await AdminLoginPage.loginForm.password.sendKeys(password);
        await AdminLoginPage.loginForm.password.verifyTextEntered(password);
    }

    static async loginAsAdmin() {
        await this.login(CredentialsHelper.admin);
    }

    static async logout(switchToDefaultContent: boolean = false) {
        if (switchToDefaultContent) {
            await PageHelper.switchToDefaultContent();
        }

        await AlertHelper.acceptAlertIfExists();
        if (await AdminHomePage.hamburgerIcon.item.isPresent()) {
            await AdminHomePage.hamburgerIcon.hoverOverAndClick();
            await WaitHelper.sleep(PageHelper.timeout.xs);
            await AdminHomePage.sidebar.logout.clickButton();
        }
    }

    static async verifyUserNotLogged() {
        await AdminLoginPage.loginForm.login.verifyPresentStatus();
    }

    url(): string {
        return EndpointHelper.administrator;
    }
}
