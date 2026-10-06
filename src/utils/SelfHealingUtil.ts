import { Locator, Page } from '@playwright/test';
import logger from './LoggerUtil';

/**
 * Self-healing de localizadores: devolve o primeiro seletor candidato que
 * existir no DOM e lança erro se nenhum deles for encontrado.
 */
export async function findValidElement(
  page: Page,
  locators: string[],
  timeoutMs = 5_000,
): Promise<Locator> {
  for (const locator of locators) {
    try {
      const element = page.locator(locator).first();
      await element.waitFor({ state: 'attached', timeout: timeoutMs });
      logger.info(`[self-healing] Seletor válido: ${locator}`);
      return element;
    } catch {
      logger.warn(`[self-healing] Seletor inválido, tentando o próximo: ${locator}`);
    }
  }

  const message = `[self-healing] Nenhum seletor válido entre: ${locators.join(' | ')}`;
  logger.error(message);
  throw new Error(message);
}
