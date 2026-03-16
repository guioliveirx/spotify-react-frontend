import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 animate-fade-in">
            <div className="text-8xl font-black text-spotify-green">404</div>
            <h1 className="text-2xl font-bold text-center">
                Pagina nao encontrada
            </h1>
            <p className="text-spotify-text-secondary text-center max-w-md">
                A pagina que voce procura nao existe ou foi removida. Verifique o
                endereco e tente novamente.
            </p>
            <div className="flex items-center gap-4 mt-2">
                <Link
                    to="/"
                    className="spotify-btn-primary flex items-center gap-2"
                >
                    <Home size={18} />
                    Voltar ao Inicio
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="spotify-btn-ghost px-6 py-3 flex items-center gap-2 border border-white/20 rounded-full"
                >
                    <ArrowLeft size={18} />
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default NotFound;
