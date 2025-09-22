export interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  roles?: Role[];
}

export interface Role {
  id: string;
  name: string;
}
