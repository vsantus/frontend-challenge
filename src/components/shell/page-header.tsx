import { LucideIcon } from "lucide-react";

type PageHeaderProps = {
    title: string;
    description: string;
    icon?: LucideIcon;
};

export function PageHeader({
    title,
    description,
    icon: Icon,
}: PageHeaderProps) {
    return (
        <header className="flex items-start gap-3">
            {Icon && (
                <Icon
                    size={24}
                    className="mt-1 text-[#2EAF4A]"
                    aria-hidden="true"
                />
            )}

            <div>
                <h1 className="text-2xl font-semibold text-zinc-800">
                    {title}
                </h1>

                <p className="text-sm text-zinc-500">
                    {description}
                </p>
            </div>
        </header>
    );
}