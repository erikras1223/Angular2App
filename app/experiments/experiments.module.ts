import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {ExperimentRoutes} from './experiment.routes'
import {FinalizeScreenComponent,
       PrimaryTabContainer,
       Tab,
       Tabs,
       PrepSetupTab

    } from './index'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ExperimentRoutes)
  ],
  declarations: [
      PrimaryTabContainer,
      FinalizeScreenComponent,
      Tab,
      Tabs,
      PrepSetupTab
  ],
  providers: [
  ]
})
export class ExperimentsModule { }