export interface Insurance {
  id?: number;
  name: string;
  description: string;
  insuranceTypeId?: number;
  insuranceTypeName?: string;
  coverages?: InsuranceCoverage[];
}

export interface InsuranceCoverage {
  id?: number;
  validFrom: string;
  validTo: string;
  amount: number;
}

export interface InsuranceType {
  id: number;
  name: string;
}
