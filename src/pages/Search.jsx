import React from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import SingleItem from "../components/SingleItem";
import SongItem from "../components/SongItem";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

/* Nielsen H6: Reconhecimento vs memorização - busca permite encontrar conteúdo sem navegar */
const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const normalizedQuery = query.toLowerCase().trim();

    const matchedArtists = normalizedQuery
        ? artistArray.filter((a) => a.name.toLowerCase().includes(normalizedQuery))
        : [];

    const matchedSongs = normalizedQuery
        ? songsArray.filter(
              (s) =>
                  s.name.toLowerCase().includes(normalizedQuery) ||
                  s.artist.toLowerCase().includes(normalizedQuery)
          )
        : [];

    const hasResults = matchedArtists.length > 0 || matchedSongs.length > 0;

    return (
        <div className="px-6 py-4 pb-8 animate-fade-in">
            <h1 className="text-2xl font-bold mb-6">
                {normalizedQuery
                    ? `Resultados para "${query}"`
                    : "Buscar musicas e artistas"}
            </h1>

            {!normalizedQuery && (
                /* Scapin - Condução/Convite: orientação para o usuário */
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-spotify-text-secondary">
                    <SearchIcon size={48} strokeWidth={1.5} />
                    <p className="text-lg font-medium">
                        Use a barra de busca para encontrar artistas e musicas
                    </p>
                </div>
            )}

            {normalizedQuery && !hasResults && (
                /* Scapin - Qualidade das mensagens de erro: feedback claro quando não há resultados */
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-spotify-text-secondary">
                    <SearchIcon size={48} strokeWidth={1.5} />
                    <p className="text-lg font-medium">
                        Nenhum resultado encontrado para "{query}"
                    </p>
                    <p className="text-sm">
                        Tente buscar por outro termo ou verifique a ortografia.
                    </p>
                </div>
            )}

            {/* Artistas encontrados */}
            {matchedArtists.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xl font-bold mb-4">Artistas</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                        {matchedArtists.map((artist, index) => (
                            <SingleItem
                                key={`artist-${index}`}
                                idPath="/artist"
                                {...artist}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Músicas encontradas */}
            {matchedSongs.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold mb-4">Musicas</h2>
                    {/* Critérios Ergonômicos - Legibilidade: cabeçalho da lista */}
                    <div className="grid grid-cols-[16px_1fr_auto] gap-4 px-4 py-2 border-b border-white/10 mb-1">
                        <span className="text-xs text-spotify-text-secondary font-medium">#</span>
                        <span className="text-xs text-spotify-text-secondary font-medium uppercase tracking-wider">Titulo</span>
                        <span className="text-xs text-spotify-text-secondary font-medium">Duracao</span>
                    </div>
                    {matchedSongs.map((song, index) => (
                        <SongItem key={`song-${index}`} {...song} index={index} />
                    ))}
                </section>
            )}
        </div>
    );
};

export default Search;
