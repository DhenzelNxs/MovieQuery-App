import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

const getTopSeries = async () => {
    try {
        const response = await tmdbApi.get('/trending/tv/week');
        const results = response.data?.results?.slice(0, 10) || [];

        return results.map((serie: any) => ({
            ...serie,
            type: 'serie',
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useListTopSeries = () =>
    useQuery({
        queryKey: ['top-series'],
        queryFn: getTopSeries,
        staleTime: 1000 * 60 * 10,
    });
