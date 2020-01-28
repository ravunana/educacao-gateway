import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EmolumentoComponentsPage, EmolumentoDeleteDialog, EmolumentoUpdatePage } from './emolumento.page-object';

const expect = chai.expect;

describe('Emolumento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let emolumentoComponentsPage: EmolumentoComponentsPage;
  let emolumentoUpdatePage: EmolumentoUpdatePage;
  let emolumentoDeleteDialog: EmolumentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Emolumentos', async () => {
    await navBarPage.goToEntity('emolumento');
    emolumentoComponentsPage = new EmolumentoComponentsPage();
    await browser.wait(ec.visibilityOf(emolumentoComponentsPage.title), 5000);
    expect(await emolumentoComponentsPage.getTitle()).to.eq('educacaoApp.secretariaEmolumento.home.title');
  });

  it('should load create Emolumento page', async () => {
    await emolumentoComponentsPage.clickOnCreateButton();
    emolumentoUpdatePage = new EmolumentoUpdatePage();
    expect(await emolumentoUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaEmolumento.home.createOrEditLabel');
    await emolumentoUpdatePage.cancel();
  });

  it('should create and save Emolumentos', async () => {
    const nbButtonsBeforeCreate = await emolumentoComponentsPage.countDeleteButtons();

    await emolumentoComponentsPage.clickOnCreateButton();
    await promise.all([
      emolumentoUpdatePage.setNomeInput('nome'),
      emolumentoUpdatePage.setMontanteInput('5'),
      emolumentoUpdatePage.setMontanteMultaInput('5'),
      emolumentoUpdatePage.setTempoMultaInput('5'),
      emolumentoUpdatePage.setQuantidadeInput('5'),
      emolumentoUpdatePage.setTurnoInput('turno'),
      emolumentoUpdatePage.setClasseInput('5'),
      emolumentoUpdatePage.setCursoInput('curso')
    ]);
    expect(await emolumentoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await emolumentoUpdatePage.getMontanteInput()).to.eq('5', 'Expected montante value to be equals to 5');
    expect(await emolumentoUpdatePage.getMontanteMultaInput()).to.eq('5', 'Expected montanteMulta value to be equals to 5');
    expect(await emolumentoUpdatePage.getTempoMultaInput()).to.eq('5', 'Expected tempoMulta value to be equals to 5');
    expect(await emolumentoUpdatePage.getQuantidadeInput()).to.eq('5', 'Expected quantidade value to be equals to 5');
    expect(await emolumentoUpdatePage.getTurnoInput()).to.eq('turno', 'Expected Turno value to be equals to turno');
    expect(await emolumentoUpdatePage.getClasseInput()).to.eq('5', 'Expected classe value to be equals to 5');
    expect(await emolumentoUpdatePage.getCursoInput()).to.eq('curso', 'Expected Curso value to be equals to curso');
    await emolumentoUpdatePage.save();
    expect(await emolumentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await emolumentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Emolumento', async () => {
    const nbButtonsBeforeDelete = await emolumentoComponentsPage.countDeleteButtons();
    await emolumentoComponentsPage.clickOnLastDeleteButton();

    emolumentoDeleteDialog = new EmolumentoDeleteDialog();
    expect(await emolumentoDeleteDialog.getDialogTitle()).to.eq('educacaoApp.secretariaEmolumento.delete.question');
    await emolumentoDeleteDialog.clickOnConfirmButton();

    expect(await emolumentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
