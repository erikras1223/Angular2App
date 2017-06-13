import { Routes } from '@angular/router'
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  //EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  EventResolver
} from './events/index'
import { Error404Component } from './errors/404.component'

export const appRoutes:Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events', component: EventsListComponent, resolve: {events:EventListResolver} }, 
  /*makes it so async data is fully loaded before routing to it
   notice events is a variable that store data in it on the route
  once resolve finishes the event variable can be accessed by injecting this service into events-list-component */
  { path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver} },// canActivate: [EventRouteActivator] }, has been removed once we hooked up server keeping for education purposes
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full'},
  { path: 'user', loadChildren: 'app/user/user.module#UserModule'} // may also be importing UserModule at Navigation?
]