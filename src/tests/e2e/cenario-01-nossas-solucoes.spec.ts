import { test } from '../../fixtures/pagesFixture';
import solucoes from '../../testdata/solucoes.json';

/** Nossas Soluções: itens que devem (e não devem) aparecer no submenu. */
test.describe('Nossas Soluções @e2e @solucoes', () => {
  test.skip(({ isMobile }) => isMobile, 'Mega-menu disponível apenas no layout desktop');

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.openSolucoesMenu();
  });

  for (const item of solucoes.shouldSee) {
    test(`exibe o item "${item}"`, async ({ homePage }) => {
      await homePage.expectSolucaoVisible(item);
    });
  }

  for (const item of solucoes.shouldNotSee) {
    test(`não exibe o item descontinuado "${item}"`, async ({ homePage }) => {
      await homePage.expectSolucaoAbsent(item);
    });
  }
});
