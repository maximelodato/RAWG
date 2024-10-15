// src/utils/api.js

import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY; // Utilise ta clé API

// Fonction pour récupérer la liste des jeux avec pagination
export const fetchGames = async (page = 1) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
        return response.data; // Renvoie les données de l'API
    } catch (error) {
        console.error('Erreur lors de la récupération des jeux :', error); // Log l'erreur
        throw error; // Relève l'erreur pour que l'appelant puisse la gérer
    }
};

// Fonction pour récupérer les détails d'un jeu spécifique par son slug
export const fetchGameDetails = async (slug) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`);
        return response.data; // Renvoie les données de l'API
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du jeu :', error); // Log l'erreur
        throw error; // Relève l'erreur pour que l'appelant puisse la gérer
    }
};
