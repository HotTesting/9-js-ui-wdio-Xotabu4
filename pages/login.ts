import { BasePage } from './base';

export class LoginPage extends BasePage {
    open() {
        super.open("/login")
    }

    login(credentials: { email: string, password: string }) {
        let loginForm = $('[name="login_form"]');
        loginForm.waitForDisplayed();
        loginForm.$('[name="email"]').setValue(credentials.email);
        loginForm.$('[name="password"]').setValue(credentials.password);
        loginForm.$('button[name="login"]').click();
    }
}

export const Login = new LoginPage()