export class AdminLoginPageConstant {

    static get elementNames() {
        return {
            username: 'Username',
            password: 'Password',
            login: 'Login',
        };
    }

    static get attributes() {
        return {
            id: {
                username: 'username',
                password: 'password',
                login: 'loginID',
            },
        };
    }

    static get messages() {
        return {
            loginError: 'Login Error! Ensure your user name and password are correct and try again.',
        };
    }
}
