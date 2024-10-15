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
    const [totalGamesLoaded, setTotalGamesLoaded] = useState(0);
    const MAX_GAMES_DISPLAYED = 27;

    useEffect(() => {
        const getGames = async () => {
            if (totalGamesLoaded >= MAX_GAMES_DISPLAYED) return;

            try {
                const gameData = await fetchGames(query, platform, page);
                const newGames = gameData.results.slice(0, MAX_GAMES_DISPLAYED - totalGamesLoaded);

                setGames(prevGames => [...prevGames, ...newGames]);
                setTotalGamesLoaded(prevCount => prevCount + newGames.length);
            } catch (error) {
                console.error('Erreur lors de la récupération des jeux :', error);
            }
        };

        getGames();
    }, [query, platform, page, totalGamesLoaded]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);
        setGames([]);
        setTotalGamesLoaded(0);
    };

    const handlePlatformChange = (platformId) => {
        setPlatform(platformId);
        setPage(1);
        setGames([]);
        setTotalGamesLoaded(0);
    };

    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="game-list">
            {games.map(game => (
                <div className="game-card" key={game.id}>
                    <img className="game-image" src={game.background_image} alt={game.name} />
                    <div className="game-details">
                        <h3 className="game-title">{game.name}</h3>
                        <p className="game-platform">Platforms: {game.platforms.join(', ')}</p>
                        <p className="game-rating">Rating: {game.rating}</p>
                    </div>
                </div>
            ))}
            <div className="show-more">
                <button>Load More</button>
            </div>
        </div>
    );
};

export default PageList;
