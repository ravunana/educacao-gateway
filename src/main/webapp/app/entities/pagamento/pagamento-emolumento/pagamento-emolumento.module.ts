import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { PagamentoEmolumentoComponent } from './pagamento-emolumento.component';
import { PagamentoEmolumentoDetailComponent } from './pagamento-emolumento-detail.component';
import { PagamentoEmolumentoUpdateComponent } from './pagamento-emolumento-update.component';
import { PagamentoEmolumentoDeleteDialogComponent } from './pagamento-emolumento-delete-dialog.component';
import { pagamentoEmolumentoRoute } from './pagamento-emolumento.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(pagamentoEmolumentoRoute)],
  declarations: [
    PagamentoEmolumentoComponent,
    PagamentoEmolumentoDetailComponent,
    PagamentoEmolumentoUpdateComponent,
    PagamentoEmolumentoDeleteDialogComponent
  ],
  entryComponents: [PagamentoEmolumentoDeleteDialogComponent]
})
export class PagamentoPagamentoEmolumentoModule {}
