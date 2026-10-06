import { test } from '../../fixtures/pagesFixture';
import idiomas from '../../testdata/idiomas.json';

/** Alteração de idioma (PT -> EN), orientada a dados. */
test.describe('Alteração de idioma @e2e @idioma', () => {
  test.skip(({ isMobile }) => isMobile, 'Seletor de idioma disponível apenas no layout desktop');

  for (const idioma of idiomas) {
    test(`troca o idioma para ${idioma.languageLabel}`, async ({ homePage }) => {
      await homePage.goto();
      const about = await homePage.switchToEnglish();
      await about.expectLanguage(new RegExp(idioma.expectedLang, 'i'));
      await about.expectEnglish();
    });
  }
});
