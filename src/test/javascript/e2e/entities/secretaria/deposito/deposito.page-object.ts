import { element, by, ElementFinder } from 'protractor';

export class DepositoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-deposito div table .btn-danger'));
  title = element.all(by.css('rv-deposito div h2#page-heading span')).first();

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

export class DepositoUpdatePage {
  pageTitle = element(by.id('rv-deposito-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  numeroInput = element(by.id('field_numero'));
  dataDepositoInput = element(by.id('field_dataDeposito'));
  montanteInput = element(by.id('field_montante'));
  dataInput = element(by.id('field_data'));
  anexoInput = element(by.id('file_anexo'));
  numeroProcessoInput = element(by.id('field_numeroProcesso'));
  meioLiquidacaoInput = element(by.id('field_meioLiquidacao'));
  bancoCaixaSelect = element(by.id('field_bancoCaixa'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setDataDepositoInput(dataDeposito: string): Promise<void> {
    await this.dataDepositoInput.sendKeys(dataDeposito);
  }

  async getDataDepositoInput(): Promise<string> {
    return await this.dataDepositoInput.getAttribute('value');
  }

  async setMontanteInput(montante: string): Promise<void> {
    await this.montanteInput.sendKeys(montante);
  }

  async getMontanteInput(): Promise<string> {
    return await this.montanteInput.getAttribute('value');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async setAnexoInput(anexo: string): Promise<void> {
    await this.anexoInput.sendKeys(anexo);
  }

  async getAnexoInput(): Promise<string> {
    return await this.anexoInput.getAttribute('value');
  }

  async setNumeroProcessoInput(numeroProcesso: string): Promise<void> {
    await this.numeroProcessoInput.sendKeys(numeroProcesso);
  }

  async getNumeroProcessoInput(): Promise<string> {
    return await this.numeroProcessoInput.getAttribute('value');
  }

  async setMeioLiquidacaoInput(meioLiquidacao: string): Promise<void> {
    await this.meioLiquidacaoInput.sendKeys(meioLiquidacao);
  }

  async getMeioLiquidacaoInput(): Promise<string> {
    return await this.meioLiquidacaoInput.getAttribute('value');
  }

  async bancoCaixaSelectLastOption(): Promise<void> {
    await this.bancoCaixaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bancoCaixaSelectOption(option: string): Promise<void> {
    await this.bancoCaixaSelect.sendKeys(option);
  }

  getBancoCaixaSelect(): ElementFinder {
    return this.bancoCaixaSelect;
  }

  async getBancoCaixaSelectedOption(): Promise<string> {
    return await this.bancoCaixaSelect.element(by.css('option:checked')).getText();
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

export class DepositoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-deposito-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-deposito'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
