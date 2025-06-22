import React, {useEffect} from 'react';
import { Linking } from 'react-native';
import {
    AppLogo,
    AppLogoContainer,
    LoginContainer,
    Container,
    InfoText,
    TmdbButton,
    TmdbButtonText,
    TmdbLogo,
} from './login.style';
import { WaveBackground } from '../../../Public/Svg/WaveBackground';
import {useRequestToken} from "../../../hooks/Login/useRequestToken";
import Toast from 'react-native-toast-message';
import {useCreateSession} from "../../../hooks/Login/useCreateSession";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUserStore} from "../../../Storage/User/useUser";
import {getUser, useGetUser} from "../../../hooks/Login/useGetUser";
import {LoadingBackdrop} from "../../../Components/LoadingBackdrop";

export default function Login() {

    const { mutateAsync: requestToken, isPending: loadingRequestToken } = useRequestToken();
    const { mutateAsync: createSession, isPending: loadingCreateSession } = useCreateSession()

    const { setUser, loadUserFromStorage } = useUserStore((state) => state)

    const loading = loadingRequestToken || loadingCreateSession;

    const handleLoginWithTmdb = async () => {
        try {
            const response = await requestToken()
            const token = response.request_token || ''
            const redirectUrl = `https://www.themoviedb.org/authenticate/${token}?redirect_to=moviequery-app://callback`;
            Linking.openURL(redirectUrl);
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer autenticação',
                text2: err?.message || 'Ocorreu um erro inesperado ao tentar fazer sua autenticação!'
            });
        }

    };

    useEffect(() => {
        const handleUrl = async (event: { url: string }) => {
            const url = event.url;

            try {
                const parsedUrl = new URL(url);
                const token = parsedUrl.searchParams.get('request_token');

                if (token) {
                    const session = await createSession({ request_token: token })
                    const user = await getUser({ sessionId: session.session_id})
                    setUser(user);
                }

            } catch (error) {
                console.error('Erro ao parsear URL:', error);
            }
        };

        const linkingListener = Linking.addEventListener('url', handleUrl);

        Linking.getInitialURL().then((url) => {
            if (url) handleUrl({ url });
        });

        return () => {
            linkingListener.remove();
        };
    }, []);

    useEffect(() => {
        loadUserFromStorage().then();
    }, []);

    return (
        <Container>
            <WaveBackground />
            <LoginContainer>
                <AppLogoContainer>
                    <AppLogo source={require('../../../Public/Images/AppLogo.png')} />
                </AppLogoContainer>

                <InfoText>
                    Para continuar, faça login com sua conta TMDb
                </InfoText>

                <TmdbButton onPress={handleLoginWithTmdb}>
                    <TmdbLogo source={{ uri: 'https://play-lh.googleusercontent.com/VgyD9nxsxISYNjNdGMq3ClUVLrKoMSWdwNHHqGSfFaiR4HMaPf6zOvqQfaD6eQ8P3x4' }} />
                    <TmdbButtonText>Entrar com TMDb</TmdbButtonText>
                </TmdbButton>
            </LoginContainer>

            <LoadingBackdrop visible={loading} />
        </Container>
    );
}
