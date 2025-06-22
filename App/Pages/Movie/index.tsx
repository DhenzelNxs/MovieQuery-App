import React, {useCallback, useRef} from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../index';
import {
    Container, CustomButton,
    MovieBackdrop, MovieDescription, MovieDescriptionContainer, MovieDescriptionPoster,
    MoviePosterImage,
    MovieTimeYear,
    MovieTitle,
    PlayMovieTrailerButton, TopContainer, TrailerButton, TrailerText, VideoWrapper,
} from './movie.style';
import Header from '../../../Components/Header/Header';
import { useGetMovie } from '../../../hooks/movie/useGetMovie';
import { BackButton } from '../../../Components/BackButton';
import { TmdbImagesUrl } from '../../../Enums/TmdbImagesBaseUrl';
import dayjs from 'dayjs';
import { formatDuration } from '../../../Utils/Formats';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { WebView } from 'react-native-webview';
import {ScrollView, Text, ActivityIndicator, View, Dimensions} from 'react-native';
import { useGetMovieCredits } from '../../../hooks/movie/useGetMovieCredits';
import AutoScrollCredits from './Components/AutoScrollCredits';
import { useGetMovieComments } from '../../../hooks/movie/useGetMovieComments';
import { FirstComment } from './Components/FirstComment';
import { CommentItem } from './Components/CommentItem';
import {useSerieById} from "../../../hooks/movie/useGetSerie";
import {useGetSerieCredits} from "../../../hooks/movie/useGetSerieCredits";
import {useGetSerieComments} from "../../../hooks/movie/useGetSerieComments";
import {Card, CardImage, CardOverlay, CardTitle} from "../Home/home.style";
import {Skeleton} from "../../../Components/Skeleton/Skeleton";
import Carousel from "react-native-reanimated-carousel";
import {ListMoviesTitle} from "../Home/Components/ListMoviesTitle";
import {Rating} from "./Components/Rating";
import {useFavoriteMovies} from "../../../Storage/Movie/useFavoriteMovies";
import Toast from 'react-native-toast-message';

const width = Dimensions.get('window').width;

type MovieRouteProp = RouteProp<RootStackParamList, 'Movie'>;

export default function Movie() {
    const carouselRef = useRef(null);
    const route = useRoute<MovieRouteProp>();
    const { id, type } = route.params;
    const navigation = useNavigation();

    const { favorites, addMovie, removeMovie, isFavorite } = useFavoriteMovies((state) => state)

    const { data: movie, isLoading: loadingMovie,  } = useGetMovie({ id, type });
    const { data: movieCredits, isLoading: loadingCredits } = useGetMovieCredits({ id, type });
    const { data: movieComments = [], isLoading: loadingComments } = useGetMovieComments({ id, type });

    const { data: serie = {}, isLoading: loadingSerie } = useSerieById({ id, type })
    const { data: serieCredits = {}, isLoading: loadingSerieCredits } = useGetSerieCredits({ id, type });
    const { data: serieComments = {}, isLoading: loadingSerieComments} = useGetSerieComments({ id, type });

    const [playingTrailerId, setPlayingTrailerId] = React.useState<string | null>(null);

    const trailerKey = movie?.trailerKey || serie?.trailerKey;

    const isLoading = loadingMovie || loadingCredits || loadingComments;

    const renderItem = (item: any) => {
        return (
            <>
                {
                    loadingSerie ? (
                            <Card>
                                <Skeleton />
                            </Card>
                        )
                        : <Card>

                            <CardImage
                                source={{ uri: `${TmdbImagesUrl.TMDB_IMAGES_URL}${item.poster_path}` }}
                                onError={() => console.error('erro ao carregar imagem')}
                            />
                            <CardOverlay />
                            <CardTitle numberOfLines={1}>{item.name}</CardTitle>

                        </Card>
                }
            </>

        );
    };

    console.log('favorites', favorites)

    const isFavoriteMovie = movie?.id || serie?.id ? isFavorite(movie?.id || serie?.id) : false
                                                                                                                                                                                                                                                                    
    const handleFavoriteMovie = () => {
        if (isFavoriteMovie)  {
            removeMovie(movie?.id || serie?.id);
            Toast.show({
                type: 'success',
                text1: `${movie?.title || serie?.name} desfavoritado!`,
                text2: 'A obra foi removida dos seus favoritos.'
            });
            return;
        }
        addMovie(movie || serie);

        Toast.show({
            type: 'success',
            text1: `${movie?.title || serie?.name} favoritado!`,
            text2: 'Confira sua lista de favoritos.'
        });
    }

    return (
        <Container>
            <BackButton navigation={navigation} />

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#784831" />
                    <Text style={{ marginTop: 12, fontSize: 16, color: '#784831' }}>
                        Buscando {type === 'movie' ? 'Filme' : 'Serie'}...
                    </Text>
                </View>
            ) : (
                <>
                    <TopContainer>
                        <View>
                            <MovieTitle>{movie?.title || serie?.name}</MovieTitle>
                            <MovieTimeYear>
                                { type === 'movie' ? 'Filme' : 'Serie' } |
                                {' '}{dayjs(movie?.release_date || serie?.first_air_date).year()} |
                                {' '}{type === 'movie' ? formatDuration(movie?.runtime) : serie?.seasons?.length === 1 ? '1 Temporada' : `${serie?.seasons?.length} Temporadas`}
                            </MovieTimeYear>
                        </View>
                        <CustomButton onPress={handleFavoriteMovie}>
                            {
                                isFavoriteMovie ? <MaterialIcons name={'bookmark'} size={30} color="#784831"/>
                                    : <Feather name={'bookmark'} size={28} color="#784831"/>
                            }
                        </CustomButton>
                    </TopContainer>

                    <ScrollView>

                        <MovieBackdrop>
                            {!playingTrailerId ? (
                                <>
                                    <MoviePosterImage
                                        source={{ uri: `${TmdbImagesUrl.TMDB_IMAGES_URL}${movie?.backdrop_path || serie?.backdrop_path }` }}
                                        resizeMode="cover"
                                    />
                                    {
                                        (movie?.trailerKey || serie?.trailerKey) && (
                                            <PlayMovieTrailerButton onPress={() => trailerKey && setPlayingTrailerId(trailerKey)}>
                                                <Feather name="play-circle" size={60} color="#fff" />
                                            </PlayMovieTrailerButton>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <VideoWrapper>
                                        <WebView
                                            source={{ uri: `https://www.youtube.com/embed/${playingTrailerId}?autoplay=1` }}
                                            style={{ flex: 1 }}
                                            javaScriptEnabled
                                            domStorageEnabled
                                        />
                                    </VideoWrapper>
                                    <TrailerButton onPress={() => setPlayingTrailerId(null)}>
                                        <Feather name="x" size={22} color="#fff" />
                                        <TrailerText>Fechar</TrailerText>
                                    </TrailerButton>
                                </>
                            )}
                        </MovieBackdrop>

                        <MovieDescriptionContainer>
                            <MovieDescriptionPoster
                                source={{ uri: `${TmdbImagesUrl.TMDB_IMAGES_URL}${movie?.poster_path || serie?.poster_path}` }}
                                resizeMode="cover"
                            />
                            <MovieDescription>{movie?.overview || serie?.overview}</MovieDescription>
                        </MovieDescriptionContainer>

                        <Rating rating={type === 'movie' ? movie.vote_average : serie.vote_average} />

                        { /* @ts-ignore */ }
                        <AutoScrollCredits credits={
                            type === 'movie' ? movieCredits : serieCredits
                        } />
                        {
                            type === 'serie' && (
                                <>
                                    <ListMoviesTitle
                                        title={`Esta serie possui ${serie?.seasons?.length} temporadas`}
                                    />
                                    <Carousel
                                        ref={carouselRef}
                                        data={serie?.seasons}
                                        width={width * 0.92}
                                        height={400}
                                        mode="parallax"
                                        modeConfig={{ parallaxScrollingOffset: 40, parallaxScrollingScale: 0.9 }}
                                        enabled={playingTrailerId === null}
                                        autoPlayInterval={3000}
                                        autoPlay={playingTrailerId === null}
                                        scrollAnimationDuration={1000}
                                        style={{ alignSelf: 'center' }}
                                        renderItem={({ item }) => renderItem(item)}
                                    />
                                </>
                            )
                        }

                        {
                            movieComments?.length && <FirstComment comment={
                                type === 'movie' ? movieComments[0] : serieComments[0]
                            } />
                        }

                        {movieComments[1] && movieComments.slice(1).map(comment => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}

                        {
                            serieComments[1] && movieComments.slice(1).map(comment => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))
                        }
                    </ScrollView>
                </>
            )}
        </Container>
    );
}
