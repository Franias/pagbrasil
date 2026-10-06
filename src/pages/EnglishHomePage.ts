import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Home em inglês. */
export class EnglishHomePage extends BasePage {
  constructor(page: Page) {
    super(page, '/');
  }

  async expectEnglish(): Promise<void> {
    await expect(this.page.locator('html')).toHaveAttribute('lang', /^en/i);
    await expect(this.page).toHaveURL(/preferred_language=en/);
    await expect(
      this.page.getByRole('link', { name: /Our solutions/i }).first(),
    ).toBeVisible();
  }

  async expectLanguage(lang: RegExp): Promise<void> {
    await expect(this.page.locator('html')).toHaveAttribute('lang', lang);
  }
}
