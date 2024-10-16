import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../utils/api'; // Assure-toi que cette fonction est bien définie
import '../src/styles/main.scss';


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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!game) return <div>No game data available.</div>;

    return (
        <div className="game-detail">
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name} className="game-image" />
            <p>{game.description}</p>
            <p>Date de sortie : {game.released}</p>
            {/* Autres détails ici */}
        </div>
    );
};

export default PageDetail;
