import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PrimaryTab } from  './primaryTab.component'

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

  constructor(private router:Router) {
    super()

  }
  

  cancel() {
    this.router.navigate(['events'])
  }
}