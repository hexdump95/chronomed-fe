export interface Insurance {
  id?: number;
  name: string;
  description: string;
  insuranceTypeId: number;
  coverages?: InsuranceCoverage[];
}

export interface InsuranceCoverage {
  id: number;
  validFrom: string;
  validTo: string;
  amount: number;
}
