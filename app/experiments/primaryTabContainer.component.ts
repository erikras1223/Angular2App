import { Component,
        AfterViewInit,
        ChangeDetectorRef,
        OnChanges,
        ViewContainerRef,
        ComponentFactoryResolver,
        ComponentRef } from '@angular/core'

import {PrepSetupTab} from './the-tabs/prepSetupTab.component'
import {FinalizeTab} from './the-tabs/finalizeScreen.component'
import {Tabs} from "./tabNav/tabs.component"
import {Tab} from "./tabNav/tab.component"


@Component({
  templateUrl: 'app/experiments/primaryTabContainer.component.html',
  entryComponents: [PrepSetupTab,FinalizeTab]
})
export class PrimaryTabContainer implements AfterViewInit {
  
  components:Array<any> = [PrepSetupTab,FinalizeTab]
  

  
  constructor(private cdr: ChangeDetectorRef,
              private compFR: ComponentFactoryResolver,
              private viewContainer: ViewContainerRef ){}


  add():void{
        let transTabRefs: Array<any>= []
        this.components.forEach(tabComponent=>{
          
          let compFactory = this.compFR.resolveComponentFactory(tabComponent);
          let compRef = this.viewContainer.createComponent(compFactory);
          let tabFactory = this.compFR.resolveComponentFactory(Tab);

          let transcludedTabRef = this.viewContainer.createComponent(tabFactory,this.viewContainer.length - 1, undefined, [[compRef.location.nativeElement]]);
          transTabRefs.push(transcludedTabRef.location.nativeElement);
        })

        let tabsFactory = this.compFR.resolveComponentFactory(Tabs); // notice this is the tabs not tab
        
        this.viewContainer.createComponent(tabsFactory,0,undefined,[transTabRefs]);
        


  }


  
  ngAfterViewInit(){
    this.add()
    this.cdr.detectChanges();
    
  }
}