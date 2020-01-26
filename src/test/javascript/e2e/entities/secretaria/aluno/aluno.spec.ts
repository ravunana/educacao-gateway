import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  AlunoComponentsPage,
  /* AlunoDeleteDialog,
   */ AlunoUpdatePage
} from './aluno.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Aluno e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let alunoComponentsPage: AlunoComponentsPage;
  let alunoUpdatePage: AlunoUpdatePage;
  /* let alunoDeleteDialog: AlunoDeleteDialog; */
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

  it('should load Alunos', async () => {
    await navBarPage.goToEntity('aluno');
    alunoComponentsPage = new AlunoComponentsPage();
    await browser.wait(ec.visibilityOf(alunoComponentsPage.title), 5000);
    expect(await alunoComponentsPage.getTitle()).to.eq('educacaoApp.secretariaAluno.home.title');
  });

  it('should load create Aluno page', async () => {
    await alunoComponentsPage.clickOnCreateButton();
    alunoUpdatePage = new AlunoUpdatePage();
    expect(await alunoUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaAluno.home.createOrEditLabel');
    await alunoUpdatePage.cancel();
  });

  /*  it('should create and save Alunos', async () => {
        const nbButtonsBeforeCreate = await alunoComponentsPage.countDeleteButtons();

        await alunoComponentsPage.clickOnCreateButton();
        await promise.all([
            alunoUpdatePage.setNomeInput('nome'),
            alunoUpdatePage.setSexoInput('sexo'),
            alunoUpdatePage.setFotografiaInput(absolutePath),
            alunoUpdatePage.setPaiInput('pai'),
            alunoUpdatePage.setMaeInput('mae'),
            alunoUpdatePage.setNascimentoInput('2000-12-31'),
            alunoUpdatePage.setNacionalidadeInput('nacionalidade'),
            alunoUpdatePage.setNaturalidadeInput('naturalidade'),
            alunoUpdatePage.setContactoInput('contacto'),
            alunoUpdatePage.setEmailInput('email'),
            alunoUpdatePage.setTipoDocumentoInput('tipoDocumento'),
            alunoUpdatePage.setNumeroDocumentoInput('numeroDocumento'),
            alunoUpdatePage.setEmissaoInput('2000-12-31'),
            alunoUpdatePage.setValidadeInput('2000-12-31'),
            alunoUpdatePage.setLocalEmissaoInput('localEmissao'),
            alunoUpdatePage.setNifInput('nif'),
            alunoUpdatePage.setProvinciaInput('provincia'),
            alunoUpdatePage.setMunicipioInput('municipio'),
            alunoUpdatePage.setBairroInput('bairro'),
            alunoUpdatePage.setRuaInput('rua'),
            alunoUpdatePage.setQuarteiraoInput('quarteirao'),
            alunoUpdatePage.setNumeroPortaInput('numeroPorta'),
            alunoUpdatePage.setGrupoSanguinioInput('grupoSanguinio'),
            alunoUpdatePage.setAlturaInput('5'),
            alunoUpdatePage.setPesoInput('5'),
            alunoUpdatePage.setNomeMedicoInput('nomeMedico'),
            alunoUpdatePage.setContactoMedicoInput('contactoMedico'),
            alunoUpdatePage.setAlergiaInput('alergia'),
            alunoUpdatePage.setDificienciaInput('dificiencia'),
            alunoUpdatePage.setAnoConclusaoInput('5'),
            alunoUpdatePage.setSituacaoAnteriorInput('situacaoAnterior'),
            alunoUpdatePage.setMeioTransporteInput('meioTransporte'),
            alunoUpdatePage.setEscolaAnteriorInput('escolaAnterior'),
            alunoUpdatePage.setClasseAnteriorInput('5'),
            alunoUpdatePage.setCursoAnteriorInput('cursoAnterior'),
            alunoUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            alunoUpdatePage.setNumeroProcessoInput('numeroProcesso'),
            alunoUpdatePage.setObservacaoInput('observacao'),
            alunoUpdatePage.setSituacaoAtualInput('situacaoAtual'),
            alunoUpdatePage.encarregadoSelectLastOption(),
        ]);
        expect(await alunoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
        expect(await alunoUpdatePage.getSexoInput()).to.eq('sexo', 'Expected Sexo value to be equals to sexo');
        expect(await alunoUpdatePage.getFotografiaInput()).to.endsWith(fileNameToUpload, 'Expected Fotografia value to be end with ' + fileNameToUpload);
        expect(await alunoUpdatePage.getPaiInput()).to.eq('pai', 'Expected Pai value to be equals to pai');
        expect(await alunoUpdatePage.getMaeInput()).to.eq('mae', 'Expected Mae value to be equals to mae');
        expect(await alunoUpdatePage.getNascimentoInput()).to.eq('2000-12-31', 'Expected nascimento value to be equals to 2000-12-31');
        expect(await alunoUpdatePage.getNacionalidadeInput()).to.eq('nacionalidade', 'Expected Nacionalidade value to be equals to nacionalidade');
        expect(await alunoUpdatePage.getNaturalidadeInput()).to.eq('naturalidade', 'Expected Naturalidade value to be equals to naturalidade');
        expect(await alunoUpdatePage.getContactoInput()).to.eq('contacto', 'Expected Contacto value to be equals to contacto');
        expect(await alunoUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
        expect(await alunoUpdatePage.getTipoDocumentoInput()).to.eq('tipoDocumento', 'Expected TipoDocumento value to be equals to tipoDocumento');
        expect(await alunoUpdatePage.getNumeroDocumentoInput()).to.eq('numeroDocumento', 'Expected NumeroDocumento value to be equals to numeroDocumento');
        expect(await alunoUpdatePage.getEmissaoInput()).to.eq('2000-12-31', 'Expected emissao value to be equals to 2000-12-31');
        expect(await alunoUpdatePage.getValidadeInput()).to.eq('2000-12-31', 'Expected validade value to be equals to 2000-12-31');
        expect(await alunoUpdatePage.getLocalEmissaoInput()).to.eq('localEmissao', 'Expected LocalEmissao value to be equals to localEmissao');
        expect(await alunoUpdatePage.getNifInput()).to.eq('nif', 'Expected Nif value to be equals to nif');
        expect(await alunoUpdatePage.getProvinciaInput()).to.eq('provincia', 'Expected Provincia value to be equals to provincia');
        expect(await alunoUpdatePage.getMunicipioInput()).to.eq('municipio', 'Expected Municipio value to be equals to municipio');
        expect(await alunoUpdatePage.getBairroInput()).to.eq('bairro', 'Expected Bairro value to be equals to bairro');
        expect(await alunoUpdatePage.getRuaInput()).to.eq('rua', 'Expected Rua value to be equals to rua');
        expect(await alunoUpdatePage.getQuarteiraoInput()).to.eq('quarteirao', 'Expected Quarteirao value to be equals to quarteirao');
        expect(await alunoUpdatePage.getNumeroPortaInput()).to.eq('numeroPorta', 'Expected NumeroPorta value to be equals to numeroPorta');
        const selectedFazEducacaoFisica = alunoUpdatePage.getFazEducacaoFisicaInput();
        if (await selectedFazEducacaoFisica.isSelected()) {
            await alunoUpdatePage.getFazEducacaoFisicaInput().click();
            expect(await alunoUpdatePage.getFazEducacaoFisicaInput().isSelected(), 'Expected fazEducacaoFisica not to be selected').to.be.false;
        } else {
            await alunoUpdatePage.getFazEducacaoFisicaInput().click();
            expect(await alunoUpdatePage.getFazEducacaoFisicaInput().isSelected(), 'Expected fazEducacaoFisica to be selected').to.be.true;
        }
        expect(await alunoUpdatePage.getGrupoSanguinioInput()).to.eq('grupoSanguinio', 'Expected GrupoSanguinio value to be equals to grupoSanguinio');
        const selectedAutorizaMedicamento = alunoUpdatePage.getAutorizaMedicamentoInput();
        if (await selectedAutorizaMedicamento.isSelected()) {
            await alunoUpdatePage.getAutorizaMedicamentoInput().click();
            expect(await alunoUpdatePage.getAutorizaMedicamentoInput().isSelected(), 'Expected autorizaMedicamento not to be selected').to.be.false;
        } else {
            await alunoUpdatePage.getAutorizaMedicamentoInput().click();
            expect(await alunoUpdatePage.getAutorizaMedicamentoInput().isSelected(), 'Expected autorizaMedicamento to be selected').to.be.true;
        }
        expect(await alunoUpdatePage.getAlturaInput()).to.eq('5', 'Expected altura value to be equals to 5');
        expect(await alunoUpdatePage.getPesoInput()).to.eq('5', 'Expected peso value to be equals to 5');
        expect(await alunoUpdatePage.getNomeMedicoInput()).to.eq('nomeMedico', 'Expected NomeMedico value to be equals to nomeMedico');
        expect(await alunoUpdatePage.getContactoMedicoInput()).to.eq('contactoMedico', 'Expected ContactoMedico value to be equals to contactoMedico');
        const selectedDesmaioConstante = alunoUpdatePage.getDesmaioConstanteInput();
        if (await selectedDesmaioConstante.isSelected()) {
            await alunoUpdatePage.getDesmaioConstanteInput().click();
            expect(await alunoUpdatePage.getDesmaioConstanteInput().isSelected(), 'Expected desmaioConstante not to be selected').to.be.false;
        } else {
            await alunoUpdatePage.getDesmaioConstanteInput().click();
            expect(await alunoUpdatePage.getDesmaioConstanteInput().isSelected(), 'Expected desmaioConstante to be selected').to.be.true;
        }
        expect(await alunoUpdatePage.getAlergiaInput()).to.eq('alergia', 'Expected Alergia value to be equals to alergia');
        expect(await alunoUpdatePage.getDificienciaInput()).to.eq('dificiencia', 'Expected Dificiencia value to be equals to dificiencia');
        expect(await alunoUpdatePage.getAnoConclusaoInput()).to.eq('5', 'Expected anoConclusao value to be equals to 5');
        expect(await alunoUpdatePage.getSituacaoAnteriorInput()).to.eq('situacaoAnterior', 'Expected SituacaoAnterior value to be equals to situacaoAnterior');
        expect(await alunoUpdatePage.getMeioTransporteInput()).to.eq('meioTransporte', 'Expected MeioTransporte value to be equals to meioTransporte');
        expect(await alunoUpdatePage.getEscolaAnteriorInput()).to.eq('escolaAnterior', 'Expected EscolaAnterior value to be equals to escolaAnterior');
        expect(await alunoUpdatePage.getClasseAnteriorInput()).to.eq('5', 'Expected classeAnterior value to be equals to 5');
        expect(await alunoUpdatePage.getCursoAnteriorInput()).to.eq('cursoAnterior', 'Expected CursoAnterior value to be equals to cursoAnterior');
        expect(await alunoUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        expect(await alunoUpdatePage.getNumeroProcessoInput()).to.eq('numeroProcesso', 'Expected NumeroProcesso value to be equals to numeroProcesso');
        const selectedTransferido = alunoUpdatePage.getTransferidoInput();
        if (await selectedTransferido.isSelected()) {
            await alunoUpdatePage.getTransferidoInput().click();
            expect(await alunoUpdatePage.getTransferidoInput().isSelected(), 'Expected transferido not to be selected').to.be.false;
        } else {
            await alunoUpdatePage.getTransferidoInput().click();
            expect(await alunoUpdatePage.getTransferidoInput().isSelected(), 'Expected transferido to be selected').to.be.true;
        }
        expect(await alunoUpdatePage.getObservacaoInput()).to.eq('observacao', 'Expected Observacao value to be equals to observacao');
        expect(await alunoUpdatePage.getSituacaoAtualInput()).to.eq('situacaoAtual', 'Expected SituacaoAtual value to be equals to situacaoAtual');
        await alunoUpdatePage.save();
        expect(await alunoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await alunoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Aluno', async () => {
        const nbButtonsBeforeDelete = await alunoComponentsPage.countDeleteButtons();
        await alunoComponentsPage.clickOnLastDeleteButton();

        alunoDeleteDialog = new AlunoDeleteDialog();
        expect(await alunoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.secretariaAluno.delete.question');
        await alunoDeleteDialog.clickOnConfirmButton();

        expect(await alunoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
