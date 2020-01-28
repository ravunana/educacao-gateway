import { element, by, ElementFinder } from 'protractor';

export class PagamentoEmolumentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-pagamento-emolumento div table .btn-danger'));
  title = element.all(by.css('rv-pagamento-emolumento div h2#page-heading span')).first();

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

export class PagamentoEmolumentoUpdatePage {
  pageTitle = element(by.id('rv-pagamento-emolumento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dataInput = element(by.id('field_data'));
  numeroInput = element(by.id('field_numero'));
  numeroProcessoInput = element(by.id('field_numeroProcesso'));
  nomeAlunoInput = element(by.id('field_nomeAluno'));
  turmaAlunoInput = element(by.id('field_turmaAluno'));
  estadoInput = element(by.id('field_estado'));
  formaLiquidacaoSelect = element(by.id('field_formaLiquidacao'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
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

  async setTurmaAlunoInput(turmaAluno: string): Promise<void> {
    await this.turmaAlunoInput.sendKeys(turmaAluno);
  }

  async getTurmaAlunoInput(): Promise<string> {
    return await this.turmaAlunoInput.getAttribute('value');
  }

  async setEstadoInput(estado: string): Promise<void> {
    await this.estadoInput.sendKeys(estado);
  }

  async getEstadoInput(): Promise<string> {
    return await this.estadoInput.getAttribute('value');
  }

  async formaLiquidacaoSelectLastOption(): Promise<void> {
    await this.formaLiquidacaoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async formaLiquidacaoSelectOption(option: string): Promise<void> {
    await this.formaLiquidacaoSelect.sendKeys(option);
  }

  getFormaLiquidacaoSelect(): ElementFinder {
    return this.formaLiquidacaoSelect;
  }

  async getFormaLiquidacaoSelectedOption(): Promise<string> {
    return await this.formaLiquidacaoSelect.element(by.css('option:checked')).getText();
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

export class PagamentoEmolumentoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-pagamentoEmolumento-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-pagamentoEmolumento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
