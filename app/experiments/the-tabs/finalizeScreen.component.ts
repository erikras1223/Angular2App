import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PrimaryTab } from  './primaryTab.component'
import {FormGroup,FormBuilder, Validators,AbstractControl } from '@angular/forms';

@Component({
  template:
  `
    <div> 
      <p> I am the end Screen </p>
    </div>

  `
})
export class FinalizeTab extends PrimaryTab {
  name:string = "Summary"

  constructor(protected fb: FormBuilder) {
    super(fb)

  }
  

  cancel() {
  }
}