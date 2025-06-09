import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

type Request = {
    id: string;
    type?: string;
};

type SerieCreditsResponse = {
    creators: string[];
    writers: string[];
    directors: string[] | unknown[];
    cast: {
        name: string;
        character: string;
        profile_path: string | null;
    }[];
};

const getSerieCredits = async ({ id }: Request): Promise<SerieCreditsResponse> => {
    try {
        const response = await tmdbApi.get(`/tv/${id}/credits`);
        const data = response.data;

        const creators = data.crew
            .filter((m: any) => m.job === 'Creator')
            .map((m: any) => m.name);

        const writers = data.crew
            .filter((m: any) => ['Writer', 'Screenplay', 'Story'].includes(m.job))
            .map((m: any) => m.name);

        const directors = [
            ...new Set(
                data.crew
                    .filter((m: any) => m.job === 'Director')
                    .map((m: any) => m.name)
            ),
        ].slice(0, 5);

        const cast = data.cast.slice(0, 10).map((actor: any) => ({
            name: actor.name,
            character: actor.character,
            profile_path: actor.profile_path || null,
        }));

        return { creators, writers, directors, cast };
    } catch (error) {
        console.error(error);
        return { creators: [], writers: [], directors: [], cast: [] };
    }
};

export const useGetSerieCredits = ({ id, type }: Request) =>
    useQuery({
        queryKey: ['serie-credits', id],
        queryFn: () => getSerieCredits({ id }),
        enabled: !!id && type === 'serie',
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: true,
    });
