import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EducacaoSharedModule } from 'app/shared/shared.module';
import { EncarregadoEducaoComponent } from './encarregado-educao.component';
import { EncarregadoEducaoDetailComponent } from './encarregado-educao-detail.component';
import { EncarregadoEducaoUpdateComponent } from './encarregado-educao-update.component';
import { EncarregadoEducaoDeleteDialogComponent } from './encarregado-educao-delete-dialog.component';
import { encarregadoEducaoRoute } from './encarregado-educao.route';

@NgModule({
  imports: [EducacaoSharedModule, RouterModule.forChild(encarregadoEducaoRoute)],
  declarations: [
    EncarregadoEducaoComponent,
    EncarregadoEducaoDetailComponent,
    EncarregadoEducaoUpdateComponent,
    EncarregadoEducaoDeleteDialogComponent
  ],
  entryComponents: [EncarregadoEducaoDeleteDialogComponent]
})
export class SecretariaEncarregadoEducaoModule {}
