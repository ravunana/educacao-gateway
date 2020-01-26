import { element, by, ElementFinder } from 'protractor';

export class ProvaAptidaoProfissionalComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-prova-aptidao-profissional div table .btn-danger'));
  title = element.all(by.css('rv-prova-aptidao-profissional div h2#page-heading span')).first();

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

export class ProvaAptidaoProfissionalUpdatePage {
  pageTitle = element(by.id('rv-prova-aptidao-profissional-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  numeroProcessoInput = element(by.id('field_numeroProcesso'));
  nomeAlunoInput = element(by.id('field_nomeAluno'));
  livroRegistroInput = element(by.id('field_livroRegistro'));
  folhaRegistroInput = element(by.id('field_folhaRegistro'));
  temaProjectoTecnologioInput = element(by.id('field_temaProjectoTecnologio'));
  notaProjectoTecnologioInput = element(by.id('field_notaProjectoTecnologio'));
  dataDefesaInput = element(by.id('field_dataDefesa'));
  localEstagioInput = element(by.id('field_localEstagio'));
  aproveitamentoEstagioInput = element(by.id('field_aproveitamentoEstagio'));
  inicioEstagioInput = element(by.id('field_inicioEstagio'));
  finalEstagioInput = element(by.id('field_finalEstagio'));
  dataInput = element(by.id('field_data'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async setLivroRegistroInput(livroRegistro: string): Promise<void> {
    await this.livroRegistroInput.sendKeys(livroRegistro);
  }

  async getLivroRegistroInput(): Promise<string> {
    return await this.livroRegistroInput.getAttribute('value');
  }

  async setFolhaRegistroInput(folhaRegistro: string): Promise<void> {
    await this.folhaRegistroInput.sendKeys(folhaRegistro);
  }

  async getFolhaRegistroInput(): Promise<string> {
    return await this.folhaRegistroInput.getAttribute('value');
  }

  async setTemaProjectoTecnologioInput(temaProjectoTecnologio: string): Promise<void> {
    await this.temaProjectoTecnologioInput.sendKeys(temaProjectoTecnologio);
  }

  async getTemaProjectoTecnologioInput(): Promise<string> {
    return await this.temaProjectoTecnologioInput.getAttribute('value');
  }

  async setNotaProjectoTecnologioInput(notaProjectoTecnologio: string): Promise<void> {
    await this.notaProjectoTecnologioInput.sendKeys(notaProjectoTecnologio);
  }

  async getNotaProjectoTecnologioInput(): Promise<string> {
    return await this.notaProjectoTecnologioInput.getAttribute('value');
  }

  async setDataDefesaInput(dataDefesa: string): Promise<void> {
    await this.dataDefesaInput.sendKeys(dataDefesa);
  }

  async getDataDefesaInput(): Promise<string> {
    return await this.dataDefesaInput.getAttribute('value');
  }

  async setLocalEstagioInput(localEstagio: string): Promise<void> {
    await this.localEstagioInput.sendKeys(localEstagio);
  }

  async getLocalEstagioInput(): Promise<string> {
    return await this.localEstagioInput.getAttribute('value');
  }

  async setAproveitamentoEstagioInput(aproveitamentoEstagio: string): Promise<void> {
    await this.aproveitamentoEstagioInput.sendKeys(aproveitamentoEstagio);
  }

  async getAproveitamentoEstagioInput(): Promise<string> {
    return await this.aproveitamentoEstagioInput.getAttribute('value');
  }

  async setInicioEstagioInput(inicioEstagio: string): Promise<void> {
    await this.inicioEstagioInput.sendKeys(inicioEstagio);
  }

  async getInicioEstagioInput(): Promise<string> {
    return await this.inicioEstagioInput.getAttribute('value');
  }

  async setFinalEstagioInput(finalEstagio: string): Promise<void> {
    await this.finalEstagioInput.sendKeys(finalEstagio);
  }

  async getFinalEstagioInput(): Promise<string> {
    return await this.finalEstagioInput.getAttribute('value');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
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

export class ProvaAptidaoProfissionalDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-provaAptidaoProfissional-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-provaAptidaoProfissional'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
