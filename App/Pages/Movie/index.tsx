import React, {useRef} from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../index';
import {
    Container,
    MovieBackdrop, MovieDescription, MovieDescriptionContainer, MovieDescriptionPoster,
    MoviePosterImage,
    MovieTimeYear,
    MovieTitle,
    PlayMovieTrailerButton, TrailerButton, TrailerText, VideoWrapper,
} from './movie.style';
import Header from '../../../Components/Header/Header';
import { useGetMovie } from '../../../hooks/movie/useGetMovie';
import { BackButton } from '../../../Components/BackButton';
import { TmdbImagesUrl } from '../../../Enums/TmdbImagesBaseUrl';
import dayjs from 'dayjs';
import { formatDuration } from '../../../Utils/Formats';
import Feather from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';
import {ScrollView, Text, ActivityIndicator, View, Dimensions} from 'react-native';
import { useGetMovieCredits } from '../../../hooks/movie/useGetMovieCredits';
import AutoScrollCredits from './Components/AutoScrollCredits';
import { useGetMovieComments } from '../../../hooks/movie/useGetMovieComments';
import { FirstComment } from './Components/FirstComment';
import { StarRating } from './Components/StarRating';
import { convertRate10to5 } from '../../../Utils/Converters';
import { CommentItem } from './Components/CommentItem';
import {useSerieById} from "../../../hooks/movie/useGetSerie";
import {useGetSerieCredits} from "../../../hooks/movie/useGetSerieCredits";
import {useGetSerieComments} from "../../../hooks/movie/useGetSerieComments";
import {Card, CardImage, CardOverlay, CardTitle} from "../Home/home.style";
import {Skeleton} from "../../../Components/Skeleton/Skeleton";
import Carousel from "react-native-reanimated-carousel";
import {ListMoviesTitle} from "../Home/Components/ListMoviesTitle";

const width = Dimensions.get('window').width;

type MovieRouteProp = RouteProp<RootStackParamList, 'Movie'>;

export default function Movie() {
    const carouselRef = useRef(null);
    const route = useRoute<MovieRouteProp>();
    const { id, type } = route.params;
    const navigation = useNavigation();

    const { data: movie, isLoading: loadingMovie,  } = useGetMovie({ id, type });
    const { data: movieCredits, isLoading: loadingCredits } = useGetMovieCredits({ id, type });
    const { data: movieComments = [], isLoading: loadingComments } = useGetMovieComments({ id, type });

    const { data: serie = {}, isLoading: loadingSerie } = useSerieById({ id, type })
    const { data: serieCredits = {}, isLoading: loadingSerieCredits } = useGetSerieCredits({ id, type });
    const { data: serieComments = {}, isLoading: loadingSerieComments} = useGetSerieComments({ id, type });
    console.log('serieCredits', serie);

    const [playingTrailerId, setPlayingTrailerId] = React.useState<string | null>(null);

    const trailerKey = movie?.trailerKey || serie?.trailerKey;

    const isLoading = loadingMovie || loadingCredits || loadingComments;

    const renderItem = (item: any) => {
        const isPlaying = playingTrailerId === item.id;
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

    // @ts-ignore
    return (
        <Container>
            <Header
                title="MovieQuery"
                backgroundColor="#000"
                leftIcon="menu"
                color="#BDB29C"
                rightIcon="user"
                titleLeftIcon="search"
            />

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
                    <MovieTitle>{movie?.title || serie?.name}</MovieTitle>
                    <MovieTimeYear>
                        { type === 'movie' ? 'Filme' : 'Serie' } |
                        {' '}{dayjs(movie?.release_date || serie?.first_air_date).year()} |
                        {' '}{type === 'movie' ? formatDuration(movie?.runtime) : serie?.seasons?.length === 1 ? '1 Temporada' : `${serie?.seasons?.length} Temporadas`}
                    </MovieTimeYear>

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


                        {movie?.vote_average != null && (
                            <StarRating rating={convertRate10to5(
                                type === 'movie' ? movie.vote_average : serie.vote_average
                            )} />
                        )}

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
