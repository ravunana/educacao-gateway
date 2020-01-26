import { element, by, ElementFinder } from 'protractor';

export class LookupComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-lookup div table .btn-danger'));
  title = element.all(by.css('rv-lookup div h2#page-heading span')).first();

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

export class LookupUpdatePage {
  pageTitle = element(by.id('rv-lookup-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  siglaInput = element(by.id('field_sigla'));
  descricaoInput = element(by.id('field_descricao'));
  usuarioInput = element(by.id('field_usuario'));
  entidadeSelect = element(by.id('field_entidade'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setSiglaInput(sigla: string): Promise<void> {
    await this.siglaInput.sendKeys(sigla);
  }

  async getSiglaInput(): Promise<string> {
    return await this.siglaInput.getAttribute('value');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  getUsuarioInput(): ElementFinder {
    return this.usuarioInput;
  }

  async entidadeSelectLastOption(): Promise<void> {
    await this.entidadeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async entidadeSelectOption(option: string): Promise<void> {
    await this.entidadeSelect.sendKeys(option);
  }

  getEntidadeSelect(): ElementFinder {
    return this.entidadeSelect;
  }

  async getEntidadeSelectedOption(): Promise<string> {
    return await this.entidadeSelect.element(by.css('option:checked')).getText();
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

export class LookupDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-lookup-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-lookup'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
