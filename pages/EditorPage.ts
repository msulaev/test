import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {step} from "../helpers/allure";

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

    @step('Create article with title: {0}, description: {1} and body: {2}')
    public async createArticle(title: string, description: string, body: string) {
        await this.titleInp.fill(title);
        await this.descriptionInp.fill(description);
        await this.bodyInp.fill(body);
    }

    @step('Click on New Article')
    public async clickOnNewArticle() {
        await this.newArticle.click();
    }

    @step('Click on Publish')
    public async clickOnPublish() {
        await this.publishBtn.click();
    }

}