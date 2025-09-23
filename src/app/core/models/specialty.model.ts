export interface Specialty {
  id: number;
  name: string;
  description?: string;
  specialtyPrices: SpecialtyPrice[];
}

export interface SpecialtyPrice {
  id: number;
  validFrom: string;
  validTo: string;
  price: number;
}
