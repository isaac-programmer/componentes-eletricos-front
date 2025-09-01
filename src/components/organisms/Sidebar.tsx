'use client';

import {
  Home,
  CircuitBoard,
  Factory,
  LayoutGrid,
  FileText,
  Users,
  LogOut,
  ChevronLeft
} from "lucide-react";
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-white-div border-r flex flex-col justify-between p-6">
      <div className="flex flex-col gap-16">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-horizontal.png" alt="Logo da UFC" />
          </div>
          <button className="p-1 rounded-md hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-paragraph" />
          </button>
        </div>

        <nav className="flex flex-col gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${pathname.startsWith(item.href)
                ? "bg-primary text-white"
                : "text-primary hover:bg-gray-100"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}

          <hr className="text-border" />

          <Link
            href="/logout"
            className="flex items-center gap-3 px-5 py-2.5 rounded-md text-sm font-medium text-primary hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </Link>
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