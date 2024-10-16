import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../utils/api'; // Assure-toi que cette fonction est bien définie
import '../styles/main.scss'; // Chemin relatif pour le fichier SCSS

const PageDetail = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadGameDetails = async () => {
            try {
                const response = await fetchGameDetails(slug);
                setGame(response);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch game details.');
                setLoading(false);
            }
        };
        loadGameDetails();
    }, [slug]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!game) return <div className="no-data">No game data available.</div>;

    return (
        <div className="game-detail">
            <h1 className="game-title">{game.name}</h1>
            {game.background_image && (
                <img src={game.background_image} alt={game.name} className="game-image" />
            )}
            <div className="game-info">
                <p className="game-description">{game.description || 'No description available.'}</p>
                <p className="game-release-date">
                    Date de sortie : {game.released ? new Date(game.released).toLocaleDateString() : 'Date non disponible'}
                </p>
                <p className="game-rating">Note : {game.rating ? game.rating : 'Pas de note disponible'}</p>
            </div>
        </div>
    );
};

export default PageDetail;
