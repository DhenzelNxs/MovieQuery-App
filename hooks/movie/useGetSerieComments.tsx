import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

type Request = {
    id: string;
    type?: string;
};

const getSerieComments = async ({ id }: Request) => {
    try {
        const response = await tmdbApi.get(`/tv/${id}/reviews`);
        return response.data?.results || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useGetSerieComments = ({ id, type }: Request) =>
    useQuery({
        queryKey: ['serie-comments', id],
        queryFn: () => getSerieComments({ id }),
        staleTime: 1000 * 60 * 10,
        enabled: !!id && type === 'serie',
        refetchOnWindowFocus: true,
    });
