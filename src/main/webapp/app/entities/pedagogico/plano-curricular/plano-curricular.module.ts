import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { PlanoCurricularComponent } from './plano-curricular.component';
import { PlanoCurricularDetailComponent } from './plano-curricular-detail.component';
import { PlanoCurricularUpdateComponent } from './plano-curricular-update.component';
import { PlanoCurricularDeleteDialogComponent } from './plano-curricular-delete-dialog.component';
import { planoCurricularRoute } from './plano-curricular.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(planoCurricularRoute)],
  declarations: [
    PlanoCurricularComponent,
    PlanoCurricularDetailComponent,
    PlanoCurricularUpdateComponent,
    PlanoCurricularDeleteDialogComponent
  ],
  entryComponents: [PlanoCurricularDeleteDialogComponent]
})
export class PedagogicoPlanoCurricularModule {}
