import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { PlanoAulaComponent } from './plano-aula.component';
import { PlanoAulaDetailComponent } from './plano-aula-detail.component';
import { PlanoAulaUpdateComponent } from './plano-aula-update.component';
import { PlanoAulaDeleteDialogComponent } from './plano-aula-delete-dialog.component';
import { planoAulaRoute } from './plano-aula.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(planoAulaRoute)],
  declarations: [PlanoAulaComponent, PlanoAulaDetailComponent, PlanoAulaUpdateComponent, PlanoAulaDeleteDialogComponent],
  entryComponents: [PlanoAulaDeleteDialogComponent]
})
export class PedagogicoPlanoAulaModule {}
