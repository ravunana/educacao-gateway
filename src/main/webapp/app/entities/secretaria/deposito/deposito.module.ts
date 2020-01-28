import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { DepositoComponent } from './deposito.component';
import { DepositoDetailComponent } from './deposito-detail.component';
import { DepositoUpdateComponent } from './deposito-update.component';
import { DepositoDeleteDialogComponent } from './deposito-delete-dialog.component';
import { depositoRoute } from './deposito.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(depositoRoute)],
  declarations: [DepositoComponent, DepositoDetailComponent, DepositoUpdateComponent, DepositoDeleteDialogComponent],
  entryComponents: [DepositoDeleteDialogComponent]
})
export class SecretariaDepositoModule {}
