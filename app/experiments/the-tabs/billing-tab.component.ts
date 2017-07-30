import { Component,OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PrimaryTab } from  './primaryTab.component'
import {FormGroup,FormBuilder, Validators,AbstractControl } from '@angular/forms';

@Component({
  template:
  `
    <div> 
      <p> I am the billing screen </p>
      <form class="form-horizontal" (ngSubmit)="save()" [formGroup]="billingForm">
            <div class="form-group" [ngClass]="{'has-error': (billingForm.get('age').touched || billingForm.get('age').dirty) && !billingForm.get('age').valid }">
                <label class="col-md-2 control-label" for="ageId">Lab Name</label>

                <div class="col-md-8">
                    <input class="form-control" id="ageId" type="text" placeholder="Lab Name (required)" formControlName="age" />
                    <span class="help-block" *ngIf="(billingForm.get('age').touched || billingForm.get('age').dirty) && billingForm.get('age').errors">
                            <span *ngIf="billingForm.get('age').errors.required">
                                Please enter your Lab name.
                            </span>
                    <span *ngIf="billingForm.get('age').errors.minlength">
                                The lab name must be longer than 3 characters.
                            </span>
                    </span>
                </div>
            </div>
            <button type='submit'>Save</button>
      </form>
    </div>

  `
})
export class BillingTab extends PrimaryTab implements OnInit {
  name:string = "Billing"
  billingForm:FormGroup

  constructor(protected fb: FormBuilder) {
    super(fb)

  }
  
  ngOnInit(){
    console.log("I am in the child")
    this.billingForm = this.fb.group({
            age: ['', [Validators.required, Validators.minLength(3)]]
        });
    this.addChildToForm(this.billingForm);
     
  }

  cancel() {
    
  }
}