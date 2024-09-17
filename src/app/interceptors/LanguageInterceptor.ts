import { HttpEvent, HttpRequest, HttpHandlerFn, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

export function languageInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const language = environment.language;
  const reqWithtLang = req.clone({
    params: req.params.append('language', language)
  });
  return next(reqWithtLang);
}

