import {expect, Page, test} from "@playwright/test";
import {step} from "../helpers/allure";

export abstract class BasePage {
    protected constructor(
        protected page: Page,
        protected url?: string
    ) {
    }

    public async visit() {
        await test.step(`going to '${this.constructor.name}' by url ${this.url}`, async () => {
            await this.page.goto(this.url, {waitUntil: 'networkidle'})
        })
    }

    public async visitUrl(url: string) {
        await test.step(`going to '${this.constructor.name}' by url ${url}`, async () => {
            await this.page.goto(url, {waitUntil: 'networkidle'})
        })
    }

    public async shouldBeOpened() {
        await test.step(`Checking that ${this.constructor.name} opened with url ${this.url}`, async () => {
            await expect(this.page).toHaveURL(this.url)
        })
    }
}