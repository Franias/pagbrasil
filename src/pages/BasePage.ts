import { Locator, Page, expect } from '@playwright/test';
import logger from '../utils/LoggerUtil';
import { findValidElement } from '../utils/SelfHealingUtil';

/** Base dos Page Objects: navegação, log e self-healing. */
export abstract class BasePage {
  protected constructor(
    protected readonly page: Page,
    protected readonly path: string,
  ) {}

  /** Navega para o caminho da página, relativo ao `baseURL`. */
  async goto(query = ''): Promise<this> {
    const target = `${this.path}${query}`;
    logger.info(`Navegando para ${target}`);
    await this.page.goto(target);
    await expect(this.page.locator('body')).toBeVisible();
    return this;
  }

  /** Título atual do documento. */
  async title(): Promise<string> {
    return this.page.title();
  }

  /** Localizador com fallback de seletores (self-healing). */
  protected selfHeal(candidates: string[]): Promise<Locator> {
    return findValidElement(this.page, candidates);
  }
}
