import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { SoftwareComponent } from './software.component';
import { SoftwareDetailComponent } from './software-detail.component';
import { SoftwareUpdateComponent } from './software-update.component';
import { SoftwareDeleteDialogComponent } from './software-delete-dialog.component';
import { softwareRoute } from './software.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(softwareRoute)],
  declarations: [SoftwareComponent, SoftwareDetailComponent, SoftwareUpdateComponent, SoftwareDeleteDialogComponent],
  entryComponents: [SoftwareDeleteDialogComponent]
})
export class EducacaoSoftwareModule {}
