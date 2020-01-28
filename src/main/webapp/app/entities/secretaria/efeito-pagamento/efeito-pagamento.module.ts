import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { EfeitoPagamentoComponent } from './efeito-pagamento.component';
import { EfeitoPagamentoDetailComponent } from './efeito-pagamento-detail.component';
import { EfeitoPagamentoUpdateComponent } from './efeito-pagamento-update.component';
import { EfeitoPagamentoDeleteDialogComponent } from './efeito-pagamento-delete-dialog.component';
import { efeitoPagamentoRoute } from './efeito-pagamento.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(efeitoPagamentoRoute)],
  declarations: [
    EfeitoPagamentoComponent,
    EfeitoPagamentoDetailComponent,
    EfeitoPagamentoUpdateComponent,
    EfeitoPagamentoDeleteDialogComponent
  ],
  entryComponents: [EfeitoPagamentoDeleteDialogComponent]
})
export class SecretariaEfeitoPagamentoModule {}
