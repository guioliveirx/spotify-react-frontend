import React from 'react'
import { Sun, Sunset, Moon } from 'lucide-react'
import Main from '../components/Main'

/* Scapin - Condução/Convite: saudação baseada no horário orienta o usuário */
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Bom dia", icon: Sun, color: "text-amber-400" };
    if (hour < 18) return { text: "Boa tarde", icon: Sunset, color: "text-orange-400" };
    return { text: "Boa noite", icon: Moon, color: "text-indigo-300" };
};

const Home = () => {
    const greeting = getGreeting();
    const Icon = greeting.icon;

    return (
        <div className="pt-4">
            {/* Nielsen H8: Estética e design minimalista - saudação simples e acolhedora */}
            <h1 className="text-3xl font-bold px-6 pb-4 animate-fade-in flex items-center gap-3">
                <Icon size={32} className={greeting.color} />
                {greeting.text}
            </h1>
            <Main />
        </div>
    )
}

export default Home
