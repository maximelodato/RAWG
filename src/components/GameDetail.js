import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/GameDetail.scss';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY; // Utilisation de la variable d'environnement

const GameDetail = () => {
    const { slug } = useParams();
    const history = useHistory();
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get(
                    `https://api.rawg.io/api/games/${slug}?key=${API_KEY}`
                );
                setGameData(response.data);
            } catch (error) {
                console.error('Error fetching game data:', error);
                setError('Failed to fetch game details.');
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [slug]);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}`
            );
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Failed to fetch search results.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleGameClick = (slug) => {
        history.push(`/game/${slug}`);
    };

    if (loading && !gameData) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!gameData) return <div className="error">Game not found</div>;

    return (
        <div className="game-detail">
            <h1>{gameData.name}</h1>
            {gameData.background_image && (
                <img src={gameData.background_image} alt={gameData.name} className="game-image" />
            )}
            <p className="game-description">
                {gameData.description_raw || 'Description not available'}
            </p>
            <p><strong>Released:</strong> {gameData.released || 'Release date not available'}</p>
            <p><strong>Genres:</strong> 
                {gameData.genres && gameData.genres.length > 0 
                    ? gameData.genres.map(genre => genre.name).join(', ') 
                    : 'Genres not available'}
            </p>
            <p><strong>Platforms:</strong> 
                {gameData.platforms && gameData.platforms.length > 0
                    ? gameData.platforms.map(platform => platform.platform.name).join(', ') 
                    : 'Platforms not available'}
            </p>
            <p><strong>Developers:</strong> 
                {gameData.developers && gameData.developers.length > 0 
                    ? gameData.developers.map(dev => dev.name).join(', ') 
                    : 'Developers not available'}
            </p>

            {/* Barre de recherche */}
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for games..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>

            {/* Résultats de la recherche */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    <h2>Search Results</h2>
                    <ul>
                        {searchResults.map((game) => (
                            <li key={game.id} onClick={() => handleGameClick(game.slug)}>
                                {game.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GameDetail;
