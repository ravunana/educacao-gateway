import { element, by, ElementFinder } from 'protractor';

export class PlanoCurricularComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-plano-curricular div table .btn-danger'));
  title = element.all(by.css('rv-plano-curricular div h2#page-heading span')).first();

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

export class PlanoCurricularUpdatePage {
  pageTitle = element(by.id('rv-plano-curricular-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoInput = element(by.id('field_descricao'));
  terminalInput = element(by.id('field_terminal'));
  tempoSemanalInput = element(by.id('field_tempoSemanal'));
  periodoLectivoInput = element(by.id('field_periodoLectivo'));
  componenteInput = element(by.id('field_componente'));
  disciplinaInput = element(by.id('field_disciplina'));
  classeInput = element(by.id('field_classe'));
  cursoSelect = element(by.id('field_curso'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  getTerminalInput(): ElementFinder {
    return this.terminalInput;
  }
  async setTempoSemanalInput(tempoSemanal: string): Promise<void> {
    await this.tempoSemanalInput.sendKeys(tempoSemanal);
  }

  async getTempoSemanalInput(): Promise<string> {
    return await this.tempoSemanalInput.getAttribute('value');
  }

  async setPeriodoLectivoInput(periodoLectivo: string): Promise<void> {
    await this.periodoLectivoInput.sendKeys(periodoLectivo);
  }

  async getPeriodoLectivoInput(): Promise<string> {
    return await this.periodoLectivoInput.getAttribute('value');
  }

  async setComponenteInput(componente: string): Promise<void> {
    await this.componenteInput.sendKeys(componente);
  }

  async getComponenteInput(): Promise<string> {
    return await this.componenteInput.getAttribute('value');
  }

  async setDisciplinaInput(disciplina: string): Promise<void> {
    await this.disciplinaInput.sendKeys(disciplina);
  }

  async getDisciplinaInput(): Promise<string> {
    return await this.disciplinaInput.getAttribute('value');
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

export class PlanoCurricularDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-planoCurricular-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-planoCurricular'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
