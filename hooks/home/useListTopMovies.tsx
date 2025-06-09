import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

const getTopMovies = async () => {
    try {
        const response = await tmdbApi.get('/movie/popular');
        const results = response.data?.results?.slice(0, 10) || [];

        return results.map((movie: any) => ({
            ...movie,
            type: 'movie',
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useListTopMovies = () =>
    useQuery({
        queryKey: ['top-movies'],
        queryFn: getTopMovies,
        staleTime: 1000 * 60 * 10,
    });
