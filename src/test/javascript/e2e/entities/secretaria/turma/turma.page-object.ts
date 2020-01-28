import { element, by, ElementFinder } from 'protractor';

export class TurmaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-turma div table .btn-danger'));
  title = element.all(by.css('rv-turma div h2#page-heading span')).first();

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

export class TurmaUpdatePage {
  pageTitle = element(by.id('rv-turma-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoInput = element(by.id('field_descricao'));
  anoLectivoInput = element(by.id('field_anoLectivo'));
  dataInput = element(by.id('field_data'));
  aberturaInput = element(by.id('field_abertura'));
  encerramentoInput = element(by.id('field_encerramento'));
  lotacaoInput = element(by.id('field_lotacao'));
  abertaInput = element(by.id('field_aberta'));
  periodoLectivoInput = element(by.id('field_periodoLectivo'));
  turnoInput = element(by.id('field_turno'));
  salaInput = element(by.id('field_sala'));
  classeInput = element(by.id('field_classe'));
  cursoSelect = element(by.id('field_curso'));
  coordenadorSelect = element(by.id('field_coordenador'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async setAnoLectivoInput(anoLectivo: string): Promise<void> {
    await this.anoLectivoInput.sendKeys(anoLectivo);
  }

  async getAnoLectivoInput(): Promise<string> {
    return await this.anoLectivoInput.getAttribute('value');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async setAberturaInput(abertura: string): Promise<void> {
    await this.aberturaInput.sendKeys(abertura);
  }

  async getAberturaInput(): Promise<string> {
    return await this.aberturaInput.getAttribute('value');
  }

  async setEncerramentoInput(encerramento: string): Promise<void> {
    await this.encerramentoInput.sendKeys(encerramento);
  }

  async getEncerramentoInput(): Promise<string> {
    return await this.encerramentoInput.getAttribute('value');
  }

  async setLotacaoInput(lotacao: string): Promise<void> {
    await this.lotacaoInput.sendKeys(lotacao);
  }

  async getLotacaoInput(): Promise<string> {
    return await this.lotacaoInput.getAttribute('value');
  }

  getAbertaInput(): ElementFinder {
    return this.abertaInput;
  }
  async setPeriodoLectivoInput(periodoLectivo: string): Promise<void> {
    await this.periodoLectivoInput.sendKeys(periodoLectivo);
  }

  async getPeriodoLectivoInput(): Promise<string> {
    return await this.periodoLectivoInput.getAttribute('value');
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

  async cursoSelectLastOption(): Promise<void> {
    await this.cursoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cursoSelectOption(option: string): Promise<void> {
    await this.cursoSelect.sendKeys(option);
  }

  getCursoSelect(): ElementFinder {
    return this.cursoSelect;
  }

  async getCursoSelectedOption(): Promise<string> {
    return await this.cursoSelect.element(by.css('option:checked')).getText();
  }

  async coordenadorSelectLastOption(): Promise<void> {
    await this.coordenadorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async coordenadorSelectOption(option: string): Promise<void> {
    await this.coordenadorSelect.sendKeys(option);
  }

  getCoordenadorSelect(): ElementFinder {
    return this.coordenadorSelect;
  }

  async getCoordenadorSelectedOption(): Promise<string> {
    return await this.coordenadorSelect.element(by.css('option:checked')).getText();
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

export class TurmaDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-turma-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-turma'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
