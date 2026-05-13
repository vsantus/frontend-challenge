"use client";

import { AuthGuard } from "../auth/components/auth-guard";
import { garageDetailsMock } from "./data/garage-details.mock";
import { garagesMock } from "./data/garage.mock";

import { GarageDetailsHeader } from "./components/details/garage-details-header";
import { GarageInfoTabs } from "./components/details/garage-info-tabs";
import { GaragePlansPanel } from "./components/details/garage-plans-panel";
import { GarageQRCode } from "./components/details/garage-qr-code";
import { GarageStatsCards } from "./components/details/garage-stats-cards";

type GarageDetailsPageProps = {
    garageId: string;
};

export function GarageDetailsPage({ garageId }: GarageDetailsPageProps) {
    const selectedGarage = garagesMock.find((garage) => garage.code === garageId);
    const garage = {
        ...garageDetailsMock,
        id: selectedGarage?.code ?? garageDetailsMock.id,
        code: selectedGarage?.code ?? garageId,
        name: selectedGarage?.name ?? garageDetailsMock.name,
        address: selectedGarage?.address ?? garageDetailsMock.address,
        regional: selectedGarage?.regional ?? garageDetailsMock.regional,
    };

    return (
        <AuthGuard>
        <div className="fixed inset-0 z-50 bg-zinc-950/75">
            <main className="fixed inset-y-0 right-0 left-20 overflow-y-auto bg-white px-8 py-6 shadow-[-18px_0_32px_rgba(15,23,42,0.28)]">
                <GarageDetailsHeader garage={garage} />

                <div className="mt-6">
                    <GarageInfoTabs />
                </div>

                <section className="mt-5 flex items-center gap-4">
                    <GarageStatsCards garage={garage} />

                    <GarageQRCode />
                </section>

                <GaragePlansPanel garageId={garageId} plans={garage.plans} />
            </main>
        </div>
        </AuthGuard>
    );
}
