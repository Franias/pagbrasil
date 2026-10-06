import { test } from '../../fixtures/pagesFixture';
import quemSomos from '../../testdata/quemSomos.json';

/** Quem Somos: ícone de busca, linha do tempo e rodapé. */
test.describe('Quem Somos @e2e @quem-somos', () => {
  test.beforeEach(async ({ quemSomosPage }) => {
    await quemSomosPage.goto();
  });

  test('exibe o ícone de busca (lupa) no header', async ({ quemSomosPage, isMobile }) => {
    test.skip(isMobile, 'Header mobile não expõe a lupa');
    await quemSomosPage.expectSearchIconVisible();
  });

  test('a linha do tempo tem as classes esperadas', async ({ quemSomosPage }) => {
    await quemSomosPage.expectTimelineClassContains(quemSomos.timelineClass);
    await quemSomosPage.expectTimelineSectionClassContains(quemSomos.timelineSectionClass);
  });

  test('exibe o selo GPTW no rodapé', async ({ quemSomosPage, isMobile }) => {
    test.skip(isMobile, 'Rodapé mobile oculta as certificações');
    await quemSomosPage.expectGptwVisible();
  });

  test('exibe as cidades no rodapé', async ({ quemSomosPage, isMobile }) => {
    test.skip(isMobile, 'Rodapé mobile oculta as cidades');
    for (const city of quemSomos.cities) {
      await quemSomosPage.expectCityVisible(city);
    }
  });
});
