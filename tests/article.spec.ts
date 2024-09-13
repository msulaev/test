import { faker } from "@faker-js/faker";
import { DEFAULT_USER } from "../helpers/constants";
import { test } from "../fixtures/mainFixture";

const ARTICLE = {
    title: faker.lorem.words(),
    description: 'Test description',
    body: 'Test body',
};
const ERROR = 'Title already exists.. ';
const ARTICLE_URL = '#/article/tot-patruus-alo';

test.beforeEach(async ({ pm }) => {
    await pm.loginPage.visit();
    await pm.loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await pm.loginPage.shouldBeEquals(DEFAULT_USER.name);
});

test('User could publish article', async ({ pm }) => {
    await pm.editorPage.clickOnNewArticle();
    await pm.editorPage.createArticle(ARTICLE.title, ARTICLE.description, ARTICLE.body);
    await pm.editorPage.clickOnPublish();
    await pm.articlePage.shouldHaveTitle(ARTICLE.title);
});

test('User could not publish article with existing title', async ({ pm }) => {
    await pm.editorPage.clickOnNewArticle();
    await pm.editorPage.createArticle('test', ARTICLE.description, ARTICLE.body);
    await pm.editorPage.clickOnPublish();
    await pm.editorPage.shouldHaveError(ERROR);
});

test('User could not publish article with empty fields', async ({ pm }) => {
    await pm.editorPage.clickOnNewArticle();
    await pm.editorPage.clickOnPublish();
    await pm.editorPage.titleShouldBeVisible();
});

test('User could add comment', async ({ pm }) => {
    let msg = faker.lorem.words();
    await pm.articlePage.visitUrl(ARTICLE_URL);
    await pm.articlePage.writeCommentAndPost(msg);
    await pm.articlePage.shouldHaveComment(msg);
});

test('User could delete comment', async ({ pm }) => {
    await pm.articlePage.visitUrl('#/article/alter-test');
    await pm.articlePage.writeCommentAndPost('test_delete');
    await pm.articlePage.deleteComment();
});