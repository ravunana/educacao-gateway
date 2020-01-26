import { element, by, ElementFinder } from 'protractor';

export class EncarregadoEducaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-encarregado-educao div table .btn-danger'));
  title = element.all(by.css('rv-encarregado-educao div h2#page-heading span')).first();

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

export class EncarregadoEducaoUpdatePage {
  pageTitle = element(by.id('rv-encarregado-educao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  sexoInput = element(by.id('field_sexo'));
  nifInput = element(by.id('field_nif'));
  numeroIdentificacaoInput = element(by.id('field_numeroIdentificacao'));
  residenciaInput = element(by.id('field_residencia'));
  contactoPessoalInput = element(by.id('field_contactoPessoal'));
  contactoTrabalhoInput = element(by.id('field_contactoTrabalho'));
  contactoResidenciaInput = element(by.id('field_contactoResidencia'));
  emailInput = element(by.id('field_email'));
  localTrabalhoInput = element(by.id('field_localTrabalho'));
  cargoInput = element(by.id('field_cargo'));
  salarioInput = element(by.id('field_salario'));
  grauParentescoInput = element(by.id('field_grauParentesco'));

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

  async setNifInput(nif: string): Promise<void> {
    await this.nifInput.sendKeys(nif);
  }

  async getNifInput(): Promise<string> {
    return await this.nifInput.getAttribute('value');
  }

  async setNumeroIdentificacaoInput(numeroIdentificacao: string): Promise<void> {
    await this.numeroIdentificacaoInput.sendKeys(numeroIdentificacao);
  }

  async getNumeroIdentificacaoInput(): Promise<string> {
    return await this.numeroIdentificacaoInput.getAttribute('value');
  }

  async setResidenciaInput(residencia: string): Promise<void> {
    await this.residenciaInput.sendKeys(residencia);
  }

  async getResidenciaInput(): Promise<string> {
    return await this.residenciaInput.getAttribute('value');
  }

  async setContactoPessoalInput(contactoPessoal: string): Promise<void> {
    await this.contactoPessoalInput.sendKeys(contactoPessoal);
  }

  async getContactoPessoalInput(): Promise<string> {
    return await this.contactoPessoalInput.getAttribute('value');
  }

  async setContactoTrabalhoInput(contactoTrabalho: string): Promise<void> {
    await this.contactoTrabalhoInput.sendKeys(contactoTrabalho);
  }

  async getContactoTrabalhoInput(): Promise<string> {
    return await this.contactoTrabalhoInput.getAttribute('value');
  }

  async setContactoResidenciaInput(contactoResidencia: string): Promise<void> {
    await this.contactoResidenciaInput.sendKeys(contactoResidencia);
  }

  async getContactoResidenciaInput(): Promise<string> {
    return await this.contactoResidenciaInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setLocalTrabalhoInput(localTrabalho: string): Promise<void> {
    await this.localTrabalhoInput.sendKeys(localTrabalho);
  }

  async getLocalTrabalhoInput(): Promise<string> {
    return await this.localTrabalhoInput.getAttribute('value');
  }

  async setCargoInput(cargo: string): Promise<void> {
    await this.cargoInput.sendKeys(cargo);
  }

  async getCargoInput(): Promise<string> {
    return await this.cargoInput.getAttribute('value');
  }

  async setSalarioInput(salario: string): Promise<void> {
    await this.salarioInput.sendKeys(salario);
  }

  async getSalarioInput(): Promise<string> {
    return await this.salarioInput.getAttribute('value');
  }

  async setGrauParentescoInput(grauParentesco: string): Promise<void> {
    await this.grauParentescoInput.sendKeys(grauParentesco);
  }

  async getGrauParentescoInput(): Promise<string> {
    return await this.grauParentescoInput.getAttribute('value');
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

export class EncarregadoEducaoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-encarregadoEducao-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-encarregadoEducao'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
