import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../../Services/tmdbApi';

type Request = {
    id: string;
    type?: string;
};

type CreditsResponse = {
    director: string | null;
    writers: string[];
    cast: {
        name: string;
        character: string;
        profile_path: string | null;
    }[];
};

const getMovieCredits = async ({ id }: Request): Promise<CreditsResponse> => {
    try {
        const response = await tmdbApi.get(`/movie/${id}/credits`);
        const data = response.data;

        const director = data.crew.find((member: any) => member.job === 'Director')?.name || null;

        const writers = data.crew
            .filter((member: any) => ['Writer', 'Screenplay', 'Story'].includes(member.job))
            .map((writer: any) => writer.name);

        const cast = data.cast.slice(0, 10).map((actor: any) => ({
            name: actor.name,
            character: actor.character,
            profile_path: actor.profile_path || null,
        }));

        return {
            director,
            writers,
            cast,
        };
    } catch (error) {
        console.error(error);
        return {
            director: null,
            writers: [],
            cast: [],
        };
    }
};

export const useGetMovieCredits = ({ id, type }: Request) =>
    useQuery({
        queryKey: ['movie-credits', id],
        queryFn: () => getMovieCredits({ id }),
        staleTime: 1000 * 60 * 10,
        enabled: !!id && type === 'movie',
        refetchOnWindowFocus: true,
    });
