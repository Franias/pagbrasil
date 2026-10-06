import { test as base, createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { QuemSomosPage } from '../pages/QuemSomosPage';
import { EnglishHomePage } from '../pages/EnglishHomePage';
import { SuportePage } from '../pages/SuportePage';

/** Injeta os Page Objects prontos nos testes. */
type PagBrasilFixtures = {
  homePage: HomePage;
  quemSomosPage: QuemSomosPage;
  englishHomePage: EnglishHomePage;
  suportePage: SuportePage;
};

export const test = base.extend<PagBrasilFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  quemSomosPage: async ({ page }, use) => {
    await use(new QuemSomosPage(page));
  },

  englishHomePage: async ({ page }, use) => {
    await use(new EnglishHomePage(page));
  },

  suportePage: async ({ page }, use) => {
    await use(new SuportePage(page));
  },
});

export { expect };

/** Steps de BDD (Cucumber) vinculados às fixtures. */
export const { Given, When, Then } = createBdd(test);
