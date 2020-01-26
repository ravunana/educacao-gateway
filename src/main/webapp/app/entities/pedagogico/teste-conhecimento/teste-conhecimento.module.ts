import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { TesteConhecimentoComponent } from './teste-conhecimento.component';
import { TesteConhecimentoDetailComponent } from './teste-conhecimento-detail.component';
import { TesteConhecimentoUpdateComponent } from './teste-conhecimento-update.component';
import { TesteConhecimentoDeleteDialogComponent } from './teste-conhecimento-delete-dialog.component';
import { testeConhecimentoRoute } from './teste-conhecimento.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(testeConhecimentoRoute)],
  declarations: [
    TesteConhecimentoComponent,
    TesteConhecimentoDetailComponent,
    TesteConhecimentoUpdateComponent,
    TesteConhecimentoDeleteDialogComponent
  ],
  entryComponents: [TesteConhecimentoDeleteDialogComponent]
})
export class PedagogicoTesteConhecimentoModule {}
