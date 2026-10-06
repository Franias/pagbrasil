import { test, expect } from '../../fixtures/pagesFixture';

/** Home: carga e estrutura básica. */
test.describe('Home @e2e @home', () => {
  test('carrega a home em português com estrutura básica', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.expectLoaded();
    await expect(page).toHaveTitle(/PagBrasil/);
    await expect(page.locator('html')).toHaveAttribute('lang', /^pt/i);
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('exibe o ícone de busca e o CTA de especialista', async ({ homePage, page, isMobile }) => {
    test.skip(isMobile, 'Header mobile não expõe a lupa nem o CTA');
    await homePage.goto();
    await homePage.expectSearchIconVisible();
    await expect(page.getByRole('link', { name: /Fale com um especialista/i })).toBeVisible();
  });

  test('navega do CTA para a página de suporte', async ({ homePage, isMobile }) => {
    test.skip(isMobile, 'Header mobile não expõe o CTA');
    await homePage.goto();
    const suporte = await homePage.goToEspecialista();
    await suporte.expectOptionsPresent();
  });
});
