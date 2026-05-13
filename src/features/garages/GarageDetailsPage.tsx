"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { GarageDetailsPageSkeleton } from "@/src/components/feedback/page-skeletons";
import { getGarageDetails } from "@/src/services/garage.services";
import { listPlans } from "@/src/services/plans.services";

import { AuthGuard } from "../auth/components/auth-guard";

import { GarageDetailsHeader } from "./components/details/garage-details-header";
import { GarageInfoTabs } from "./components/details/garage-info-tabs";
import { GaragePlansPanel } from "./components/details/garage-plans-panel";
import { GarageQRCode } from "./components/details/garage-qr-code";
import { GarageStatsCards } from "./components/details/garage-stats-cards";

type GarageDetailsPageProps = {
    garageId: string;
};

export function GarageDetailsPage({ garageId }: GarageDetailsPageProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsVisible(true);
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    const garageQuery = useQuery({
        queryKey: ["garage", garageId],
        queryFn: () => getGarageDetails(garageId),
    });

    const plansQuery = useQuery({
        queryKey: ["garage-plans", garageId],
        queryFn: () => listPlans(garageId),
    });

    const isLoading = garageQuery.isLoading || plansQuery.isLoading;
    const hasError = garageQuery.isError || plansQuery.isError;

    const garage =
        garageQuery.data && plansQuery.data
            ? {
                  ...garageQuery.data,
                  plans: plansQuery.data,
              }
            : null;

    if (isLoading) {
        return (
            <AuthGuard>
                <GarageDetailsPageSkeleton />
            </AuthGuard>
        );
    }

    if (hasError || !garage) {
        return (
            <AuthGuard>
                <div
                    className={`fixed inset-0 z-50 bg-zinc-950/75 transition-opacity duration-300 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                    <main
                        className={`
                            fixed inset-y-0 right-0 left-0 md:left-20
                            flex items-center justify-center
                            overflow-y-auto bg-white px-4 py-5 md:px-8 md:py-6
                            shadow-[-18px_0_32px_rgba(15,23,42,0.28)]
                            transition-transform duration-300 ease-out
                            ${isVisible ? "translate-x-0" : "translate-x-full"}
                        `}
                    >
                        <p className="text-sm font-medium text-red-600">
                            Não foi possível carregar os dados da garagem.
                        </p>
                    </main>
                </div>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <div
                className={`fixed inset-0 z-50 bg-zinc-950/75 transition-opacity duration-300 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
                <main
                    className={`
                        fixed inset-y-0 right-0 left-0 md:left-20
                        overflow-y-auto bg-white px-4 py-5 md:px-8 md:py-6
                        shadow-[-18px_0_32px_rgba(15,23,42,0.28)]
                        transition-transform duration-500 ease-out
                        ${isVisible ? "translate-x-0" : "translate-x-full"}
                    `}
                >
                    <GarageDetailsHeader garage={garage} />

                    <div className="mt-6">
                        <GarageInfoTabs />
                    </div>

                    <section className="mt-5 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
                        <GarageStatsCards garage={garage} />

                        <GarageQRCode />
                    </section>

                    <GaragePlansPanel
                        garageId={garageId}
                        plans={garage.plans}
                    />
                </main>
            </div>
        </AuthGuard>
    );
}
