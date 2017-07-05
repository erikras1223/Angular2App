import { Component, OnInit, Output, EventEmitter,QueryList, ViewChildren,AfterViewInit,ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISession, restrictedWords } from '../shared/index'

/* 
This approach is for reactive forms for validation whereas, create-event.component uses template forms approach.
 We will not see ngModel syntax in our template instead the formControls will be intialized in our component.
 ngModule just will save it in its own model and we ask for it. 
 For example in our template we say formControlName='name' and the form saves it to our component.

*/

@Component({
  selector: 'create-session',
  templateUrl: 'app/events/event-details/create-session.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input, .error select, .error textarea {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-moz-placeholder {color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class CreateSessionComponent implements OnInit,AfterViewInit {
  @Output() saveNewSession = new EventEmitter() // is sending session data back to parent(event-details.component)
  @Output() cancelAddSession = new EventEmitter()

  @ViewChildren('div1,div2,div3,div4') divs:QueryList<ElementRef>; // squire Test


  newSessionForm: FormGroup
  name: FormControl
  presenter: FormControl
  duration: FormControl
  level: FormControl
  abstract: FormControl
  
  // squire test
  conditional: Boolean
  field1:String
  field2:String 
  field3:String;
  field4:String;



ngAfterViewInit(){ // squire test
                   // called after is made so viewChidren can access it.
  this.divs.toArray()
  this.divs.changes.subscribe(changes => console.log(changes.size))
}

  ngOnInit() {
    /* You will make the formControls and then add validators to them. In the template you can access the formControls
     if the validation fails you tell  like this "duration.errors.".
    also this formcontrol vars you make here you tell the template by say: "formControlName = "duration " */
    
    this.conditional = true; // squire test
    this.field1= "hello I am field1"
    this.field2= "hello I am field2" 
    this.field3= "hello I am field3"
    this.field4= "hello I am field4"


    this.name = new FormControl('', Validators.required)
    this.presenter = new FormControl('', Validators.required)
    this.duration = new FormControl('', Validators.required)
    this.level = new FormControl('', Validators.required)
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])])
     // restrictedWords is a key that holds formated string
    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    })
  }

  saveSession(formValues) {
    console.log(formValues);
    let session:ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    }
    this.saveNewSession.emit(session)
  }

  cancel() {
    this.cancelAddSession.emit()
  }
  toggleCondition(){
    this.conditional = !this.conditional;
  }


}