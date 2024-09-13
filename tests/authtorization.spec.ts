import { test, expect } from '@playwright/test';
import {faker, PersonModule} from '@faker-js/faker';
import {RegisterPage} from "../pages/RegisterPage";

const USER = faker.person.firstName();
const EMAIL = faker.internet.email();
const PASSWORD = faker.internet.password();

test('User could login with user and pwd', async ({ page }) => {
    let registerPage = new RegisterPage(page);
    await registerPage.visit();
    await registerPage.registerUser(EMAIL, PASSWORD, USER);
    await registerPage.shouldBeOpened();
});
