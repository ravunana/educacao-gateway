import { element, by, ElementFinder } from 'protractor';

export class InstituicaoEnsinoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-instituicao-ensino div table .btn-danger'));
  title = element.all(by.css('rv-instituicao-ensino div h2#page-heading span')).first();

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

export class InstituicaoEnsinoUpdatePage {
  pageTitle = element(by.id('rv-instituicao-ensino-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  logotipoInput = element(by.id('file_logotipo'));
  fundacaoInput = element(by.id('field_fundacao'));
  fundadorInput = element(by.id('field_fundador'));
  numeroInput = element(by.id('field_numero'));
  dimensaoInput = element(by.id('field_dimensao'));
  sedeInput = element(by.id('field_sede'));
  tipoVinculoInput = element(by.id('field_tipoVinculo'));
  unidadePagadoraInput = element(by.id('field_unidadePagadora'));
  tipoInstalacaoInput = element(by.id('field_tipoInstalacao'));
  provinciaInput = element(by.id('field_provincia'));
  municipioInput = element(by.id('field_municipio'));
  bairroInput = element(by.id('field_bairro'));
  ruaInput = element(by.id('field_rua'));
  quarteiraoInput = element(by.id('field_quarteirao'));
  numeroPortaInput = element(by.id('field_numeroPorta'));
  hierarquiaSelect = element(by.id('field_hierarquia'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setLogotipoInput(logotipo: string): Promise<void> {
    await this.logotipoInput.sendKeys(logotipo);
  }

  async getLogotipoInput(): Promise<string> {
    return await this.logotipoInput.getAttribute('value');
  }

  async setFundacaoInput(fundacao: string): Promise<void> {
    await this.fundacaoInput.sendKeys(fundacao);
  }

  async getFundacaoInput(): Promise<string> {
    return await this.fundacaoInput.getAttribute('value');
  }

  async setFundadorInput(fundador: string): Promise<void> {
    await this.fundadorInput.sendKeys(fundador);
  }

  async getFundadorInput(): Promise<string> {
    return await this.fundadorInput.getAttribute('value');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setDimensaoInput(dimensao: string): Promise<void> {
    await this.dimensaoInput.sendKeys(dimensao);
  }

  async getDimensaoInput(): Promise<string> {
    return await this.dimensaoInput.getAttribute('value');
  }

  getSedeInput(): ElementFinder {
    return this.sedeInput;
  }
  async setTipoVinculoInput(tipoVinculo: string): Promise<void> {
    await this.tipoVinculoInput.sendKeys(tipoVinculo);
  }

  async getTipoVinculoInput(): Promise<string> {
    return await this.tipoVinculoInput.getAttribute('value');
  }

  async setUnidadePagadoraInput(unidadePagadora: string): Promise<void> {
    await this.unidadePagadoraInput.sendKeys(unidadePagadora);
  }

  async getUnidadePagadoraInput(): Promise<string> {
    return await this.unidadePagadoraInput.getAttribute('value');
  }

  async setTipoInstalacaoInput(tipoInstalacao: string): Promise<void> {
    await this.tipoInstalacaoInput.sendKeys(tipoInstalacao);
  }

  async getTipoInstalacaoInput(): Promise<string> {
    return await this.tipoInstalacaoInput.getAttribute('value');
  }

  async setProvinciaInput(provincia: string): Promise<void> {
    await this.provinciaInput.sendKeys(provincia);
  }

  async getProvinciaInput(): Promise<string> {
    return await this.provinciaInput.getAttribute('value');
  }

  async setMunicipioInput(municipio: string): Promise<void> {
    await this.municipioInput.sendKeys(municipio);
  }

  async getMunicipioInput(): Promise<string> {
    return await this.municipioInput.getAttribute('value');
  }

  async setBairroInput(bairro: string): Promise<void> {
    await this.bairroInput.sendKeys(bairro);
  }

  async getBairroInput(): Promise<string> {
    return await this.bairroInput.getAttribute('value');
  }

  async setRuaInput(rua: string): Promise<void> {
    await this.ruaInput.sendKeys(rua);
  }

  async getRuaInput(): Promise<string> {
    return await this.ruaInput.getAttribute('value');
  }

  async setQuarteiraoInput(quarteirao: string): Promise<void> {
    await this.quarteiraoInput.sendKeys(quarteirao);
  }

  async getQuarteiraoInput(): Promise<string> {
    return await this.quarteiraoInput.getAttribute('value');
  }

  async setNumeroPortaInput(numeroPorta: string): Promise<void> {
    await this.numeroPortaInput.sendKeys(numeroPorta);
  }

  async getNumeroPortaInput(): Promise<string> {
    return await this.numeroPortaInput.getAttribute('value');
  }

  async hierarquiaSelectLastOption(): Promise<void> {
    await this.hierarquiaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async hierarquiaSelectOption(option: string): Promise<void> {
    await this.hierarquiaSelect.sendKeys(option);
  }

  getHierarquiaSelect(): ElementFinder {
    return this.hierarquiaSelect;
  }

  async getHierarquiaSelectedOption(): Promise<string> {
    return await this.hierarquiaSelect.element(by.css('option:checked')).getText();
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

export class InstituicaoEnsinoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-instituicaoEnsino-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-instituicaoEnsino'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
