import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    setHeaders: {
      'User-Agent': 'angular ssr'
    }
  });
  return next(clonedReq);
};
