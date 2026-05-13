import { Button } from "@/components/ui/button";

export function GarageInfoTabs() {
  return (
    <div className="h-12 rounded-t-md border border-b-0 border-zinc-200 bg-zinc-100">
      <Button
        type="button"
        variant="ghost"
        className="h-full rounded-none border-x-transparent border-t-transparent border-b-green-500 bg-white px-5 text-sm font-medium text-zinc-800 hover:bg-white"
      >
        Mensalista Digital
      </Button>
    </div>
  );
}
