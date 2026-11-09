import { Page, expect } from '@playwright/test';
import VansElements from '../elements/VansElements';
import BasePage from './BasePage';

export default class VansPage extends BasePage {
  readonly vansElements: VansElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.vansElements = new VansElements(page);
  }

  async fecharAvisos(): Promise<void> {
    const botaoCookies = this.vansElements.getBotaoAceitarCookies();
    if (await botaoCookies.isVisible({ timeout: 4000 }).catch(() => false)) {
      await botaoCookies.click();
    }
  }

  async validarHomePage(): Promise<void> {
    await this.fecharAvisos();
    await expect(this.page).toHaveURL(/vans\.com\.br/);
    await expect(this.page).toHaveTitle(/Vans/i);
    await expect(this.vansElements.getCampoBusca()).toBeVisible();
    await expect(this.vansElements.getBotaoSacola()).toBeVisible();
  }

  async buscarProduto(termo: string): Promise<void> {
    await this.fecharAvisos();
    const campoBusca = this.vansElements.getCampoBusca();
    await campoBusca.click();
    await campoBusca.fill(termo);

    const botaoVerMais = this.vansElements.getBotaoVerMaisResultados();
    if (await botaoVerMais.isVisible({ timeout: 5000 }).catch(() => false)) {
      await botaoVerMais.click();
    } else {
      await campoBusca.press('Enter');
    }
  }

  async validarResultadosBusca(termo: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/search\//);
    await expect(this.vansElements.getCardsProdutos().first()).toBeVisible({
      timeout: 15000
    });
  }

  async abrirSacola(): Promise<void> {
    await this.fecharAvisos();
    await this.vansElements.getBotaoSacola().click();
  }

  async validarSacolaVazia(): Promise<void> {
    await expect(this.vansElements.getSacolaDrawer()).toBeVisible();
    await expect(this.vansElements.getTextoSacolaVazia()).toBeVisible();
  }

  async acessarCategoriaCalcados(): Promise<void> {
    await this.fecharAvisos();
    await this.vansElements.getLinkCategoriaCalcados().click();
  }

  async validarPaginaCategoria(): Promise<void> {
    await expect(this.page).toHaveURL(/\/c\/sapatos|\/c\//);
    await expect(this.vansElements.getCardsProdutos().first()).toBeVisible({
      timeout: 15000
    });
  }
}
