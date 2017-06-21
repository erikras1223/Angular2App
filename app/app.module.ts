import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  VoterService,
  EventDetailsComponent,
  CreateEventComponent,
  EventResolver,
  //EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  LocationValidator,
  DurationPipe,
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'

import { JQ_TOKEN,
        TOASTR_TOKEN,
        Toastr,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective
       } from './common/index'
import { Pane,
         UnlessDirective,
         ViewChildrenComp,
         AppComponent,
         DialogComponent,
         DialogAnchorDirective,
         StopwatchComponent,
         StopwatchDialogComponent
       } from './example-code/index'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'

declare let toastr:Toastr // global var that is external
declare let jQuery: Object; // global var


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    UpvoteComponent,
    ModalTriggerDirective,
    LocationValidator,
    UnlessDirective, // squire test
    ViewChildrenComp,// squire test
    Pane,//squire test
    DurationPipe,
    AppComponent,// squire test
    DialogComponent,// squire test
    DialogAnchorDirective,// squire test
    StopwatchComponent,// squire test
    StopwatchDialogComponent,// squire test
  ],
  providers: [
    EventService, 
    { provide: TOASTR_TOKEN, useValue: toastr}, // the token helps angular find this toastr global object 
    { provide: JQ_TOKEN, useValue: jQuery },
    EventResolver,
    //EventRouteActivator,
    EventListResolver,
    VoterService,
    AuthService,
    { 
      provide: 'canDeactivateCreateEvent', // in router.ts path and its component is tied to deactivate 
      useValue: checkDirtyState // handler method checkDirtyState found below
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {// router tells which component called deactivate to pass in
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}