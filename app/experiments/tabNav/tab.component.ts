import { Component, Input } from '@angular/core';
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
     
    </div>
  `
})
export class Tab {
  @Input('tabTitle') title: string;
  @Input() active = false;
}