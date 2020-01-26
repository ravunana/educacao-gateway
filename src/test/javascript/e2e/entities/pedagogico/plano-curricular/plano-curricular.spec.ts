import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  PlanoCurricularComponentsPage,
  /* PlanoCurricularDeleteDialog,
   */ PlanoCurricularUpdatePage
} from './plano-curricular.page-object';

const expect = chai.expect;

describe('PlanoCurricular e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let planoCurricularComponentsPage: PlanoCurricularComponentsPage;
  let planoCurricularUpdatePage: PlanoCurricularUpdatePage;
  /* let planoCurricularDeleteDialog: PlanoCurricularDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PlanoCurriculars', async () => {
    await navBarPage.goToEntity('plano-curricular');
    planoCurricularComponentsPage = new PlanoCurricularComponentsPage();
    await browser.wait(ec.visibilityOf(planoCurricularComponentsPage.title), 5000);
    expect(await planoCurricularComponentsPage.getTitle()).to.eq('educacaoApp.pedagogicoPlanoCurricular.home.title');
  });

  it('should load create PlanoCurricular page', async () => {
    await planoCurricularComponentsPage.clickOnCreateButton();
    planoCurricularUpdatePage = new PlanoCurricularUpdatePage();
    expect(await planoCurricularUpdatePage.getPageTitle()).to.eq('educacaoApp.pedagogicoPlanoCurricular.home.createOrEditLabel');
    await planoCurricularUpdatePage.cancel();
  });

  /*  it('should create and save PlanoCurriculars', async () => {
        const nbButtonsBeforeCreate = await planoCurricularComponentsPage.countDeleteButtons();

        await planoCurricularComponentsPage.clickOnCreateButton();
        await promise.all([
            planoCurricularUpdatePage.setDescricaoInput('descricao'),
            planoCurricularUpdatePage.setTempoSemanalInput('5'),
            planoCurricularUpdatePage.setPeriodoLectivoInput('periodoLectivo'),
            planoCurricularUpdatePage.setComponenteInput('componente'),
            planoCurricularUpdatePage.setDisciplinaInput('disciplina'),
            planoCurricularUpdatePage.setClasseInput('5'),
            planoCurricularUpdatePage.cursoSelectLastOption(),
        ]);
        expect(await planoCurricularUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
        const selectedTerminal = planoCurricularUpdatePage.getTerminalInput();
        if (await selectedTerminal.isSelected()) {
            await planoCurricularUpdatePage.getTerminalInput().click();
            expect(await planoCurricularUpdatePage.getTerminalInput().isSelected(), 'Expected terminal not to be selected').to.be.false;
        } else {
            await planoCurricularUpdatePage.getTerminalInput().click();
            expect(await planoCurricularUpdatePage.getTerminalInput().isSelected(), 'Expected terminal to be selected').to.be.true;
        }
        expect(await planoCurricularUpdatePage.getTempoSemanalInput()).to.eq('5', 'Expected tempoSemanal value to be equals to 5');
        expect(await planoCurricularUpdatePage.getPeriodoLectivoInput()).to.eq('periodoLectivo', 'Expected PeriodoLectivo value to be equals to periodoLectivo');
        expect(await planoCurricularUpdatePage.getComponenteInput()).to.eq('componente', 'Expected Componente value to be equals to componente');
        expect(await planoCurricularUpdatePage.getDisciplinaInput()).to.eq('disciplina', 'Expected Disciplina value to be equals to disciplina');
        expect(await planoCurricularUpdatePage.getClasseInput()).to.eq('5', 'Expected classe value to be equals to 5');
        await planoCurricularUpdatePage.save();
        expect(await planoCurricularUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await planoCurricularComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last PlanoCurricular', async () => {
        const nbButtonsBeforeDelete = await planoCurricularComponentsPage.countDeleteButtons();
        await planoCurricularComponentsPage.clickOnLastDeleteButton();

        planoCurricularDeleteDialog = new PlanoCurricularDeleteDialog();
        expect(await planoCurricularDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.pedagogicoPlanoCurricular.delete.question');
        await planoCurricularDeleteDialog.clickOnConfirmButton();

        expect(await planoCurricularComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
