import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/GameCard.scss';

// Importation des logos SVG
import PlayStationIcon from '../assets/icons/ps4.svg';
import XboxIcon from '../assets/icons/xbox.svg';
import PCIcon from '../assets/icons/windows.svg';
import SwitchIcon from '../assets/icons/switch.svg';

const GameCard = ({ game }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (game && game.slug) {
            navigate(`/game/${game.slug}`);
        } else {
            console.error("Game object is undefined or doesn't have a slug");
        }
    };

    // Mappage des noms de plateformes aux icônes
    const platformIcons = {
        'PlayStation 4': PlayStationIcon,
        'Xbox One': XboxIcon,
        'PC': PCIcon,
        'Nintendo Switch': SwitchIcon,
    };

    // Filtrer les plateformes pour n'afficher que PS4, Xbox, Windows, Switch
    const filteredPlatforms = game.platforms.filter(p => 
        ['PlayStation 4', 'Xbox One', 'PC', 'Nintendo Switch'].includes(p.platform.name)
    );

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
                    {filteredPlatforms.length > 0 ? filteredPlatforms.map((p, index) => {
                        const icon = platformIcons[p.platform.name];
                        return icon ? (
                            <img 
                                key={index} 
                                src={icon} 
                                alt={p.platform.name} 
                                className="platform-icon"
                            />
                        ) : null;
                    }) : 'Aucune plateforme disponible'}
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
        platforms: PropTypes.arrayOf(PropTypes.shape({
            platform: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
        })),
        released: PropTypes.string,
        rating: PropTypes.number,
    }).isRequired,
};

export default GameCard;
