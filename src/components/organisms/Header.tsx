import { 
    Menu,
    ChevronDown,
    Cpu,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="bg-white-div border-b border-border flex items-center justify-between p-6 flex-shrink-0">
            <div className="flex items-center gap-3">
                <button 
                  onClick={onMenuClick} 
                  className="md:hidden p-1 text-gray-600 hover:text-primary"
                >
                  <Menu className="h-6 w-6" />
                </button>

                <Cpu className="h-6 w-6 hidden md:block text-primary" />
                <h2 className="text-xl hidden md:block text-primary">Componentes</h2>
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