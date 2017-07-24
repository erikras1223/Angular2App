import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  Type, VERSION
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PrepSetupTab } from '../the-tabs/prepSetupTab.component'
import { FinalizeTab } from '../the-tabs/finalizeScreen.component'
import { BillingTab } from '../the-tabs/billing-tab.component'
import { Tabs } from "./tabs.component"
import { Tab } from "./tab.component"
import { PrimaryTab } from '../the-tabs/primaryTab.component'
import { TabChangeEvent } from './tab-change-event'
import { TabInvalidEvent } from './tab-invalid-event'




@Component({
  selector: 'tab-container',
  templateUrl: 'app/experiments/tabNav/primaryTabContainer.component.html'

})
export class PrimaryTabContainer implements OnInit, OnDestroy {


  //components:Array<PrimaryTab>
  private components: Array<any>
  @Input() componentNames: Array<string>
  @Output() tabChanged: EventEmitter<TabChangeEvent> = new EventEmitter();
  @Output() invalidTab: EventEmitter<TabInvalidEvent> = new EventEmitter();
  private tabsRef: ComponentRef<Tabs>
  private intialized: boolean = false


  constructor(private cdr: ChangeDetectorRef,
    private compFR: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private route: ActivatedRoute) {
  }




  private tabCommunication(tabs: Tab[]): void {
    tabs.map(tab => {
      tab.getComp().invalidTab.subscribe(comp => {
        let tabId = -1;

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].getComp() === comp) {
            tabId = i;
            break;
          }
        }
        // this is a callback function
        const disableByIndex = function (start?: number, end?: number): void {

          const validIndexes = function (start: number, end: number, tabLength: number): boolean { // can't call normal function definitions in this function expression
                                                                                                   // so for right now doing this
            if (start < 0) {
              return false;
            }
            if (end > tabLength) {
              return false;
            }
            return true;
          }

          if (start != undefined) { // if they provide 0 or 1 for indexes 'if' sees that as true or false
            if (end != undefined) {
              if (validIndexes(start, end, tabs.length)) {
                for (let i = start; i < end; i++) {
                  tabs[i].disable = true;
                }
              }
            }
          }
        }


        this.invalidTab.emit({ disableSpecificTabs: disableByIndex, tabId: tabId, tabLength:tabs.length })
      });
    });

  }


  private initTab(): void {

    let transTabRefs: Array<any> = []
    let tabs: Tab[] = [];

    let factories = <Array<Function>>Array.from(this.compFR['_factories'].keys()); //Getting a factories made from EntryComponent very touchy code, slightly a hack "may change"
    let compFactoryArray: Array<Type<PrimaryTab>> = []

    for (let i = 0; i < this.componentNames.length; i++) {
      compFactoryArray.push(<Type<PrimaryTab>>factories.find((x: any) => x.name === this.componentNames[i]))
    }

    compFactoryArray.forEach((tabComponent) => {

      const compFactory = this.compFR.resolveComponentFactory(tabComponent);
      const compRef = this.viewContainer.createComponent(compFactory);

      const tabFactory = this.compFR.resolveComponentFactory(Tab);

      const transcludedTabRef = this.viewContainer.createComponent(tabFactory, this.viewContainer.length - 1,
        undefined, [[compRef.location.nativeElement]]);
      var transculedTab = transcludedTabRef.instance

      transculedTab.title = compRef.instance.name;
      transculedTab.initComp(compRef);

      tabs.push(transculedTab)
      transTabRefs.push(transcludedTabRef.location.nativeElement);
    })
    this.tabCommunication(tabs);


    const tabsFactory = this.compFR.resolveComponentFactory(Tabs);
    this.tabsRef = this.viewContainer.createComponent(tabsFactory, 0, undefined, [transTabRefs]);
    this.tabsRef.instance.initContent(tabs);

    this.tabsRef.instance.tabChange.subscribe(event => {
      this.tabChanged.emit(event);
    })

  }



  ngOnInit() {

    this.componentNames = this.route.snapshot.data['tabs']; // getting a array called tabs off the route
    this.initTab()
    this.cdr.detectChanges();
    this.intialized = true;

  }
  ngOnChange() {
    if (this.intialized) {
      this.initTab();
    }

  }



  ngOnDestroy() {
    this.tabsRef.destroy();
  }



}