"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Garage } from "../../types/garage";

type GaragesTableRowProps = {
    garage: Garage;
    onViewGarage: (garage: Garage) => void;
};

export function GaragesTableRow({
    garage,
    onViewGarage,
}: GaragesTableRowProps) {
    function handleViewGarage() {
        onViewGarage(garage);
    }

    return (
        <TableRow className="border-zinc-200">
            <TableCell className="text-xs text-zinc-700">
                {garage.code}
            </TableCell>

            <TableCell className="text-xs font-medium text-zinc-800">
                {garage.name}
            </TableCell>

            <TableCell className="text-xs text-zinc-700">
                {garage.address}
            </TableCell>

            <TableCell className="text-xs text-zinc-700">
                {garage.cityUf}
            </TableCell>

            <TableCell className="text-xs text-zinc-700">
                {garage.regional}
            </TableCell>

            <TableCell className="text-right">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-700 hover:bg-zinc-100"
                    onClick={handleViewGarage}
                    aria-label={`Visualizar detalhes de ${garage.name}`}
                >
                    <Eye size={16} />
                </Button>
            </TableCell>
        </TableRow>
    );
}
