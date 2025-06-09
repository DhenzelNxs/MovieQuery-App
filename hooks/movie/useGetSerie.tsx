import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

type Response = {
    id: string;
    type?: string;
}

const getSerieById = async ({
    id
                            }: Response) => {
    try {
        const serieResponse = await tmdbApi.get(`/tv/${id}`);
        const serie = serieResponse.data;

        const videosResponse = await tmdbApi.get(`/tv/${id}/videos`);
        const videos = videosResponse.data?.results || [];

        const trailer = videos.find(
            (video: any) =>
                video.type === 'Trailer' &&
                video.site === 'YouTube'
        );

        return {
            ...serie,
            trailerKey: trailer?.key || null,
        };
    } catch (error) {
        console.error(`Erro ao buscar série ${id}:`, error);
        throw error;
    }
};

export const useSerieById = ({
    id,
    type
                             }: Response) =>
    useQuery({
        queryKey: ['serie', id],
        queryFn: () => getSerieById({ id }),
        enabled: !!id && type === 'serie',
        staleTime: 1000 * 60 * 10,
    });
