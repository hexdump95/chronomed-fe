export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface Locality {
  id: number;
  name: string;
  districtId?: number;
  districtName?: string;
  provinceId?: number;
  provinceName?: string;
}
