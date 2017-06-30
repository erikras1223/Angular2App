import { Component,
        OnInit,
        ChangeDetectorRef,
        ViewContainerRef,
        ComponentFactoryResolver,
        ComponentRef,
        Type } from '@angular/core'

import {PrepSetupTab} from './the-tabs/prepSetupTab.component'
import {FinalizeTab} from './the-tabs/finalizeScreen.component'
import {Tabs} from "./tabNav/tabs.component"
import {Tab} from "./tabNav/tab.component"
import {PrimaryTab } from './the-tabs/primaryTab.component'


@Component({
  templateUrl: 'app/experiments/primaryTabContainer.component.html',
  entryComponents: [PrepSetupTab,FinalizeTab]
})
export class PrimaryTabContainer  implements OnInit {
  
  components:Array<PrimaryTab> = [PrepSetupTab,FinalizeTab]
  


  constructor(private cdr: ChangeDetectorRef,
              private compFR: ComponentFactoryResolver,
              private viewContainer: ViewContainerRef ){
              }


  add():void{
        let transTabRefs: Array<any>= []
        let tabs = [];

        this.components.forEach(tabComponent=>{
          
          let compFactory = this.compFR.resolveComponentFactory(<Type<PrimaryTab>>tabComponent);
          let compRef = this.viewContainer.createComponent(compFactory)
          
          let tabFactory = this.compFR.resolveComponentFactory(Tab);

          let transcludedTabRef = this.viewContainer.createComponent(tabFactory,this.viewContainer.length - 1, undefined, [[compRef.location.nativeElement]]);
          tabs.push(transcludedTabRef.instance)
          transTabRefs.push(transcludedTabRef.location.nativeElement);
        })

        let tabsFactory = this.compFR.resolveComponentFactory(Tabs); // notice this is the tabs not tab
        const compRef = this.viewContainer.createComponent(tabsFactory,0,undefined,[transTabRefs]);
        compRef.instance.initContent(tabs);
        


  }


  
  ngOnInit(){
    this.add()
    this.cdr.detectChanges();
    
  }
}