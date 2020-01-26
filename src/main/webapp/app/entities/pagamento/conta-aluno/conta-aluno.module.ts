import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { ContaAlunoComponent } from './conta-aluno.component';
import { ContaAlunoDetailComponent } from './conta-aluno-detail.component';
import { ContaAlunoUpdateComponent } from './conta-aluno-update.component';
import { ContaAlunoDeleteDialogComponent } from './conta-aluno-delete-dialog.component';
import { contaAlunoRoute } from './conta-aluno.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(contaAlunoRoute)],
  declarations: [ContaAlunoComponent, ContaAlunoDetailComponent, ContaAlunoUpdateComponent, ContaAlunoDeleteDialogComponent],
  entryComponents: [ContaAlunoDeleteDialogComponent]
})
export class PagamentoContaAlunoModule {}
