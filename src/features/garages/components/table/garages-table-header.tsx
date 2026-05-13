"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type GaragesTableHeaderProps = {
    total: number;
    search: string;
    onSearchChange: (value: string) => void;
    monthlyDigitalEnabled: boolean;
    onMonthlyDigitalChange: (value: boolean) => void;
};

export function GaragesTableHeader({
    total,
    search,
    onSearchChange,
    monthlyDigitalEnabled,
    onMonthlyDigitalChange,
}: GaragesTableHeaderProps) {
    return (
        <div className="flex items-center justify-between border-zinc-200 px-4 py-3">
            <div className="flex items-center gap-2">
                <Switch
                    checked={monthlyDigitalEnabled}
                    onCheckedChange={onMonthlyDigitalChange}
                    aria-label="Filtrar mensalista digital"
                    className="h-5 w-9 border border-zinc-300 bg-zinc-200 data-[state=checked]:bg-[#6AD348] data-[state=unchecked]:bg-zinc-200"
                />

                <span className="text-sm font-medium text-zinc-800">
                    Mensalista Digital
                </span>
            </div>

            <span className="text-sm text-zinc-500">
                {total} registros
            </span>

            <div className="relative w-[220px]">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    aria-hidden="true"
                />

                <Input
                    value={search}
                    icon={<Search />}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar por nome"
                    className="h-9 pl-12 text-sm"
                />
            </div>
        </div>
    );
}