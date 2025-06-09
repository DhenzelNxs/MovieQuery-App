import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

type Request = {
    id: string;
    type?: string;
}

const getMovie = async ({
    id
                            }: Request) => {
    try {
        const response = await tmdbApi.get(`/movie/${id}`);
        const movie = response.data;

        const videoRes = await tmdbApi.get(`/movie/${movie.id}/videos`);
        const trailer = videoRes.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

        return {
            ...movie,
            trailerKey: trailer?.key || null,
        };
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useGetMovie = ({
    id,
    type
                                 }: Request) =>
    useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovie({ id }),
        staleTime: 1000 * 60 * 10,
        enabled: !!id && type === 'movie',
        refetchOnWindowFocus: true,
    });
