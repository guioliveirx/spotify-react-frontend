import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const getBreadcrumb = () => {
        if (pathname === "/") return null;
        if (pathname === "/artists") return "Todos os Artistas";
        if (pathname === "/songs") return "Todas as Músicas";
        if (pathname.startsWith("/artist/")) return "Artista";
        if (pathname.startsWith("/song/")) return "Música";
        return null;
    };

    const breadcrumb = getBreadcrumb();

    return (
        <header
            className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 bg-spotify-dark-base/90 backdrop-blur-md"
            role="banner"
        >
            {/* Botões de navegação - Nielsen: Controle e Liberdade do Usuário */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full",
                        "bg-black/40 text-white/70 hover:text-white hover:bg-black/60",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark-base"
                    )}
                    title="Voltar"
                    aria-label="Voltar para página anterior"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={() => navigate(1)}
                    className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full",
                        "bg-black/40 text-white/70 hover:text-white hover:bg-black/60",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark-base"
                    )}
                    title="Avançar"
                    aria-label="Avançar para próxima página"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Breadcrumb - Nielsen: Visibilidade do Status do Sistema */}
            {breadcrumb && (
                <span className="text-sm font-medium text-spotify-text-secondary animate-fade-in">
                    {breadcrumb}
                </span>
            )}
        </header>
    );
};

export default Header;
