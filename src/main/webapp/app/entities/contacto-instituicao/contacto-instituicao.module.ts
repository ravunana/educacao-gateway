import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { ContactoInstituicaoComponent } from './contacto-instituicao.component';
import { ContactoInstituicaoDetailComponent } from './contacto-instituicao-detail.component';
import { ContactoInstituicaoUpdateComponent } from './contacto-instituicao-update.component';
import { ContactoInstituicaoDeleteDialogComponent } from './contacto-instituicao-delete-dialog.component';
import { contactoInstituicaoRoute } from './contacto-instituicao.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(contactoInstituicaoRoute)],
  declarations: [
    ContactoInstituicaoComponent,
    ContactoInstituicaoDetailComponent,
    ContactoInstituicaoUpdateComponent,
    ContactoInstituicaoDeleteDialogComponent
  ],
  entryComponents: [ContactoInstituicaoDeleteDialogComponent]
})
export class EducacaoContactoInstituicaoModule {}
