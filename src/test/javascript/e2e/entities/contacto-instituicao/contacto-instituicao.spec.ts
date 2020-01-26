import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ContactoInstituicaoComponentsPage,
  /* ContactoInstituicaoDeleteDialog,
   */ ContactoInstituicaoUpdatePage
} from './contacto-instituicao.page-object';

const expect = chai.expect;

describe('ContactoInstituicao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contactoInstituicaoComponentsPage: ContactoInstituicaoComponentsPage;
  let contactoInstituicaoUpdatePage: ContactoInstituicaoUpdatePage;
  /* let contactoInstituicaoDeleteDialog: ContactoInstituicaoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ContactoInstituicaos', async () => {
    await navBarPage.goToEntity('contacto-instituicao');
    contactoInstituicaoComponentsPage = new ContactoInstituicaoComponentsPage();
    await browser.wait(ec.visibilityOf(contactoInstituicaoComponentsPage.title), 5000);
    expect(await contactoInstituicaoComponentsPage.getTitle()).to.eq('educacaoApp.contactoInstituicao.home.title');
  });

  it('should load create ContactoInstituicao page', async () => {
    await contactoInstituicaoComponentsPage.clickOnCreateButton();
    contactoInstituicaoUpdatePage = new ContactoInstituicaoUpdatePage();
    expect(await contactoInstituicaoUpdatePage.getPageTitle()).to.eq('educacaoApp.contactoInstituicao.home.createOrEditLabel');
    await contactoInstituicaoUpdatePage.cancel();
  });

  /*  it('should create and save ContactoInstituicaos', async () => {
        const nbButtonsBeforeCreate = await contactoInstituicaoComponentsPage.countDeleteButtons();

        await contactoInstituicaoComponentsPage.clickOnCreateButton();
        await promise.all([
            contactoInstituicaoUpdatePage.setTipoContactoInput('tipoContacto'),
            contactoInstituicaoUpdatePage.setDescricaoInput('descricao'),
            contactoInstituicaoUpdatePage.setContactoInput('contacto'),
            contactoInstituicaoUpdatePage.instituicaoEnsinoSelectLastOption(),
        ]);
        expect(await contactoInstituicaoUpdatePage.getTipoContactoInput()).to.eq('tipoContacto', 'Expected TipoContacto value to be equals to tipoContacto');
        expect(await contactoInstituicaoUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
        expect(await contactoInstituicaoUpdatePage.getContactoInput()).to.eq('contacto', 'Expected Contacto value to be equals to contacto');
        const selectedMostrarDocumento = contactoInstituicaoUpdatePage.getMostrarDocumentoInput();
        if (await selectedMostrarDocumento.isSelected()) {
            await contactoInstituicaoUpdatePage.getMostrarDocumentoInput().click();
            expect(await contactoInstituicaoUpdatePage.getMostrarDocumentoInput().isSelected(), 'Expected mostrarDocumento not to be selected').to.be.false;
        } else {
            await contactoInstituicaoUpdatePage.getMostrarDocumentoInput().click();
            expect(await contactoInstituicaoUpdatePage.getMostrarDocumentoInput().isSelected(), 'Expected mostrarDocumento to be selected').to.be.true;
        }
        await contactoInstituicaoUpdatePage.save();
        expect(await contactoInstituicaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await contactoInstituicaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last ContactoInstituicao', async () => {
        const nbButtonsBeforeDelete = await contactoInstituicaoComponentsPage.countDeleteButtons();
        await contactoInstituicaoComponentsPage.clickOnLastDeleteButton();

        contactoInstituicaoDeleteDialog = new ContactoInstituicaoDeleteDialog();
        expect(await contactoInstituicaoDeleteDialog.getDialogTitle())
            .to.eq('educacaoApp.contactoInstituicao.delete.question');
        await contactoInstituicaoDeleteDialog.clickOnConfirmButton();

        expect(await contactoInstituicaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
