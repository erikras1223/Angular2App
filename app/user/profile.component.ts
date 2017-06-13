import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router} from '@angular/router';
import { TOASTR_TOKEN, Toastr} from '../common/toastr.service'

@Component({
  templateUrl: 'app/user/profile.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color:#999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl

  constructor(private router:Router, private authService:AuthService,
              @Inject(TOASTR_TOKEN) private toastr:Toastr){ // have to inject custom service need to tell inject by this Token
                                                            // also using Toastr so I can get intellisence on toasr object
               

  }

  ngOnInit() {
    // passing in validator to intialize formControl, firstname has pattern validator and required one. 
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
    // also notice that we are prepopulating the fields so the user will see
    //their name. This data flow is from the model into the view.
    
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      .subscribe(()=>{
        this.toastr.success('Profile Saved');
      })
          
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched // several booleans on formControl help you tell
                                                            // state of the control. like if it hasn't been used yet
  }
  
  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }

  cancel() {
    this.router.navigate(['events'])
  }
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/user/login']);
    })
  }

       
}