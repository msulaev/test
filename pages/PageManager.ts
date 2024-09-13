import {EditorPage} from "./EditorPage";
import {LoginPage} from "./LoginPage";
import {ArticlePage} from "./ArticlePage";
import {RegisterPage} from "./RegisterPage";
import {Page} from "@playwright/test";

export class PageManager {
    page: Page;
    articlePage: ArticlePage;
    loginPage: LoginPage;
    editorPage: EditorPage;
    registerPage: RegisterPage;

    constructor(page: Page){
        this.page = page;
        this.articlePage = new ArticlePage(page);
        this.loginPage = new LoginPage(page);
        this.editorPage = new EditorPage(page);
        this.registerPage = new RegisterPage(page);
    }
}