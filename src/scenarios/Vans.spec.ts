import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import VansPage from '../support/pages/VansPage';

test.describe('Vans Brasil - Testes E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let vansPage: VansPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.vans')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    vansPage = new VansPage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  test('Caso 1: Deve carregar a página inicial com elementos principais visíveis', async () => {
    await vansPage.validarHomePage();
  });

  test('Caso 2: Deve navegar para a categoria de calçados e validar a listagem de produtos', async () => {
    await vansPage.acessarCategoriaCalcados();
    await vansPage.validarPaginaCategoria();
  });

  test('Caso 3: Deve abrir a sacola de compras e validar a mensagem de sacola vazia', async () => {
    await vansPage.abrirSacola();
    await vansPage.validarSacolaVazia();
  });
});
