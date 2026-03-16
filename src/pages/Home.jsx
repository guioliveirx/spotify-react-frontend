import React from 'react'
import Main from '../components/Main'

/* Scapin - Condução/Convite: saudação baseada no horário orienta o usuário */
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
};

const Home = () => {
    return (
        <div className="pt-4">
            {/* Nielsen H8: Estética e design minimalista - saudação simples e acolhedora */}
            <h1 className="text-3xl font-bold px-6 pb-4 animate-fade-in">
                {getGreeting()}
            </h1>
            <Main />
        </div>
    )
}

export default Home
