import { CanActivateFn, Router } from '@angular/router';

import { LoginServiceService } from '../login/login/login-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginServiceService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['']); // Redirige si no está autenticado
    return false;
  }
};
