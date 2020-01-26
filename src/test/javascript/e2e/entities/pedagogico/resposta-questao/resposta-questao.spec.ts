import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  RespostaQuestaoComponentsPage,
  /* RespostaQuestaoDeleteDialog,
   */ RespostaQuestaoUpdatePage
} from './resposta-questao.page-object';

const expect = chai.expect;

describe('RespostaQuestao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let respostaQuestaoComponentsPage: RespostaQuestaoComponentsPage;
  let respostaQuestaoUpdatePage: RespostaQuestaoUpdatePage;
  /* let respostaQuestaoDeleteDialog: RespostaQuestaoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RespostaQuestaos', async () => {
    await navBarPage.goToEntity('resposta-questao');
    respostaQuestaoComponentsPage = new RespostaQuestaoComponentsPage();
    await browser.wait(ec.visibilityOf(respostaQuestaoComponentsPage.title), 5000);
    expect(await respostaQuestaoComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoRespostaQuestao.home.title');
  });

  it('should load create RespostaQuestao page', async () => {
    await respostaQuestaoComponentsPage.clickOnCreateButton();
    respostaQuestaoUpdatePage = new RespostaQuestaoUpdatePage();
    expect(await respostaQuestaoUpdatePage.getPageTitle()).to.eq('educacaoApp.pedagogicoRespostaQuestao.home.createOrEditLabel');
    await respostaQuestaoUpdatePage.cancel();
  });

  /*  it('should create and save RespostaQuestaos', async () => {
        const nbButtonsBeforeCreate = await respostaQuestaoComponentsPage.countDeleteButtons();

        await respostaQuestaoComponentsPage.clickOnCreateButton();
        await promise.all([
            respostaQuestaoUpdatePage.setRespostaInput('resposta'),
            respostaQuestaoUpdatePage.questaoSelectLastOption(),
        ]);
        expect(await respostaQuestaoUpdatePage.getRespostaInput()).to.eq('resposta', 'Expected Resposta value to be equals to resposta');
        await respostaQuestaoUpdatePage.save();
        expect(await respostaQuestaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await respostaQuestaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last RespostaQuestao', async () => {
        const nbButtonsBeforeDelete = await respostaQuestaoComponentsPage.countDeleteButtons();
        await respostaQuestaoComponentsPage.clickOnLastDeleteButton();

        respostaQuestaoDeleteDialog = new RespostaQuestaoDeleteDialog();
        expect(await respostaQuestaoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pedagogicoRespostaQuestao.delete.question');
        await respostaQuestaoDeleteDialog.clickOnConfirmButton();

        expect(await respostaQuestaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
