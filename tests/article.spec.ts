import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {EditorPage} from "../pages/EditorPage";
import {ArticlePage} from "../pages/ArticlePage";
import {faker} from "@faker-js/faker";
import {DEFAULT_USER} from "../helpers/constants";

const ARTICLE = {
    title: faker.lorem.words(),
    description: 'Test description',
    body: 'Test body',
}
const ERROR = 'Title already exists.. ';
const ARTICLE_URL = '#/article/tot-patruus-alo'


test('User could publish article ', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let editorPage = new EditorPage(page);
    let articlePage = new ArticlePage(page);
    await loginPage.visit();
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await editorPage.clickOnNewArticle();
    await editorPage.createArticle(ARTICLE.title, ARTICLE.description, ARTICLE.body);
    await editorPage.clickOnPublish();
    await articlePage.shouldHaveTitle(ARTICLE.title);
});

test('User could not publish article with existing title', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let editorPage = new EditorPage(page);
    await loginPage.visit();
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await editorPage.clickOnNewArticle();
    await editorPage.createArticle('test', ARTICLE.description, ARTICLE.body);
    await editorPage.clickOnPublish();
    await editorPage.shouldHaveError(ERROR);
});

test('User could not publish article with empty fields', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let editorPage = new EditorPage(page);
    await loginPage.visit();
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await editorPage.clickOnNewArticle();
    await editorPage.clickOnPublish();
    await editorPage.titleShouldBeVisible();
});

test('User could add comment', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let articlePage = new ArticlePage(page, ARTICLE_URL);
    await loginPage.visit();
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await loginPage.shouldBeEquals(DEFAULT_USER.name);
    await articlePage.visit();
    await articlePage.writeCommentAndPost('test');
    await articlePage.shouldHaveComment('test');
});

test('User could delete comment', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let articlePage = new ArticlePage(page, '#/article/alter-test');
    await loginPage.visit();
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await loginPage.shouldBeEquals(DEFAULT_USER.name);
    await articlePage.visit();
    await articlePage.writeCommentAndPost('test_delete');
    await articlePage.deleteComment();
});