import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";

export class EditorPage extends BasePage {
    private readonly newArticle = this.page.locator('a[href="#/editor"]');
    public readonly titleInp = this.page.locator('[name="title"]');
    private readonly descriptionInp = this.page.getByPlaceholder('What\'s this article about?');
    private readonly bodyInp = this.page.locator('[name="body"]');
    private readonly publishBtn = this.page.getByRole('button', {name: 'Publish Article'});
    public readonly errorMsg = this.page.locator('.error-messages');
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

}