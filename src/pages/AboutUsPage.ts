import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Página About us (EN). */
export class AboutUsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/about-us/');
  }

  async expectEnglish(): Promise<void> {
    await expect(this.page.locator('html')).toHaveAttribute('lang', /^en/i);
    await expect(this.page.getByRole('heading', { name: /about us/i })).toBeVisible();
    await expect(this.page).toHaveURL(/about-us/);
  }

  async expectLanguage(lang: RegExp): Promise<void> {
    await expect(this.page.locator('html')).toHaveAttribute('lang', lang);
  }
}
