import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { FORM_FIELD_IDS } from '../config/site';
import logger from '../utils/LoggerUtil';

/**
 * Fale com um especialista (suporte PT).
 * [REAL] https://www.pagbrasil.com/pt-br/suporte/
 *
 * Reproduz o formulário Contact Form 7: campos Nome, Empresa, E-mail
 * corporativo e Telefone, mais o checkbox de WhatsApp. No site real o aviso
 * "Campo obrigatório" é injetado em runtime (`.wpcf7-not-valid-tip`); na
 * fixture o comportamento é equivalente.
 */
export class SuportePage extends BasePage {
  constructor(page: Page) {
    super(page, '/pt-br/suporte/');
  }

  private get specialistRadio() {
    return this.page.getByRole('radio', {
      name: /Fale com um especialista em pagamentos para e-commerce/i,
    });
  }

  private get form() {
    return this.page.locator('#form-especialista');
  }

  private get whatsappCheckbox() {
    return this.page.getByRole('checkbox', {
      name: /Deseja receber comunicações por WhatsApp/i,
    });
  }

  private tip(fieldId: string) {
    return this.page.locator(`.wpcf7-not-valid-tip[data-for="${fieldId}"]`);
  }

  /** Seleciona a opção que revela o formulário. */
  async selectSpecialistOption(): Promise<void> {
    await this.specialistRadio.check();
    await expect(this.form).toBeVisible();
    logger.info('Formulário de especialista exibido');
  }

  async checkWhatsapp(): Promise<void> {
    await this.whatsappCheckbox.check();
    logger.info('Checkbox de WhatsApp marcado');
  }

  async expectRequiredMessage(fieldLabel: string, message = 'Campo obrigatório'): Promise<void> {
    const fieldId = FORM_FIELD_IDS[fieldLabel];
    expect(fieldId, `Campo sem mapeamento de id: ${fieldLabel}`).toBeDefined();
    const tip = this.tip(fieldId);
    await expect(tip).toBeVisible();
    await expect(tip).toHaveText(message);
    logger.info(`Aviso "${message}" exibido em ${fieldLabel}`);
  }

  async expectRequiredMessages(fieldLabels: string[], message = 'Campo obrigatório'): Promise<void> {
    for (const label of fieldLabels) {
      await this.expectRequiredMessage(label, message);
    }
  }

  async expectNoRequiredMessage(fieldLabel: string): Promise<void> {
    const fieldId = FORM_FIELD_IDS[fieldLabel];
    expect(fieldId, `Campo sem mapeamento de id: ${fieldLabel}`).toBeDefined();
    await expect(this.tip(fieldId)).toBeHidden();
  }

  async fillField(fieldLabel: string, value: string): Promise<void> {
    const fieldId = FORM_FIELD_IDS[fieldLabel];
    expect(fieldId, `Campo sem mapeamento de id: ${fieldLabel}`).toBeDefined();
    await this.page.locator(`#${fieldId}`).fill(value);
  }
}
