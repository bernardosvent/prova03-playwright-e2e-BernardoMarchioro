import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class VansElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoBusca(): Locator {
    return this.page.getByPlaceholder('O que você procura?').first();
  }

  getBotaoAceitarCookies(): Locator {
    return this.page.getByRole('button', { name: 'Aceitar todos os cookies' });
  }

  getBotaoVerMaisResultados(): Locator {
    return this.page.getByRole('button', { name: 'Ver mais resultados' });
  }

  getSugestaoProduto(): Locator {
    return this.page.getByRole('link', { name: /Tênis Old Skool/i }).first();
  }

  getBotaoSacola(): Locator {
    return this.page.locator('button:has-text("(0)")').first();
  }

  getSacolaDrawer(): Locator {
    return this.page.getByText('Sacola de compras').first();
  }

  getTextoSacolaVazia(): Locator {
    return this.page.getByText('Sua sacola está vazia.').first();
  }

  getLinkCategoriaCalcados(): Locator {
    return this.page
      .getByRole('link', { name: 'Calçados', exact: true })
      .first();
  }

  getLinkCategoriaClassicos(): Locator {
    return this.page
      .getByRole('link', { name: 'Clássicos', exact: true })
      .first();
  }

  getCardsProdutos(): Locator {
    return this.page.locator(
      'article, [class*="productCard"], [class*="product-card"], a[href*="/p/"]'
    );
  }

  getPrimeiroCardProduto(): Locator {
    return this.getCardsProdutos().first();
  }
}
