import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { CaixaComponentsPage, CaixaDeleteDialog, CaixaUpdatePage } from './caixa.page-object';

const expect = chai.expect;

describe('Caixa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let caixaComponentsPage: CaixaComponentsPage;
  let caixaUpdatePage: CaixaUpdatePage;
  let caixaDeleteDialog: CaixaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Caixas', async () => {
    await navBarPage.goToEntity('caixa');
    caixaComponentsPage = new CaixaComponentsPage();
    await browser.wait(ec.visibilityOf(caixaComponentsPage.title), 5000);
    expect(await caixaComponentsPage.getTitle()).to.eq('educacaoApp.pagamentoCaixa.home.title');
  });

  it('should load create Caixa page', async () => {
    await caixaComponentsPage.clickOnCreateButton();
    caixaUpdatePage = new CaixaUpdatePage();
    expect(await caixaUpdatePage.getPageTitle()).to.eq('educacaoApp.pagamentoCaixa.home.createOrEditLabel');
    await caixaUpdatePage.cancel();
  });

  it('should create and save Caixas', async () => {
    const nbButtonsBeforeCreate = await caixaComponentsPage.countDeleteButtons();

    await caixaComponentsPage.clickOnCreateButton();
    await promise.all([
      caixaUpdatePage.setDescricaoInput('descricao'),
      caixaUpdatePage.setProprietarioInput('proprietario'),
      caixaUpdatePage.setNumeroContaInput('numeroConta'),
      caixaUpdatePage.setIbanInput('iban')
    ]);
    expect(await caixaUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    expect(await caixaUpdatePage.getProprietarioInput()).to.eq('proprietario', 'Expected Proprietario value to be equals to proprietario');
    expect(await caixaUpdatePage.getNumeroContaInput()).to.eq('numeroConta', 'Expected NumeroConta value to be equals to numeroConta');
    expect(await caixaUpdatePage.getIbanInput()).to.eq('iban', 'Expected Iban value to be equals to iban');
    const selectedAtivo = caixaUpdatePage.getAtivoInput();
    if (await selectedAtivo.isSelected()) {
      await caixaUpdatePage.getAtivoInput().click();
      expect(await caixaUpdatePage.getAtivoInput().isSelected(), 'Expected ativo not to be selected').to.be.false;
    } else {
      await caixaUpdatePage.getAtivoInput().click();
      expect(await caixaUpdatePage.getAtivoInput().isSelected(), 'Expected ativo to be selected').to.be.true;
    }
    await caixaUpdatePage.save();
    expect(await caixaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await caixaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Caixa', async () => {
    const nbButtonsBeforeDelete = await caixaComponentsPage.countDeleteButtons();
    await caixaComponentsPage.clickOnLastDeleteButton();

    caixaDeleteDialog = new CaixaDeleteDialog();
    expect(await caixaDeleteDialog.getDialogTitle()).to.eq('educacaoApp.pagamentoCaixa.delete.question');
    await caixaDeleteDialog.clickOnConfirmButton();

    expect(await caixaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
