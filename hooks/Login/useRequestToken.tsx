import tmdbApi from "../../Services/tmdbApi";
import {useMutation, useQuery} from "@tanstack/react-query";

const requestToken = async () => {
    try {
        const response = await tmdbApi.get('/authentication/token/new')

        return response.data
    } catch (err) {
        console.error(err);
    }
}

export const useRequestToken = () => {
    return useMutation({
        mutationKey: ['request-token'],
        mutationFn: requestToken,
    });
};