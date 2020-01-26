import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { DosificacaoComponent } from './dosificacao.component';
import { DosificacaoDetailComponent } from './dosificacao-detail.component';
import { DosificacaoUpdateComponent } from './dosificacao-update.component';
import { DosificacaoDeleteDialogComponent } from './dosificacao-delete-dialog.component';
import { dosificacaoRoute } from './dosificacao.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(dosificacaoRoute)],
  declarations: [DosificacaoComponent, DosificacaoDetailComponent, DosificacaoUpdateComponent, DosificacaoDeleteDialogComponent],
  entryComponents: [DosificacaoDeleteDialogComponent]
})
export class PedagogicoDosificacaoModule {}
