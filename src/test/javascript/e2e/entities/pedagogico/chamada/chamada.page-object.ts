import { element, by, ElementFinder } from 'protractor';

export class ChamadaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-chamada div table .btn-danger'));
  title = element.all(by.css('rv-chamada div h2#page-heading span')).first();

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

export class ChamadaUpdatePage {
  pageTitle = element(by.id('rv-chamada-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dataInput = element(by.id('field_data'));
  presenteInput = element(by.id('field_presente'));
  numeroProcessoInput = element(by.id('field_numeroProcesso'));
  aulaSelect = element(by.id('field_aula'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  getPresenteInput(): ElementFinder {
    return this.presenteInput;
  }
  async setNumeroProcessoInput(numeroProcesso: string): Promise<void> {
    await this.numeroProcessoInput.sendKeys(numeroProcesso);
  }

  async getNumeroProcessoInput(): Promise<string> {
    return await this.numeroProcessoInput.getAttribute('value');
  }

  async aulaSelectLastOption(): Promise<void> {
    await this.aulaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async aulaSelectOption(option: string): Promise<void> {
    await this.aulaSelect.sendKeys(option);
  }

  getAulaSelect(): ElementFinder {
    return this.aulaSelect;
  }

  async getAulaSelectedOption(): Promise<string> {
    return await this.aulaSelect.element(by.css('option:checked')).getText();
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

export class ChamadaDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-chamada-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-chamada'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
