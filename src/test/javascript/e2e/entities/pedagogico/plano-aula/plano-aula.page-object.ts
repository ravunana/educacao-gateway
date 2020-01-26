import { element, by, ElementFinder } from 'protractor';

export class PlanoAulaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-plano-aula div table .btn-danger'));
  title = element.all(by.css('rv-plano-aula div h2#page-heading span')).first();

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

export class PlanoAulaUpdatePage {
  pageTitle = element(by.id('rv-plano-aula-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  objectivoGeralInput = element(by.id('field_objectivoGeral'));
  objectivoEspecificoInput = element(by.id('field_objectivoEspecifico'));
  conteudoInput = element(by.id('field_conteudo'));
  estrategiaInput = element(by.id('field_estrategia'));
  actividadesInput = element(by.id('field_actividades'));
  tempoInput = element(by.id('field_tempo'));
  recursosEnsinoInput = element(by.id('field_recursosEnsino'));
  avaliacaoInput = element(by.id('field_avaliacao'));
  observacaoInput = element(by.id('field_observacao'));
  bibliografiaInput = element(by.id('field_bibliografia'));
  perfilEntradaInput = element(by.id('field_perfilEntrada'));
  perfilSaidaInput = element(by.id('field_perfilSaida'));
  anexo1Input = element(by.id('file_anexo1'));
  turmaSelect = element(by.id('field_turma'));
  dosificacaoSelect = element(by.id('field_dosificacao'));
  professorSelect = element(by.id('field_professor'));
  curriculoSelect = element(by.id('field_curriculo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setObjectivoGeralInput(objectivoGeral: string): Promise<void> {
    await this.objectivoGeralInput.sendKeys(objectivoGeral);
  }

  async getObjectivoGeralInput(): Promise<string> {
    return await this.objectivoGeralInput.getAttribute('value');
  }

  async setObjectivoEspecificoInput(objectivoEspecifico: string): Promise<void> {
    await this.objectivoEspecificoInput.sendKeys(objectivoEspecifico);
  }

  async getObjectivoEspecificoInput(): Promise<string> {
    return await this.objectivoEspecificoInput.getAttribute('value');
  }

  async setConteudoInput(conteudo: string): Promise<void> {
    await this.conteudoInput.sendKeys(conteudo);
  }

  async getConteudoInput(): Promise<string> {
    return await this.conteudoInput.getAttribute('value');
  }

  async setEstrategiaInput(estrategia: string): Promise<void> {
    await this.estrategiaInput.sendKeys(estrategia);
  }

  async getEstrategiaInput(): Promise<string> {
    return await this.estrategiaInput.getAttribute('value');
  }

  async setActividadesInput(actividades: string): Promise<void> {
    await this.actividadesInput.sendKeys(actividades);
  }

  async getActividadesInput(): Promise<string> {
    return await this.actividadesInput.getAttribute('value');
  }

  async setTempoInput(tempo: string): Promise<void> {
    await this.tempoInput.sendKeys(tempo);
  }

  async getTempoInput(): Promise<string> {
    return await this.tempoInput.getAttribute('value');
  }

  async setRecursosEnsinoInput(recursosEnsino: string): Promise<void> {
    await this.recursosEnsinoInput.sendKeys(recursosEnsino);
  }

  async getRecursosEnsinoInput(): Promise<string> {
    return await this.recursosEnsinoInput.getAttribute('value');
  }

  async setAvaliacaoInput(avaliacao: string): Promise<void> {
    await this.avaliacaoInput.sendKeys(avaliacao);
  }

  async getAvaliacaoInput(): Promise<string> {
    return await this.avaliacaoInput.getAttribute('value');
  }

  async setObservacaoInput(observacao: string): Promise<void> {
    await this.observacaoInput.sendKeys(observacao);
  }

  async getObservacaoInput(): Promise<string> {
    return await this.observacaoInput.getAttribute('value');
  }

  async setBibliografiaInput(bibliografia: string): Promise<void> {
    await this.bibliografiaInput.sendKeys(bibliografia);
  }

  async getBibliografiaInput(): Promise<string> {
    return await this.bibliografiaInput.getAttribute('value');
  }

  async setPerfilEntradaInput(perfilEntrada: string): Promise<void> {
    await this.perfilEntradaInput.sendKeys(perfilEntrada);
  }

  async getPerfilEntradaInput(): Promise<string> {
    return await this.perfilEntradaInput.getAttribute('value');
  }

  async setPerfilSaidaInput(perfilSaida: string): Promise<void> {
    await this.perfilSaidaInput.sendKeys(perfilSaida);
  }

  async getPerfilSaidaInput(): Promise<string> {
    return await this.perfilSaidaInput.getAttribute('value');
  }

  async setAnexo1Input(anexo1: string): Promise<void> {
    await this.anexo1Input.sendKeys(anexo1);
  }

  async getAnexo1Input(): Promise<string> {
    return await this.anexo1Input.getAttribute('value');
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

  async dosificacaoSelectLastOption(): Promise<void> {
    await this.dosificacaoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async dosificacaoSelectOption(option: string): Promise<void> {
    await this.dosificacaoSelect.sendKeys(option);
  }

  getDosificacaoSelect(): ElementFinder {
    return this.dosificacaoSelect;
  }

  async getDosificacaoSelectedOption(): Promise<string> {
    return await this.dosificacaoSelect.element(by.css('option:checked')).getText();
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

export class PlanoAulaDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-planoAula-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-planoAula'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
