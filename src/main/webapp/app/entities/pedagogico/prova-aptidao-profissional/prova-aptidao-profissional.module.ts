import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { ProvaAptidaoProfissionalComponent } from './prova-aptidao-profissional.component';
import { ProvaAptidaoProfissionalDetailComponent } from './prova-aptidao-profissional-detail.component';
import { ProvaAptidaoProfissionalUpdateComponent } from './prova-aptidao-profissional-update.component';
import { ProvaAptidaoProfissionalDeleteDialogComponent } from './prova-aptidao-profissional-delete-dialog.component';
import { provaAptidaoProfissionalRoute } from './prova-aptidao-profissional.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(provaAptidaoProfissionalRoute)],
  declarations: [
    ProvaAptidaoProfissionalComponent,
    ProvaAptidaoProfissionalDetailComponent,
    ProvaAptidaoProfissionalUpdateComponent,
    ProvaAptidaoProfissionalDeleteDialogComponent
  ],
  entryComponents: [ProvaAptidaoProfissionalDeleteDialogComponent]
})
export class PedagogicoProvaAptidaoProfissionalModule {}
