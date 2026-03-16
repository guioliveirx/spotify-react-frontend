import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, X, Home, Disc3, Music, Search } from "lucide-react";
import { cn } from "../lib/utils";
import logoSpotify from "../assets/logo/spotify-logo.png";

/* Colbourne - Organize: navegação mobile via drawer */
const mobileNavItems = [
    { to: "/", icon: Home, label: "Inicio", end: true },
    { to: "/artists", icon: Disc3, label: "Artistas" },
    { to: "/songs", icon: Music, label: "Musicas" },
    { to: "/search", icon: Search, label: "Buscar" },
];

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const getBreadcrumb = () => {
        if (pathname === "/") return null;
        if (pathname === "/artists") return "Todos os Artistas";
        if (pathname === "/songs") return "Todas as Musicas";
        if (pathname.startsWith("/artist/")) return "Artista";
        if (pathname.startsWith("/song/")) return "Musica";
        if (pathname === "/search") return "Buscar";
        return null;
    };

    const breadcrumb = getBreadcrumb();

    /* Nielsen H6: Reconhecimento vs memorização - busca por conteúdo */
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <header
                className="sticky top-0 z-10 flex items-center gap-4 px-4 md:px-6 py-4 bg-spotify-dark-base/90 backdrop-blur-md"
                role="banner"
            >
                {/* Colbourne - Organize: botão hamburger para mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className={cn(
                        "md:hidden w-8 h-8 flex items-center justify-center rounded-full",
                        "bg-black/40 text-white/70 hover:text-white hover:bg-black/60",
                        "transition-all duration-200"
                    )}
                    title="Menu"
                    aria-label="Abrir menu de navegacao"
                >
                    <Menu size={18} />
                </button>

                {/* Botões de navegação - Nielsen H3: Controle e Liberdade do Usuário */}
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
                        aria-label="Voltar para pagina anterior"
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
                        title="Avancar"
                        aria-label="Avancar para proxima pagina"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Nielsen H1: Visibilidade do Status do Sistema - breadcrumb */}
                {breadcrumb && (
                    <span className="text-sm font-medium text-spotify-text-secondary animate-fade-in hidden sm:block">
                        {breadcrumb}
                    </span>
                )}

                {/* Nielsen H6: Reconhecimento - campo de busca */}
                <form onSubmit={handleSearch} className="ml-auto flex items-center">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text-subdued" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar..."
                            className={cn(
                                "w-36 sm:w-48 pl-9 pr-3 py-1.5 rounded-full",
                                "bg-white/10 text-sm text-white placeholder-spotify-text-subdued",
                                "border border-transparent focus:border-white/20",
                                "focus:outline-none focus:ring-2 focus:ring-spotify-green/50 focus:w-56 sm:focus:w-64",
                                "transition-all duration-300"
                            )}
                            aria-label="Buscar musicas e artistas"
                        />
                    </div>
                </form>
            </header>

            {/* Colbourne - Organize/Mova: drawer de navegação mobile */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-spotify-dark-elevated p-4 animate-slide-in-left">
                        {/* Logo + fechar */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <img src={logoSpotify} alt="Logo do Spotify" className="w-8 h-8" />
                                <span className="text-xl font-bold">Spotify</span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Fechar menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Links de navegação */}
                        <nav className="flex flex-col gap-1">
                            {mobileNavItems.map(({ to, icon: Icon, label, end }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={end}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-md",
                                            "text-base font-semibold transition-all duration-200",
                                            "hover:text-white hover:bg-white/10",
                                            isActive
                                                ? "text-white bg-white/10"
                                                : "text-spotify-text-secondary"
                                        )
                                    }
                                    title={label}
                                >
                                    <Icon size={22} />
                                    <span>{label}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
};

export default Header;
