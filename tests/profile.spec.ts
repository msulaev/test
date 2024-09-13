import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";

const USER = {
    name: 'mrsulaev',
    email: 'mrsulaev@gmail.com',
    password: '123456'
}

test('User could login with user ', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.login(USER.email, USER.password);
    await loginPage.shouldBeEquals(USER.name);
});
