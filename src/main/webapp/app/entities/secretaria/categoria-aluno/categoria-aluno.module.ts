import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { CategoriaAlunoComponent } from './categoria-aluno.component';
import { CategoriaAlunoDetailComponent } from './categoria-aluno-detail.component';
import { CategoriaAlunoUpdateComponent } from './categoria-aluno-update.component';
import { CategoriaAlunoDeleteDialogComponent } from './categoria-aluno-delete-dialog.component';
import { categoriaAlunoRoute } from './categoria-aluno.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(categoriaAlunoRoute)],
  declarations: [
    CategoriaAlunoComponent,
    CategoriaAlunoDetailComponent,
    CategoriaAlunoUpdateComponent,
    CategoriaAlunoDeleteDialogComponent
  ],
  entryComponents: [CategoriaAlunoDeleteDialogComponent]
})
export class SecretariaCategoriaAlunoModule {}
