import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PrimaryTab } from  './primaryTab.component'
import {FormGroup,FormBuilder, Validators,AbstractControl } from '@angular/forms';

@Component({
  template:
  `
    <div> 
      <p> I am the billing screen </p>
    </div>

  `
})
export class BillingTab extends PrimaryTab {
  name:string = "Billing"

  constructor(protected fb: FormBuilder) {
    super(fb)

  }
  

  cancel() {
    
  }
}