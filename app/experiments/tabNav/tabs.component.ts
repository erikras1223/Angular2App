import { Component,Input, ContentChildren, QueryList, AfterContentInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a>{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs  { //AfterContentInit, AfterViewInit, AfterContentChecked {
  @Input() set tabViews(value:any){
      console.log(value)
  }
 
 // @ContentChildren(Tab) tabs: QueryList<Tab>;
 
 
  // contentChildren are set
  /*ngAfterContentInit() {
    // get all active tabs
    console.log("content children have loaded")
    console.log(this.tabs)
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  
  
  selectTab(tab: Tab){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }*/

}

 /*ngAfterContentChecked(){
    console.log("content checked children have loaded")
     console.log(this.tabs);
  }
  ngAfterViewInit(){
    console.log("view children have loaded")
    
  }*/