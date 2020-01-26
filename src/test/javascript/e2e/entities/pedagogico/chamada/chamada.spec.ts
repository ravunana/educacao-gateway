import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ChamadaComponentsPage,
  /* ChamadaDeleteDialog,
   */ ChamadaUpdatePage
} from './chamada.page-object';

const expect = chai.expect;

describe('Chamada e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chamadaComponentsPage: ChamadaComponentsPage;
  let chamadaUpdatePage: ChamadaUpdatePage;
  /* let chamadaDeleteDialog: ChamadaDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Chamadas', async () => {
    await navBarPage.goToEntity('chamada');
    chamadaComponentsPage = new ChamadaComponentsPage();
    await browser.wait(ec.visibilityOf(chamadaComponentsPage.title), 5000);
    expect(await chamadaComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoChamada.home.title');
  });

  it('should load create Chamada page', async () => {
    await chamadaComponentsPage.clickOnCreateButton();
    chamadaUpdatePage = new ChamadaUpdatePage();
    expect(await chamadaUpdatePage.getPageTitle()).to.eq('educacaoApp.pedagogicoChamada.home.createOrEditLabel');
    await chamadaUpdatePage.cancel();
  });

  /*  it('should create and save Chamadas', async () => {
        const nbButtonsBeforeCreate = await chamadaComponentsPage.countDeleteButtons();

        await chamadaComponentsPage.clickOnCreateButton();
        await promise.all([
            chamadaUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            chamadaUpdatePage.setNumeroProcessoInput('numeroProcesso'),
            chamadaUpdatePage.aulaSelectLastOption(),
        ]);
        expect(await chamadaUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        const selectedPresente = chamadaUpdatePage.getPresenteInput();
        if (await selectedPresente.isSelected()) {
            await chamadaUpdatePage.getPresenteInput().click();
            expect(await chamadaUpdatePage.getPresenteInput().isSelected(), 'Expected presente not to be selected').to.be.false;
        } else {
            await chamadaUpdatePage.getPresenteInput().click();
            expect(await chamadaUpdatePage.getPresenteInput().isSelected(), 'Expected presente to be selected').to.be.true;
        }
        expect(await chamadaUpdatePage.getNumeroProcessoInput()).to.eq('numeroProcesso', 'Expected NumeroProcesso value to be equals to numeroProcesso');
        await chamadaUpdatePage.save();
        expect(await chamadaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await chamadaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Chamada', async () => {
        const nbButtonsBeforeDelete = await chamadaComponentsPage.countDeleteButtons();
        await chamadaComponentsPage.clickOnLastDeleteButton();

        chamadaDeleteDialog = new ChamadaDeleteDialog();
        expect(await chamadaDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pedagogicoChamada.delete.question');
        await chamadaDeleteDialog.clickOnConfirmButton();

        expect(await chamadaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
