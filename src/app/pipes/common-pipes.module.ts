import { NgModule } from '@angular/core';
import { JoinPipe } from './join.pipe';
import { CammelCasePipe } from './cammel-case.pipe';
import { DeslugifyPipe } from './deslugify.pipe';

@NgModule({
  declarations: [JoinPipe, CammelCasePipe, DeslugifyPipe],
  exports: [JoinPipe, CammelCasePipe, DeslugifyPipe],
})
export class CommonPipesModule {}
