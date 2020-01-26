import { element, by, ElementFinder } from 'protractor';

export class RespostaQuestaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-resposta-questao div table .btn-danger'));
  title = element.all(by.css('rv-resposta-questao div h2#page-heading span')).first();

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

export class RespostaQuestaoUpdatePage {
  pageTitle = element(by.id('rv-resposta-questao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  respostaInput = element(by.id('field_resposta'));
  questaoSelect = element(by.id('field_questao'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRespostaInput(resposta: string): Promise<void> {
    await this.respostaInput.sendKeys(resposta);
  }

  async getRespostaInput(): Promise<string> {
    return await this.respostaInput.getAttribute('value');
  }

  async questaoSelectLastOption(): Promise<void> {
    await this.questaoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questaoSelectOption(option: string): Promise<void> {
    await this.questaoSelect.sendKeys(option);
  }

  getQuestaoSelect(): ElementFinder {
    return this.questaoSelect;
  }

  async getQuestaoSelectedOption(): Promise<string> {
    return await this.questaoSelect.element(by.css('option:checked')).getText();
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

export class RespostaQuestaoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-respostaQuestao-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-respostaQuestao'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
