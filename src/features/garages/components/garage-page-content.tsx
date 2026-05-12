"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";

import { Garage } from "../types/garage";
import { GaragesTable } from "./garages-table";
import { GaragesTableHeader } from "./garages-table-header";
import { garagesMock } from "../data/garage.mock";

export function GaragePageContent() {
    const [search, setSearch] = useState("");
    const [monthlyDigitalEnabled, setMonthlyDigitalEnabled] = useState(true);

    const filteredGarages = useMemo(() => {
        const garagesByCode = new Map(
            garagesMock.map((garage) => [garage.code, garage])
        );
        const uniqueGarages = Array.from(garagesByCode.values());
        const normalizedSearch = search.trim().toLowerCase();

        return uniqueGarages.filter((garage) => {
            const matchesSearch = normalizedSearch
                ? [
                    garage.code,
                    garage.name,
                    garage.address,
                    garage.cityUf,
                    garage.regional,
                ]
                    .some((value) => value.toLowerCase().includes(normalizedSearch))
                : true;

            const matchesMonthlyDigital = monthlyDigitalEnabled
                ? garage.monthlyDigital
                : true;

            return matchesSearch && matchesMonthlyDigital;
        });
    }, [search, monthlyDigitalEnabled]);

    function handleViewGarage(garage: Garage) {
        console.log("Visualizar garagem:", garage);
    }

    return (
        <div className="mt-6 space-y-4">
            <Card className="border border-zinc-200 px-4 py-3 shadow-none">
                <GaragesTableHeader
                    total={filteredGarages.length}
                    search={search}
                    onSearchChange={setSearch}
                    monthlyDigitalEnabled={monthlyDigitalEnabled}
                    onMonthlyDigitalChange={setMonthlyDigitalEnabled}
                />
            </Card>

            <Card className="overflow-hidden border border-zinc-200 shadow-none">
                <GaragesTable
                    garages={filteredGarages}
                    onViewGarage={handleViewGarage}
                />
            </Card>
        </div>
    );
}
