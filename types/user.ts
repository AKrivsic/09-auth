export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface NewUser {
  email: string;
  password: string;
}

export interface UpdateUserProps {
  username?: string;
  photoUrl?: string;
}

