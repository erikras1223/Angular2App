import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { EventService } from './shared/event.service'

/* This service will be used in routes.ts */

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService:EventService) {}
  
  resolve() { // resolve is good with asyncrous data, it waits to load before display component
    return this.eventService.getEvents() // this is an obserable, but resolve doesn't require calling subscribe because resolve does it.
  }
}