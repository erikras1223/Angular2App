import { Component,
        OnInit,
        Input,
        ViewChild,
        ChangeDetectorRef,
        ViewContainerRef,
        ComponentFactoryResolver,
        ComponentRef,
        OnDestroy,
        Type,VERSION } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {TabChangeEvent} from './tabNav/tab-change-event'
import {TabInvalidEvent} from './tabNav/tab-invalid-event'
import {TabContainer} from './tabNav/tab-container.component'



@Component({
  templateUrl: 'app/experiments/experiment-container.component.html',
})
export class ExperimentContainer  implements OnInit {

  @ViewChild(TabContainer) tabsContainer: TabContainer  
  componentNames:Array<string>
  verName:any
  theState:string;
  

  constructor(
              private route:ActivatedRoute ){
                 this.verName = `Angular! v${VERSION.full}`
              }
  
  ngOnInit(){
    this.theState = TabContainer.NEW;
    this.componentNames = this.route.snapshot.data['tabs']; // getting a array called tabs off the route
    
  }

   addTab(tab:string){
    this.tabsContainer.addTab('BillingTab')
   }

   changedTab(event:TabChangeEvent){
      console.log(this.tabsContainer.activeId)
   }
   tabInvalid(event:TabInvalidEvent){
       console.log(event.tabId)
       event.disableSpecificTabs(1,3);
   }

 

}