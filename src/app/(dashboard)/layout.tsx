"use client";

import { Header } from "@/components/organisms/Header";
import { Sidebar } from "@/components/organisms/Sidebar";

import { useState } from "react";

export default function DashboardLayout({ children }: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white-div text-paragraph">
      <Sidebar 
        isOpen={isSidebarOpen} 
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onToggleDesktop={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}