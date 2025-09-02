"use client";

import {
  Home,
  CircuitBoard,
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

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/componentes", label: "Componentes", icon: CircuitBoard },
  { href: "/laboratorios", label: "Laboratórios", icon: Factory },
  { href: "/categorias", label: "Categorias", icon: LayoutGrid },
  { href: "/relatorios", label: "Relatórios", icon: FileText },
  { href: "/usuarios", label: "Usuários", icon: Users },
];

interface SidebarProps {
  isOpen: boolean; // desktop
  isMobileOpen: boolean; // mobile
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

  return (
    <>
      <aside
        className={clsx(
          "hidden md:flex h-full flex-col justify-between p-6 bg-white-div border-r border-border transition-all duration-300",
          isOpen ? "w-64" : "w-auto"
        )}
      >
        <div className="flex flex-col gap-16">
          <div className={clsx(
            "flex items-center justify-between",
            !isOpen && "justify-center"
          )}>
            {isOpen && (
              <img
                src="/logo-horizontal.png"
                alt="Logo da UFC"
                className="transition-all duration-300"
              />
            )}
            <button
              className="p-1 rounded-md cursor-pointer hover:bg-gray-200"
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
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-gray-200"
                )}
              >
                <item.icon className="h-5 w-5" />
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}

            <hr className="text-border" />

            <Link
              href="/logout"
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-primary hover:bg-gray-200 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {isOpen && "Sair"}
            </Link>
          </nav>
        </div>

        <div
          className={clsx(
            isOpen ? "p-4" : "p-0",
            "transition-[padding] duration-300"
          )}
        >
          <p className="text-center text-xs text-paragraph">2025 ©</p>
        </div>
      </aside >

      <aside
        className={clsx(
          "fixed md:hidden inset-0 bg-white-div border-r border-border flex flex-col justify-between p-6 z-30 transform transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-16">
          <div className="h-16 flex items-center justify-between">
            <img src="/logo-horizontal.png" alt="Logo da UFC" />
            <button
              className="p-1 rounded-md cursor-pointer hover:bg-gray-200"
              onClick={onCloseMobile}
            >
              <ChevronLeft className="h-5 w-5 text-paragraph" />
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  "flex items-center gap-3 px-5 py-2.5 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-gray-200"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}

            <hr className="text-border" />

            <Link
              href="/logout"
              onClick={onCloseMobile}
              className="flex items-center gap-3 px-5 py-2.5 rounded-md text-sm font-medium text-primary hover:bg-gray-200 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </Link>
          </nav>
        </div>

        <div className="p-4">
          <p className="text-center text-xs text-paragraph">2025 ©</p>
        </div>
      </aside>
    </>
  );
}
