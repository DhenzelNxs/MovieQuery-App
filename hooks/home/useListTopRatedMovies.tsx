import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

const getTopRatedMovies = async () => {
    try {
        const response = await tmdbApi.get('/movie/top_rated');
        return response.data?.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useListTopRatedMovies = () =>
    useQuery({
        queryKey: ['top-rated-movies'],
        queryFn: getTopRatedMovies,
        staleTime: 1000 * 60 * 10,
    });
