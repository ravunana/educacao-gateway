import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  EncarregadoEducaoComponentsPage,
  EncarregadoEducaoDeleteDialog,
  EncarregadoEducaoUpdatePage
} from './encarregado-educao.page-object';

const expect = chai.expect;

describe('EncarregadoEducao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let encarregadoEducaoComponentsPage: EncarregadoEducaoComponentsPage;
  let encarregadoEducaoUpdatePage: EncarregadoEducaoUpdatePage;
  let encarregadoEducaoDeleteDialog: EncarregadoEducaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EncarregadoEducaos', async () => {
    await navBarPage.goToEntity('encarregado-educao');
    encarregadoEducaoComponentsPage = new EncarregadoEducaoComponentsPage();
    await browser.wait(ec.visibilityOf(encarregadoEducaoComponentsPage.title), 5000);
    expect(await encarregadoEducaoComponentsPage.getTitle()).to.eq('educacaoApp.secretariaEncarregadoEducao.home.title');
  });

  it('should load create EncarregadoEducao page', async () => {
    await encarregadoEducaoComponentsPage.clickOnCreateButton();
    encarregadoEducaoUpdatePage = new EncarregadoEducaoUpdatePage();
    expect(await encarregadoEducaoUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaEncarregadoEducao.home.createOrEditLabel');
    await encarregadoEducaoUpdatePage.cancel();
  });

  it('should create and save EncarregadoEducaos', async () => {
    const nbButtonsBeforeCreate = await encarregadoEducaoComponentsPage.countDeleteButtons();

    await encarregadoEducaoComponentsPage.clickOnCreateButton();
    await promise.all([
      encarregadoEducaoUpdatePage.setNomeInput('nome'),
      encarregadoEducaoUpdatePage.setSexoInput('sexo'),
      encarregadoEducaoUpdatePage.setNifInput('nif'),
      encarregadoEducaoUpdatePage.setNumeroIdentificacaoInput('numeroIdentificacao'),
      encarregadoEducaoUpdatePage.setResidenciaInput('residencia'),
      encarregadoEducaoUpdatePage.setContactoPessoalInput('contactoPessoal'),
      encarregadoEducaoUpdatePage.setContactoTrabalhoInput('contactoTrabalho'),
      encarregadoEducaoUpdatePage.setContactoResidenciaInput('contactoResidencia'),
      encarregadoEducaoUpdatePage.setEmailInput('email'),
      encarregadoEducaoUpdatePage.setLocalTrabalhoInput('localTrabalho'),
      encarregadoEducaoUpdatePage.setCargoInput('cargo'),
      encarregadoEducaoUpdatePage.setSalarioInput('5'),
      encarregadoEducaoUpdatePage.setGrauParentescoInput('grauParentesco')
    ]);
    expect(await encarregadoEducaoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await encarregadoEducaoUpdatePage.getSexoInput()).to.eq('sexo', 'Expected Sexo value to be equals to sexo');
    expect(await encarregadoEducaoUpdatePage.getNifInput()).to.eq('nif', 'Expected Nif value to be equals to nif');
    expect(await encarregadoEducaoUpdatePage.getNumeroIdentificacaoInput()).to.eq(
      'numeroIdentificacao',
      'Expected NumeroIdentificacao value to be equals to numeroIdentificacao'
    );
    expect(await encarregadoEducaoUpdatePage.getResidenciaInput()).to.eq(
      'residencia',
      'Expected Residencia value to be equals to residencia'
    );
    expect(await encarregadoEducaoUpdatePage.getContactoPessoalInput()).to.eq(
      'contactoPessoal',
      'Expected ContactoPessoal value to be equals to contactoPessoal'
    );
    expect(await encarregadoEducaoUpdatePage.getContactoTrabalhoInput()).to.eq(
      'contactoTrabalho',
      'Expected ContactoTrabalho value to be equals to contactoTrabalho'
    );
    expect(await encarregadoEducaoUpdatePage.getContactoResidenciaInput()).to.eq(
      'contactoResidencia',
      'Expected ContactoResidencia value to be equals to contactoResidencia'
    );
    expect(await encarregadoEducaoUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await encarregadoEducaoUpdatePage.getLocalTrabalhoInput()).to.eq(
      'localTrabalho',
      'Expected LocalTrabalho value to be equals to localTrabalho'
    );
    expect(await encarregadoEducaoUpdatePage.getCargoInput()).to.eq('cargo', 'Expected Cargo value to be equals to cargo');
    expect(await encarregadoEducaoUpdatePage.getSalarioInput()).to.eq('5', 'Expected salario value to be equals to 5');
    expect(await encarregadoEducaoUpdatePage.getGrauParentescoInput()).to.eq(
      'grauParentesco',
      'Expected GrauParentesco value to be equals to grauParentesco'
    );
    await encarregadoEducaoUpdatePage.save();
    expect(await encarregadoEducaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await encarregadoEducaoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EncarregadoEducao', async () => {
    const nbButtonsBeforeDelete = await encarregadoEducaoComponentsPage.countDeleteButtons();
    await encarregadoEducaoComponentsPage.clickOnLastDeleteButton();

    encarregadoEducaoDeleteDialog = new EncarregadoEducaoDeleteDialog();
    expect(await encarregadoEducaoDeleteDialog.getDialogTitle()).to.eq('educacaoApp.secretariaEncarregadoEducao.delete.question');
    await encarregadoEducaoDeleteDialog.clickOnConfirmButton();

    expect(await encarregadoEducaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
