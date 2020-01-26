import { element, by, ElementFinder } from 'protractor';

export class NotaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-nota div table .btn-danger'));
  title = element.all(by.css('rv-nota div h2#page-heading span')).first();

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

export class NotaUpdatePage {
  pageTitle = element(by.id('rv-nota-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  numeroProcessoInput = element(by.id('field_numeroProcesso'));
  nomeAlunoInput = element(by.id('field_nomeAluno'));
  disciplinaInput = element(by.id('field_disciplina'));
  peridoLectivoInput = element(by.id('field_peridoLectivo'));
  anoLectivoInput = element(by.id('field_anoLectivo'));
  faltaJustificadaInput = element(by.id('field_faltaJustificada'));
  faltaInjustificadaInput = element(by.id('field_faltaInjustificada'));
  avaliacaoContinucaInput = element(by.id('field_avaliacaoContinuca'));
  primeiraProvaInput = element(by.id('field_primeiraProva'));
  segundaProvaInput = element(by.id('field_segundaProva'));
  exameInput = element(by.id('field_exame'));
  recursoInput = element(by.id('field_recurso'));
  exameEspecialInput = element(by.id('field_exameEspecial'));
  provaInput = element(by.id('file_prova'));
  situacaoInput = element(by.id('field_situacao'));
  turmaSelect = element(by.id('field_turma'));
  curriculoSelect = element(by.id('field_curriculo'));
  professorSelect = element(by.id('field_professor'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroProcessoInput(numeroProcesso: string): Promise<void> {
    await this.numeroProcessoInput.sendKeys(numeroProcesso);
  }

  async getNumeroProcessoInput(): Promise<string> {
    return await this.numeroProcessoInput.getAttribute('value');
  }

  async setNomeAlunoInput(nomeAluno: string): Promise<void> {
    await this.nomeAlunoInput.sendKeys(nomeAluno);
  }

  async getNomeAlunoInput(): Promise<string> {
    return await this.nomeAlunoInput.getAttribute('value');
  }

  async setDisciplinaInput(disciplina: string): Promise<void> {
    await this.disciplinaInput.sendKeys(disciplina);
  }

  async getDisciplinaInput(): Promise<string> {
    return await this.disciplinaInput.getAttribute('value');
  }

  async setPeridoLectivoInput(peridoLectivo: string): Promise<void> {
    await this.peridoLectivoInput.sendKeys(peridoLectivo);
  }

  async getPeridoLectivoInput(): Promise<string> {
    return await this.peridoLectivoInput.getAttribute('value');
  }

  async setAnoLectivoInput(anoLectivo: string): Promise<void> {
    await this.anoLectivoInput.sendKeys(anoLectivo);
  }

  async getAnoLectivoInput(): Promise<string> {
    return await this.anoLectivoInput.getAttribute('value');
  }

  async setFaltaJustificadaInput(faltaJustificada: string): Promise<void> {
    await this.faltaJustificadaInput.sendKeys(faltaJustificada);
  }

  async getFaltaJustificadaInput(): Promise<string> {
    return await this.faltaJustificadaInput.getAttribute('value');
  }

  async setFaltaInjustificadaInput(faltaInjustificada: string): Promise<void> {
    await this.faltaInjustificadaInput.sendKeys(faltaInjustificada);
  }

  async getFaltaInjustificadaInput(): Promise<string> {
    return await this.faltaInjustificadaInput.getAttribute('value');
  }

  async setAvaliacaoContinucaInput(avaliacaoContinuca: string): Promise<void> {
    await this.avaliacaoContinucaInput.sendKeys(avaliacaoContinuca);
  }

  async getAvaliacaoContinucaInput(): Promise<string> {
    return await this.avaliacaoContinucaInput.getAttribute('value');
  }

  async setPrimeiraProvaInput(primeiraProva: string): Promise<void> {
    await this.primeiraProvaInput.sendKeys(primeiraProva);
  }

  async getPrimeiraProvaInput(): Promise<string> {
    return await this.primeiraProvaInput.getAttribute('value');
  }

  async setSegundaProvaInput(segundaProva: string): Promise<void> {
    await this.segundaProvaInput.sendKeys(segundaProva);
  }

  async getSegundaProvaInput(): Promise<string> {
    return await this.segundaProvaInput.getAttribute('value');
  }

  async setExameInput(exame: string): Promise<void> {
    await this.exameInput.sendKeys(exame);
  }

  async getExameInput(): Promise<string> {
    return await this.exameInput.getAttribute('value');
  }

  async setRecursoInput(recurso: string): Promise<void> {
    await this.recursoInput.sendKeys(recurso);
  }

  async getRecursoInput(): Promise<string> {
    return await this.recursoInput.getAttribute('value');
  }

  async setExameEspecialInput(exameEspecial: string): Promise<void> {
    await this.exameEspecialInput.sendKeys(exameEspecial);
  }

  async getExameEspecialInput(): Promise<string> {
    return await this.exameEspecialInput.getAttribute('value');
  }

  async setProvaInput(prova: string): Promise<void> {
    await this.provaInput.sendKeys(prova);
  }

  async getProvaInput(): Promise<string> {
    return await this.provaInput.getAttribute('value');
  }

  async setSituacaoInput(situacao: string): Promise<void> {
    await this.situacaoInput.sendKeys(situacao);
  }

  async getSituacaoInput(): Promise<string> {
    return await this.situacaoInput.getAttribute('value');
  }

  async turmaSelectLastOption(): Promise<void> {
    await this.turmaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async turmaSelectOption(option: string): Promise<void> {
    await this.turmaSelect.sendKeys(option);
  }

  getTurmaSelect(): ElementFinder {
    return this.turmaSelect;
  }

  async getTurmaSelectedOption(): Promise<string> {
    return await this.turmaSelect.element(by.css('option:checked')).getText();
  }

  async curriculoSelectLastOption(): Promise<void> {
    await this.curriculoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async curriculoSelectOption(option: string): Promise<void> {
    await this.curriculoSelect.sendKeys(option);
  }

  getCurriculoSelect(): ElementFinder {
    return this.curriculoSelect;
  }

  async getCurriculoSelectedOption(): Promise<string> {
    return await this.curriculoSelect.element(by.css('option:checked')).getText();
  }

  async professorSelectLastOption(): Promise<void> {
    await this.professorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async professorSelectOption(option: string): Promise<void> {
    await this.professorSelect.sendKeys(option);
  }

  getProfessorSelect(): ElementFinder {
    return this.professorSelect;
  }

  async getProfessorSelectedOption(): Promise<string> {
    return await this.professorSelect.element(by.css('option:checked')).getText();
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

export class NotaDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-nota-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-nota'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
