import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  TurmaComponentsPage,
  /* TurmaDeleteDialog,
   */ TurmaUpdatePage
} from './turma.page-object';

const expect = chai.expect;

describe('Turma e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let turmaComponentsPage: TurmaComponentsPage;
  let turmaUpdatePage: TurmaUpdatePage;
  /* let turmaDeleteDialog: TurmaDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Turmas', async () => {
    await navBarPage.goToEntity('turma');
    turmaComponentsPage = new TurmaComponentsPage();
    await browser.wait(ec.visibilityOf(turmaComponentsPage.title), 5000);
    expect(await turmaComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoTurma.home.title');
  });

  it('should load create Turma page', async () => {
    await turmaComponentsPage.clickOnCreateButton();
    turmaUpdatePage = new TurmaUpdatePage();
    expect(await turmaUpdatePage.getPageTitle()).to.eq('educacaoApp.pedagogicoTurma.home.createOrEditLabel');
    await turmaUpdatePage.cancel();
  });

  /*  it('should create and save Turmas', async () => {
        const nbButtonsBeforeCreate = await turmaComponentsPage.countDeleteButtons();

        await turmaComponentsPage.clickOnCreateButton();
        await promise.all([
            turmaUpdatePage.setDescricaoInput('descricao'),
            turmaUpdatePage.setAnoLectivoInput('5'),
            turmaUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            turmaUpdatePage.setAberturaInput('2000-12-31'),
            turmaUpdatePage.setEncerramentoInput('2000-12-31'),
            turmaUpdatePage.setLotacaoInput('5'),
            turmaUpdatePage.setPeriodoLectivoInput('periodoLectivo'),
            turmaUpdatePage.setTurnoInput('turno'),
            turmaUpdatePage.setSalaInput('5'),
            turmaUpdatePage.setClasseInput('5'),
            turmaUpdatePage.cursoSelectLastOption(),
            turmaUpdatePage.coordenadorSelectLastOption(),
        ]);
        expect(await turmaUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
        expect(await turmaUpdatePage.getAnoLectivoInput()).to.eq('5', 'Expected anoLectivo value to be equals to 5');
        expect(await turmaUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        expect(await turmaUpdatePage.getAberturaInput()).to.eq('2000-12-31', 'Expected abertura value to be equals to 2000-12-31');
        expect(await turmaUpdatePage.getEncerramentoInput()).to.eq('2000-12-31', 'Expected encerramento value to be equals to 2000-12-31');
        expect(await turmaUpdatePage.getLotacaoInput()).to.eq('5', 'Expected lotacao value to be equals to 5');
        const selectedAberta = turmaUpdatePage.getAbertaInput();
        if (await selectedAberta.isSelected()) {
            await turmaUpdatePage.getAbertaInput().click();
            expect(await turmaUpdatePage.getAbertaInput().isSelected(), 'Expected aberta not to be selected').to.be.false;
        } else {
            await turmaUpdatePage.getAbertaInput().click();
            expect(await turmaUpdatePage.getAbertaInput().isSelected(), 'Expected aberta to be selected').to.be.true;
        }
        expect(await turmaUpdatePage.getPeriodoLectivoInput()).to.eq('periodoLectivo', 'Expected PeriodoLectivo value to be equals to periodoLectivo');
        expect(await turmaUpdatePage.getTurnoInput()).to.eq('turno', 'Expected Turno value to be equals to turno');
        expect(await turmaUpdatePage.getSalaInput()).to.eq('5', 'Expected sala value to be equals to 5');
        expect(await turmaUpdatePage.getClasseInput()).to.eq('5', 'Expected classe value to be equals to 5');
        await turmaUpdatePage.save();
        expect(await turmaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await turmaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Turma', async () => {
        const nbButtonsBeforeDelete = await turmaComponentsPage.countDeleteButtons();
        await turmaComponentsPage.clickOnLastDeleteButton();

        turmaDeleteDialog = new TurmaDeleteDialog();
        expect(await turmaDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pedagogicoTurma.delete.question');
        await turmaDeleteDialog.clickOnConfirmButton();

        expect(await turmaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
