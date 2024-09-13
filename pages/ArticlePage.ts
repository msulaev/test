import {expect, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ArticlePage extends BasePage {
    private readonly article = this.page.locator('.container h1');
    private readonly writeComment = this.page.getByPlaceholder("Write a comment...");
    private readonly postComment = this.page.getByRole("button", {name: "Post Comment"});
    private readonly deleteCommentBtn = this.page.locator('.btn-outline-secondary');
    private readonly cards = this.page.locator('.card-block');
    constructor(page: Page, url?: string) {
        super(page, url)
    }

    public async shouldHaveTitle(expected: string) {
        await expect(this.article).toHaveText(expected);
    }

    public async writeCommentAndPost(comment: string) {
        await this.writeComment.fill(comment);
        await this.postComment.click();
    }

    public async shouldHaveComment(expected: string) {
        await expect(this.page.getByText(expected, {exact: true})).toHaveText(expected);
    }

    public async deleteComment() {
        this.page.on('dialog', dialog => {
            dialog.accept();
            }
        );
        await this.deleteCommentBtn.click();
        await expect(this.cards).toHaveCount(1);
    }
}