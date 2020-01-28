import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  HorarioComponentsPage,
  /* HorarioDeleteDialog,
   */ HorarioUpdatePage
} from './horario.page-object';

const expect = chai.expect;

describe('Horario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let horarioComponentsPage: HorarioComponentsPage;
  let horarioUpdatePage: HorarioUpdatePage;
  /* let horarioDeleteDialog: HorarioDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Horarios', async () => {
    await navBarPage.goToEntity('horario');
    horarioComponentsPage = new HorarioComponentsPage();
    await browser.wait(ec.visibilityOf(horarioComponentsPage.title), 5000);
    expect(await horarioComponentsPage.getTitle()).to.eq('educacaoApp.secretariaHorario.home.title');
  });

  it('should load create Horario page', async () => {
    await horarioComponentsPage.clickOnCreateButton();
    horarioUpdatePage = new HorarioUpdatePage();
    expect(await horarioUpdatePage.getPageTitle()).to.eq('educacaoApp.secretariaHorario.home.createOrEditLabel');
    await horarioUpdatePage.cancel();
  });

  /*  it('should create and save Horarios', async () => {
        const nbButtonsBeforeCreate = await horarioComponentsPage.countDeleteButtons();

        await horarioComponentsPage.clickOnCreateButton();
        await promise.all([
            horarioUpdatePage.setInicioInput('inicio'),
            horarioUpdatePage.setFimInput('fim'),
            horarioUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            horarioUpdatePage.setAnoLectivoInput('5'),
            horarioUpdatePage.setDiaSemanaInput('diaSemana'),
            horarioUpdatePage.setCategoriaInput('categoria'),
            horarioUpdatePage.turmaSelectLastOption(),
            horarioUpdatePage.professorSelectLastOption(),
            horarioUpdatePage.curriculoSelectLastOption(),
        ]);
        expect(await horarioUpdatePage.getInicioInput()).to.eq('inicio', 'Expected Inicio value to be equals to inicio');
        expect(await horarioUpdatePage.getFimInput()).to.eq('fim', 'Expected Fim value to be equals to fim');
        expect(await horarioUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');
        expect(await horarioUpdatePage.getAnoLectivoInput()).to.eq('5', 'Expected anoLectivo value to be equals to 5');
        expect(await horarioUpdatePage.getDiaSemanaInput()).to.eq('diaSemana', 'Expected DiaSemana value to be equals to diaSemana');
        expect(await horarioUpdatePage.getCategoriaInput()).to.eq('categoria', 'Expected Categoria value to be equals to categoria');
        await horarioUpdatePage.save();
        expect(await horarioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await horarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Horario', async () => {
        const nbButtonsBeforeDelete = await horarioComponentsPage.countDeleteButtons();
        await horarioComponentsPage.clickOnLastDeleteButton();

        horarioDeleteDialog = new HorarioDeleteDialog();
        expect(await horarioDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.secretariaHorario.delete.question');
        await horarioDeleteDialog.clickOnConfirmButton();

        expect(await horarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
