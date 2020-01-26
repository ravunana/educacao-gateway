import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { HorarioComponent } from './horario.component';
import { HorarioDetailComponent } from './horario-detail.component';
import { HorarioUpdateComponent } from './horario-update.component';
import { HorarioDeleteDialogComponent } from './horario-delete-dialog.component';
import { horarioRoute } from './horario.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(horarioRoute)],
  declarations: [HorarioComponent, HorarioDetailComponent, HorarioUpdateComponent, HorarioDeleteDialogComponent],
  entryComponents: [HorarioDeleteDialogComponent]
})
export class PedagogicoHorarioModule {}
