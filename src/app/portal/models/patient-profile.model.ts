export interface PatientProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  identityDocument?: string;
  documentTypeId?: number;
  dateOfBirth?: Date;
  sexId?: number;
  selfPerceivedIdentityId?: number;
}

export interface Sex {
  id: number;
  name: string;
}

export interface SelfPerceivedIdentity {
  id: number;
  name: string;
}

export interface DocumentType {
  id: number;
  name: string;
}

export interface Domicile {
  street: string;
  number: number;
  floor: number;
  localityId: number;
}

export interface PatientInsurance {
  id?: number;
  name?: string;
  insuranceTypeName?: string;
  affiliateNumber: number;
  insuranceId: number;
}
