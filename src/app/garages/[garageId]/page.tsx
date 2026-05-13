import { GarageDetailsPage } from "@/src/features/garages/GarageDetailsPage";
import { garagesMock } from "@/src/features/garages/data/garage.mock";
import { notFound } from "next/navigation";


type GarageDetailsRouteProps = {
  params: {
    garageId: string;
  };
};

export default function GarageDetailsRoute({
  params,
}: GarageDetailsRouteProps) {
  const garageExists = garagesMock.some(
    (garage) => garage.code === params.garageId
  );

  if (!garageExists) {
    notFound();
  }

  return <GarageDetailsPage garageId={params.garageId} />;
}
