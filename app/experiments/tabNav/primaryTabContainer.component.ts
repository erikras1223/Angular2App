import { Component,
        OnInit,
        ChangeDetectorRef,
        ViewContainerRef,
        ComponentFactoryResolver,
        ComponentRef,
        ComponentFactory,
        OnDestroy,
        Input,
        Type,VERSION } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {PrepSetupTab} from '../the-tabs/prepSetupTab.component'
import {FinalizeTab} from '../the-tabs/finalizeScreen.component'
import {BillingTab} from '../the-tabs/billing-tab.component'
import {Tabs} from "./tabs.component"
import {Tab} from "./tab.component"
import {PrimaryTab } from '../the-tabs/primaryTab.component'
import {TabChangeEvent} from './tab-change-event'


@Component({
  selector: 'tab-container',
  templateUrl: 'app/experiments/tabNav/primaryTabContainer.component.html'
})
export class PrimaryTabContainer  implements OnInit, OnDestroy {
  
  
  //components:Array<PrimaryTab>
  components:Array<any>
  @Input() componentNames:Array<string>
  verName:any
  tabsRef:ComponentRef<Tabs>
  intialized:boolean = false
  


  constructor(private cdr: ChangeDetectorRef,
              private compFR: ComponentFactoryResolver,
              private viewContainer: ViewContainerRef,
              private route:ActivatedRoute ){
                 this.verName = `Angular! v${VERSION.full}`
              }


  initTab():void{

        let transTabRefs: Array<any>= []
        let tabs = [];

        var factories =Array.from(this.compFR['_factories'].keys()); //Getting a factories made from EntryComponent very touchy code, slightly a hack "may change"
        this.components=factories.filter((fact:any)=> this.componentNames.indexOf(fact.name) > -1);
        //console.log(this.components)

        this.components.forEach((tabComponent:PrimaryTab)=>{
          
          let compFactory = this.compFR.resolveComponentFactory(<Type<PrimaryTab>>tabComponent); // not sure how this works with Type, but it won't work without it
          let compRef = this.viewContainer.createComponent(compFactory);
          
          let tabFactory = this.compFR.resolveComponentFactory(Tab);

          let transcludedTabRef = this.viewContainer.createComponent(tabFactory,this.viewContainer.length - 1,
                                                                      undefined,[[compRef.location.nativeElement]]);
          transcludedTabRef.instance.title = compRef.instance.name;

          tabs.push(transcludedTabRef.instance)
          transTabRefs.push(transcludedTabRef.location.nativeElement);
        })

        let tabsFactory = this.compFR.resolveComponentFactory(Tabs); // notice this is the tabs not tab
        this.tabsRef = this.viewContainer.createComponent(tabsFactory,0,undefined,[transTabRefs]);
        this.tabsRef.instance.initContent(tabs);
        this.tabsRef.instance.tabChange.subscribe( event =>{
          console.log("hello",event)
          
        } )

  }


  
  ngOnInit(){

    this.componentNames = this.route.snapshot.data['tabs']; // getting a array called tabs off the route
    this.initTab()
    this.cdr.detectChanges();
    this.intialized = false;
    
  }
  ngOnChange(){
    if(this.intialized){
      this.initTab();
    }

  }



  ngOnDestroy() {
        this.tabsRef.destroy();
    }

 

}