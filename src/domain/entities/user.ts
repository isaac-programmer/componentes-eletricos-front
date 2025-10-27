export interface UserAuthentication {
  id: string;
  name: string;
  email: string;
  group: { name: string; isAdmin: boolean };
}

interface Group {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  cpf: string;
  emails?: string[];
  phones?: string[];
  imageUrl?: string;
  groupId: string;
  group: Group;
  inactive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  cpf: string;
  emails?: string[];
  phones?: string[];
  imageUrl?: string;
  inactive: boolean;
  createdAt: Date;
  updatedAt: Date;
}