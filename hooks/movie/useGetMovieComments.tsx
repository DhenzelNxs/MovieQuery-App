import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

type Request = {
    id: string;
    type?: string;
}

const getMovieComments = async ({
                            id
                        }: Request) => {
    try {
        const response = await tmdbApi.get(`/movie/${id}/reviews`);

        return response.data?.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useGetMovieComments = ({
                                id,
                                type
                            }: Request) =>
    useQuery({
        queryKey: ['movie-comments', id],
        queryFn: () => getMovieComments({ id }),
        staleTime: 1000 * 60 * 10,
        enabled: !!id && type === 'movie',
        refetchOnWindowFocus: true,
    });
