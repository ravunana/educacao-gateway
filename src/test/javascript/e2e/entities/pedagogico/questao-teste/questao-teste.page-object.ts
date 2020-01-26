import { element, by, ElementFinder } from 'protractor';

export class QuestaoTesteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-questao-teste div table .btn-danger'));
  title = element.all(by.css('rv-questao-teste div h2#page-heading span')).first();

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

export class QuestaoTesteUpdatePage {
  pageTitle = element(by.id('rv-questao-teste-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  grupoInput = element(by.id('field_grupo'));
  numeroInput = element(by.id('field_numero'));
  argumentoInput = element(by.id('field_argumento'));
  questaoInput = element(by.id('field_questao'));
  testeSelect = element(by.id('field_teste'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setGrupoInput(grupo: string): Promise<void> {
    await this.grupoInput.sendKeys(grupo);
  }

  async getGrupoInput(): Promise<string> {
    return await this.grupoInput.getAttribute('value');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setArgumentoInput(argumento: string): Promise<void> {
    await this.argumentoInput.sendKeys(argumento);
  }

  async getArgumentoInput(): Promise<string> {
    return await this.argumentoInput.getAttribute('value');
  }

  async setQuestaoInput(questao: string): Promise<void> {
    await this.questaoInput.sendKeys(questao);
  }

  async getQuestaoInput(): Promise<string> {
    return await this.questaoInput.getAttribute('value');
  }

  async testeSelectLastOption(): Promise<void> {
    await this.testeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async testeSelectOption(option: string): Promise<void> {
    await this.testeSelect.sendKeys(option);
  }

  getTesteSelect(): ElementFinder {
    return this.testeSelect;
  }

  async getTesteSelectedOption(): Promise<string> {
    return await this.testeSelect.element(by.css('option:checked')).getText();
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

export class QuestaoTesteDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-questaoTeste-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-questaoTeste'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
