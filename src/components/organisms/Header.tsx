import { ChevronDown, CircuitBoard } from "lucide-react";

export function Header() {
    return (
        <header className="bg-white-div border-b border-border flex items-center justify-between p-6 flex-shrink-0">
            <div className="flex items-center gap-3">
                <CircuitBoard className="h-6 w-6 text-primary" />
                <h2 className="text-xl text-primary">Componentes</h2>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <span className="text-sm text-gray-600">Olá, João</span>
                </div>
                <button className="p-1 rounded-md cursor-pointer hover:bg-gray-200">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
            </div>
        </header>
    )
}