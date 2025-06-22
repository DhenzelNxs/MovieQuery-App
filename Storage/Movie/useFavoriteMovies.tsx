    import { create } from 'zustand';
    import { persist, StorageValue } from 'zustand/middleware';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    type FavoriteMoviesState = {
        favorites: any[];
        addMovie: (movie: any) => void;
        removeMovie: (movieId: string) => void;
        isFavorite: (movieId: string) => boolean;
    };

    export const useFavoriteMovies = create<FavoriteMoviesState>()(
        persist(
            (set, get) => ({
                favorites: [],

                addMovie: (movie) => {
                    const exists = get().favorites.find((m) => m.id === movie.id);
                    if (!exists) {
                        set((state) => ({
                            favorites: [...state.favorites, movie],
                        }));
                    }
                },

                removeMovie: (movieId) => {
                    set((state) => ({
                        favorites: state.favorites.filter((m) => m.id !== movieId),
                    }));
                },

                isFavorite: (movieId) => {
                    return get().favorites.some((m) => m.id === movieId);
                },
            }),
            {
                name: 'favorite-movies-storage',
                storage: {
                    getItem: async (name): Promise<StorageValue<FavoriteMoviesState> | null> => {
                        const value = await AsyncStorage.getItem(name);
                        return value ? JSON.parse(value) : null;
                    },
                    setItem: async (name, value) => {
                        await AsyncStorage.setItem(name, JSON.stringify(value));
                    },
                    removeItem: async (name) => {
                        await AsyncStorage.removeItem(name);
                    },
                },
            }
        )
    );
