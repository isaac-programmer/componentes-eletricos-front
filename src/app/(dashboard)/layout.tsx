import { Header } from "@/components/organisms/Header"; // Será criado no próximo passo
import { Sidebar } from "@/components/organisms/Sidebar"; // Será criado no próximo passo

export default function DashboardLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 text-gray-800">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}