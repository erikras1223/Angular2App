import { Component,
        OnInit,
        Input,
        ViewChild,
        ChangeDetectorRef,
        ViewContainerRef,
        ComponentFactoryResolver,
        ComponentRef,
        ComponentFactory,
        OnDestroy,
        Type,VERSION } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {TabChangeEvent} from './tabNav/tab-change-event'
import {TabInvalidEvent} from './tabNav/tab-invalid-event'
import {PrimaryTabContainer} from './tabNav/primaryTabContainer.component'



@Component({
  templateUrl: 'app/experiments/experiment-container.component.html',
})
export class ExperimentContainer  implements OnInit {

  @ViewChild(PrimaryTabContainer) tabsContainer: PrimaryTabContainer  
  componentNames:Array<string>
  verName:any
  

  constructor(
              private route:ActivatedRoute ){
                 this.verName = `Angular! v${VERSION.full}`
              }
  
  ngOnInit(){
    this.componentNames = this.route.snapshot.data['tabs']; // getting a array called tabs off the route
    
  }

   addTab(tab:string){
    this.componentNames.push(tab);
   }

   changedTab(event:TabChangeEvent){
       console.log(this.tabsContainer)
   }
   tabInvalid(event:TabInvalidEvent){
       console.log(event.tabId)
       event.disableSpecificTabs(1,3);
   }

 

}