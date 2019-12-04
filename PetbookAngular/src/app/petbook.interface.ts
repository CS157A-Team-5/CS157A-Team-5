export interface Pet {
  id?: number;
  owner_id: number;
  name: string;
  weight: number;
  age: number;
  species: string;
  isDisabled: boolean;
}

export interface Owner {
  id: number;
  email: string;
  password: string;
  name: string;
  location: string;
}

export interface Club {
  id: number;
  name: string;
  species: string;
  size: number;
}

export interface Park {
  id: number;
  name: string;
  location: string;
  hours: string;
}

export interface Treat {
  id: number;
  manufacturer: string;
  name: string;
  species: string;
}
