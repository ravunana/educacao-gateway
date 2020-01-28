import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  DosificacaoComponentsPage,
  /* DosificacaoDeleteDialog,
   */ DosificacaoUpdatePage
} from './dosificacao.page-object';

const expect = chai.expect;

describe('Dosificacao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dosificacaoComponentsPage: DosificacaoComponentsPage;
  let dosificacaoUpdatePage: DosificacaoUpdatePage;
  /* let dosificacaoDeleteDialog: DosificacaoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Dosificacaos', async () => {
    await navBarPage.goToEntity('dosificacao');
    dosificacaoComponentsPage = new DosificacaoComponentsPage();
    await browser.wait(ec.visibilityOf(dosificacaoComponentsPage.title), 5000);
    expect(await dosificacaoComponentsPage.getTitle()).to.eq('educacaoApp.secretariaDosificacao.home.title');
  });

  it('should load create Dosificacao page', async () => {
    await dosificacaoComponentsPage.clickOnCreateButton();
    dosificacaoUpdatePage = new DosificacaoUpdatePage();
    expect(await dosificacaoUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaDosificacao.home.createOrEditLabel');
    await dosificacaoUpdatePage.cancel();
  });

  /*  it('should create and save Dosificacaos', async () => {
        const nbButtonsBeforeCreate = await dosificacaoComponentsPage.countDeleteButtons();

        await dosificacaoComponentsPage.clickOnCreateButton();
        await promise.all([
            dosificacaoUpdatePage.setPeridoLectiveInput('peridoLective'),
            dosificacaoUpdatePage.setObjectivoGeralInput('objectivoGeral'),
            dosificacaoUpdatePage.setSemanaLectivaInput('5'),
            dosificacaoUpdatePage.setDeInput('2000-12-31'),
            dosificacaoUpdatePage.setAteInput('2000-12-31'),
            dosificacaoUpdatePage.setUnidadeTematicaInput('unidadeTematica'),
            dosificacaoUpdatePage.setConteudoInput('conteudo'),
            dosificacaoUpdatePage.setProcedimentoEnsinoInput('procedimentoEnsino'),
            dosificacaoUpdatePage.setRecursosDidaticosInput('recursosDidaticos'),
            dosificacaoUpdatePage.setTempoAulaInput('5'),
            dosificacaoUpdatePage.setFormaAvaliacaoInput('formaAvaliacao'),
            // dosificacaoUpdatePage.cursoSelectLastOption(),
            dosificacaoUpdatePage.curriuloSelectLastOption(),
        ]);
        expect(await dosificacaoUpdatePage.getPeridoLectiveInput()).to.eq('peridoLective', 'Expected PeridoLective value to be equals to peridoLective');
        expect(await dosificacaoUpdatePage.getObjectivoGeralInput()).to.eq('objectivoGeral', 'Expected ObjectivoGeral value to be equals to objectivoGeral');
        expect(await dosificacaoUpdatePage.getSemanaLectivaInput()).to.eq('5', 'Expected semanaLectiva value to be equals to 5');
        expect(await dosificacaoUpdatePage.getDeInput()).to.eq('2000-12-31', 'Expected de value to be equals to 2000-12-31');
        expect(await dosificacaoUpdatePage.getAteInput()).to.eq('2000-12-31', 'Expected ate value to be equals to 2000-12-31');
        expect(await dosificacaoUpdatePage.getUnidadeTematicaInput()).to.eq('unidadeTematica', 'Expected UnidadeTematica value to be equals to unidadeTematica');
        expect(await dosificacaoUpdatePage.getConteudoInput()).to.eq('conteudo', 'Expected Conteudo value to be equals to conteudo');
        expect(await dosificacaoUpdatePage.getProcedimentoEnsinoInput()).to.eq('procedimentoEnsino', 'Expected ProcedimentoEnsino value to be equals to procedimentoEnsino');
        expect(await dosificacaoUpdatePage.getRecursosDidaticosInput()).to.eq('recursosDidaticos', 'Expected RecursosDidaticos value to be equals to recursosDidaticos');
        expect(await dosificacaoUpdatePage.getTempoAulaInput()).to.eq('5', 'Expected tempoAula value to be equals to 5');
        expect(await dosificacaoUpdatePage.getFormaAvaliacaoInput()).to.eq('formaAvaliacao', 'Expected FormaAvaliacao value to be equals to formaAvaliacao');
        await dosificacaoUpdatePage.save();
        expect(await dosificacaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await dosificacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Dosificacao', async () => {
        const nbButtonsBeforeDelete = await dosificacaoComponentsPage.countDeleteButtons();
        await dosificacaoComponentsPage.clickOnLastDeleteButton();

        dosificacaoDeleteDialog = new DosificacaoDeleteDialog();
        expect(await dosificacaoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.secretariaDosificacao.delete.question');
        await dosificacaoDeleteDialog.clickOnConfirmButton();

        expect(await dosificacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
