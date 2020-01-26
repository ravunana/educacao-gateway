import { element, by, ElementFinder } from 'protractor';

export class ContaAlunoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-conta-aluno div table .btn-danger'));
  title = element.all(by.css('rv-conta-aluno div h2#page-heading span')).first();

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

export class ContaAlunoUpdatePage {
  pageTitle = element(by.id('rv-conta-aluno-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  debitoInput = element(by.id('field_debito'));
  creditoInput = element(by.id('field_credito'));
  numeroProcessoInput = element(by.id('field_numeroProcesso'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDebitoInput(debito: string): Promise<void> {
    await this.debitoInput.sendKeys(debito);
  }

  async getDebitoInput(): Promise<string> {
    return await this.debitoInput.getAttribute('value');
  }

  async setCreditoInput(credito: string): Promise<void> {
    await this.creditoInput.sendKeys(credito);
  }

  async getCreditoInput(): Promise<string> {
    return await this.creditoInput.getAttribute('value');
  }

  async setNumeroProcessoInput(numeroProcesso: string): Promise<void> {
    await this.numeroProcessoInput.sendKeys(numeroProcesso);
  }

  async getNumeroProcessoInput(): Promise<string> {
    return await this.numeroProcessoInput.getAttribute('value');
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

export class ContaAlunoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-contaAluno-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-contaAluno'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
