import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { EmolumentoComponent } from './emolumento.component';
import { EmolumentoDetailComponent } from './emolumento-detail.component';
import { EmolumentoUpdateComponent } from './emolumento-update.component';
import { EmolumentoDeleteDialogComponent } from './emolumento-delete-dialog.component';
import { emolumentoRoute } from './emolumento.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(emolumentoRoute)],
  declarations: [EmolumentoComponent, EmolumentoDetailComponent, EmolumentoUpdateComponent, EmolumentoDeleteDialogComponent],
  entryComponents: [EmolumentoDeleteDialogComponent]
})
export class SecretariaEmolumentoModule {}
