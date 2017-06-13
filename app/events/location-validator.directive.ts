import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
  /*This directive will be used in create-event.component to help link location validation to url validation

  Having the providers array here make a dependency injection for this class and its children.
  You are telling angular about this validator by adding it to list of Opaque tokens
  
  We are adding our LocationValidator to a list that NG_Validator, multi= true is important
  without it we will override all of the angulars validators 
  
   */
})
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): { [key: string]: any } { //returns object with key that is a string and value of anything
    let addressControl = formGroup.controls['address']; // accessing the address field in the form
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']; // locations parent is a form and we're accessing that control

    if((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value)
     || (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    } else {
      return {validateLocation: false}
    }
  }
} 