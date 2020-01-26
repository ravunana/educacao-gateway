import { element, by, ElementFinder } from 'protractor';

export class TesteConhecimentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-teste-conhecimento div table .btn-danger'));
  title = element.all(by.css('rv-teste-conhecimento div h2#page-heading span')).first();

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

export class TesteConhecimentoUpdatePage {
  pageTitle = element(by.id('rv-teste-conhecimento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  categoriaInput = element(by.id('field_categoria'));
  periodoLectivoInput = element(by.id('field_periodoLectivo'));
  duracaoInput = element(by.id('field_duracao'));
  dataInput = element(by.id('field_data'));
  curriculoSelect = element(by.id('field_curriculo'));
  turmaSelect = element(by.id('field_turma'));
  professorSelect = element(by.id('field_professor'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCategoriaInput(categoria: string): Promise<void> {
    await this.categoriaInput.sendKeys(categoria);
  }

  async getCategoriaInput(): Promise<string> {
    return await this.categoriaInput.getAttribute('value');
  }

  async setPeriodoLectivoInput(periodoLectivo: string): Promise<void> {
    await this.periodoLectivoInput.sendKeys(periodoLectivo);
  }

  async getPeriodoLectivoInput(): Promise<string> {
    return await this.periodoLectivoInput.getAttribute('value');
  }

  async setDuracaoInput(duracao: string): Promise<void> {
    await this.duracaoInput.sendKeys(duracao);
  }

  async getDuracaoInput(): Promise<string> {
    return await this.duracaoInput.getAttribute('value');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
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

export class TesteConhecimentoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-testeConhecimento-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-testeConhecimento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
