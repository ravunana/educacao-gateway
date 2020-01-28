import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  DepositoComponentsPage,
  /* DepositoDeleteDialog,
   */ DepositoUpdatePage
} from './deposito.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Deposito e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let depositoComponentsPage: DepositoComponentsPage;
  let depositoUpdatePage: DepositoUpdatePage;
  /* let depositoDeleteDialog: DepositoDeleteDialog; */
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

  it('should load Depositos', async () => {
    await navBarPage.goToEntity('deposito');
    depositoComponentsPage = new DepositoComponentsPage();
    await browser.wait(ec.visibilityOf(depositoComponentsPage.title), 5000);
    expect(await depositoComponentsPage.getTitle()).to.eq('educacaoApp.secretariaDeposito.home.title');
  });

  it('should load create Deposito page', async () => {
    await depositoComponentsPage.clickOnCreateButton();
    depositoUpdatePage = new DepositoUpdatePage();
    expect(await depositoUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaDeposito.home.createOrEditLabel');
    await depositoUpdatePage.cancel();
  });

  /*  it('should create and save Depositos', async () => {
        const nbButtonsBeforeCreate = await depositoComponentsPage.countDeleteButtons();

        await depositoComponentsPage.clickOnCreateButton();
        await promise.all([
            depositoUpdatePage.setNumeroInput('numero'),
            depositoUpdatePage.setDataDepositoInput('2000-12-31'),
            depositoUpdatePage.setMontanteInput('5'),
            depositoUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            depositoUpdatePage.setAnexoInput(absolutePath),
            depositoUpdatePage.setNumeroProcessoInput('numeroProcesso'),
            depositoUpdatePage.setMeioLiquidacaoInput('meioLiquidacao'),
            depositoUpdatePage.bancoCaixaSelectLastOption(),
        ]);
        expect(await depositoUpdatePage.getNumeroInput()).to.eq('numero', 'Expected Numero value to be equals to numero');
        expect(await depositoUpdatePage.getDataDepositoInput()).to.eq('2000-12-31', 'Expected dataDeposito value to be equals to 2000-12-31');
        expect(await depositoUpdatePage.getMontanteInput()).to.eq('5', 'Expected montante value to be equals to 5');
        expect(await depositoUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        expect(await depositoUpdatePage.getAnexoInput()).to.endsWith(fileNameToUpload, 'Expected Anexo value to be end with ' + fileNameToUpload);
        expect(await depositoUpdatePage.getNumeroProcessoInput()).to.eq('numeroProcesso', 'Expected NumeroProcesso value to be equals to numeroProcesso');
        expect(await depositoUpdatePage.getMeioLiquidacaoInput()).to.eq('meioLiquidacao', 'Expected MeioLiquidacao value to be equals to meioLiquidacao');
        await depositoUpdatePage.save();
        expect(await depositoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await depositoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Deposito', async () => {
        const nbButtonsBeforeDelete = await depositoComponentsPage.countDeleteButtons();
        await depositoComponentsPage.clickOnLastDeleteButton();

        depositoDeleteDialog = new DepositoDeleteDialog();
        expect(await depositoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.secretariaDeposito.delete.question');
        await depositoDeleteDialog.clickOnConfirmButton();

        expect(await depositoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
