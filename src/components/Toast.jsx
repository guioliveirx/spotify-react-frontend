import React from "react";
import { cn } from "../lib/utils";
import { useAudio } from "../contexts/AudioContext";
import { Music, AlertCircle } from "lucide-react";

/* Nielsen H1: Visibilidade do status do sistema - notificação de ações */
/* Scapin - Feedback imediato: confirmação visual das ações do usuário */
const Toast = () => {
    const { toastMessage } = useAudio();

    if (!toastMessage) return null;

    const isError = toastMessage.type === "error";

    return (
        <div
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-50",
                "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg",
                "animate-slide-up",
                isError
                    ? "bg-red-900/90 text-red-100 border border-red-700/50"
                    : "bg-spotify-dark-elevated/95 text-white border border-white/10"
            )}
            role="alert"
            aria-live="polite"
        >
            {isError ? (
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            ) : (
                <Music size={16} className="text-spotify-green flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{toastMessage.message}</span>
        </div>
    );
};

export default Toast;
