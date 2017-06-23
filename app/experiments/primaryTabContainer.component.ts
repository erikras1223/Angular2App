import { Component, AfterViewInit,ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import {PrepSetupTab} from './the-tabs/prepSetupTab.component'
import {FinalizeTab} from './the-tabs/finalizeScreen.component'
@Component({
  templateUrl: 'app/experiments/primaryTabContainer.component.html'
})
export class PrimaryTabContainer implements AfterViewInit {
  components:Array<any> = [PrepSetupTab,FinalizeTab]
  constructor(private cdr: ChangeDetectorRef){}
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }
}