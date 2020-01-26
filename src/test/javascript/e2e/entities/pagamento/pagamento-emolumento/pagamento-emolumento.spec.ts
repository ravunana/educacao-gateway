import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  PagamentoEmolumentoComponentsPage,
  /* PagamentoEmolumentoDeleteDialog,
   */ PagamentoEmolumentoUpdatePage
} from './pagamento-emolumento.page-object';

const expect = chai.expect;

describe('PagamentoEmolumento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pagamentoEmolumentoComponentsPage: PagamentoEmolumentoComponentsPage;
  let pagamentoEmolumentoUpdatePage: PagamentoEmolumentoUpdatePage;
  /* let pagamentoEmolumentoDeleteDialog: PagamentoEmolumentoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PagamentoEmolumentos', async () => {
    await navBarPage.goToEntity('pagamento-emolumento');
    pagamentoEmolumentoComponentsPage = new PagamentoEmolumentoComponentsPage();
    await browser.wait(ec.visibilityOf(pagamentoEmolumentoComponentsPage.title), 5000);
    expect(await pagamentoEmolumentoComponentsPage.getTitle()).to.eq('educacaoApp.pagamentoPagamentoEmolumento.home.title');
  });

  it('should load create PagamentoEmolumento page', async () => {
    await pagamentoEmolumentoComponentsPage.clickOnCreateButton();
    pagamentoEmolumentoUpdatePage = new PagamentoEmolumentoUpdatePage();
    expect(await pagamentoEmolumentoUpdatePage.getPageTitle()).to.eq('educacaoApp.pagamentoPagamentoEmolumento.home.createOrEditLabel');
    await pagamentoEmolumentoUpdatePage.cancel();
  });

  /*  it('should create and save PagamentoEmolumentos', async () => {
        const nbButtonsBeforeCreate = await pagamentoEmolumentoComponentsPage.countDeleteButtons();

        await pagamentoEmolumentoComponentsPage.clickOnCreateButton();
        await promise.all([
            pagamentoEmolumentoUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            pagamentoEmolumentoUpdatePage.setNumeroInput('numero'),
            pagamentoEmolumentoUpdatePage.setNumeroProcessoInput('numeroProcesso'),
            pagamentoEmolumentoUpdatePage.setNomeAlunoInput('nomeAluno'),
            pagamentoEmolumentoUpdatePage.setTurmaAlunoInput('turmaAluno'),
            pagamentoEmolumentoUpdatePage.setEstadoInput('estado'),
            pagamentoEmolumentoUpdatePage.formaLiquidacaoSelectLastOption(),
        ]);
        expect(await pagamentoEmolumentoUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        expect(await pagamentoEmolumentoUpdatePage.getNumeroInput()).to.eq('numero', 'Expected Numero value to be equals to numero');
        expect(await pagamentoEmolumentoUpdatePage.getNumeroProcessoInput()).to.eq('numeroProcesso', 'Expected NumeroProcesso value to be equals to numeroProcesso');
        expect(await pagamentoEmolumentoUpdatePage.getNomeAlunoInput()).to.eq('nomeAluno', 'Expected NomeAluno value to be equals to nomeAluno');
        expect(await pagamentoEmolumentoUpdatePage.getTurmaAlunoInput()).to.eq('turmaAluno', 'Expected TurmaAluno value to be equals to turmaAluno');
        expect(await pagamentoEmolumentoUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
        await pagamentoEmolumentoUpdatePage.save();
        expect(await pagamentoEmolumentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await pagamentoEmolumentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last PagamentoEmolumento', async () => {
        const nbButtonsBeforeDelete = await pagamentoEmolumentoComponentsPage.countDeleteButtons();
        await pagamentoEmolumentoComponentsPage.clickOnLastDeleteButton();

        pagamentoEmolumentoDeleteDialog = new PagamentoEmolumentoDeleteDialog();
        expect(await pagamentoEmolumentoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pagamentoPagamentoEmolumento.delete.question');
        await pagamentoEmolumentoDeleteDialog.clickOnConfirmButton();

        expect(await pagamentoEmolumentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
