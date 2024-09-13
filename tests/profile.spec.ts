import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {DEFAULT_USER} from "../helpers/constants";

test('User could login with user ', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await loginPage.shouldBeEquals(DEFAULT_USER.name);
});
