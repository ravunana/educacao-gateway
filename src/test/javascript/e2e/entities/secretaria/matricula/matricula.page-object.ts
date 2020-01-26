import { element, by, ElementFinder } from 'protractor';

export class MatriculaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-matricula div table .btn-danger'));
  title = element.all(by.css('rv-matricula div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class MatriculaUpdatePage {
  pageTitle = element(by.id('rv-matricula-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dataInput = element(by.id('field_data'));
  numeroChamadaInput = element(by.id('field_numeroChamada'));
  anoLectivoInput = element(by.id('field_anoLectivo'));
  fotografiaInput = element(by.id('field_fotografia'));
  certificadoInput = element(by.id('field_certificado'));
  documentoIdentificacaoInput = element(by.id('field_documentoIdentificacao'));
  resenciamentoMilitarInput = element(by.id('field_resenciamentoMilitar'));
  documentoSaudeInput = element(by.id('field_documentoSaude'));
  fichaTransferenciaInput = element(by.id('field_fichaTransferencia'));
  historicoEscolarInput = element(by.id('field_historicoEscolar'));
  observacaoInput = element(by.id('field_observacao'));
  confirmacaoInput = element(by.id('field_confirmacao'));
  periodoLectivoInput = element(by.id('field_periodoLectivo'));
  turmaInput = element(by.id('field_turma'));
  cursoInput = element(by.id('field_curso'));
  turnoInput = element(by.id('field_turno'));
  salaInput = element(by.id('field_sala'));
  classeInput = element(by.id('field_classe'));
  alunoSelect = element(by.id('field_aluno'));
  categoriaSelect = element(by.id('field_categoria'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async setNumeroChamadaInput(numeroChamada: string): Promise<void> {
    await this.numeroChamadaInput.sendKeys(numeroChamada);
  }

  async getNumeroChamadaInput(): Promise<string> {
    return await this.numeroChamadaInput.getAttribute('value');
  }

  async setAnoLectivoInput(anoLectivo: string): Promise<void> {
    await this.anoLectivoInput.sendKeys(anoLectivo);
  }

  async getAnoLectivoInput(): Promise<string> {
    return await this.anoLectivoInput.getAttribute('value');
  }

  getFotografiaInput(): ElementFinder {
    return this.fotografiaInput;
  }
  getCertificadoInput(): ElementFinder {
    return this.certificadoInput;
  }
  getDocumentoIdentificacaoInput(): ElementFinder {
    return this.documentoIdentificacaoInput;
  }
  getResenciamentoMilitarInput(): ElementFinder {
    return this.resenciamentoMilitarInput;
  }
  getDocumentoSaudeInput(): ElementFinder {
    return this.documentoSaudeInput;
  }
  getFichaTransferenciaInput(): ElementFinder {
    return this.fichaTransferenciaInput;
  }
  getHistoricoEscolarInput(): ElementFinder {
    return this.historicoEscolarInput;
  }
  async setObservacaoInput(observacao: string): Promise<void> {
    await this.observacaoInput.sendKeys(observacao);
  }

  async getObservacaoInput(): Promise<string> {
    return await this.observacaoInput.getAttribute('value');
  }

  getConfirmacaoInput(): ElementFinder {
    return this.confirmacaoInput;
  }
  async setPeriodoLectivoInput(periodoLectivo: string): Promise<void> {
    await this.periodoLectivoInput.sendKeys(periodoLectivo);
  }

  async getPeriodoLectivoInput(): Promise<string> {
    return await this.periodoLectivoInput.getAttribute('value');
  }

  async setTurmaInput(turma: string): Promise<void> {
    await this.turmaInput.sendKeys(turma);
  }

  async getTurmaInput(): Promise<string> {
    return await this.turmaInput.getAttribute('value');
  }

  async setCursoInput(curso: string): Promise<void> {
    await this.cursoInput.sendKeys(curso);
  }

  async getCursoInput(): Promise<string> {
    return await this.cursoInput.getAttribute('value');
  }

  async setTurnoInput(turno: string): Promise<void> {
    await this.turnoInput.sendKeys(turno);
  }

  async getTurnoInput(): Promise<string> {
    return await this.turnoInput.getAttribute('value');
  }

  async setSalaInput(sala: string): Promise<void> {
    await this.salaInput.sendKeys(sala);
  }

  async getSalaInput(): Promise<string> {
    return await this.salaInput.getAttribute('value');
  }

  async setClasseInput(classe: string): Promise<void> {
    await this.classeInput.sendKeys(classe);
  }

  async getClasseInput(): Promise<string> {
    return await this.classeInput.getAttribute('value');
  }

  async alunoSelectLastOption(): Promise<void> {
    await this.alunoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async alunoSelectOption(option: string): Promise<void> {
    await this.alunoSelect.sendKeys(option);
  }

  getAlunoSelect(): ElementFinder {
    return this.alunoSelect;
  }

  async getAlunoSelectedOption(): Promise<string> {
    return await this.alunoSelect.element(by.css('option:checked')).getText();
  }

  async categoriaSelectLastOption(): Promise<void> {
    await this.categoriaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async categoriaSelectOption(option: string): Promise<void> {
    await this.categoriaSelect.sendKeys(option);
  }

  getCategoriaSelect(): ElementFinder {
    return this.categoriaSelect;
  }

  async getCategoriaSelectedOption(): Promise<string> {
    return await this.categoriaSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MatriculaDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-matricula-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-matricula'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
