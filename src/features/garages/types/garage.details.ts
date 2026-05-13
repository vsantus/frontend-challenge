export type GaragePlan = {
  id: string;
  description: string;
  value: number;
  vacancies: number;
  occupied: number;
  available: number;
  status: "active" | "inactive";
};

export type PlanApiResponse = {
  id?: string;
  idPlan?: number;
  garageId?: string;
  idGarage?: number;
  description: string;
  startValidity: string;
  endValidity: string | null;
  priceInCents: string | number;
  active: string | boolean;
  descriptionAvailable: string;
  amountDailyCacellationInCents?: string;
  amountDailyCancellationInCents?: string | number;
  veichleType?: string | number;
  VeichleType?: string | number;
  vehicleType?: string;
  totalVacancies: number;
};

export type GarageDetails = {
  id: string;
  code: string;
  name: string;
  address: string;
  branch: string;
  regional: string;
  totalVacancies: number;
  occupiedVacancies: number;
  availableVacancies: number;
  plans: GaragePlan[];
};

export type GarageDetailsApiResponse = {
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  region: string;
  subsidiary: string;
  countSpaces: number;
  occupiedSpaces: number;
  maxDiscountPercent: number;
};
