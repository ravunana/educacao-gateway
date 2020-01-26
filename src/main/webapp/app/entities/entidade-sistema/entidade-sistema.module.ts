import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { EntidadeSistemaComponent } from './entidade-sistema.component';
import { EntidadeSistemaDetailComponent } from './entidade-sistema-detail.component';
import { EntidadeSistemaUpdateComponent } from './entidade-sistema-update.component';
import { EntidadeSistemaDeleteDialogComponent } from './entidade-sistema-delete-dialog.component';
import { entidadeSistemaRoute } from './entidade-sistema.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(entidadeSistemaRoute)],
  declarations: [
    EntidadeSistemaComponent,
    EntidadeSistemaDetailComponent,
    EntidadeSistemaUpdateComponent,
    EntidadeSistemaDeleteDialogComponent
  ],
  entryComponents: [EntidadeSistemaDeleteDialogComponent]
})
export class EducacaoEntidadeSistemaModule {}
