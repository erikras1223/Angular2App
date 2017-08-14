import {
  Component, EventEmitter, Output,
  Input, ViewChild, ViewContainerRef,
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef, Type
} from '@angular/core';
import { FormGroup } from '@angular/forms'
import { Tab } from './tab.component';
import { PrepSetupTab } from '../the-tabs/prepSetupTab.component'
import { TabChangeEvent } from './tab-change-event'
import { TabContainer } from './tab-container.component'
import { PrimaryTab } from '../the-tabs/primaryTab.component'

@Component({
  selector: 'tabs',
  template: `
  
    <ul #container class="nav nav-tabs">
      <li class="nav-item" *ngFor="let tab of tabs" (click)="selectTab(tab)"
        [class.active]="tab.active"
        [class.disabled]="tab.disable">
        <a class="nav-link" 
          [class.disabled]="tab.disable"
          [class.active]="tab.active">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  
  `
})
export class Tabs implements AfterViewInit {

  tabs: Tab[];
  activeTabId: number;
  state: string;
  @ViewChild('container', { read: ViewContainerRef }) tabsContainer: ViewContainerRef;

  @Output() tabChange = new EventEmitter<TabChangeEvent>();

  constructor(private cdRef: ChangeDetectorRef, private compFR: ComponentFactoryResolver) { }

  initContent(tabs: Tab[]) {
    this.tabs = tabs;
    // get all active tabs
    if (!tabs) {
      return;
    }
    if (this.tabs.length < 1) {
      return;
    }
    let activeTabs = this.tabs.filter((tab) => tab.active);
    if (this.state === TabContainer.NEW) {
      for (let i = 0; i < tabs.length; i++) {
        if (i === 0) {
          tabs[i].disable = false;
        }
        else {
          tabs[i].disable = true;
        }

      }
    }

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs[0]);
    }
  }



  insertTab(component: Type<PrimaryTab>, parentForm: FormGroup) {

    let compFactory = this.compFR.resolveComponentFactory(component);
    let compRef = this.tabsContainer.createComponent(compFactory);
    compRef.instance.theForm = parentForm;

    let tabFactory = this.compFR.resolveComponentFactory(Tab);
    let tabRef = this.tabsContainer.createComponent(tabFactory, 0, undefined, [[compRef.location.nativeElement]]);
    tabRef.instance.title = compRef.instance.name;
    tabRef.instance.initComp(compRef);

    this.tabs.push(tabRef.instance);
    this.selectTab(tabRef.instance);
    

  }



  ngAfterViewInit() {
    //this.openNewTab();
  }

  addTab(tab: Tab) {
    this.tabs.push(tab)
  }

  selectTabById(id: number) {
    // need try catch here
    if (id < this.tabs.length && id > -1) {
      this.selectTab(this.tabs[id]);
    }

  }
  selectTab(tab: Tab) {
    // deactivate all tabs
    let selectedTabIndex: number = -1;

    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].active = false;
      if (tab == this.tabs[i]) {
        selectedTabIndex = i;
      }
    }


    if (selectedTabIndex != -1 && !this.tabs[selectedTabIndex].disable &&
      this.activeTabId != selectedTabIndex) {

      let defaultPrevented = false;
      console.log(this.tabs[selectedTabIndex].disable)

      this.tabChange.emit(
        { activeTabId: this.activeTabId, nextId: selectedTabIndex, preventDefault: () => { defaultPrevented = true; } });

      if (!defaultPrevented) {
        this.activeTabId = selectedTabIndex;
        tab.active = true;
      }

    }
    else {
      console.log(this.activeTabId)
      this.tabs[this.activeTabId].active = true;
    }


    // activate the tab the user has clicked on.

  }

}

