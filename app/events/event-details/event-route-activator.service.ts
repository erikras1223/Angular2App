import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router"
import { Injectable } from "@angular/core"
import { EventService } from '../shared/event.service'


/* 
 With http calls now happening this route guard canActivate becomes useless
 */


@Injectable()
export class EventRouteActivator implements CanActivate { 
  constructor(private eventService:EventService, private router:Router) {

  }

  canActivate(route:ActivatedRouteSnapshot) {
    const eventExists = !!this.eventService.getEvent(+route.params['id']) // gets id from param 

    if (!eventExists)
      this.router.navigate(['/404'])
    return eventExists
  }
}