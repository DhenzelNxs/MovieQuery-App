// services/api.ts
import axios from 'axios';
import { TMDB_API_KEY } from '@env';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json',
    },
});

tmdbApi.interceptors.request.use((config) => {
    const apiKey = TMDB_API_KEY;
    config.params = {
        ...config.params,
        api_key: apiKey,
        language: 'pt-BR',
    };
    return config;
});

export default tmdbApi;
