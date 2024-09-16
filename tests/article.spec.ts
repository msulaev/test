import { faker } from "@faker-js/faker";
import { DEFAULT_USER } from "../helpers/constants";
import {LoginPage} from "../pages/LoginPage";
import {EditorPage} from "../pages/EditorPage";
import {ArticlePage} from "../pages/ArticlePage";
import {expect, test} from "@playwright/test";

const ARTICLE = {
    title: faker.lorem.words(),
    description: 'Test description',
    body: 'Test body',
};
const ERROR = 'Title already exists.. ';
const ARTICLE_URL = '#/article/tot-patruus-alo';

test.describe('Article', () => {
    test.beforeEach(async ({page}) => {
        let loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
        await expect(loginPage.navigation).toContainText(DEFAULT_USER.name);
    });

    test('User could publish article', async ({page}) => {
        let editorPage = new EditorPage(page);
        let articlePage = new ArticlePage(page);
        await editorPage.clickOnNewArticle();
        await editorPage.createArticle(ARTICLE.title, ARTICLE.description, ARTICLE.body);
        await editorPage.clickOnPublish();
        await expect(articlePage.article).toHaveText(ARTICLE.title);
    });

    test('User could not publish article with existing title', async ({page}) => {
        let editorPage = new EditorPage(page);
        await editorPage.clickOnNewArticle();
        await editorPage.createArticle('test', ARTICLE.description, ARTICLE.body);
        await editorPage.clickOnPublish();
        await expect(editorPage.errorMsg).toHaveText(ERROR);
    });

    test('User could not publish article with empty fields', async ({page}) => {
        let editorPage = new EditorPage(page);
        await editorPage.clickOnNewArticle();
        await editorPage.clickOnPublish();
        await expect(editorPage.titleInp).toBeVisible();
    });

    test('User could add comment', async ({page}) => {
        let articlePage = new ArticlePage(page);
        let msg = faker.lorem.words();
        await articlePage.visitUrl(ARTICLE_URL);
        await articlePage.writeCommentAndPost(msg);
        await expect(page.getByText(msg, {exact: true})).toHaveText(msg);
    });

    test('User could delete comment', async ({page}) => {
        let articlePage = new ArticlePage(page);
        await articlePage.visitUrl('#/article/alter-test');
        await articlePage.writeCommentAndPost('test_delete');
        await articlePage.deleteComment();
        await expect(articlePage.cards).toHaveCount(1);

    });
});