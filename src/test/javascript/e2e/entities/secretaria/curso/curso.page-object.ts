import { element, by, ElementFinder } from 'protractor';

export class CursoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('rv-curso div table .btn-danger'));
  title = element.all(by.css('rv-curso div h2#page-heading span')).first();

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

export class CursoUpdatePage {
  pageTitle = element(by.id('rv-curso-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  siglaInput = element(by.id('field_sigla'));
  competenciasInput = element(by.id('field_competencias'));
  areaFormacaoInput = element(by.id('field_areaFormacao'));

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

  async setCompetenciasInput(competencias: string): Promise<void> {
    await this.competenciasInput.sendKeys(competencias);
  }

  async getCompetenciasInput(): Promise<string> {
    return await this.competenciasInput.getAttribute('value');
  }

  async setAreaFormacaoInput(areaFormacao: string): Promise<void> {
    await this.areaFormacaoInput.sendKeys(areaFormacao);
  }

  async getAreaFormacaoInput(): Promise<string> {
    return await this.areaFormacaoInput.getAttribute('value');
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

export class CursoDeleteDialog {
  private dialogTitle = element(by.id('rv-delete-curso-heading'));
  private confirmButton = element(by.id('rv-confirm-delete-curso'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
