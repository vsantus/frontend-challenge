"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { GaragesTableSkeleton } from "@/src/components/feedback/page-skeletons";
import { listGarages } from "@/src/services/garage.services";

import { Garage } from "../../types/garage";
import { GaragesTable } from "./garages-table";
import { GaragesTableHeader } from "./garages-table-header";

export function GaragePageContent() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const normalizedSearch = search.trim().toLowerCase();

    const garagesQuery = useQuery({
        queryKey: ["garages"],
        queryFn: () =>
            listGarages({
                currentPage: 1,
                pageSize: 25,
            }),
    });

    const filteredGarages = useMemo(() => {
        const garages = garagesQuery.data?.data ?? [];

        return garages.filter((garage) => {
            const matchesSearch = normalizedSearch
                ? [
                    garage.code,
                    garage.name,
                    garage.address,
                    garage.cityUf,
                    garage.regional,
                ].some((value) => value.toLowerCase().includes(normalizedSearch))
                : true;

            return matchesSearch;
        });
    }, [garagesQuery.data?.data, normalizedSearch]);

    function handleViewGarage(garage: Garage) {
        router.push(`/garages/${garage.code}`);
    }

    return (
        <div className="mt-6 space-y-4">
            <Card className="border border-zinc-200 px-4 py-3 shadow-none">
                <GaragesTableHeader
                    total={filteredGarages.length}
                    search={search}
                    onSearchChange={setSearch}
                />
            </Card>

            <Card className="overflow-hidden border border-zinc-200 shadow-none">
                {garagesQuery.isLoading ? (
                    <GaragesTableSkeleton />
                ) : garagesQuery.isError ? (
                    <div className="flex min-h-[220px] items-center justify-center px-6 text-center text-sm text-red-600">
                        Não foi possível carregar as garagens. Tente novamente.
                    </div>
                ) : (
                    <GaragesTable
                        garages={filteredGarages}
                        onViewGarage={handleViewGarage}
                    />
                )}
            </Card>
        </div>
    );
}
