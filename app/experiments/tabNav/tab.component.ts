import { Component, Input, ContentChild, AfterContentInit } from '@angular/core';
import {PrepSetupTab} from '../the-tabs/prepSetupTab.component'
// Probably in real app would move to a shared folder visible in app.module
@Component({
  selector: 'tab',
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="pane">
     <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input('tabTitle') title: string;
  @Input() active = false;
  


}