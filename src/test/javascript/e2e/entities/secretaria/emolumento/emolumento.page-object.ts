import { element, by, ElementFinder } from 'protractor';

export class EmolumentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-emolumento div table .btn-danger'));
  title = element.all(by.css('rv-emolumento div h2#page-heading span')).first();

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

export class EmolumentoUpdatePage {
  pageTitle = element(by.id('rv-emolumento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  montanteInput = element(by.id('field_montante'));
  montanteMultaInput = element(by.id('field_montanteMulta'));
  tempoMultaInput = element(by.id('field_tempoMulta'));
  quantidadeInput = element(by.id('field_quantidade'));
  turnoInput = element(by.id('field_turno'));
  classeInput = element(by.id('field_classe'));
  cursoInput = element(by.id('field_curso'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setMontanteInput(montante: string): Promise<void> {
    await this.montanteInput.sendKeys(montante);
  }

  async getMontanteInput(): Promise<string> {
    return await this.montanteInput.getAttribute('value');
  }

  async setMontanteMultaInput(montanteMulta: string): Promise<void> {
    await this.montanteMultaInput.sendKeys(montanteMulta);
  }

  async getMontanteMultaInput(): Promise<string> {
    return await this.montanteMultaInput.getAttribute('value');
  }

  async setTempoMultaInput(tempoMulta: string): Promise<void> {
    await this.tempoMultaInput.sendKeys(tempoMulta);
  }

  async getTempoMultaInput(): Promise<string> {
    return await this.tempoMultaInput.getAttribute('value');
  }

  async setQuantidadeInput(quantidade: string): Promise<void> {
    await this.quantidadeInput.sendKeys(quantidade);
  }

  async getQuantidadeInput(): Promise<string> {
    return await this.quantidadeInput.getAttribute('value');
  }

  async setTurnoInput(turno: string): Promise<void> {
    await this.turnoInput.sendKeys(turno);
  }

  async getTurnoInput(): Promise<string> {
    return await this.turnoInput.getAttribute('value');
  }

  async setClasseInput(classe: string): Promise<void> {
    await this.classeInput.sendKeys(classe);
  }

  async getClasseInput(): Promise<string> {
    return await this.classeInput.getAttribute('value');
  }

  async setCursoInput(curso: string): Promise<void> {
    await this.cursoInput.sendKeys(curso);
  }

  async getCursoInput(): Promise<string> {
    return await this.cursoInput.getAttribute('value');
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

export class EmolumentoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-emolumento-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-emolumento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
