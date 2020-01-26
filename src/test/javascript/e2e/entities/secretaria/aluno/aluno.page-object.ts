import { element, by, ElementFinder } from 'protractor';

export class AlunoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-aluno div table .btn-danger'));
  title = element.all(by.css('rv-aluno div h2#page-heading span')).first();

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

export class AlunoUpdatePage {
  pageTitle = element(by.id('rv-aluno-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  sexoInput = element(by.id('field_sexo'));
  fotografiaInput = element(by.id('file_fotografia'));
  paiInput = element(by.id('field_pai'));
  maeInput = element(by.id('field_mae'));
  nascimentoInput = element(by.id('field_nascimento'));
  nacionalidadeInput = element(by.id('field_nacionalidade'));
  naturalidadeInput = element(by.id('field_naturalidade'));
  contactoInput = element(by.id('field_contacto'));
  emailInput = element(by.id('field_email'));
  tipoDocumentoInput = element(by.id('field_tipoDocumento'));
  numeroDocumentoInput = element(by.id('field_numeroDocumento'));
  emissaoInput = element(by.id('field_emissao'));
  validadeInput = element(by.id('field_validade'));
  localEmissaoInput = element(by.id('field_localEmissao'));
  nifInput = element(by.id('field_nif'));
  provinciaInput = element(by.id('field_provincia'));
  municipioInput = element(by.id('field_municipio'));
  bairroInput = element(by.id('field_bairro'));
  ruaInput = element(by.id('field_rua'));
  quarteiraoInput = element(by.id('field_quarteirao'));
  numeroPortaInput = element(by.id('field_numeroPorta'));
  fazEducacaoFisicaInput = element(by.id('field_fazEducacaoFisica'));
  grupoSanguinioInput = element(by.id('field_grupoSanguinio'));
  autorizaMedicamentoInput = element(by.id('field_autorizaMedicamento'));
  alturaInput = element(by.id('field_altura'));
  pesoInput = element(by.id('field_peso'));
  nomeMedicoInput = element(by.id('field_nomeMedico'));
  contactoMedicoInput = element(by.id('field_contactoMedico'));
  desmaioConstanteInput = element(by.id('field_desmaioConstante'));
  alergiaInput = element(by.id('field_alergia'));
  dificienciaInput = element(by.id('field_dificiencia'));
  anoConclusaoInput = element(by.id('field_anoConclusao'));
  situacaoAnteriorInput = element(by.id('field_situacaoAnterior'));
  meioTransporteInput = element(by.id('field_meioTransporte'));
  escolaAnteriorInput = element(by.id('field_escolaAnterior'));
  classeAnteriorInput = element(by.id('field_classeAnterior'));
  cursoAnteriorInput = element(by.id('field_cursoAnterior'));
  dataInput = element(by.id('field_data'));
  numeroProcessoInput = element(by.id('field_numeroProcesso'));
  transferidoInput = element(by.id('field_transferido'));
  observacaoInput = element(by.id('field_observacao'));
  situacaoAtualInput = element(by.id('field_situacaoAtual'));
  encarregadoSelect = element(by.id('field_encarregado'));

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

  async setPaiInput(pai: string): Promise<void> {
    await this.paiInput.sendKeys(pai);
  }

  async getPaiInput(): Promise<string> {
    return await this.paiInput.getAttribute('value');
  }

  async setMaeInput(mae: string): Promise<void> {
    await this.maeInput.sendKeys(mae);
  }

  async getMaeInput(): Promise<string> {
    return await this.maeInput.getAttribute('value');
  }

  async setNascimentoInput(nascimento: string): Promise<void> {
    await this.nascimentoInput.sendKeys(nascimento);
  }

  async getNascimentoInput(): Promise<string> {
    return await this.nascimentoInput.getAttribute('value');
  }

  async setNacionalidadeInput(nacionalidade: string): Promise<void> {
    await this.nacionalidadeInput.sendKeys(nacionalidade);
  }

  async getNacionalidadeInput(): Promise<string> {
    return await this.nacionalidadeInput.getAttribute('value');
  }

  async setNaturalidadeInput(naturalidade: string): Promise<void> {
    await this.naturalidadeInput.sendKeys(naturalidade);
  }

  async getNaturalidadeInput(): Promise<string> {
    return await this.naturalidadeInput.getAttribute('value');
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

  async setTipoDocumentoInput(tipoDocumento: string): Promise<void> {
    await this.tipoDocumentoInput.sendKeys(tipoDocumento);
  }

  async getTipoDocumentoInput(): Promise<string> {
    return await this.tipoDocumentoInput.getAttribute('value');
  }

  async setNumeroDocumentoInput(numeroDocumento: string): Promise<void> {
    await this.numeroDocumentoInput.sendKeys(numeroDocumento);
  }

  async getNumeroDocumentoInput(): Promise<string> {
    return await this.numeroDocumentoInput.getAttribute('value');
  }

  async setEmissaoInput(emissao: string): Promise<void> {
    await this.emissaoInput.sendKeys(emissao);
  }

  async getEmissaoInput(): Promise<string> {
    return await this.emissaoInput.getAttribute('value');
  }

  async setValidadeInput(validade: string): Promise<void> {
    await this.validadeInput.sendKeys(validade);
  }

  async getValidadeInput(): Promise<string> {
    return await this.validadeInput.getAttribute('value');
  }

  async setLocalEmissaoInput(localEmissao: string): Promise<void> {
    await this.localEmissaoInput.sendKeys(localEmissao);
  }

  async getLocalEmissaoInput(): Promise<string> {
    return await this.localEmissaoInput.getAttribute('value');
  }

  async setNifInput(nif: string): Promise<void> {
    await this.nifInput.sendKeys(nif);
  }

  async getNifInput(): Promise<string> {
    return await this.nifInput.getAttribute('value');
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

  getFazEducacaoFisicaInput(): ElementFinder {
    return this.fazEducacaoFisicaInput;
  }
  async setGrupoSanguinioInput(grupoSanguinio: string): Promise<void> {
    await this.grupoSanguinioInput.sendKeys(grupoSanguinio);
  }

  async getGrupoSanguinioInput(): Promise<string> {
    return await this.grupoSanguinioInput.getAttribute('value');
  }

  getAutorizaMedicamentoInput(): ElementFinder {
    return this.autorizaMedicamentoInput;
  }
  async setAlturaInput(altura: string): Promise<void> {
    await this.alturaInput.sendKeys(altura);
  }

  async getAlturaInput(): Promise<string> {
    return await this.alturaInput.getAttribute('value');
  }

  async setPesoInput(peso: string): Promise<void> {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput(): Promise<string> {
    return await this.pesoInput.getAttribute('value');
  }

  async setNomeMedicoInput(nomeMedico: string): Promise<void> {
    await this.nomeMedicoInput.sendKeys(nomeMedico);
  }

  async getNomeMedicoInput(): Promise<string> {
    return await this.nomeMedicoInput.getAttribute('value');
  }

  async setContactoMedicoInput(contactoMedico: string): Promise<void> {
    await this.contactoMedicoInput.sendKeys(contactoMedico);
  }

  async getContactoMedicoInput(): Promise<string> {
    return await this.contactoMedicoInput.getAttribute('value');
  }

  getDesmaioConstanteInput(): ElementFinder {
    return this.desmaioConstanteInput;
  }
  async setAlergiaInput(alergia: string): Promise<void> {
    await this.alergiaInput.sendKeys(alergia);
  }

  async getAlergiaInput(): Promise<string> {
    return await this.alergiaInput.getAttribute('value');
  }

  async setDificienciaInput(dificiencia: string): Promise<void> {
    await this.dificienciaInput.sendKeys(dificiencia);
  }

  async getDificienciaInput(): Promise<string> {
    return await this.dificienciaInput.getAttribute('value');
  }

  async setAnoConclusaoInput(anoConclusao: string): Promise<void> {
    await this.anoConclusaoInput.sendKeys(anoConclusao);
  }

  async getAnoConclusaoInput(): Promise<string> {
    return await this.anoConclusaoInput.getAttribute('value');
  }

  async setSituacaoAnteriorInput(situacaoAnterior: string): Promise<void> {
    await this.situacaoAnteriorInput.sendKeys(situacaoAnterior);
  }

  async getSituacaoAnteriorInput(): Promise<string> {
    return await this.situacaoAnteriorInput.getAttribute('value');
  }

  async setMeioTransporteInput(meioTransporte: string): Promise<void> {
    await this.meioTransporteInput.sendKeys(meioTransporte);
  }

  async getMeioTransporteInput(): Promise<string> {
    return await this.meioTransporteInput.getAttribute('value');
  }

  async setEscolaAnteriorInput(escolaAnterior: string): Promise<void> {
    await this.escolaAnteriorInput.sendKeys(escolaAnterior);
  }

  async getEscolaAnteriorInput(): Promise<string> {
    return await this.escolaAnteriorInput.getAttribute('value');
  }

  async setClasseAnteriorInput(classeAnterior: string): Promise<void> {
    await this.classeAnteriorInput.sendKeys(classeAnterior);
  }

  async getClasseAnteriorInput(): Promise<string> {
    return await this.classeAnteriorInput.getAttribute('value');
  }

  async setCursoAnteriorInput(cursoAnterior: string): Promise<void> {
    await this.cursoAnteriorInput.sendKeys(cursoAnterior);
  }

  async getCursoAnteriorInput(): Promise<string> {
    return await this.cursoAnteriorInput.getAttribute('value');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async setNumeroProcessoInput(numeroProcesso: string): Promise<void> {
    await this.numeroProcessoInput.sendKeys(numeroProcesso);
  }

  async getNumeroProcessoInput(): Promise<string> {
    return await this.numeroProcessoInput.getAttribute('value');
  }

  getTransferidoInput(): ElementFinder {
    return this.transferidoInput;
  }
  async setObservacaoInput(observacao: string): Promise<void> {
    await this.observacaoInput.sendKeys(observacao);
  }

  async getObservacaoInput(): Promise<string> {
    return await this.observacaoInput.getAttribute('value');
  }

  async setSituacaoAtualInput(situacaoAtual: string): Promise<void> {
    await this.situacaoAtualInput.sendKeys(situacaoAtual);
  }

  async getSituacaoAtualInput(): Promise<string> {
    return await this.situacaoAtualInput.getAttribute('value');
  }

  async encarregadoSelectLastOption(): Promise<void> {
    await this.encarregadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async encarregadoSelectOption(option: string): Promise<void> {
    await this.encarregadoSelect.sendKeys(option);
  }

  getEncarregadoSelect(): ElementFinder {
    return this.encarregadoSelect;
  }

  async getEncarregadoSelectedOption(): Promise<string> {
    return await this.encarregadoSelect.element(by.css('option:checked')).getText();
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

export class AlunoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-aluno-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-aluno'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
