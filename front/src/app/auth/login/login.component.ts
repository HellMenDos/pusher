import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  get isValid() {
    return !(this.emailFormControl.valid && this.passwordFormControl.valid)
  }

  submitLogin() {
    this.auth.registration(
      this.emailFormControl.value,
      this.passwordFormControl.value
    ).subscribe((data) => console.log(data))
  }
}
