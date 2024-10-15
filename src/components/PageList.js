import React, { useState, useEffect } from 'react';
import { fetchGames } from '../utils/api';
import GameCard from './GameCard';
import SearchBar from './SearchBar';
import PlatformFilter from './PlatformFilter';

const PageList = () => {
    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('');
    const [platform, setPlatform] = useState('');
    const [page, setPage] = useState(1);
    const [totalGamesLoaded, setTotalGamesLoaded] = useState(0); // Compte total de jeux chargés
    const MAX_GAMES_DISPLAYED = 27; // Limite de 27 jeux
    const GAMES_PER_PAGE = 9; // 9 jeux par page

    useEffect(() => {
        const getGames = async () => {
            if (totalGamesLoaded >= MAX_GAMES_DISPLAYED) return; // Arrête de charger si 27 jeux ont été atteints

            try {
                const gameData = await fetchGames(query, platform, page);
                const newGames = gameData.results.slice(0, MAX_GAMES_DISPLAYED - totalGamesLoaded); // Limite les jeux chargés pour ne pas dépasser 27

                setGames(prevGames => [...prevGames, ...newGames]);
                setTotalGamesLoaded(prevCount => prevCount + newGames.length); // Mets à jour le nombre total de jeux chargés
            } catch (error) {
                console.error('Erreur lors de la récupération des jeux :', error);
            }
        };

        getGames();
    }, [query, platform, page, totalGamesLoaded]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);  // Réinitialise à la première page
        setGames([]); // Réinitialise la liste des jeux
        setTotalGamesLoaded(0); // Réinitialise le compte total des jeux chargés
    };

    const handlePlatformChange = (platformId) => {
        setPlatform(platformId);
        setPage(1); // Réinitialise à la première page
        setGames([]); // Réinitialise la liste des jeux
        setTotalGamesLoaded(0); // Réinitialise le compte total des jeux chargés
    };

    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1); // Charge la page suivante
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <PlatformFilter onChange={handlePlatformChange} />

            <div className="game-list">
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {totalGamesLoaded < MAX_GAMES_DISPLAYED && (
                <button onClick={handleShowMore}>
                    Show more
                </button>
            )}
        </div>
    );
};

export default PageList;
