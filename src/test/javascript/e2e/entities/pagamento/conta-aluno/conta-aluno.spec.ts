import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ContaAlunoComponentsPage, ContaAlunoDeleteDialog, ContaAlunoUpdatePage } from './conta-aluno.page-object';

const expect = chai.expect;

describe('ContaAluno e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contaAlunoComponentsPage: ContaAlunoComponentsPage;
  let contaAlunoUpdatePage: ContaAlunoUpdatePage;
  let contaAlunoDeleteDialog: ContaAlunoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ContaAlunos', async () => {
    await navBarPage.goToEntity('conta-aluno');
    contaAlunoComponentsPage = new ContaAlunoComponentsPage();
    await browser.wait(ec.visibilityOf(contaAlunoComponentsPage.title), 5000);
    expect(await contaAlunoComponentsPage.getTitle()).to.eq('educacaoApp.pagamentoContaAluno.home.title');
  });

  it('should load create ContaAluno page', async () => {
    await contaAlunoComponentsPage.clickOnCreateButton();
    contaAlunoUpdatePage = new ContaAlunoUpdatePage();
    expect(await contaAlunoUpdatePage.getPageTitle()).to.eq('educacaoApp.pagamentoContaAluno.home.createOrEditLabel');
    await contaAlunoUpdatePage.cancel();
  });

  it('should create and save ContaAlunos', async () => {
    const nbButtonsBeforeCreate = await contaAlunoComponentsPage.countDeleteButtons();

    await contaAlunoComponentsPage.clickOnCreateButton();
    await promise.all([
      contaAlunoUpdatePage.setDebitoInput('5'),
      contaAlunoUpdatePage.setCreditoInput('5'),
      contaAlunoUpdatePage.setNumeroProcessoInput('numeroProcesso')
    ]);
    expect(await contaAlunoUpdatePage.getDebitoInput()).to.eq('5', 'Expected debito value to be equals to 5');
    expect(await contaAlunoUpdatePage.getCreditoInput()).to.eq('5', 'Expected credito value to be equals to 5');
    expect(await contaAlunoUpdatePage.getNumeroProcessoInput()).to.eq(
      'numeroProcesso',
      'Expected NumeroProcesso value to be equals to numeroProcesso'
    );
    await contaAlunoUpdatePage.save();
    expect(await contaAlunoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contaAlunoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ContaAluno', async () => {
    const nbButtonsBeforeDelete = await contaAlunoComponentsPage.countDeleteButtons();
    await contaAlunoComponentsPage.clickOnLastDeleteButton();

    contaAlunoDeleteDialog = new ContaAlunoDeleteDialog();
    expect(await contaAlunoDeleteDialog.getDialogTitle()).to.eq('educacaoApp.pagamentoContaAluno.delete.question');
    await contaAlunoDeleteDialog.clickOnConfirmButton();

    expect(await contaAlunoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
