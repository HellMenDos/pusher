import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);


  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get isValid() {
    return !(this.emailFormControl.valid && this.passwordFormControl.valid)
  }

  submitLogin() {
    this.auth.login(
      this.emailFormControl.value,
      this.passwordFormControl.value
    ).subscribe({
      next: () => this.router.navigate(['/notify'])
    })
  }
}
