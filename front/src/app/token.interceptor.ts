import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, tap } from "rxjs"
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService,
    private auth: AuthService,
    private router: Router

  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const data = this.storage.getData("tokens")
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${data?.access_token}`),
    })

    return next.handle(authReq).pipe(
      tap(
        null,
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 403 && this.storage.getData('tokens')) {
              this.auth.refresh()
            }
          }
      }))
  }
}
