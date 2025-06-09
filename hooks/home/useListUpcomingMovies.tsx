// hooks/home/useListUpcomingMovies.ts
import { useQuery } from '@tanstack/react-query';
import tmdbApi from "../../Services/tmdbApi";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    trailerUrl: string | null;
};

const getUpcomingMovies = async () => {
    const response = await tmdbApi.get('/movie/upcoming');
    const movies = response.data?.results;

    const moviesWithTrailers = await Promise.all(
        movies.map(async (movie) => {
            try {
                const videoRes = await tmdbApi.get(`/movie/${movie.id}/videos`);
                const trailer = videoRes.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

                return {
                    ...movie,
                    trailerKey: trailer?.key || null,
                };
            } catch {
                return { ...movie, trailerKey: null };
            }
        })
    );

    return moviesWithTrailers;
};


export const useListUpcomingMovies = () =>
    useQuery({
        queryKey: ['upcoming-movies-with-trailer'],
        queryFn: getUpcomingMovies,
        staleTime: 1000 * 60 * 10,
    });
