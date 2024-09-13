import {expect, Page, test} from "@playwright/test";
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {
    private readonly loginBtn = this.page.getByRole('button', { name: 'Login' });
    private readonly emailInp = this.page.locator('[name="email"]');
    private readonly passwordTnp = this.page.locator('[name="password"]');
    private readonly navigation = this.page.getByRole('navigation');


    constructor(page: Page) {
        super(page, '#/login')
    }

    public async login(email: string, password: string) {
        await test.step(`Login in with email ${email} and password ${password}`, async () => {
            await this.emailInp.fill(email)
            await this.passwordTnp.fill(password)
            await this.loginBtn.click()
        })
    }

    public async shouldBeEquals(expected: string) {
        await expect(this.navigation).toContainText(expected);
    }
}