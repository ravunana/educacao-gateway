import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { QuestaoTesteComponent } from './questao-teste.component';
import { QuestaoTesteDetailComponent } from './questao-teste-detail.component';
import { QuestaoTesteUpdateComponent } from './questao-teste-update.component';
import { QuestaoTesteDeleteDialogComponent } from './questao-teste-delete-dialog.component';
import { questaoTesteRoute } from './questao-teste.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(questaoTesteRoute)],
  declarations: [QuestaoTesteComponent, QuestaoTesteDetailComponent, QuestaoTesteUpdateComponent, QuestaoTesteDeleteDialogComponent],
  entryComponents: [QuestaoTesteDeleteDialogComponent]
})
export class PedagogicoQuestaoTesteModule {}
