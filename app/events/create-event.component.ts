import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { EventService } from './shared/index'

@Component({
  templateUrl: 'app/events/create-event.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-moz-placeholder {color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class CreateEventComponent {
  isDirty:boolean = true
  event:any = { location: { } } // two way binding won't work without this, doesn't serve any other purpose


  constructor(private router: Router, private eventService:EventService) { // had to inject eventService to save data
  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(event =>{
      this.isDirty = false;// need to set diry to false because guard will stop us from being able
      this.router.navigate(['/events']); // to navigate away from this page
    })
  
  }

  cancel() {
    this.router.navigate(['/events'])
  }
}