import { element, by, ElementFinder } from 'protractor';

export class ProfessorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-professor div table .btn-danger'));
  title = element.all(by.css('rv-professor div h2#page-heading span')).first();

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

export class ProfessorUpdatePage {
  pageTitle = element(by.id('rv-professor-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  sexoInput = element(by.id('field_sexo'));
  fotografiaInput = element(by.id('file_fotografia'));
  contactoInput = element(by.id('field_contacto'));
  emailInput = element(by.id('field_email'));
  residenciaInput = element(by.id('field_residencia'));
  numeroAgenteInput = element(by.id('field_numeroAgente'));
  utilizadorIdInput = element(by.id('field_utilizadorId'));
  grauAcademicoInput = element(by.id('field_grauAcademico'));
  cursoAcademicoInput = element(by.id('field_cursoAcademico'));
  observacaoInput = element(by.id('field_observacao'));
  ativoInput = element(by.id('field_ativo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setSexoInput(sexo: string): Promise<void> {
    await this.sexoInput.sendKeys(sexo);
  }

  async getSexoInput(): Promise<string> {
    return await this.sexoInput.getAttribute('value');
  }

  async setFotografiaInput(fotografia: string): Promise<void> {
    await this.fotografiaInput.sendKeys(fotografia);
  }

  async getFotografiaInput(): Promise<string> {
    return await this.fotografiaInput.getAttribute('value');
  }

  async setContactoInput(contacto: string): Promise<void> {
    await this.contactoInput.sendKeys(contacto);
  }

  async getContactoInput(): Promise<string> {
    return await this.contactoInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setResidenciaInput(residencia: string): Promise<void> {
    await this.residenciaInput.sendKeys(residencia);
  }

  async getResidenciaInput(): Promise<string> {
    return await this.residenciaInput.getAttribute('value');
  }

  async setNumeroAgenteInput(numeroAgente: string): Promise<void> {
    await this.numeroAgenteInput.sendKeys(numeroAgente);
  }

  async getNumeroAgenteInput(): Promise<string> {
    return await this.numeroAgenteInput.getAttribute('value');
  }

  async setUtilizadorIdInput(utilizadorId: string): Promise<void> {
    await this.utilizadorIdInput.sendKeys(utilizadorId);
  }

  async getUtilizadorIdInput(): Promise<string> {
    return await this.utilizadorIdInput.getAttribute('value');
  }

  async setGrauAcademicoInput(grauAcademico: string): Promise<void> {
    await this.grauAcademicoInput.sendKeys(grauAcademico);
  }

  async getGrauAcademicoInput(): Promise<string> {
    return await this.grauAcademicoInput.getAttribute('value');
  }

  async setCursoAcademicoInput(cursoAcademico: string): Promise<void> {
    await this.cursoAcademicoInput.sendKeys(cursoAcademico);
  }

  async getCursoAcademicoInput(): Promise<string> {
    return await this.cursoAcademicoInput.getAttribute('value');
  }

  async setObservacaoInput(observacao: string): Promise<void> {
    await this.observacaoInput.sendKeys(observacao);
  }

  async getObservacaoInput(): Promise<string> {
    return await this.observacaoInput.getAttribute('value');
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

export class ProfessorDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-professor-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-professor'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
