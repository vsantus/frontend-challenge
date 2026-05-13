import { GarageDetails } from "../types/garage.details";

export const garageDetailsMock: GarageDetails = {
  id: "1",
  code: "000610",
  name: "ACYR DE ANDRADE (GMC PARK)",
  address: "RUA JOAQUIM FLORIANO, 620, ITAIM BIBI",
  branch: "ADMINISTRACAO E SERVICOS - SP",
  regional: "SP1",
  totalVacancies: 35,
  occupiedVacancies: 0,
  availableVacancies: 35,
  plans: [
    {
      id: "1",
      description: "Pedro3",
      value: 1003,
      vacancies: 35,
      occupied: 0,
      available: 35,
      status: "inactive",
    },
  ],
};