import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import logger from '../utils/LoggerUtil';
import { SuportePage } from './SuportePage';
import { EnglishHomePage } from './EnglishHomePage';

/** Home em português. */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, '/pt-br/');
  }

  private get primaryMenu() {
    return this.page.locator('#primary-menu');
  }

  private get menuToggle() {
    return this.page.locator('.menu-toggle');
  }

  private get solucoesMenuLink() {
    return this.page.locator('#menu-item-48800 > a');
  }

  private get solucoesSubmenu() {
    return this.page.locator('#menu-item-48800 .sub-menu').first();
  }

  private get searchIcon() {
    return this.page.locator('header.site-header a.link-search:visible');
  }

  private get gptwLogo() {
    return this.page.locator('footer.site-footer .certifications svg.gptw-logo');
  }

  private get englishLink() {
    return this.page.locator('footer.site-footer a[href*="preferred_language=en"]');
  }

  private get especialistaCta() {
    return this.page.locator('header.site-header a.btn-cta');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('header.site-header')).toBeVisible();
  }

  /** Abre o submenu "Nossas soluções" passando o mouse pelo item de menu. */
  async openSolucoesMenu(): Promise<void> {
    await this.solucoesMenuLink.hover();
    await expect(this.solucoesSubmenu).toBeVisible();
    logger.info('Menu "Nossas soluções" aberto');
  }

  /** Variante com self-healing: tenta seletores alternativos até achar o menu. */
  async openSolucoesMenuSelfHealing(): Promise<void> {
    const link = await this.selfHeal([
      '#menu-item-48800 > a',
      'li#menu-item-48800 > a',
      'a:has-text("Nossas soluções")',
    ]);
    await link.hover();
    await expect(this.solucoesSubmenu).toBeVisible();
    logger.info('Menu "Nossas soluções" aberto via self-healing');
  }

  private solucaoItem(name: string) {
    return this.solucoesSubmenu.getByRole('link', { name, exact: true });
  }

  async expectSolucaoVisible(name: string): Promise<void> {
    await expect(this.solucaoItem(name)).toBeVisible();
    logger.info(`Solução visível: ${name}`);
  }

  async expectSolucaoAbsent(name: string): Promise<void> {
    await expect(this.solucaoItem(name)).toHaveCount(0);
    logger.info(`Solução ausente (esperado): ${name}`);
  }

  async expectSearchIconVisible(): Promise<void> {
    await expect(this.searchIcon).toBeVisible();
  }

  async expectGptwVisible(): Promise<void> {
    await expect(this.gptwLogo).toBeVisible();
  }

  async expectCityVisible(city: string): Promise<void> {
    await expect(
      this.page.locator('footer.site-footer').getByText(city, { exact: true }).first(),
    ).toBeVisible();
  }

  async expectPrimaryMenuVisible(): Promise<void> {
    await expect(this.primaryMenu).toBeVisible();
  }

  async expectPrimaryMenuHidden(): Promise<void> {
    await expect(this.primaryMenu).toBeHidden();
  }

  async expectMenuToggleVisible(): Promise<void> {
    await expect(this.menuToggle).toBeVisible();
  }

  async expectMenuToggleHidden(): Promise<void> {
    await expect(this.menuToggle).toBeHidden();
  }

  /** Clica em "Fale com um especialista" no header e retorna a página de suporte. */
  async goToEspecialista(): Promise<SuportePage> {
    await this.especialistaCta.click();
    await this.page.waitForURL(/suporte/);
    return new SuportePage(this.page);
  }

  /** Troca o idioma para inglês e retorna a home em inglês. */
  async switchToEnglish(): Promise<EnglishHomePage> {
    await this.englishLink.click();
    await this.page.waitForURL(/preferred_language=en/);
    return new EnglishHomePage(this.page);
  }
}
