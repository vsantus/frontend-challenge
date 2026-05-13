export type GaragePlan = {
  id: string;
  description: string;
  value: number;
  vacancies: number;
  occupied: number;
  available: number;
  status: "active" | "inactive";
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