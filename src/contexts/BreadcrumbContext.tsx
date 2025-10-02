"use client";

import { LucideIcon } from "lucide-react";
import { createContext, useState, useContext, ReactNode } from "react";

export interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
  icon?: LucideIcon;
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbState;
  setBreadcrumbs: (state: BreadcrumbState) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbState>({
    items: [],
  });

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("O useBreadcrumbs deve ser usado dentro de um BreadcrumbProvider");
  }
  return context;
}