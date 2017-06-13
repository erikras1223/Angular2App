import {Component, EventEmitter} from '@angular/core';

import {Dialog} from './dialog.component';

@Component({ // this template organizes the dialog code and the stopwatch code
             // It also receives the close event from the dialog component which then 'dialoganchor.component' is listening to and closes the dialog stopwatch 
  template: `
  <dlg [title]="Timer" (close)="onDialogClose()"> 
        <stop-watch></stop-watch>
  </dlg>
  `
})
export class StopwatchDialogComponent implements Dialog {
  close: EventEmitter<any> = new EventEmitter<any>();
  
  onDialogClose() {
     console.log("I am the stop watch")
    this.close.emit();
  }
}