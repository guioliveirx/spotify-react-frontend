import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Music, Disc3, Library } from "lucide-react";
import logoSpotify from "../assets/logo/spotify-logo.png";
import { cn } from "../lib/utils";

const navItems = [
    { to: "/", icon: Home, label: "Início", end: true },
    { to: "/artists", icon: Disc3, label: "Artistas" },
    { to: "/songs", icon: Music, label: "Músicas" },
];

const Sidebar = () => {
    return (
        <aside
            className="hidden md:flex flex-col w-[280px] flex-shrink-0 gap-2"
            role="navigation"
            aria-label="Menu principal"
        >
            {/* Logo + Navegação principal */}
            <div className="bg-spotify-dark-elevated rounded-lg p-4">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 mb-4"
                    title="Spotify - Início"
                >
                    <img
                        src={logoSpotify}
                        alt="Logo do Spotify"
                        className="w-8 h-8"
                    />
                    <span className="text-xl font-bold tracking-tight">
                        Spotify
                    </span>
                </NavLink>

                {/* Links de navegação */}
                <nav className="flex flex-col gap-1">
                    {navItems.map(({ to, icon: Icon, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-4 px-3 py-2.5 rounded-md",
                                    "text-sm font-semibold transition-all duration-200",
                                    "hover:text-white",
                                    "focus:outline-none focus:ring-2 focus:ring-spotify-green/50",
                                    isActive
                                        ? "text-white bg-white/10"
                                        : "text-spotify-text-secondary"
                                )
                            }
                            title={label}
                        >
                            <Icon size={22} strokeWidth={isActive => isActive ? 2.5 : 2} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Biblioteca / Seção inferior */}
            <div className="flex-1 bg-spotify-dark-elevated rounded-lg p-4 flex flex-col">
                <div className="flex items-center justify-between px-3 py-2 mb-2">
                    <div className="flex items-center gap-3 text-spotify-text-secondary hover:text-white transition-colors cursor-pointer">
                        <Library size={22} />
                        <span className="text-sm font-semibold">Sua Biblioteca</span>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xs text-spotify-text-subdued text-center px-4">
                        Explore artistas e músicas para montar sua coleção
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
