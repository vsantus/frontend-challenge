"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
};

export function SidebarItem({
  href,
  icon,
  label,
  collapsed,
}: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative overflow-hidden
        flex items-center gap-3 rounded-lg
        px-3 py-3 transition-all
        ${isActive
          ? "bg-zinc-100 text-zinc-900"
          : "text-zinc-700"
        }
      `}
    >
      <span
        className={`
          absolute left-0 top-1/2 h-6 w-1
          -translate-y-1/2 rounded-r-full
          transition-all duration-200
          ${isActive
            ? "bg-[#7ad33e] opacity-100"
            : "opacity-0"
          }
        `}
      />

      <span
        className={`
          shrink-0 transition-colors
          ${isActive
            ? "text-zinc-900"
            : "text-zinc-600"
          }
        `}
      >
        {icon}
      </span>

      {!collapsed && (
        <span
          className={`
            text-[15px] font-medium transition-colors
            ${isActive
              ? "text-zinc-900"
              : "text-zinc-700"
            }
          `}
        >
          {label}
        </span>
      )}
    </Link>
  );
}