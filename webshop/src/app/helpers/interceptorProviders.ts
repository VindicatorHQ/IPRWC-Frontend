import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {APIInterceptor} from "./api.interceptor";

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
  }
];
