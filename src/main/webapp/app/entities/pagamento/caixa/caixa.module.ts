import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { CaixaComponent } from './caixa.component';
import { CaixaDetailComponent } from './caixa-detail.component';
import { CaixaUpdateComponent } from './caixa-update.component';
import { CaixaDeleteDialogComponent } from './caixa-delete-dialog.component';
import { caixaRoute } from './caixa.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(caixaRoute)],
  declarations: [CaixaComponent, CaixaDetailComponent, CaixaUpdateComponent, CaixaDeleteDialogComponent],
  entryComponents: [CaixaDeleteDialogComponent]
})
export class PagamentoCaixaModule {}
