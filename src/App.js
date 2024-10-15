import React, { useEffect, useState } from 'react';
import { fetchGames } from './utils/api';
import GameCard from './components/GameCard';
import './styles/main.scss';

const App = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('name');
  const [loading, setLoading] = useState(true); // État pour le chargement

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data.results);
        setFilteredGames(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Arrête le chargement une fois la récupération terminée
      }
    };

    getGames();
  }, []);

  useEffect(() => {
    const filtered = games.filter(game =>
      game.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedGames = filtered.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'release') {
        return new Date(b.released) - new Date(a.released);
      }
      return 0;
    });

    setFilteredGames(sortedGames);
  }, [searchTerm, sortOption, games]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) return <div>Chargement des jeux...</div>; // Indicateur de chargement
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Liste des Jeux</h1>
      <input
        type="text"
        placeholder="Rechercher un jeu..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Recherche de jeu"
      />
      <select value={sortOption} onChange={handleSortChange} aria-label="Trier les jeux">
        <option value="name">Trier par Nom</option>
        <option value="release">Trier par Date de Sortie</option>
      </select>
      <div className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <p>Aucun jeu trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default App;
