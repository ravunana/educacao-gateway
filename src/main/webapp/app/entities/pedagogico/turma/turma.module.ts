import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { TurmaComponent } from './turma.component';
import { TurmaDetailComponent } from './turma-detail.component';
import { TurmaUpdateComponent } from './turma-update.component';
import { TurmaDeleteDialogComponent } from './turma-delete-dialog.component';
import { turmaRoute } from './turma.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(turmaRoute)],
  declarations: [TurmaComponent, TurmaDetailComponent, TurmaUpdateComponent, TurmaDeleteDialogComponent],
  entryComponents: [TurmaDeleteDialogComponent]
})
export class PedagogicoTurmaModule {}
