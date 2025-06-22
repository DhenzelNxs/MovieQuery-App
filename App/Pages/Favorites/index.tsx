import React from 'react';
import { Feather } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

import {
    Container,
    HeaderContainer,
    Title,
    Card,
    Poster,
    InfoContainer,
    MovieTitle,
    MovieDate,
    RemoveButton
} from './favorites.style';

import { useFavoriteMovies } from '../../../Storage/Movie/useFavoriteMovies';

export default function Favorites() {
    const favorites = useFavoriteMovies((state) => state.favorites);
    const removeMovie = useFavoriteMovies((state) => state.removeMovie);

    console.log('favorites', favorites)

    return (
        <Container>
            <HeaderContainer>
                <Feather name="bookmark" size={30} color="#784831" />
                <Title>Favoritos</Title>
            </HeaderContainer>

            <FlashList
                data={favorites}
                estimatedItemSize={120}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <Card>
                        <Poster
                            source={{ uri: `https://image.tmdb.org/t/p/w154${item.poster_path}` }}
                            resizeMode="cover"
                        />
                        <InfoContainer>
                            <MovieTitle numberOfLines={2}>{item.title || item.name}</MovieTitle>
                            {(item.release_date || item.first_air_date) && (
                                <MovieDate>
                                    {new Date(item.release_date || item.first_air_date).getFullYear()}
                                </MovieDate>
                            )}
                        </InfoContainer>
                        <RemoveButton onPress={() => removeMovie(item.id)}>
                            <Feather name="x" size={20} color="#784831" />
                        </RemoveButton>
                    </Card>
                )}
            />
        </Container>
    );
}
