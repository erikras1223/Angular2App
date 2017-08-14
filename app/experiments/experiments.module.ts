import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {ExperimentRoutes} from './experiment.routes'
import {
       ExperimentContainer,
       FinalizeTab,
       TabContainer,
       Tab,
       Tabs,
       PrepSetupTab,
       PrimaryTab,
       BillingTab

    } from './index'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ExperimentRoutes)
  ],
  declarations: [
      ExperimentContainer,
      TabContainer,
      FinalizeTab,
      Tab,
      Tabs,
      PrepSetupTab,
      PrimaryTab,
      BillingTab
  ],
  providers: [
  ],
  entryComponents: [PrepSetupTab,BillingTab,FinalizeTab,Tab,Tabs]
})
export class ExperimentsModule { }