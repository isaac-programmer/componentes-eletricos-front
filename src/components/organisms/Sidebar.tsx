"use client";

import {
  Home,
  CircuitBoard,
  Cpu,
  List,
  Airplay,
  Factory,
  LayoutGrid,
  FileText,
  Users,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useMemo } from "react";

const navItems = [
  // { href: "/home", label: "Home", icon: Home },
  { href: "/componentes", label: "Componentes", icon: Cpu },
  { href: "/laboratorios", label: "Laboratórios", icon: Airplay, adminOnly: true },
  // { href: "/categorias", label: "Categorias", icon: List, adminOnly: true },
  { href: "/relatorio", label: "Relatório", icon: FileText },
  { href: "/usuarios", label: "Usuários", icon: Users, adminOnly: true },
];

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onToggleDesktop: () => void;
  onCloseMobile: () => void;
}

export function Sidebar({
  isOpen,
  isMobileOpen,
  onToggleDesktop,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  
  const { user, signOut } = useAuthentication();

  const filteredNavItems = useMemo(() => {
    return user?.group?.isAdmin
      ? navItems
      : navItems.filter(navItem => !navItem.adminOnly);
  }, [user]);

  return (
    <aside
      className={clsx(
        "flex flex-col justify-between bg-white-div border-r border-border transition-all duration-300 ease-in-out",
        "fixed inset-y-0 left-0 z-20",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "w-full",
        "md:relative md:translate-x-0",
        isOpen ? "md:w-64" : "md:w-auto"
      )}
    >
      <div className="flex flex-col gap-16 p-6">
        <div className={clsx(
          "flex items-center justify-between",
          !isOpen && "md:justify-center",
        )}>
          <img
            src="/logo-horizontal.png"
            alt="Logo da UFC"
            className={clsx(
              "overflow-hidden transition-all",
              isOpen ? "w-32" : "w-0",
              "md:block"
            )}
          />
          
          <button
            className="p-1 rounded-md cursor-pointer hover:bg-gray-200 md:hidden"
            onClick={onCloseMobile}
          >
            <ChevronLeft className="h-5 w-5 text-paragraph" />
          </button>

          <button
            className="hidden md:block p-1 rounded-md cursor-pointer hover:bg-gray-200"
            onClick={onToggleDesktop}
          >
            <ChevronLeft
              className={clsx(
                "h-5 w-5 text-paragraph transition-transform duration-300",
                !isOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {filteredNavItems.map((navItem) => (
            <Link
              key={navItem.label}
              href={navItem.href}
              onClick={onCloseMobile}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                !isOpen && "justify-center",
                pathname.startsWith(navItem.href)
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-gray-200"
              )}
            >
              <navItem.icon className="h-5 w-5 flex-shrink-0" />
              <span className={clsx(!isOpen && "md:hidden")}>{navItem.label}</span>
            </Link>
          ))}

          <hr className="text-border" />

          <span
            onClick={signOut}
            className={clsx(
              "flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-primary hover:bg-gray-200",
              !isOpen && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={clsx(!isOpen && "md:hidden")}>Sair</span>
          </span>
        </nav>
      </div>

      <div className="p-4">
        <p className="text-center text-xs text-paragraph">
          2025 ©
        </p>
      </div>
    </aside>
  );
}