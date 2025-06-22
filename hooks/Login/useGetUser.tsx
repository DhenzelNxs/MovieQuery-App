import tmdbApi from "../../Services/tmdbApi";
import { useQuery } from "@tanstack/react-query";

type Request = {
    sessionId: string;
};

export const getUser = async ({ sessionId }: Request) => {
    try {
        const response = await tmdbApi.get('/account', {
            params: {
                session_id: sessionId,
            },
        });

        return response.data;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
    }
};

export const useGetUser = (sessionId: string | undefined) => {
    return useQuery({
        queryKey: ['get-user', sessionId],
        queryFn: () => getUser({ sessionId: sessionId! }),
        enabled: !!sessionId,
        staleTime: 1000 * 60 * 5,
    });
};
