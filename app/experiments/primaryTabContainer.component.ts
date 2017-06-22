import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {PrepSetupTab} from './the-tabs/prepSetupTab.component'
import {FinalizeTab} from './the-tabs/finalizeScreen.component'
@Component({
  templateUrl: 'app/experiments/primaryTabContainer.component.html'
})
export class PrimaryTabContainer {
  components:Array<any> = [PrepSetupTab,FinalizeTab]
}