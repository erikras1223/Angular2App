import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {ExperimentRoutes} from './experiment.routes'
import {FinalizeScreenComponent} from './finalizeScreen.component'
import {StartScreenComponent} from './startScreen.component'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ExperimentRoutes)
  ],
  declarations: [
      StartScreenComponent,
      FinalizeScreenComponent,
  ],
  providers: [
  ]
})
export class ExperimentsModule { }