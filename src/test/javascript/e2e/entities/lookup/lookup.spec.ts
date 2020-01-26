import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LookupComponentsPage,
  /* LookupDeleteDialog,
   */ LookupUpdatePage
} from './lookup.page-object';

const expect = chai.expect;

describe('Lookup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lookupComponentsPage: LookupComponentsPage;
  let lookupUpdatePage: LookupUpdatePage;
  /* let lookupDeleteDialog: LookupDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Lookups', async () => {
    await navBarPage.goToEntity('lookup');
    lookupComponentsPage = new LookupComponentsPage();
    await browser.wait(ec.visibilityOf(lookupComponentsPage.title), 5000);
    expect(await lookupComponentsPage.getTitle()).to.eq('educacaoApp.lookup.home.title');
  });

  it('should load create Lookup page', async () => {
    await lookupComponentsPage.clickOnCreateButton();
    lookupUpdatePage = new LookupUpdatePage();
    expect(await lookupUpdatePage.getPageTitle()).to.eq('educacaoApp.lookup.home.createOrEditLabel');
    await lookupUpdatePage.cancel();
  });

  /*  it('should create and save Lookups', async () => {
        const nbButtonsBeforeCreate = await lookupComponentsPage.countDeleteButtons();

        await lookupComponentsPage.clickOnCreateButton();
        await promise.all([
            lookupUpdatePage.setNomeInput('nome'),
            lookupUpdatePage.setSiglaInput('sigla'),
            lookupUpdatePage.setDescricaoInput('descricao'),
            lookupUpdatePage.entidadeSelectLastOption(),
        ]);
        expect(await lookupUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
        expect(await lookupUpdatePage.getSiglaInput()).to.eq('sigla', 'Expected Sigla value to be equals to sigla');
        expect(await lookupUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
        const selectedUsuario = lookupUpdatePage.getUsuarioInput();
        if (await selectedUsuario.isSelected()) {
            await lookupUpdatePage.getUsuarioInput().click();
            expect(await lookupUpdatePage.getUsuarioInput().isSelected(), 'Expected usuario not to be selected').to.be.false;
        } else {
            await lookupUpdatePage.getUsuarioInput().click();
            expect(await lookupUpdatePage.getUsuarioInput().isSelected(), 'Expected usuario to be selected').to.be.true;
        }
        await lookupUpdatePage.save();
        expect(await lookupUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await lookupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Lookup', async () => {
        const nbButtonsBeforeDelete = await lookupComponentsPage.countDeleteButtons();
        await lookupComponentsPage.clickOnLastDeleteButton();

        lookupDeleteDialog = new LookupDeleteDialog();
        expect(await lookupDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.lookup.delete.question');
        await lookupDeleteDialog.clickOnConfirmButton();

        expect(await lookupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
