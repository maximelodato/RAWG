import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '/src/styles/GameDetail.scss';

const GameDetail = () => {
    const { slug } = useParams();
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get(`https://api.rawg.io/api/games/${slug}`);
                setGameData(response.data);
            } catch (error) {
                console.error('Error fetching game data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (!gameData) return <div>Game not found</div>;

    return (
        <div>
            <h1>{gameData.name}</h1>
            <img src={gameData.background_image} alt={gameData.name} style={{ width: '100%', height: 'auto' }} />
            <p>{gameData.description_raw}</p>
            <p>Released: {gameData.released}</p>
            <p>Genres: {gameData.genres.map(genre => genre.name).join(', ')}</p>
            <p>Platforms: {gameData.platforms.map(platform => platform.platform.name).join(', ')}</p>
            <p>Developers: {gameData.developers.map(dev => dev.name).join(', ')}</p>
            {/* Et ainsi de suite pour d'autres informations */}
        </div>
    );
};

export default GameDetail;
