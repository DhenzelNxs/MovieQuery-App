import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmdb: {
            avatar_path: string | null;
        };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
};

type UserStore = {
    user: User | null;
    setUser: (user: User) => Promise<void>;
    logout: () => Promise<void>;
    loadUserFromStorage: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,

    setUser: async (user) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            set({ user });
        } catch (error) {
            console.error('Erro ao salvar usuário no AsyncStorage:', error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem('user');
            set({ user: null });
        } catch (error) {
            console.error('Erro ao remover usuário do AsyncStorage:', error);
        }
    },

    loadUserFromStorage: async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                set({ user: JSON.parse(storedUser) });
            }
        } catch (error) {
            console.error('Erro ao carregar usuário do AsyncStorage:', error);
        }
    },
}));
