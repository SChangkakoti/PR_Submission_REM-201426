import { browser } from 'protractor';

import { User } from '../../page-objects/pages/models/user.model';

export class CredentialsHelper {
    private static readonly users = browser.params.users;

    static get admin(): User {
        return Object.freeze({username: this.users.admin.username,
            password: this.users.admin.password,
        });
    }
}
