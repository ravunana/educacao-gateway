import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  EfeitoPagamentoComponentsPage,
  /* EfeitoPagamentoDeleteDialog,
   */ EfeitoPagamentoUpdatePage
} from './efeito-pagamento.page-object';

const expect = chai.expect;

describe('EfeitoPagamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let efeitoPagamentoComponentsPage: EfeitoPagamentoComponentsPage;
  let efeitoPagamentoUpdatePage: EfeitoPagamentoUpdatePage;
  /* let efeitoPagamentoDeleteDialog: EfeitoPagamentoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EfeitoPagamentos', async () => {
    await navBarPage.goToEntity('efeito-pagamento');
    efeitoPagamentoComponentsPage = new EfeitoPagamentoComponentsPage();
    await browser.wait(ec.visibilityOf(efeitoPagamentoComponentsPage.title), 5000);
    expect(await efeitoPagamentoComponentsPage.getTitle()).to.eq('educacaoApp.secretariaEfeitoPagamento.home.title');
  });

  it('should load create EfeitoPagamento page', async () => {
    await efeitoPagamentoComponentsPage.clickOnCreateButton();
    efeitoPagamentoUpdatePage = new EfeitoPagamentoUpdatePage();
    expect(await efeitoPagamentoUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaEfeitoPagamento.home.createOrEditLabel');
    await efeitoPagamentoUpdatePage.cancel();
  });

  /*  it('should create and save EfeitoPagamentos', async () => {
        const nbButtonsBeforeCreate = await efeitoPagamentoComponentsPage.countDeleteButtons();

        await efeitoPagamentoComponentsPage.clickOnCreateButton();
        await promise.all([
            efeitoPagamentoUpdatePage.setDescricaoInput('descricao'),
            efeitoPagamentoUpdatePage.setQuantidadeInput('5'),
            efeitoPagamentoUpdatePage.setMontanteInput('5'),
            efeitoPagamentoUpdatePage.setDescontoInput('5'),
            efeitoPagamentoUpdatePage.setMultaInput('5'),
            efeitoPagamentoUpdatePage.setJuroInput('5'),
            efeitoPagamentoUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            efeitoPagamentoUpdatePage.setVencimentoInput('2000-12-31'),
            // efeitoPagamentoUpdatePage.depositoSelectLastOption(),
            efeitoPagamentoUpdatePage.emolumentoSelectLastOption(),
            efeitoPagamentoUpdatePage.pagamentoSelectLastOption(),
        ]);
        expect(await efeitoPagamentoUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
        expect(await efeitoPagamentoUpdatePage.getQuantidadeInput()).to.eq('5', 'Expected quantidade value to be equals to 5');
        expect(await efeitoPagamentoUpdatePage.getMontanteInput()).to.eq('5', 'Expected montante value to be equals to 5');
        expect(await efeitoPagamentoUpdatePage.getDescontoInput()).to.eq('5', 'Expected desconto value to be equals to 5');
        expect(await efeitoPagamentoUpdatePage.getMultaInput()).to.eq('5', 'Expected multa value to be equals to 5');
        expect(await efeitoPagamentoUpdatePage.getJuroInput()).to.eq('5', 'Expected juro value to be equals to 5');
        expect(await efeitoPagamentoUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        expect(await efeitoPagamentoUpdatePage.getVencimentoInput()).to.eq('2000-12-31', 'Expected vencimento value to be equals to 2000-12-31');
        const selectedQuitado = efeitoPagamentoUpdatePage.getQuitadoInput();
        if (await selectedQuitado.isSelected()) {
            await efeitoPagamentoUpdatePage.getQuitadoInput().click();
            expect(await efeitoPagamentoUpdatePage.getQuitadoInput().isSelected(), 'Expected quitado not to be selected').to.be.false;
        } else {
            await efeitoPagamentoUpdatePage.getQuitadoInput().click();
            expect(await efeitoPagamentoUpdatePage.getQuitadoInput().isSelected(), 'Expected quitado to be selected').to.be.true;
        }
        await efeitoPagamentoUpdatePage.save();
        expect(await efeitoPagamentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await efeitoPagamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last EfeitoPagamento', async () => {
        const nbButtonsBeforeDelete = await efeitoPagamentoComponentsPage.countDeleteButtons();
        await efeitoPagamentoComponentsPage.clickOnLastDeleteButton();

        efeitoPagamentoDeleteDialog = new EfeitoPagamentoDeleteDialog();
        expect(await efeitoPagamentoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.secretariaEfeitoPagamento.delete.question');
        await efeitoPagamentoDeleteDialog.clickOnConfirmButton();

        expect(await efeitoPagamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
