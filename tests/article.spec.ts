import { faker } from "@faker-js/faker";
import { DEFAULT_USER } from "../helpers/constants";
import {expect, test} from "@playwright/test";
import {PageManager} from "../pages/PageManager";

const ARTICLE = {
    title: faker.lorem.words(),
    description: 'Test description',
    body: 'Test body',
};
const ERROR = 'Title already exists.. ';
const ARTICLE_URL = '#/article/tot-patruus-alo';

test.describe('Article', () => {
    test.beforeEach(async ({page}) => {
        let pm = new PageManager(page);
        await pm.loginPage.visit();
        await pm.loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
        await expect(pm.loginPage.navigation).toContainText(DEFAULT_USER.name);
    });

    test('User could publish article', async ({page}) => {
        let pm = new PageManager(page);
        await pm.editorPage.clickOnNewArticle();
        await pm.editorPage.createArticle(ARTICLE.title, ARTICLE.description, ARTICLE.body);
        await pm.editorPage.clickOnPublish();
        await expect(pm.articlePage.article).toHaveText(ARTICLE.title);
    });

    test('User could not publish article with existing title', async ({page}) => {
        let pm = new PageManager(page);
        await pm.editorPage.clickOnNewArticle();
        await pm.editorPage.createArticle('test', ARTICLE.description, ARTICLE.body);
        await pm.editorPage.clickOnPublish();
        await expect(pm.editorPage.errorMsg).toHaveText(ERROR);
    });

    test('User could not publish article with empty fields', async ({page}) => {
        let pm = new PageManager(page);
        await pm.editorPage.clickOnNewArticle();
        await pm.editorPage.clickOnPublish();
        await expect(pm.editorPage.titleInp).toBeVisible();
    });

    test('User could add comment', async ({page}) => {
        let pm = new PageManager(page);
        let msg = faker.lorem.words();
        await pm.articlePage.visitUrl(ARTICLE_URL);
        await pm.articlePage.writeCommentAndPost(msg);
        await expect(page.getByText(msg, {exact: true})).toHaveText(msg);
    });

    test('User could delete comment', async ({page}) => {
        let pm = new PageManager(page);
        await pm.articlePage.visitUrl('#/article/alter-test');
        await pm.articlePage.writeCommentAndPost('test_delete');
        await pm.articlePage.deleteComment();
        await expect(pm.articlePage.cards).toHaveCount(1);
    });
});