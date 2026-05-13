import { Garage, GaragePaginatedList } from "@/src/features/garages/types/garage";

import { api } from "./api";

type ListGaragesParams = {
  currentPage?: number;
  pageSize?: number;
  garageName?: string;
};

function mapGarageToViewModel(garage: GaragePaginatedList["data"][number]): Garage {
  return {
    code: garage.code,
    name: garage.name,
    address: garage.address,
    cityUf: `${garage.city}/${garage.state}`,
    regional: garage.region,
    monthlyDigital: true,
  };
}

export async function listGarages({
  currentPage = 1,
  pageSize = 25,
  garageName,
}: ListGaragesParams = {}) {
  const response = await api.get<GaragePaginatedList>("/GetGaragesPaginatedList", {
    params: {
      currentPage,
      pageSize,
      ...(garageName ? { garageName } : {}),
    },
  });

  return {
    ...response.data,
    data: response.data.data.map(mapGarageToViewModel),
  };
}
