import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  TesteConhecimentoComponentsPage,
  /* TesteConhecimentoDeleteDialog,
   */ TesteConhecimentoUpdatePage
} from './teste-conhecimento.page-object';

const expect = chai.expect;

describe('TesteConhecimento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let testeConhecimentoComponentsPage: TesteConhecimentoComponentsPage;
  let testeConhecimentoUpdatePage: TesteConhecimentoUpdatePage;
  /* let testeConhecimentoDeleteDialog: TesteConhecimentoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TesteConhecimentos', async () => {
    await navBarPage.goToEntity('teste-conhecimento');
    testeConhecimentoComponentsPage = new TesteConhecimentoComponentsPage();
    await browser.wait(ec.visibilityOf(testeConhecimentoComponentsPage.title), 5000);
    expect(await testeConhecimentoComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoTesteConhecimento.home.title');
  });

  it('should load create TesteConhecimento page', async () => {
    await testeConhecimentoComponentsPage.clickOnCreateButton();
    testeConhecimentoUpdatePage = new TesteConhecimentoUpdatePage();
    expect(await testeConhecimentoUpdatePage.getPageTitle()).to.eq('educacaoApp.pedagogicoTesteConhecimento.home.createOrEditLabel');
    await testeConhecimentoUpdatePage.cancel();
  });

  /*  it('should create and save TesteConhecimentos', async () => {
        const nbButtonsBeforeCreate = await testeConhecimentoComponentsPage.countDeleteButtons();

        await testeConhecimentoComponentsPage.clickOnCreateButton();
        await promise.all([
            testeConhecimentoUpdatePage.setCategoriaInput('categoria'),
            testeConhecimentoUpdatePage.setPeriodoLectivoInput('periodoLectivo'),
            testeConhecimentoUpdatePage.setDuracaoInput('5'),
            testeConhecimentoUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            testeConhecimentoUpdatePage.curriculoSelectLastOption(),
            testeConhecimentoUpdatePage.turmaSelectLastOption(),
            testeConhecimentoUpdatePage.professorSelectLastOption(),
        ]);
        expect(await testeConhecimentoUpdatePage.getCategoriaInput()).to.eq('categoria', 'Expected Categoria value to be equals to categoria');
        expect(await testeConhecimentoUpdatePage.getPeriodoLectivoInput()).to.eq('periodoLectivo', 'Expected PeriodoLectivo value to be equals to periodoLectivo');
        expect(await testeConhecimentoUpdatePage.getDuracaoInput()).to.eq('5', 'Expected duracao value to be equals to 5');
        expect(await testeConhecimentoUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        await testeConhecimentoUpdatePage.save();
        expect(await testeConhecimentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await testeConhecimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last TesteConhecimento', async () => {
        const nbButtonsBeforeDelete = await testeConhecimentoComponentsPage.countDeleteButtons();
        await testeConhecimentoComponentsPage.clickOnLastDeleteButton();

        testeConhecimentoDeleteDialog = new TesteConhecimentoDeleteDialog();
        expect(await testeConhecimentoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pedagogicoTesteConhecimento.delete.question');
        await testeConhecimentoDeleteDialog.clickOnConfirmButton();

        expect(await testeConhecimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
