import { element, by, ElementFinder } from 'protractor';

export class PlanoActividadeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-plano-actividade div table .btn-danger'));
  title = element.all(by.css('rv-plano-actividade div h2#page-heading span')).first();

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

export class PlanoActividadeUpdatePage {
  pageTitle = element(by.id('rv-plano-actividade-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  numeroActividadeInput = element(by.id('field_numeroActividade'));
  atividadeInput = element(by.id('field_atividade'));
  objectivosInput = element(by.id('field_objectivos'));
  deInput = element(by.id('field_de'));
  ateInput = element(by.id('field_ate'));
  responsavelInput = element(by.id('field_responsavel'));
  localInput = element(by.id('field_local'));
  observacaoInput = element(by.id('field_observacao'));
  participantesInput = element(by.id('field_participantes'));
  coResponsavelInput = element(by.id('field_coResponsavel'));
  anoLectivoInput = element(by.id('field_anoLectivo'));
  statusActividadeInput = element(by.id('field_statusActividade'));
  periodoLectivoInput = element(by.id('field_periodoLectivo'));
  turnoInput = element(by.id('field_turno'));
  classeInput = element(by.id('field_classe'));
  cursoSelect = element(by.id('field_curso'));
  turmaSelect = element(by.id('field_turma'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroActividadeInput(numeroActividade: string): Promise<void> {
    await this.numeroActividadeInput.sendKeys(numeroActividade);
  }

  async getNumeroActividadeInput(): Promise<string> {
    return await this.numeroActividadeInput.getAttribute('value');
  }

  async setAtividadeInput(atividade: string): Promise<void> {
    await this.atividadeInput.sendKeys(atividade);
  }

  async getAtividadeInput(): Promise<string> {
    return await this.atividadeInput.getAttribute('value');
  }

  async setObjectivosInput(objectivos: string): Promise<void> {
    await this.objectivosInput.sendKeys(objectivos);
  }

  async getObjectivosInput(): Promise<string> {
    return await this.objectivosInput.getAttribute('value');
  }

  async setDeInput(de: string): Promise<void> {
    await this.deInput.sendKeys(de);
  }

  async getDeInput(): Promise<string> {
    return await this.deInput.getAttribute('value');
  }

  async setAteInput(ate: string): Promise<void> {
    await this.ateInput.sendKeys(ate);
  }

  async getAteInput(): Promise<string> {
    return await this.ateInput.getAttribute('value');
  }

  async setResponsavelInput(responsavel: string): Promise<void> {
    await this.responsavelInput.sendKeys(responsavel);
  }

  async getResponsavelInput(): Promise<string> {
    return await this.responsavelInput.getAttribute('value');
  }

  async setLocalInput(local: string): Promise<void> {
    await this.localInput.sendKeys(local);
  }

  async getLocalInput(): Promise<string> {
    return await this.localInput.getAttribute('value');
  }

  async setObservacaoInput(observacao: string): Promise<void> {
    await this.observacaoInput.sendKeys(observacao);
  }

  async getObservacaoInput(): Promise<string> {
    return await this.observacaoInput.getAttribute('value');
  }

  async setParticipantesInput(participantes: string): Promise<void> {
    await this.participantesInput.sendKeys(participantes);
  }

  async getParticipantesInput(): Promise<string> {
    return await this.participantesInput.getAttribute('value');
  }

  async setCoResponsavelInput(coResponsavel: string): Promise<void> {
    await this.coResponsavelInput.sendKeys(coResponsavel);
  }

  async getCoResponsavelInput(): Promise<string> {
    return await this.coResponsavelInput.getAttribute('value');
  }

  async setAnoLectivoInput(anoLectivo: string): Promise<void> {
    await this.anoLectivoInput.sendKeys(anoLectivo);
  }

  async getAnoLectivoInput(): Promise<string> {
    return await this.anoLectivoInput.getAttribute('value');
  }

  async setStatusActividadeInput(statusActividade: string): Promise<void> {
    await this.statusActividadeInput.sendKeys(statusActividade);
  }

  async getStatusActividadeInput(): Promise<string> {
    return await this.statusActividadeInput.getAttribute('value');
  }

  async setPeriodoLectivoInput(periodoLectivo: string): Promise<void> {
    await this.periodoLectivoInput.sendKeys(periodoLectivo);
  }

  async getPeriodoLectivoInput(): Promise<string> {
    return await this.periodoLectivoInput.getAttribute('value');
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

  async cursoSelectLastOption(): Promise<void> {
    await this.cursoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cursoSelectOption(option: string): Promise<void> {
    await this.cursoSelect.sendKeys(option);
  }

  getCursoSelect(): ElementFinder {
    return this.cursoSelect;
  }

  async getCursoSelectedOption(): Promise<string> {
    return await this.cursoSelect.element(by.css('option:checked')).getText();
  }

  async turmaSelectLastOption(): Promise<void> {
    await this.turmaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async turmaSelectOption(option: string): Promise<void> {
    await this.turmaSelect.sendKeys(option);
  }

  getTurmaSelect(): ElementFinder {
    return this.turmaSelect;
  }

  async getTurmaSelectedOption(): Promise<string> {
    return await this.turmaSelect.element(by.css('option:checked')).getText();
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

export class PlanoActividadeDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-planoActividade-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-planoActividade'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
