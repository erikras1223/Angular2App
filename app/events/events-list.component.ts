import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from './shared/index'

@Component({
  template: `
  <div>
    <h1>Upcoming Angular 2 Events</h1>
    <hr/>
    <div class="row">
      <div *ngFor="let event of events" class="col-md-5">
        <event-thumbnail [event]="event"></event-thumbnail>
     </div>
  </div>
  `
})// ngFor, for every event a new div is created with associated new thumbnail component. [event]="event" this where event-list
// gives to its child event data.
export class EventsListComponent implements OnInit {
  events:IEvent[]

  constructor(private eventService: EventService, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.events = this.route.snapshot.data['events'] // look to routes.ts, and event-list-resolver
                                                     // in routes there is a events variable set after async data resolves.
                                                     // we are getting that data off the route in a snapshot. 
  }

}