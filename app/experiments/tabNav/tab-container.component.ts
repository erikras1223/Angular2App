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
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
  templateUrl: 'app/experiments/tabNav/tab-container.component.html'

})
export class TabContainer implements OnInit, OnDestroy {

  //components:Array<PrimaryTab>

  static readonly NEW: string = "new"
  static readonly VIEW: string = "view"
  static readonly EDIT: string = "edit"



  @Input() state: string;
  @Output() tabChanged: EventEmitter<TabChangeEvent> = new EventEmitter();
  @Output() invalidTab: EventEmitter<TabInvalidEvent> = new EventEmitter();

  private tabsRef: ComponentRef<Tabs>
  private theRef: Array<ComponentRef<Tab>> = []
  private intialized: boolean = false
  private theForm: FormGroup;

  private _compName: Array<string>
  @Input() set componentNames(value: Array<string>) {
    this._compName = value;
  }
  get componentNames() {
    return this._compName
  }


  constructor(private cdr: ChangeDetectorRef,
    private compFR: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.theForm = this.fb.group({
      childForms: this.fb.array([])
    })
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


        this.invalidTab.emit({ disableSpecificTabs: disableByIndex, tabId: tabId, tabLength: tabs.length })
      });
    });

  }


  private initTab(): void {

    let transTabRefs: Array<any> = []
    let tabs: Tab[] = [];

    let factories = <Array<Function>>Array.from(this.compFR['_factories'].keys()); //Getting a factories made from EntryComponent very touchy code, slightly a hack "may change"
    let compFactoryArray: Array<Type<PrimaryTab>> = []

    for (let i = 0; i < this.componentNames.length; i++) {
      compFactoryArray.push(<Type<PrimaryTab>>factories.find((x: any) => x.name === this.componentNames[i]));
    }

    compFactoryArray.forEach((tabComponent) => {

      const compFactory = this.compFR.resolveComponentFactory(tabComponent);
      const compRef = this.viewContainer.createComponent(compFactory);
      compRef.instance.theForm = this.theForm;

      const tabFactory = this.compFR.resolveComponentFactory(Tab);

      const transcludedTabRef = this.viewContainer.createComponent(tabFactory, this.viewContainer.length - 1,
        undefined, [[compRef.location.nativeElement]]);
      var transculedTab = transcludedTabRef.instance

      transculedTab.title = compRef.instance.name;
      transculedTab.initComp(compRef);

      tabs.push(transculedTab)
      transTabRefs.push(transcludedTabRef.location.nativeElement);
      this.theRef.push(transcludedTabRef)
    });

    this.tabCommunication(tabs);

    const tabsFactory = this.compFR.resolveComponentFactory(Tabs);
    this.tabsRef = this.viewContainer.createComponent(tabsFactory, 0, undefined, [transTabRefs]);

    this.tabsRef.instance.state = this.state;
    this.tabsRef.instance.initContent(tabs);

    this.tabsRef.instance.tabChange.subscribe(event => {
      this.tabChanged.emit(event);
    });

  }

  addTab(component:string ): void {
    try {
      let factories = <Array<Function>>Array.from(this.compFR['_factories'].keys()); //Getting a factories made from EntryComponent very touchy code, slightly a hack "may change"
      let compFactory: Type<PrimaryTab>;

      compFactory = <Type<PrimaryTab>>factories.find((x: any) => x.name === component);
      
      if(!compFactory){
        throw new Error("Make sure component extends PrimaryTab and is in the entryComponents list in your module");
      }
      this.tabsRef.instance.insertTab(compFactory, this.theForm);
      
    } catch (e) {
        console.log(e.stack);
    }

  }
  get activeId(): number {
    return this.tabsRef.instance.activeTabId;
  }
  set activeId(activeId: number) {
    this.tabsRef.instance.activeTabId = activeId;
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