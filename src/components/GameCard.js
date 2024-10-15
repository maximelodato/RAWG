import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '/src/styles/GameCard.scss'; // Assure-toi d'importer le fichier SCSS

const GameCard = ({ game }) => {
    const history = useHistory();

    const handleClick = () => {
        if (game && game.slug) {
            history.push(`/game/${game.slug}`);
        } else {
            console.error("Game object is undefined or doesn't have a slug");
        }
    };

    return (
        <div 
            className="game-card" 
            onClick={handleClick} 
            onKeyPress={(e) => e.key === 'Enter' && handleClick()} // Permet de cliquer avec la touche Entrée
            tabIndex="0" 
            role="button"
            aria-label={`Voir les détails du jeu ${game.name}`} // Amélioration de l'accessibilité
        >
            <img src={game.background_image} alt={game.name} />
            <h3>{game.name}</h3>
            <p>
                Plateformes : {game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'Aucune plateforme disponible'}
            </p>
            <p>Date de sortie : {game.released ? new Date(game.released).toLocaleDateString() : 'Date non disponible'}</p>
            <p>Note : {game.rating ? game.rating : 'Pas de note disponible'}</p>
        </div>
    );
};

// Définition des types de props pour le composant
GameCard.propTypes = {
    game: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        background_image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        platforms: PropTypes.array,
        released: PropTypes.string,
        rating: PropTypes.number,
    }).isRequired,
};

export default GameCard;
