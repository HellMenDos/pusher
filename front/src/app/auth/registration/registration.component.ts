import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);
  public passwordRecoveryFormControl = new FormControl('', [Validators.required]);

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {

  }

  get isValid() {
    return !(this.emailFormControl.valid && this.passwordFormControl.valid && this.passwordMatches)
  }

  get passwordMatches() {
    return this.passwordFormControl.value == this.passwordRecoveryFormControl.value
  }

  submitRegistration() {
    this.auth.registration(
      this.emailFormControl.value,
      this.passwordFormControl.value
    ).subscribe((data) => console.log(data))
  }

}
