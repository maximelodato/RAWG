import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles/main.scss'; // Correction du chemin relatif

const API_KEY = process.env.REACT_APP_RAWG_API_KEY; // Utilisation de la variable d'environnement

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [platformFilter, setPlatformFilter] = useState('any');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleGamesCount, setVisibleGamesCount] = useState(9); // Nombre initial de jeux visibles
    const [page, setPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false); // État pour gérer l'affichage de la popup

    const history = useHistory();
    const MAX_GAMES = 27; // Limite de jeux affichés

    useEffect(() => {
        fetchGames(); // Charger les jeux initiaux au montage et lorsque la page ou le terme de recherche change
    }, [page, searchQuery]);

    const fetchGames = async () => {
        if (games.length >= MAX_GAMES) return; // Arrêter si on a déjà le nombre maximum de jeux

        setLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0]; // Obtenir la date actuelle au format AAAA-MM-JJ
            const searchParam = searchQuery ? `&search=${searchQuery}` : ''; // Ajouter le terme de recherche s'il existe
            const response = await axios.get(
                `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2026-01-01&page=${page}${searchParam}`
            );
            const newGames = response.data.results;

            setGames(prevGames => {
                const combinedGames = [...prevGames, ...newGames];
                return combinedGames.slice(0, MAX_GAMES);
            });

        } catch (error) {
            console.error('Error fetching games:', error);
            setError('Failed to load games.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.length === 0) {
            setShowPopup(true); // Afficher la popup si la barre de recherche est vide
            return;
        }
        setGames([]); // Réinitialiser les jeux avant de lancer une nouvelle recherche
        setPage(1); // Réinitialiser la pagination
        fetchGames(); // Effectuer la recherche
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePlatformChange = (event) => {
        const selectedPlatform = event.target.value.toLowerCase();
        setPlatformFilter(selectedPlatform);
        setVisibleGamesCount(9); // Réinitialiser le nombre de jeux visibles à 9
    };

    const loadMoreGames = () => {
        setVisibleGamesCount(prevCount => Math.min(prevCount + 9, MAX_GAMES));
        if (visibleGamesCount >= games.length && games.length < MAX_GAMES) {
            setPage(prevPage => prevPage + 1); // Charger plus de jeux si nécessaire
        }
    };

    const handleGameClick = (slug) => {
        history.push(`/game/${slug}`);
    };

    const closePopup = () => {
        setShowPopup(false); // Fermer la popup
    };

    const allowedPlatforms = ['PlayStation 4', 'Xbox One', 'PC', 'Nintendo Switch'];

    // Définir filteredGames ici
    const filteredGames = platformFilter === 'any'
        ? games
        : games.filter(game =>
            game.platforms && game.platforms.some(platform =>
                platform.platform.name.toLowerCase().includes(platformFilter)
            )
        );

    if (loading && games.length === 0) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home-page">
            <header className="header">
                <h1>The Hyper Progame</h1>
                <p className="welcome-text">Welcome</p>
                <p>
                    The Hyper Progame is the world’s premier event for computer and video games and
                    related products. At The Hyper Progame, the video game industry’s top talent pack
                    the Los Angeles Convention Center, connecting tens of thousands of the best, brightest,
                    and most innovative in the interactive entertainment industry. For three exciting days,
                    leading-edge companies, groundbreaking new technologies, and never-before-seen products
                    will be showcased. The Hyper Progame connects you with both new and existing partners,
                    industry executives, gamers, and social influencers providing unprecedented exposure.
                </p>
                <div className="filter">
                    <label htmlFor="platform">Platform:</label>
                    <select id="platform" value={platformFilter} onChange={handlePlatformChange}>
                        <option value="any">Any</option>
                        <option value="pc">PC</option>
                        <option value="playstation">PlayStation</option>
                        <option value="xbox">Xbox</option>
                        <option value="switch">Switch</option>
                    </select>
                </div>
                <form className="search-bar" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search for games..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </header>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Tabasse ton clavier FDP !🤦‍♂️🤷‍♂️.</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}

            <section className="game-list">
                {filteredGames.slice(0, visibleGamesCount).map(game => (
                    <div
                        key={game.id}
                        className="game-card"
                        onClick={() => handleGameClick(game.slug)}
                    >
                        <img src={game.background_image} alt={game.name} className="game-image" />
                        <h3>{game.name}</h3>
                        <div className="platform-icons">
                            {game.platforms && game.platforms
                                .filter(platform => allowedPlatforms.includes(platform.platform.name))
                                .map(platform => (
                                    <span key={platform.platform.id}>{platform.platform.name}</span>
                                ))}
                        </div>
                    </div>
                ))}
            </section>

            {visibleGamesCount < Math.min(filteredGames.length, MAX_GAMES) && (
                <div className="load-more">
                    <button onClick={loadMoreGames} disabled={loading}>
                        {loading ? 'Loading...' : 'Show more'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
