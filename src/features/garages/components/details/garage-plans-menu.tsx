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
    <aside className="w-full shrink-0 bg-zinc-50 md:w-[168px]">
      <nav className="flex overflow-x-auto md:block md:py-1">
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
                h-11 min-w-max flex-1 justify-center gap-3 rounded-none border-b-4 px-4 text-sm md:w-full md:justify-start md:border-b-0 md:border-l-4
                ${
                  isActive
                    ? "border-x-transparent border-t-transparent border-b-[#7ad33e] bg-white font-semibold text-zinc-800 hover:bg-white md:border-y-transparent md:border-r-transparent md:border-l-[#7ad33e]"
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
