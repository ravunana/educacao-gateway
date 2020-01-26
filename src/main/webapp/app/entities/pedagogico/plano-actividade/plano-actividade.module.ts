import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { PlanoActividadeComponent } from './plano-actividade.component';
import { PlanoActividadeDetailComponent } from './plano-actividade-detail.component';
import { PlanoActividadeUpdateComponent } from './plano-actividade-update.component';
import { PlanoActividadeDeleteDialogComponent } from './plano-actividade-delete-dialog.component';
import { planoActividadeRoute } from './plano-actividade.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(planoActividadeRoute)],
  declarations: [
    PlanoActividadeComponent,
    PlanoActividadeDetailComponent,
    PlanoActividadeUpdateComponent,
    PlanoActividadeDeleteDialogComponent
  ],
  entryComponents: [PlanoActividadeDeleteDialogComponent]
})
export class PedagogicoPlanoActividadeModule {}
