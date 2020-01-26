import { element, by, ElementFinder } from 'protractor';

export class CaixaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-caixa div table .btn-danger'));
  title = element.all(by.css('rv-caixa div h2#page-heading span')).first();

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

export class CaixaUpdatePage {
  pageTitle = element(by.id('rv-caixa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descricaoInput = element(by.id('field_descricao'));
  proprietarioInput = element(by.id('field_proprietario'));
  numeroContaInput = element(by.id('field_numeroConta'));
  ibanInput = element(by.id('field_iban'));
  ativoInput = element(by.id('field_ativo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async setProprietarioInput(proprietario: string): Promise<void> {
    await this.proprietarioInput.sendKeys(proprietario);
  }

  async getProprietarioInput(): Promise<string> {
    return await this.proprietarioInput.getAttribute('value');
  }

  async setNumeroContaInput(numeroConta: string): Promise<void> {
    await this.numeroContaInput.sendKeys(numeroConta);
  }

  async getNumeroContaInput(): Promise<string> {
    return await this.numeroContaInput.getAttribute('value');
  }

  async setIbanInput(iban: string): Promise<void> {
    await this.ibanInput.sendKeys(iban);
  }

  async getIbanInput(): Promise<string> {
    return await this.ibanInput.getAttribute('value');
  }

  getAtivoInput(): ElementFinder {
    return this.ativoInput;
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

export class CaixaDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-caixa-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-caixa'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
