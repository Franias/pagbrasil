import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Página Quem somos (PT). */
export class QuemSomosPage extends BasePage {
  constructor(page: Page) {
    super(page, '/pt-br/sobre-nos/');
  }

  private get searchIcon() {
    return this.page.locator('header a.link-search:visible').first();
  }

  private get timelineSection() {
    return this.page.locator('section.block-quem-somos-timeline');
  }

  private get timeline() {
    return this.timelineSection.locator('.timeline');
  }

  private get gptwLogo() {
    return this.page.locator('footer .certifications svg.gptw-logo').first();
  }

  async expectSearchIconVisible(): Promise<void> {
    await expect(this.searchIcon).toBeVisible();
  }

  async getTimelineClass(): Promise<string> {
    await expect(this.timeline).toBeVisible();
    return (await this.timeline.getAttribute('class')) ?? '';
  }

  async getTimelineSectionClass(): Promise<string> {
    await expect(this.timelineSection).toBeVisible();
    return (await this.timelineSection.getAttribute('class')) ?? '';
  }

  async expectTimelineClassContains(value: string): Promise<void> {
    expect((await this.getTimelineClass()).split(/\s+/)).toContain(value);
  }

  async expectTimelineSectionClassContains(value: string): Promise<void> {
    expect((await this.getTimelineSectionClass()).split(/\s+/)).toContain(value);
  }

  async expectGptwVisible(): Promise<void> {
    await expect(this.gptwLogo).toBeVisible();
  }

  async expectCityVisible(city: string): Promise<void> {
    await expect(
      this.page.locator('footer').getByText(city, { exact: true }).first(),
    ).toBeVisible();
  }
}
