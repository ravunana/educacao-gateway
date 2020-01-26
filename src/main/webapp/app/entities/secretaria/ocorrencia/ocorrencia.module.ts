import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { OcorrenciaComponent } from './ocorrencia.component';
import { OcorrenciaDetailComponent } from './ocorrencia-detail.component';
import { OcorrenciaUpdateComponent } from './ocorrencia-update.component';
import { OcorrenciaDeleteDialogComponent } from './ocorrencia-delete-dialog.component';
import { ocorrenciaRoute } from './ocorrencia.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(ocorrenciaRoute)],
  declarations: [OcorrenciaComponent, OcorrenciaDetailComponent, OcorrenciaUpdateComponent, OcorrenciaDeleteDialogComponent],
  entryComponents: [OcorrenciaDeleteDialogComponent]
})
export class SecretariaOcorrenciaModule {}
