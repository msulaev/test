import {Page, test} from "@playwright/test";
import {BasePage} from "./BasePage";
import {step} from "../helpers/allure";

export class LoginPage extends BasePage {
    private readonly loginBtn = this.page.getByRole('button', { name: 'Login' });
    private readonly emailInp = this.page.locator('[name="email"]');
    private readonly passwordInp = this.page.locator('[name="password"]');
    public readonly navigation = this.page.getByRole('navigation');


    constructor(page: Page) {
        super(page, '#/login')
    }


    @step('Login in user with {0} and {1}')
    public async login(email: string, password: string) {
            await this.emailInp.fill(email)
            await this.passwordInp.fill(password)
            await this.loginBtn.click()
    }
}