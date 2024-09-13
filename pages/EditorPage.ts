import {BasePage} from "./BasePage";
import {expect, Page} from "@playwright/test";

export class EditorPage extends BasePage {
    private readonly newArticle = this.page.locator('a[href="#/editor"]');
    private readonly titleInp = this.page.locator('[name="title"]');
    private readonly descriptionInp = this.page.getByPlaceholder('What\'s this article about?');
    private readonly bodyInp = this.page.locator('[name="body"]');
    private readonly publishBtn = this.page.getByRole('button', {name: 'Publish Article'});
    private readonly errorMsg = this.page.locator('.error-messages');
    constructor(page: Page) {
        super(page, '#/editor')
    }

    public async createArticle(title: string, description: string, body: string) {
        await this.titleInp.fill(title);
        await this.descriptionInp.fill(description);
        await this.bodyInp.fill(body);
    }

    public async clickOnNewArticle() {
        await this.newArticle.click();
    }

    public async clickOnPublish() {
        await this.publishBtn.click();
    }

    public async titleShouldBeVisible() {
        await expect(this.titleInp).toBeVisible();
    }

    public async shouldHaveError(expected: string) {
        await expect(this.errorMsg).toHaveText(expected);
    }
}