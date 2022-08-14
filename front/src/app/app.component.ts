import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private storage: StorageService,
    private router: Router) {}

  get isAuth() {
    const data = this.storage.getData('tokens')
    return !!data
  }

  exit() {
    this.storage.remove('tokens')
    this.router.navigate(['/auth'])
  }
}
