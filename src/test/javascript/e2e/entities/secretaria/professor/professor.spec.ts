import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProfessorComponentsPage, ProfessorDeleteDialog, ProfessorUpdatePage } from './professor.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Professor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let professorComponentsPage: ProfessorComponentsPage;
  let professorUpdatePage: ProfessorUpdatePage;
  let professorDeleteDialog: ProfessorDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Professors', async () => {
    await navBarPage.goToEntity('professor');
    professorComponentsPage = new ProfessorComponentsPage();
    await browser.wait(ec.visibilityOf(professorComponentsPage.title), 5000);
    expect(await professorComponentsPage.getTitle()).to.eq('educacaoApp.secretariaProfessor.home.title');
  });

  it('should load create Professor page', async () => {
    await professorComponentsPage.clickOnCreateButton();
    professorUpdatePage = new ProfessorUpdatePage();
    expect(await professorUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaProfessor.home.createOrEditLabel');
    await professorUpdatePage.cancel();
  });

  it('should create and save Professors', async () => {
    const nbButtonsBeforeCreate = await professorComponentsPage.countDeleteButtons();

    await professorComponentsPage.clickOnCreateButton();
    await promise.all([
      professorUpdatePage.setNomeInput('nome'),
      professorUpdatePage.setSexoInput('sexo'),
      professorUpdatePage.setFotografiaInput(absolutePath),
      professorUpdatePage.setContactoInput('contacto'),
      professorUpdatePage.setEmailInput('email'),
      professorUpdatePage.setResidenciaInput('residencia'),
      professorUpdatePage.setNumeroAgenteInput('numeroAgente'),
      professorUpdatePage.setUtilizadorIdInput('utilizadorId'),
      professorUpdatePage.setGrauAcademicoInput('grauAcademico'),
      professorUpdatePage.setCursoAcademicoInput('cursoAcademico'),
      professorUpdatePage.setObservacaoInput('observacao')
    ]);
    expect(await professorUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await professorUpdatePage.getSexoInput()).to.eq('sexo', 'Expected Sexo value to be equals to sexo');
    expect(await professorUpdatePage.getFotografiaInput()).to.endsWith(
      fileNameToUpload,
      'Expected Fotografia value to be end with ' + fileNameToUpload
    );
    expect(await professorUpdatePage.getContactoInput()).to.eq('contacto', 'Expected Contacto value to be equals to contacto');
    expect(await professorUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await professorUpdatePage.getResidenciaInput()).to.eq('residencia', 'Expected Residencia value to be equals to residencia');
    expect(await professorUpdatePage.getNumeroAgenteInput()).to.eq(
      'numeroAgente',
      'Expected NumeroAgente value to be equals to numeroAgente'
    );
    expect(await professorUpdatePage.getUtilizadorIdInput()).to.eq(
      'utilizadorId',
      'Expected UtilizadorId value to be equals to utilizadorId'
    );
    expect(await professorUpdatePage.getGrauAcademicoInput()).to.eq(
      'grauAcademico',
      'Expected GrauAcademico value to be equals to grauAcademico'
    );
    expect(await professorUpdatePage.getCursoAcademicoInput()).to.eq(
      'cursoAcademico',
      'Expected CursoAcademico value to be equals to cursoAcademico'
    );
    expect(await professorUpdatePage.getObservacaoInput()).to.eq('observacao', 'Expected Observacao value to be equals to observacao');
    const selectedAtivo = professorUpdatePage.getAtivoInput();
    if (await selectedAtivo.isSelected()) {
      await professorUpdatePage.getAtivoInput().click();
      expect(await professorUpdatePage.getAtivoInput().isSelected(), 'Expected ativo not to be selected').to.be.false;
    } else {
      await professorUpdatePage.getAtivoInput().click();
      expect(await professorUpdatePage.getAtivoInput().isSelected(), 'Expected ativo to be selected').to.be.true;
    }
    await professorUpdatePage.save();
    expect(await professorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await professorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Professor', async () => {
    const nbButtonsBeforeDelete = await professorComponentsPage.countDeleteButtons();
    await professorComponentsPage.clickOnLastDeleteButton();

    professorDeleteDialog = new ProfessorDeleteDialog();
    expect(await professorDeleteDialog.getDialogTitle()).to.eq('educacaoApp.secretariaProfessor.delete.question');
    await professorDeleteDialog.clickOnConfirmButton();

    expect(await professorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
