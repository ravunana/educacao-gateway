import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { AulaComponent } from './aula.component';
import { AulaDetailComponent } from './aula-detail.component';
import { AulaUpdateComponent } from './aula-update.component';
import { AulaDeleteDialogComponent } from './aula-delete-dialog.component';
import { aulaRoute } from './aula.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(aulaRoute)],
  declarations: [AulaComponent, AulaDetailComponent, AulaUpdateComponent, AulaDeleteDialogComponent],
  entryComponents: [AulaDeleteDialogComponent]
})
export class SecretariaAulaModule {}
