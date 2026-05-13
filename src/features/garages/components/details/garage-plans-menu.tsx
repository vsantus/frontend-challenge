import { BadgePercent, CircleDollarSign, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

export type GaragePlansMenuItem = "plans" | "discounts" | "settings";

const menuItems = [
  {
    id: "plans",
    label: "Planos",
    icon: CircleDollarSign,
  },
  {
    id: "discounts",
    label: "Descontos",
    icon: BadgePercent,
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
  },
] satisfies Array<{
  id: GaragePlansMenuItem;
  label: string;
  icon: typeof CircleDollarSign;
}>;

type GaragePlansMenuProps = {
  activeItem: GaragePlansMenuItem;
  onSelectItem: (item: GaragePlansMenuItem) => void;
};

export function GaragePlansMenu({
  activeItem,
  onSelectItem,
}: GaragePlansMenuProps) {
  return (
    <aside className="w-[168px] shrink-0 bg-zinc-50">
      <nav className="py-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeItem;

          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => onSelectItem(item.id)}
              className={`
                h-11 w-full justify-start gap-3 rounded-none border-l-4 px-4 text-sm
                ${
                  isActive
                    ? "border-y-transparent border-r-transparent border-l-[#7ad33e] bg-white font-semibold text-zinc-800 hover:bg-white"
                    : "border-transparent text-zinc-700 hover:bg-white"
                }
              `}
            >
              <Icon size={17} className="text-zinc-500" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
