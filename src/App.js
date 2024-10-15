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
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data.results);
        setFilteredGames(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getGames();
  }, []);

  useEffect(() => {
    const filtered = games.filter(game =>
      game.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedGames = filtered.sort((a, b) => {
      return sortOption === 'name' ? a.name.localeCompare(b.name) : new Date(b.released) - new Date(a.released);
    });
    setFilteredGames(sortedGames);
  }, [searchTerm, sortOption, games]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleShowMoreGames = () => {
    setVisibleCount(prevCount => prevCount + 9);
  };

  if (loading) return <div>Chargement des jeux...</div>;
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
        {filteredGames.slice(0, visibleCount).map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {filteredGames.length > visibleCount && (
        <button onClick={handleShowMoreGames} className="show-more">
          Show More
        </button>
      )}
    </div>
  );
};

export default App;
