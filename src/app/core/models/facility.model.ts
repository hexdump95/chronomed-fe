export interface Facility {
  id?: number;
  name: string;
  description?: string;
  taxIdentificationNumber?: string;
  email?: string;
  phoneNumber?: string;
  coordinates?: { x: number; y: number };
  rooms?: Room[];
  localityId?: number;
}

export interface Room {
  id?: number;
  name: string;
  description?: string;
  specialtyIds?: number[];
}
