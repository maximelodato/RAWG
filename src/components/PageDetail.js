// src/components/PageDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../utils/api'; // Fonction à créer pour obtenir les détails

const PageDetail = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        const loadGameDetails = async () => {
            const response = await fetchGameDetails(slug);
            setGame(response);
        };
        loadGameDetails();
    }, [slug]);

    if (!game) return <div>Loading...</div>;

    return (
        <div>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name} />
            <p>{game.description}</p>
            <p>Date de sortie : {game.released}</p>
            {/* Autres détails ici */}
        </div>
    );
};

export default PageDetail;
