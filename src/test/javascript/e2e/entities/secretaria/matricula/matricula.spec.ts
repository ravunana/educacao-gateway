import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  MatriculaComponentsPage,
  /* MatriculaDeleteDialog,
   */ MatriculaUpdatePage
} from './matricula.page-object';

const expect = chai.expect;

describe('Matricula e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let matriculaComponentsPage: MatriculaComponentsPage;
  let matriculaUpdatePage: MatriculaUpdatePage;
  /* let matriculaDeleteDialog: MatriculaDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Matriculas', async () => {
    await navBarPage.goToEntity('matricula');
    matriculaComponentsPage = new MatriculaComponentsPage();
    await browser.wait(ec.visibilityOf(matriculaComponentsPage.title), 5000);
    expect(await matriculaComponentsPage.getTitle()).to.eq('educacaoApp.secretariaMatricula.home.title');
  });

  it('should load create Matricula page', async () => {
    await matriculaComponentsPage.clickOnCreateButton();
    matriculaUpdatePage = new MatriculaUpdatePage();
    expect(await matriculaUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaMatricula.home.createOrEditLabel');
    await matriculaUpdatePage.cancel();
  });

  /*  it('should create and save Matriculas', async () => {
        const nbButtonsBeforeCreate = await matriculaComponentsPage.countDeleteButtons();

        await matriculaComponentsPage.clickOnCreateButton();
        await promise.all([
            matriculaUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            matriculaUpdatePage.setNumeroChamadaInput('5'),
            matriculaUpdatePage.setAnoLectivoInput('5'),
            matriculaUpdatePage.setObservacaoInput('observacao'),
            matriculaUpdatePage.setPeriodoLectivoInput('periodoLectivo'),
            matriculaUpdatePage.setTurmaInput('turma'),
            matriculaUpdatePage.setCursoInput('curso'),
            matriculaUpdatePage.setTurnoInput('turno'),
            matriculaUpdatePage.setSalaInput('5'),
            matriculaUpdatePage.setClasseInput('5'),
            matriculaUpdatePage.alunoSelectLastOption(),
            matriculaUpdatePage.categoriaSelectLastOption(),
        ]);
        expect(await matriculaUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        expect(await matriculaUpdatePage.getNumeroChamadaInput()).to.eq('5', 'Expected numeroChamada value to be equals to 5');
        expect(await matriculaUpdatePage.getAnoLectivoInput()).to.eq('5', 'Expected anoLectivo value to be equals to 5');
        const selectedFotografia = matriculaUpdatePage.getFotografiaInput();
        if (await selectedFotografia.isSelected()) {
            await matriculaUpdatePage.getFotografiaInput().click();
            expect(await matriculaUpdatePage.getFotografiaInput().isSelected(), 'Expected fotografia not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getFotografiaInput().click();
            expect(await matriculaUpdatePage.getFotografiaInput().isSelected(), 'Expected fotografia to be selected').to.be.true;
        }
        const selectedCertificado = matriculaUpdatePage.getCertificadoInput();
        if (await selectedCertificado.isSelected()) {
            await matriculaUpdatePage.getCertificadoInput().click();
            expect(await matriculaUpdatePage.getCertificadoInput().isSelected(), 'Expected certificado not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getCertificadoInput().click();
            expect(await matriculaUpdatePage.getCertificadoInput().isSelected(), 'Expected certificado to be selected').to.be.true;
        }
        const selectedDocumentoIdentificacao = matriculaUpdatePage.getDocumentoIdentificacaoInput();
        if (await selectedDocumentoIdentificacao.isSelected()) {
            await matriculaUpdatePage.getDocumentoIdentificacaoInput().click();
            expect(await matriculaUpdatePage.getDocumentoIdentificacaoInput().isSelected(), 'Expected documentoIdentificacao not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getDocumentoIdentificacaoInput().click();
            expect(await matriculaUpdatePage.getDocumentoIdentificacaoInput().isSelected(), 'Expected documentoIdentificacao to be selected').to.be.true;
        }
        const selectedResenciamentoMilitar = matriculaUpdatePage.getResenciamentoMilitarInput();
        if (await selectedResenciamentoMilitar.isSelected()) {
            await matriculaUpdatePage.getResenciamentoMilitarInput().click();
            expect(await matriculaUpdatePage.getResenciamentoMilitarInput().isSelected(), 'Expected resenciamentoMilitar not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getResenciamentoMilitarInput().click();
            expect(await matriculaUpdatePage.getResenciamentoMilitarInput().isSelected(), 'Expected resenciamentoMilitar to be selected').to.be.true;
        }
        const selectedDocumentoSaude = matriculaUpdatePage.getDocumentoSaudeInput();
        if (await selectedDocumentoSaude.isSelected()) {
            await matriculaUpdatePage.getDocumentoSaudeInput().click();
            expect(await matriculaUpdatePage.getDocumentoSaudeInput().isSelected(), 'Expected documentoSaude not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getDocumentoSaudeInput().click();
            expect(await matriculaUpdatePage.getDocumentoSaudeInput().isSelected(), 'Expected documentoSaude to be selected').to.be.true;
        }
        const selectedFichaTransferencia = matriculaUpdatePage.getFichaTransferenciaInput();
        if (await selectedFichaTransferencia.isSelected()) {
            await matriculaUpdatePage.getFichaTransferenciaInput().click();
            expect(await matriculaUpdatePage.getFichaTransferenciaInput().isSelected(), 'Expected fichaTransferencia not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getFichaTransferenciaInput().click();
            expect(await matriculaUpdatePage.getFichaTransferenciaInput().isSelected(), 'Expected fichaTransferencia to be selected').to.be.true;
        }
        const selectedHistoricoEscolar = matriculaUpdatePage.getHistoricoEscolarInput();
        if (await selectedHistoricoEscolar.isSelected()) {
            await matriculaUpdatePage.getHistoricoEscolarInput().click();
            expect(await matriculaUpdatePage.getHistoricoEscolarInput().isSelected(), 'Expected historicoEscolar not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getHistoricoEscolarInput().click();
            expect(await matriculaUpdatePage.getHistoricoEscolarInput().isSelected(), 'Expected historicoEscolar to be selected').to.be.true;
        }
        expect(await matriculaUpdatePage.getObservacaoInput()).to.eq('observacao', 'Expected Observacao value to be equals to observacao');
        const selectedConfirmacao = matriculaUpdatePage.getConfirmacaoInput();
        if (await selectedConfirmacao.isSelected()) {
            await matriculaUpdatePage.getConfirmacaoInput().click();
            expect(await matriculaUpdatePage.getConfirmacaoInput().isSelected(), 'Expected confirmacao not to be selected').to.be.false;
        } else {
            await matriculaUpdatePage.getConfirmacaoInput().click();
            expect(await matriculaUpdatePage.getConfirmacaoInput().isSelected(), 'Expected confirmacao to be selected').to.be.true;
        }
        expect(await matriculaUpdatePage.getPeriodoLectivoInput()).to.eq('periodoLectivo', 'Expected PeriodoLectivo value to be equals to periodoLectivo');
        expect(await matriculaUpdatePage.getTurmaInput()).to.eq('turma', 'Expected Turma value to be equals to turma');
        expect(await matriculaUpdatePage.getCursoInput()).to.eq('curso', 'Expected Curso value to be equals to curso');
        expect(await matriculaUpdatePage.getTurnoInput()).to.eq('turno', 'Expected Turno value to be equals to turno');
        expect(await matriculaUpdatePage.getSalaInput()).to.eq('5', 'Expected sala value to be equals to 5');
        expect(await matriculaUpdatePage.getClasseInput()).to.eq('5', 'Expected classe value to be equals to 5');
        await matriculaUpdatePage.save();
        expect(await matriculaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await matriculaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Matricula', async () => {
        const nbButtonsBeforeDelete = await matriculaComponentsPage.countDeleteButtons();
        await matriculaComponentsPage.clickOnLastDeleteButton();

        matriculaDeleteDialog = new MatriculaDeleteDialog();
        expect(await matriculaDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.secretariaMatricula.delete.question');
        await matriculaDeleteDialog.clickOnConfirmButton();

        expect(await matriculaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
