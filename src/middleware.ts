// eslint-disable-next-line no-restricted-exports
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/dashboard', '/dashboard/users', '/dashboard/admins'],
  // matcher: [],
};
