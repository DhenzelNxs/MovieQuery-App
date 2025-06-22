import tmdbApi from "../../Services/tmdbApi";
import {useMutation} from "@tanstack/react-query";

type Payload = {
    request_token: string;
}

const createSession = async ({
    request_token
 }: Payload) => {
    try {
        const response = await tmdbApi.post('/authentication/session/new', {
            request_token,
        })

        return response.data;
    } catch (err) {
        throw new Error(err)
    }
}

export const useCreateSession = () => {
    return useMutation({
        mutationKey: ['create-session'],
        mutationFn: ({ request_token }: Payload) => createSession({ request_token }),
    })
}