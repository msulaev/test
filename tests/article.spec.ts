import {LoginPage} from "../pages/LoginPage";
import {ArticlePage} from "../pages/ArticlePage";
import {faker} from "@faker-js/faker";
import {DEFAULT_USER} from "../helpers/constants";
import {test} from "../fixtures/mainFixture";

const ARTICLE = {
    title: faker.lorem.words(),
    description: 'Test description',
    body: 'Test body',
}
const ERROR = 'Title already exists.. ';
const ARTICLE_URL = '#/article/tot-patruus-alo'


test('User could publish article ', async ({ pm }) => {
    await pm.loginPage.visit();
    await pm.loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await pm.editorPage.clickOnNewArticle();
    await pm.editorPage.createArticle(ARTICLE.title, ARTICLE.description, ARTICLE.body);
    await pm.editorPage.clickOnPublish();
    await pm.articlePage.shouldHaveTitle(ARTICLE.title);
});

test('User could not publish article with existing title', async ({ pm }) => {
    await pm.loginPage.visit();
    await pm.loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await pm.editorPage.clickOnNewArticle();
    await pm.editorPage.createArticle('test', ARTICLE.description, ARTICLE.body);
    await pm.editorPage.clickOnPublish();
    await pm.editorPage.shouldHaveError(ERROR);
});

test('User could not publish article with empty fields', async ({ pm }) => {
    await pm.loginPage.visit();
    await pm.loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await pm.editorPage.clickOnNewArticle();
    await pm.editorPage.clickOnPublish();
    await pm.editorPage.titleShouldBeVisible();
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