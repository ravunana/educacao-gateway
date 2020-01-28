import { element, by, ElementFinder } from 'protractor';

export class DosificacaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-dosificacao div table .btn-danger'));
  title = element.all(by.css('rv-dosificacao div h2#page-heading span')).first();

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

export class DosificacaoUpdatePage {
  pageTitle = element(by.id('rv-dosificacao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  peridoLectiveInput = element(by.id('field_peridoLective'));
  objectivoGeralInput = element(by.id('field_objectivoGeral'));
  semanaLectivaInput = element(by.id('field_semanaLectiva'));
  deInput = element(by.id('field_de'));
  ateInput = element(by.id('field_ate'));
  unidadeTematicaInput = element(by.id('field_unidadeTematica'));
  conteudoInput = element(by.id('field_conteudo'));
  procedimentoEnsinoInput = element(by.id('field_procedimentoEnsino'));
  recursosDidaticosInput = element(by.id('field_recursosDidaticos'));
  tempoAulaInput = element(by.id('field_tempoAula'));
  formaAvaliacaoInput = element(by.id('field_formaAvaliacao'));
  cursoSelect = element(by.id('field_curso'));
  curriuloSelect = element(by.id('field_curriulo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPeridoLectiveInput(peridoLective: string): Promise<void> {
    await this.peridoLectiveInput.sendKeys(peridoLective);
  }

  async getPeridoLectiveInput(): Promise<string> {
    return await this.peridoLectiveInput.getAttribute('value');
  }

  async setObjectivoGeralInput(objectivoGeral: string): Promise<void> {
    await this.objectivoGeralInput.sendKeys(objectivoGeral);
  }

  async getObjectivoGeralInput(): Promise<string> {
    return await this.objectivoGeralInput.getAttribute('value');
  }

  async setSemanaLectivaInput(semanaLectiva: string): Promise<void> {
    await this.semanaLectivaInput.sendKeys(semanaLectiva);
  }

  async getSemanaLectivaInput(): Promise<string> {
    return await this.semanaLectivaInput.getAttribute('value');
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

  async setUnidadeTematicaInput(unidadeTematica: string): Promise<void> {
    await this.unidadeTematicaInput.sendKeys(unidadeTematica);
  }

  async getUnidadeTematicaInput(): Promise<string> {
    return await this.unidadeTematicaInput.getAttribute('value');
  }

  async setConteudoInput(conteudo: string): Promise<void> {
    await this.conteudoInput.sendKeys(conteudo);
  }

  async getConteudoInput(): Promise<string> {
    return await this.conteudoInput.getAttribute('value');
  }

  async setProcedimentoEnsinoInput(procedimentoEnsino: string): Promise<void> {
    await this.procedimentoEnsinoInput.sendKeys(procedimentoEnsino);
  }

  async getProcedimentoEnsinoInput(): Promise<string> {
    return await this.procedimentoEnsinoInput.getAttribute('value');
  }

  async setRecursosDidaticosInput(recursosDidaticos: string): Promise<void> {
    await this.recursosDidaticosInput.sendKeys(recursosDidaticos);
  }

  async getRecursosDidaticosInput(): Promise<string> {
    return await this.recursosDidaticosInput.getAttribute('value');
  }

  async setTempoAulaInput(tempoAula: string): Promise<void> {
    await this.tempoAulaInput.sendKeys(tempoAula);
  }

  async getTempoAulaInput(): Promise<string> {
    return await this.tempoAulaInput.getAttribute('value');
  }

  async setFormaAvaliacaoInput(formaAvaliacao: string): Promise<void> {
    await this.formaAvaliacaoInput.sendKeys(formaAvaliacao);
  }

  async getFormaAvaliacaoInput(): Promise<string> {
    return await this.formaAvaliacaoInput.getAttribute('value');
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

  async curriuloSelectLastOption(): Promise<void> {
    await this.curriuloSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async curriuloSelectOption(option: string): Promise<void> {
    await this.curriuloSelect.sendKeys(option);
  }

  getCurriuloSelect(): ElementFinder {
    return this.curriuloSelect;
  }

  async getCurriuloSelectedOption(): Promise<string> {
    return await this.curriuloSelect.element(by.css('option:checked')).getText();
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

export class DosificacaoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-dosificacao-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-dosificacao'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
