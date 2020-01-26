import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  QuestaoTesteComponentsPage,
  /* QuestaoTesteDeleteDialog,
   */ QuestaoTesteUpdatePage
} from './questao-teste.page-object';

const expect = chai.expect;

describe('QuestaoTeste e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questaoTesteComponentsPage: QuestaoTesteComponentsPage;
  let questaoTesteUpdatePage: QuestaoTesteUpdatePage;
  /* let questaoTesteDeleteDialog: QuestaoTesteDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load QuestaoTestes', async () => {
    await navBarPage.goToEntity('questao-teste');
    questaoTesteComponentsPage = new QuestaoTesteComponentsPage();
    await browser.wait(ec.visibilityOf(questaoTesteComponentsPage.title), 5000);
    expect(await questaoTesteComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoQuestaoTeste.home.title');
  });

  it('should load create QuestaoTeste page', async () => {
    await questaoTesteComponentsPage.clickOnCreateButton();
    questaoTesteUpdatePage = new QuestaoTesteUpdatePage();
    expect(await questaoTesteUpdatePage.getPageTitle()).to.eq('educacaoApp.pedagogicoQuestaoTeste.home.createOrEditLabel');
    await questaoTesteUpdatePage.cancel();
  });

  /*  it('should create and save QuestaoTestes', async () => {
        const nbButtonsBeforeCreate = await questaoTesteComponentsPage.countDeleteButtons();

        await questaoTesteComponentsPage.clickOnCreateButton();
        await promise.all([
            questaoTesteUpdatePage.setGrupoInput('grupo'),
            questaoTesteUpdatePage.setNumeroInput('5'),
            questaoTesteUpdatePage.setArgumentoInput('argumento'),
            questaoTesteUpdatePage.setQuestaoInput('questao'),
            questaoTesteUpdatePage.testeSelectLastOption(),
        ]);
        expect(await questaoTesteUpdatePage.getGrupoInput()).to.eq('grupo', 'Expected Grupo value to be equals to grupo');
        expect(await questaoTesteUpdatePage.getNumeroInput()).to.eq('5', 'Expected numero value to be equals to 5');
        expect(await questaoTesteUpdatePage.getArgumentoInput()).to.eq('argumento', 'Expected Argumento value to be equals to argumento');
        expect(await questaoTesteUpdatePage.getQuestaoInput()).to.eq('questao', 'Expected Questao value to be equals to questao');
        await questaoTesteUpdatePage.save();
        expect(await questaoTesteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await questaoTesteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last QuestaoTeste', async () => {
        const nbButtonsBeforeDelete = await questaoTesteComponentsPage.countDeleteButtons();
        await questaoTesteComponentsPage.clickOnLastDeleteButton();

        questaoTesteDeleteDialog = new QuestaoTesteDeleteDialog();
        expect(await questaoTesteDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pedagogicoQuestaoTeste.delete.question');
        await questaoTesteDeleteDialog.clickOnConfirmButton();

        expect(await questaoTesteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
