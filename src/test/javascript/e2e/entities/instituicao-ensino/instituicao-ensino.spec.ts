import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  InstituicaoEnsinoComponentsPage,
  InstituicaoEnsinoDeleteDialog,
  InstituicaoEnsinoUpdatePage
} from './instituicao-ensino.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('InstituicaoEnsino e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let instituicaoEnsinoComponentsPage: InstituicaoEnsinoComponentsPage;
  let instituicaoEnsinoUpdatePage: InstituicaoEnsinoUpdatePage;
  let instituicaoEnsinoDeleteDialog: InstituicaoEnsinoDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load InstituicaoEnsinos', async () => {
    await navBarPage.goToEntity('instituicao-ensino');
    instituicaoEnsinoComponentsPage = new InstituicaoEnsinoComponentsPage();
    await browser.wait(ec.visibilityOf(instituicaoEnsinoComponentsPage.title), 5000);
    expect(await instituicaoEnsinoComponentsPage.getTitle()).to.eq('educacaoApp.instituicaoEnsino.home.title');
  });

  it('should load create InstituicaoEnsino page', async () => {
    await instituicaoEnsinoComponentsPage.clickOnCreateButton();
    instituicaoEnsinoUpdatePage = new InstituicaoEnsinoUpdatePage();
    expect(await instituicaoEnsinoUpdatePage.getPageTitle()).to.eq('educacaoApp.instituicaoEnsino.home.createOrEditLabel');
    await instituicaoEnsinoUpdatePage.cancel();
  });

  it('should create and save InstituicaoEnsinos', async () => {
    const nbButtonsBeforeCreate = await instituicaoEnsinoComponentsPage.countDeleteButtons();

    await instituicaoEnsinoComponentsPage.clickOnCreateButton();
    await promise.all([
      instituicaoEnsinoUpdatePage.setNomeInput('nome'),
      instituicaoEnsinoUpdatePage.setLogotipoInput(absolutePath),
      instituicaoEnsinoUpdatePage.setFundacaoInput('2000-12-31'),
      instituicaoEnsinoUpdatePage.setFundadorInput('fundador'),
      instituicaoEnsinoUpdatePage.setNumeroInput('numero'),
      instituicaoEnsinoUpdatePage.setDimensaoInput('dimensao'),
      instituicaoEnsinoUpdatePage.setTipoVinculoInput('tipoVinculo'),
      instituicaoEnsinoUpdatePage.setUnidadePagadoraInput('unidadePagadora'),
      instituicaoEnsinoUpdatePage.setTipoInstalacaoInput('tipoInstalacao'),
      instituicaoEnsinoUpdatePage.setProvinciaInput('provincia'),
      instituicaoEnsinoUpdatePage.setMunicipioInput('municipio'),
      instituicaoEnsinoUpdatePage.setBairroInput('bairro'),
      instituicaoEnsinoUpdatePage.setRuaInput('rua'),
      instituicaoEnsinoUpdatePage.setQuarteiraoInput('quarteirao'),
      instituicaoEnsinoUpdatePage.setNumeroPortaInput('numeroPorta'),
      instituicaoEnsinoUpdatePage.hierarquiaSelectLastOption()
    ]);
    expect(await instituicaoEnsinoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await instituicaoEnsinoUpdatePage.getLogotipoInput()).to.endsWith(
      fileNameToUpload,
      'Expected Logotipo value to be end with ' + fileNameToUpload
    );
    expect(await instituicaoEnsinoUpdatePage.getFundacaoInput()).to.eq('2000-12-31', 'Expected fundacao value to be equals to 2000-12-31');
    expect(await instituicaoEnsinoUpdatePage.getFundadorInput()).to.eq('fundador', 'Expected Fundador value to be equals to fundador');
    expect(await instituicaoEnsinoUpdatePage.getNumeroInput()).to.eq('numero', 'Expected Numero value to be equals to numero');
    expect(await instituicaoEnsinoUpdatePage.getDimensaoInput()).to.eq('dimensao', 'Expected Dimensao value to be equals to dimensao');
    const selectedSede = instituicaoEnsinoUpdatePage.getSedeInput();
    if (await selectedSede.isSelected()) {
      await instituicaoEnsinoUpdatePage.getSedeInput().click();
      expect(await instituicaoEnsinoUpdatePage.getSedeInput().isSelected(), 'Expected sede not to be selected').to.be.false;
    } else {
      await instituicaoEnsinoUpdatePage.getSedeInput().click();
      expect(await instituicaoEnsinoUpdatePage.getSedeInput().isSelected(), 'Expected sede to be selected').to.be.true;
    }
    expect(await instituicaoEnsinoUpdatePage.getTipoVinculoInput()).to.eq(
      'tipoVinculo',
      'Expected TipoVinculo value to be equals to tipoVinculo'
    );
    expect(await instituicaoEnsinoUpdatePage.getUnidadePagadoraInput()).to.eq(
      'unidadePagadora',
      'Expected UnidadePagadora value to be equals to unidadePagadora'
    );
    expect(await instituicaoEnsinoUpdatePage.getTipoInstalacaoInput()).to.eq(
      'tipoInstalacao',
      'Expected TipoInstalacao value to be equals to tipoInstalacao'
    );
    expect(await instituicaoEnsinoUpdatePage.getProvinciaInput()).to.eq('provincia', 'Expected Provincia value to be equals to provincia');
    expect(await instituicaoEnsinoUpdatePage.getMunicipioInput()).to.eq('municipio', 'Expected Municipio value to be equals to municipio');
    expect(await instituicaoEnsinoUpdatePage.getBairroInput()).to.eq('bairro', 'Expected Bairro value to be equals to bairro');
    expect(await instituicaoEnsinoUpdatePage.getRuaInput()).to.eq('rua', 'Expected Rua value to be equals to rua');
    expect(await instituicaoEnsinoUpdatePage.getQuarteiraoInput()).to.eq(
      'quarteirao',
      'Expected Quarteirao value to be equals to quarteirao'
    );
    expect(await instituicaoEnsinoUpdatePage.getNumeroPortaInput()).to.eq(
      'numeroPorta',
      'Expected NumeroPorta value to be equals to numeroPorta'
    );
    await instituicaoEnsinoUpdatePage.save();
    expect(await instituicaoEnsinoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await instituicaoEnsinoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last InstituicaoEnsino', async () => {
    const nbButtonsBeforeDelete = await instituicaoEnsinoComponentsPage.countDeleteButtons();
    await instituicaoEnsinoComponentsPage.clickOnLastDeleteButton();

    instituicaoEnsinoDeleteDialog = new InstituicaoEnsinoDeleteDialog();
    expect(await instituicaoEnsinoDeleteDialog.getDialogTitle()).to.eq('educacaoApp.instituicaoEnsino.delete.question');
    await instituicaoEnsinoDeleteDialog.clickOnConfirmButton();

    expect(await instituicaoEnsinoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
