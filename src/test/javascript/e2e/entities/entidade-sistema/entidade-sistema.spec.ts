import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EntidadeSistemaComponentsPage, EntidadeSistemaDeleteDialog, EntidadeSistemaUpdatePage } from './entidade-sistema.page-object';

const expect = chai.expect;

describe('EntidadeSistema e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let entidadeSistemaComponentsPage: EntidadeSistemaComponentsPage;
  let entidadeSistemaUpdatePage: EntidadeSistemaUpdatePage;
  let entidadeSistemaDeleteDialog: EntidadeSistemaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EntidadeSistemas', async () => {
    await navBarPage.goToEntity('entidade-sistema');
    entidadeSistemaComponentsPage = new EntidadeSistemaComponentsPage();
    await browser.wait(ec.visibilityOf(entidadeSistemaComponentsPage.title), 5000);
    expect(await entidadeSistemaComponentsPage.getTitle()).to.eq('educacaoApp.entidadeSistema.home.title');
  });

  it('should load create EntidadeSistema page', async () => {
    await entidadeSistemaComponentsPage.clickOnCreateButton();
    entidadeSistemaUpdatePage = new EntidadeSistemaUpdatePage();
    expect(await entidadeSistemaUpdatePage.getPageTitle()).to.eq('educacaoApp.entidadeSistema.home.createOrEditLabel');
    await entidadeSistemaUpdatePage.cancel();
  });

  it('should create and save EntidadeSistemas', async () => {
    const nbButtonsBeforeCreate = await entidadeSistemaComponentsPage.countDeleteButtons();

    await entidadeSistemaComponentsPage.clickOnCreateButton();
    await promise.all([entidadeSistemaUpdatePage.setNomeInput('nome')]);
    expect(await entidadeSistemaUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    await entidadeSistemaUpdatePage.save();
    expect(await entidadeSistemaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await entidadeSistemaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EntidadeSistema', async () => {
    const nbButtonsBeforeDelete = await entidadeSistemaComponentsPage.countDeleteButtons();
    await entidadeSistemaComponentsPage.clickOnLastDeleteButton();

    entidadeSistemaDeleteDialog = new EntidadeSistemaDeleteDialog();
    expect(await entidadeSistemaDeleteDialog.getDialogTitle()).to.eq('educacaoApp.entidadeSistema.delete.question');
    await entidadeSistemaDeleteDialog.clickOnConfirmButton();

    expect(await entidadeSistemaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
