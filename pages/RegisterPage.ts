import {Page, test} from "@playwright/test";
import {BasePage} from "./BasePage";
import {step} from "../helpers/allure";

export class RegisterPage extends BasePage {
    private readonly registerBtn = this.page.getByRole('button', { name: 'Sign Up' });
    private readonly usernameInp = this.page.locator('[name="username"]');
    private readonly emailInp = this.page.locator('[name="email"]');
    private readonly passwordTnp = this.page.locator('[name="password"]');
    public readonly preview = this.page.locator('.article-preview');


    constructor(page: Page) {
        super(page, '#/register')
    }

    @step('Register  user with Email: {0} and Password: {1} and Username: {2}')
    public async registerUser(email: string, password: string, username: string) {
        await test.step(`Register in with email ${email} and password ${password}`, async () => {
            await this.emailInp.fill(email)
            await this.passwordTnp.fill(password)
            await this.usernameInp.fill(username)
            await this.registerBtn.click()
        })
    }
}