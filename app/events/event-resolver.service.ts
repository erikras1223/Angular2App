import { Injectable } from '@angular/core'
import { Resolve,ActivatedRouteSnapshot } from '@angular/router'
import { EventService } from './shared/event.service'

/* This service will be used in routes.ts and injected into event-details.component */

@Injectable()
export class EventResolver implements Resolve<any> {
  constructor(private eventService:EventService) {}
  
  resolve(route:ActivatedRouteSnapshot) { // resolve is good with asyncrous data, it waits to load before display component
    return this.eventService.getEvent(route.params['id']); // this is an obserable, but resolve doesn't require calling subscribe
  }
}