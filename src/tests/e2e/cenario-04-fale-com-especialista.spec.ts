import { test } from '../../fixtures/pagesFixture';
import especialista from '../../testdata/especialista.json';

/** Fale com um especialista. */
test.describe('Fale com um especialista @e2e @especialista', () => {
  test.beforeEach(async ({ suportePage }) => {
    await suportePage.goto();
  });

  test('exibe as opções de atendimento', async ({ suportePage }) => {
    await suportePage.expectOptionsPresent();
  });

  test('disponibiliza a opção de falar com um especialista', async ({ suportePage }) => {
    await suportePage.expectSpecialistOptionPresent();
  });

  test('formulário do especialista tem os campos obrigatórios configurados', async ({
    suportePage,
  }) => {
    for (const field of especialista.requiredFields) {
      await suportePage.expectRequiredFieldConfigured(field);
    }
  });
});
