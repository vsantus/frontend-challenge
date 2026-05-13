import { TableCell, TableRow } from "@/components/ui/table";

export function GaragesEmptyState() {
    return (
        <TableRow>
            <TableCell
                colSpan={6}
                className="h-32 text-center text-sm text-zinc-500"
            >
                Nenhuma garagem encontrada.
            </TableCell>
        </TableRow>
    );
}