/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('@/auth/lucia').Auth;
  type DatabaseUserAttributes = {
    phone_number: number;
    first_name: string;
    last_name?: string;
    username: string;
    email: string;
    email_verified: number;
  };
  type DatabaseSessionAttributes = {
    username: string;
  };
}
