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
