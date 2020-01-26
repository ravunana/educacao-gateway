import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { RespostaQuestaoComponent } from './resposta-questao.component';
import { RespostaQuestaoDetailComponent } from './resposta-questao-detail.component';
import { RespostaQuestaoUpdateComponent } from './resposta-questao-update.component';
import { RespostaQuestaoDeleteDialogComponent } from './resposta-questao-delete-dialog.component';
import { respostaQuestaoRoute } from './resposta-questao.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(respostaQuestaoRoute)],
  declarations: [
    RespostaQuestaoComponent,
    RespostaQuestaoDetailComponent,
    RespostaQuestaoUpdateComponent,
    RespostaQuestaoDeleteDialogComponent
  ],
  entryComponents: [RespostaQuestaoDeleteDialogComponent]
})
export class PedagogicoRespostaQuestaoModule {}
