export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
  GUEST = 'GUEST'
}

export interface User {
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  authenticated: boolean;
  tokenExpiresAt: Date;
}
