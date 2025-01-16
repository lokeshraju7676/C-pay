import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (roles.includes('ROLE_ADMIN')) {
    return true; // Allow access if the user has the admin role
  }

  // Redirect to home or another route if the user is not an admin
  return router.createUrlTree(['/home']); // Adjust this route as needed
};
