import { Component,ViewChild } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params} from '@angular/router'
import { IEvent, ISession } from '../shared/index'

/* squire test ----------------------------------------------------------- */
import {DialogComponent} from '../../example-code/dialog.component';
import {DialogAnchorDirective} from '../../example-code/dialoganchor.directive';
import {StopwatchDialogComponent} from '../../example-code/stopwatchDialog.component';
import {StopwatchComponent} from '../../example-code/stopwatch.component';
/* squire test ----------------------------------------------------------- */

@Component({
  templateUrl: '/app/events/event-details/event-details.component.html',
  styles: [`
    .container { padding-left:20px; padding-right:20px; }
    .event-image { height: 100px; }
    a {cursor:pointer}
  `],
  entryComponents: [DialogComponent, StopwatchDialogComponent] //squire test.. this tell angular that this component will be loaded dynamically
})
export class EventDetailsComponent {
  @ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective; //squire test

  event:IEvent
  addMode:boolean
  activeBuilder:boolean
  filterBy: string = 'all';
  sortBy: string = 'votes'

  constructor(private eventService:EventService, private route:ActivatedRoute) {
  }
  

  addSession() {
    this.addMode = true
  }

  saveNewSession(session:ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1
    this.event.sessions.push(session)
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false
  }
  buildSubmit():void{ // squire test
    this.activeBuilder= false;
  }
  initDialog():void{// squire test
    console.log("I was created")
    this.dialogAnchor.createDialog(StopwatchDialogComponent);
  }


  ngOnInit() {
    this.activeBuilder = true; // squire test

    /* this.route.params.forEach((param: Params)=>{
              this.event = this.route.snapshot.params['events]
          })
      This approach would work if we weren't using resolve to route to itself
    */ 

    this.route.data.forEach((data) => { // data changes dynamically from route 
        this.event = data['event']; // event is set on route.ts and is data coming from the resolve method
                                    // once routed to event-details.ts
        this.addMode = false;    // need to reset because it will also keeping the same state when it was last used
    });

    /*
    If you need to use the same component to change without first navigating away from it don't use snapshot. 
    ex this.route.snapshot.params['events]
    this approach doesn't work when on search because its not reintializing a component and snapshot doesn't listen
    for changes in params */
  }

}