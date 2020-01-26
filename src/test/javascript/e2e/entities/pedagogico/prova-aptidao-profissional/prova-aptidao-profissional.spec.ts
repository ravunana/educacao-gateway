import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ProvaAptidaoProfissionalComponentsPage,
  ProvaAptidaoProfissionalDeleteDialog,
  ProvaAptidaoProfissionalUpdatePage
} from './prova-aptidao-profissional.page-object';

const expect = chai.expect;

describe('ProvaAptidaoProfissional e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let provaAptidaoProfissionalComponentsPage: ProvaAptidaoProfissionalComponentsPage;
  let provaAptidaoProfissionalUpdatePage: ProvaAptidaoProfissionalUpdatePage;
  let provaAptidaoProfissionalDeleteDialog: ProvaAptidaoProfissionalDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProvaAptidaoProfissionals', async () => {
    await navBarPage.goToEntity('prova-aptidao-profissional');
    provaAptidaoProfissionalComponentsPage = new ProvaAptidaoProfissionalComponentsPage();
    await browser.wait(ec.visibilityOf(provaAptidaoProfissionalComponentsPage.title), 5000);
    expect(await provaAptidaoProfissionalComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoProvaAptidaoProfissional.home.title');
  });

  it('should load create ProvaAptidaoProfissional page', async () => {
    await provaAptidaoProfissionalComponentsPage.clickOnCreateButton();
    provaAptidaoProfissionalUpdatePage = new ProvaAptidaoProfissionalUpdatePage();
    expect(await provaAptidaoProfissionalUpdatePage.getPageTitle()).to.eq(
      'educacaoApp.pedagogicoProvaAptidaoProfissional.home.createOrEditLabel'
    );
    await provaAptidaoProfissionalUpdatePage.cancel();
  });

  it('should create and save ProvaAptidaoProfissionals', async () => {
    const nbButtonsBeforeCreate = await provaAptidaoProfissionalComponentsPage.countDeleteButtons();

    await provaAptidaoProfissionalComponentsPage.clickOnCreateButton();
    await promise.all([
      provaAptidaoProfissionalUpdatePage.setNumeroProcessoInput('numeroProcesso'),
      provaAptidaoProfissionalUpdatePage.setNomeAlunoInput('nomeAluno'),
      provaAptidaoProfissionalUpdatePage.setLivroRegistroInput('5'),
      provaAptidaoProfissionalUpdatePage.setFolhaRegistroInput('5'),
      provaAptidaoProfissionalUpdatePage.setTemaProjectoTecnologioInput('temaProjectoTecnologio'),
      provaAptidaoProfissionalUpdatePage.setNotaProjectoTecnologioInput('5'),
      provaAptidaoProfissionalUpdatePage.setDataDefesaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      provaAptidaoProfissionalUpdatePage.setLocalEstagioInput('localEstagio'),
      provaAptidaoProfissionalUpdatePage.setAproveitamentoEstagioInput('aproveitamentoEstagio'),
      provaAptidaoProfissionalUpdatePage.setInicioEstagioInput('2000-12-31'),
      provaAptidaoProfissionalUpdatePage.setFinalEstagioInput('2000-12-31'),
      provaAptidaoProfissionalUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await provaAptidaoProfissionalUpdatePage.getNumeroProcessoInput()).to.eq(
      'numeroProcesso',
      'Expected NumeroProcesso value to be equals to numeroProcesso'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getNomeAlunoInput()).to.eq(
      'nomeAluno',
      'Expected NomeAluno value to be equals to nomeAluno'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getLivroRegistroInput()).to.eq('5', 'Expected livroRegistro value to be equals to 5');
    expect(await provaAptidaoProfissionalUpdatePage.getFolhaRegistroInput()).to.eq('5', 'Expected folhaRegistro value to be equals to 5');
    expect(await provaAptidaoProfissionalUpdatePage.getTemaProjectoTecnologioInput()).to.eq(
      'temaProjectoTecnologio',
      'Expected TemaProjectoTecnologio value to be equals to temaProjectoTecnologio'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getNotaProjectoTecnologioInput()).to.eq(
      '5',
      'Expected notaProjectoTecnologio value to be equals to 5'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getDataDefesaInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dataDefesa value to be equals to 2000-12-31'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getLocalEstagioInput()).to.eq(
      'localEstagio',
      'Expected LocalEstagio value to be equals to localEstagio'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getAproveitamentoEstagioInput()).to.eq(
      'aproveitamentoEstagio',
      'Expected AproveitamentoEstagio value to be equals to aproveitamentoEstagio'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getInicioEstagioInput()).to.eq(
      '2000-12-31',
      'Expected inicioEstagio value to be equals to 2000-12-31'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getFinalEstagioInput()).to.eq(
      '2000-12-31',
      'Expected finalEstagio value to be equals to 2000-12-31'
    );
    expect(await provaAptidaoProfissionalUpdatePage.getDataInput()).to.contain(
      '2001-01-01T02:30',
      'Expected data value to be equals to 2000-12-31'
    );
    await provaAptidaoProfissionalUpdatePage.save();
    expect(await provaAptidaoProfissionalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await provaAptidaoProfissionalComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProvaAptidaoProfissional', async () => {
    const nbButtonsBeforeDelete = await provaAptidaoProfissionalComponentsPage.countDeleteButtons();
    await provaAptidaoProfissionalComponentsPage.clickOnLastDeleteButton();

    provaAptidaoProfissionalDeleteDialog = new ProvaAptidaoProfissionalDeleteDialog();
    expect(await provaAptidaoProfissionalDeleteDialog.getDialogTitle()).to.eq(
      'educacaoApp.pedagogicoProvaAptidaoProfissional.delete.question'
    );
    await provaAptidaoProfissionalDeleteDialog.clickOnConfirmButton();

    expect(await provaAptidaoProfissionalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
