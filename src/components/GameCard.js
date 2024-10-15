import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '/src/styles/GameCard.scss';

// Importation des logos SVG
import PlayStationIcon from '../assets/icons/ps4.svg';
import XboxIcon from '../assets/icons/xbox.svg';
import PCIcon from '../assets/icons/windows.svg';
import SwitchIcon from '../assets/icons/switch.svg';

const GameCard = ({ game }) => {
    const history = useHistory();

    const handleClick = () => {
        if (game && game.slug) {
            history.push(`/game/${game.slug}`);
        } else {
            console.error("Game object is undefined or doesn't have a slug");
        }
    };

    // Icônes des plateformes
    const platformIcons = {
        PlayStation: PlayStationIcon,
        Xbox: XboxIcon,
        PC: PCIcon,
        Switch: SwitchIcon,
        // Ajouter d'autres plateformes si nécessaire
    };

    return (
        <div 
            className="game-card" 
            onClick={handleClick} 
            onKeyPress={(e) => e.key === 'Enter' && handleClick()}
            tabIndex="0" 
            role="button"
            aria-label={`Voir les détails du jeu ${game.name}`}
        >
            <div className="game-image">
                <img src={game.background_image} alt={game.name} />
            </div>
            <div className="game-info">
                <h3>{game.name}</h3>
                <div className="platform-icons">
                    {game.platforms ? game.platforms.map((p, index) => (
                        <img 
                            key={index} 
                            src={platformIcons[p.platform.name]} 
                            alt={p.platform.name} 
                            className="platform-icon"
                        />
                    )) : 'Aucune plateforme disponible'}
                </div>
                <div className="game-details">
                    <p>Date de sortie : {game.released ? new Date(game.released).toLocaleDateString() : 'Date non disponible'}</p>
                    <p>Note : {game.rating ? game.rating : 'Pas de note disponible'}</p>
                </div>
            </div>
            <div className="filter-button">
                <button className="red-button">Action</button>
            </div>
        </div>
    );
};

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
