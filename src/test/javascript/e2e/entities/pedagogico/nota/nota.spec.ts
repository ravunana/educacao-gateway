import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  NotaComponentsPage,
  /* NotaDeleteDialog,
   */ NotaUpdatePage
} from './nota.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Nota e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let notaComponentsPage: NotaComponentsPage;
  let notaUpdatePage: NotaUpdatePage;
  /* let notaDeleteDialog: NotaDeleteDialog; */
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

  it('should load Notas', async () => {
    await navBarPage.goToEntity('nota');
    notaComponentsPage = new NotaComponentsPage();
    await browser.wait(ec.visibilityOf(notaComponentsPage.title), 5000);
    expect(await notaComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoNota.home.title');
  });

  it('should load create Nota page', async () => {
    await notaComponentsPage.clickOnCreateButton();
    notaUpdatePage = new NotaUpdatePage();
    expect(await notaUpdatePage.getPageTitle()).to.eq('educacaoApp.pedagogicoNota.home.createOrEditLabel');
    await notaUpdatePage.cancel();
  });

  /*  it('should create and save Notas', async () => {
        const nbButtonsBeforeCreate = await notaComponentsPage.countDeleteButtons();

        await notaComponentsPage.clickOnCreateButton();
        await promise.all([
            notaUpdatePage.setNumeroProcessoInput('numeroProcesso'),
            notaUpdatePage.setNomeAlunoInput('nomeAluno'),
            notaUpdatePage.setDisciplinaInput('disciplina'),
            notaUpdatePage.setPeridoLectivoInput('peridoLectivo'),
            notaUpdatePage.setAnoLectivoInput('5'),
            notaUpdatePage.setFaltaJustificadaInput('5'),
            notaUpdatePage.setFaltaInjustificadaInput('5'),
            notaUpdatePage.setAvaliacaoContinucaInput('5'),
            notaUpdatePage.setPrimeiraProvaInput('5'),
            notaUpdatePage.setSegundaProvaInput('5'),
            notaUpdatePage.setExameInput('5'),
            notaUpdatePage.setRecursoInput('5'),
            notaUpdatePage.setExameEspecialInput('5'),
            notaUpdatePage.setProvaInput(absolutePath),
            notaUpdatePage.setSituacaoInput('situacao'),
            notaUpdatePage.turmaSelectLastOption(),
            notaUpdatePage.curriculoSelectLastOption(),
            notaUpdatePage.professorSelectLastOption(),
        ]);
        expect(await notaUpdatePage.getNumeroProcessoInput()).to.eq('numeroProcesso', 'Expected NumeroProcesso value to be equals to numeroProcesso');
        expect(await notaUpdatePage.getNomeAlunoInput()).to.eq('nomeAluno', 'Expected NomeAluno value to be equals to nomeAluno');
        expect(await notaUpdatePage.getDisciplinaInput()).to.eq('disciplina', 'Expected Disciplina value to be equals to disciplina');
        expect(await notaUpdatePage.getPeridoLectivoInput()).to.eq('peridoLectivo', 'Expected PeridoLectivo value to be equals to peridoLectivo');
        expect(await notaUpdatePage.getAnoLectivoInput()).to.eq('5', 'Expected anoLectivo value to be equals to 5');
        expect(await notaUpdatePage.getFaltaJustificadaInput()).to.eq('5', 'Expected faltaJustificada value to be equals to 5');
        expect(await notaUpdatePage.getFaltaInjustificadaInput()).to.eq('5', 'Expected faltaInjustificada value to be equals to 5');
        expect(await notaUpdatePage.getAvaliacaoContinucaInput()).to.eq('5', 'Expected avaliacaoContinuca value to be equals to 5');
        expect(await notaUpdatePage.getPrimeiraProvaInput()).to.eq('5', 'Expected primeiraProva value to be equals to 5');
        expect(await notaUpdatePage.getSegundaProvaInput()).to.eq('5', 'Expected segundaProva value to be equals to 5');
        expect(await notaUpdatePage.getExameInput()).to.eq('5', 'Expected exame value to be equals to 5');
        expect(await notaUpdatePage.getRecursoInput()).to.eq('5', 'Expected recurso value to be equals to 5');
        expect(await notaUpdatePage.getExameEspecialInput()).to.eq('5', 'Expected exameEspecial value to be equals to 5');
        expect(await notaUpdatePage.getProvaInput()).to.endsWith(fileNameToUpload, 'Expected Prova value to be end with ' + fileNameToUpload);
        expect(await notaUpdatePage.getSituacaoInput()).to.eq('situacao', 'Expected Situacao value to be equals to situacao');
        await notaUpdatePage.save();
        expect(await notaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await notaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Nota', async () => {
        const nbButtonsBeforeDelete = await notaComponentsPage.countDeleteButtons();
        await notaComponentsPage.clickOnLastDeleteButton();

        notaDeleteDialog = new NotaDeleteDialog();
        expect(await notaDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pedagogicoNota.delete.question');
        await notaDeleteDialog.clickOnConfirmButton();

        expect(await notaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
