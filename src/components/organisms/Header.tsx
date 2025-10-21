import {
    Menu,
    ChevronDown,
    User,
} from "lucide-react";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import Link from "next/link";
import { useAuthentication } from "@/contexts/AuthenticationContext";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const { user } = useAuthentication();
    const { breadcrumbs } = useBreadcrumbs();

    const { items, icon: Icon } = breadcrumbs

    return (
        <header className="bg-white-div border-b border-border flex items-center justify-between p-6 flex-shrink-0">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-1 text-gray-600 hover:text-primary"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {Icon && <Icon className="h-6 w-6 hidden md:block text-primary" />}

                {items.map((crumb, index) => (
                    <div key={crumb.href} className="hidden md:flex items-center gap-2 text-primary">
                        {index > 0 && <span className="text-xl hidden md:block text-primary">/</span>}
                        {index === items.length - 1 ? (
                            <span className="text-xl hidden md:block text-primary">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href} className="text-xl hidden md:block text-primary">
                                {crumb.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                        <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-600">Olá, <strong>{user?.name}</strong></span>
                </div>
                <button className="p-1 rounded-md cursor-pointer hover:bg-gray-200">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
            </div>
        </header>
    )
}