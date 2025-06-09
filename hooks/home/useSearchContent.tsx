import tmdbApi from "../../Services/tmdbApi";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

type Payload = {
    query: string
}

const searchContent = async ({
    query
                             }: Payload) => {
    try {
        const response = await tmdbApi.get('/search/multi', {
            params: {
                query
            }
        })

        return response.data?.results || [];
    } catch (err) {
        console.error(err.message);
    }
}

export const useSearchContent = ({ query }: Payload) => {
    return useQuery({
        queryKey: ['search-content', query],
        queryFn: () => searchContent({ query }),
        enabled: !!query,
        //@ts-ignore
        keepPreviousData: true
    });
};