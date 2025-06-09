import React, { useState, useRef, useEffect } from 'react';
import {Dimensions, Linking, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';

import {
    Card,
    CardImage,
    CardOverlay,
    CardTitle,
    Container,
    SearchMovieInput,
    SmallCard,
    SmallCardImage,
    SmallCardTitle,
    TrailerButton,
    TrailerText,
} from './home.style';

import Header from '../../../Components/Header/Header';
import { useListUpcomingMovies } from '../../../hooks/home/useListUpcomingMovies';
import { useListTopMovies } from '../../../hooks/home/useListTopMovies';
import { useListTopSeries } from '../../../hooks/home/useListTopSeries';
import { useListTopRatedMovies } from '../../../hooks/home/useListTopRatedMovies';
import { useSearchContent } from '../../../hooks/home/useSearchContent';
import { TmdbImagesUrl } from '../../../Enums/TmdbImagesBaseUrl';
import { useDebounce } from '../../../Utils/Debounce';
import { Skeleton } from '../../../Components/Skeleton/Skeleton';
import { ListMoviesTitle } from './Components/ListMoviesTitle';

import styled from 'styled-components/native';
import { RootStackParamList } from '../../index';
import {SearchListContainer, SearchListItem, SearchListText} from "../Movie/movie.style";

const width = Dimensions.get('window').width;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const carouselRef = useRef(null);
    const router = useRouter();

    const [playingTrailerId, setPlayingTrailerId] = useState<number | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const debouncedSearch = useDebounce(search, 500);

    const { data: upcoming = [], isLoading: isLoadingUpcomingMovies } = useListUpcomingMovies();
    const { data: topMovies = [], isLoading: isLoadingTopMovies } = useListTopMovies();
    const { data: topSeries = [], isLoading: isLoadingTopSeries } = useListTopSeries();
    const { data: topRatedMovies, isLoading: isLoadingTopRatedMovies } = useListTopRatedMovies();
    const { data: searchResults = [] } = useSearchContent({ query: debouncedSearch });

    const goToMovieDetail = (id: string, type: 'movie' | 'serie') => {
        navigation.navigate('Movie', { id, type });
    };

    useEffect(() => {
        if (playingTrailerId === null) {
            carouselRef.current?.startAutoPlay?.();
        } else {
            carouselRef.current?.stopAutoPlay?.();
        }
    }, [playingTrailerId]);

    const renderItem = (item: any) => {
        const isPlaying = playingTrailerId === item.id;

        return (
            <Card>
                {isPlaying ? (
                    <>
                        <WebView
                            style={{ width: '100%', height: '100%' }}
                            javaScriptEnabled
                            domStorageEnabled
                            source={{ uri: `https://www.youtube.com/embed/${item.trailerKey}?autoplay=1` }}
                        />
                        <TrailerButton
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                            }}
                            onPress={() => setPlayingTrailerId(null)}
                        >
                            <Feather name="x" size={22} color="#fff" />
                            <TrailerText>Fechar</TrailerText>
                        </TrailerButton>
                    </>
                ) : (
                    <>
                        <CardImage source={{ uri: `${TmdbImagesUrl.TMDB_IMAGES_URL}${item.poster_path}` }} />
                        <CardOverlay />
                        {item.trailerKey && (
                            <TrailerButton onPress={() => setPlayingTrailerId(item.id)}>
                                <Feather name="play" size={22} color="#fff" />
                                <TrailerText>Ver trailer</TrailerText>
                            </TrailerButton>
                        )}
                        <CardTitle numberOfLines={1}>{item.title}</CardTitle>
                    </>
                )}
            </Card>
        );
    };

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

            <ScrollView>
                <SearchMovieInput
                    placeholder="Pesquise por um filme, uma série ou uma pessoa"
                    placeholderTextColor="#888"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />

                <SearchResultsList
                    //@ts-ignore
                    results={searchResults}
                    onSelect={(item) => {
                        setSearch('');
                        if (item.media_type === 'person') {
                            const url = `https://www.themoviedb.org/person/${item.id}`;
                            Linking.openURL(url).catch(err => console.error('Erro ao abrir URL:', err));
                        } else {
                            goToMovieDetail(item.id.toString(), item.media_type === 'tv' ? 'serie' : 'movie');
                        }
                    }}
                />

                <Carousel
                    ref={carouselRef}
                    data={upcoming}
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

                <ListMoviesTitle title="Top 10 filmes no MovieQuery essa semana" />
                <MoviesList data={topMovies} isLoading={isLoadingTopMovies} onCardPress={goToMovieDetail} />

                <ListMoviesTitle title="Top 10 séries no MovieQuery essa semana" />
                <MoviesList data={topSeries} isLoading={isLoadingTopSeries} onCardPress={goToMovieDetail} />

                <ListMoviesTitle title="Interesses populares" />
                <MoviesList data={topRatedMovies} isLoading={isLoadingTopRatedMovies} />
            </ScrollView>
        </Container>
    );
}

const SearchResultsList = ({ results, onSelect }: {
    results: any[],
    onSelect: (item: any) => void
}) => {
    if (!results?.length) return null;

    return (
        <SearchListContainer>
            {results.slice(0, 6).map((item) => (
                <SearchListItem key={item.id} onPress={() => onSelect(item)}>
                    <SearchListText>
                        {item.title || item.name || item.original_name}
                        {item.media_type === 'person' && ' (Pessoa)'}
                    </SearchListText>
                </SearchListItem>
            ))}
        </SearchListContainer>
    );
};

const MoviesList = ({ data, isLoading = false, onCardPress = (id: string, type: 'movie' | 'serie') => {} }) => {
    if (isLoading) {
        return (
            <FlashList
                horizontal
                data={[...Array(5).keys()]}
                keyExtractor={(item) => item.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
                renderItem={() => (
                    <SmallCard activeOpacity={0.8}>
                        <Skeleton />
                    </SmallCard>
                )}
                estimatedItemSize={150}
            />
        );
    }

    return (
        <FlashList
            horizontal
            data={data as any as { id: string, name: string, title: string, type: 'movie' | 'serie', poster_path: string}[]}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
            renderItem={({ item }) => (
                <SmallCard activeOpacity={0.8} onPress={() => onCardPress(item.id, item.type)}>
                    <SmallCardImage
                        source={{ uri: `${TmdbImagesUrl.TMDB_IMAGES_URL}${item.poster_path}` }}
                        resizeMode="cover"
                    />
                    <SmallCardTitle numberOfLines={2}>{item.title || item.name}</SmallCardTitle>
                </SmallCard>
            )}
            estimatedItemSize={150}
        />
    );
};