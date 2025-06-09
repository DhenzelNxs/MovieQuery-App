import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { TmdbImagesUrl } from '../../../../Enums/TmdbImagesBaseUrl';

type Person = {
    id: string;
    name: string;
    role: string;
    profile_path: string | null;
};

type Props = {
    credits: {
        director: string | null;
        writers: string[];
        cast: { name: string; character: string; profile_path: string | null }[];
    };
};

export default function AutoScrollCredits({ credits }: Props) {
    const flatListRef = useRef<FlatList>(null);

    const people: Person[] = [];
    if (credits.director) {
        people.push({ id: 'director', name: credits.director, role: 'Diretor(a)', profile_path: null });
    }
    credits?.writers?.forEach((w, i) =>
        people.push({ id: `writer-${i}`, name: w, role: 'Roteirista', profile_path: null }),
    );
    credits?.cast?.forEach((c, i) =>
        people.push({ id: `cast-${i}`, name: c.name, role: c.character, profile_path: c.profile_path }),
    );

    const loopData = [...people, ...people];

    const ITEM_WIDTH = 112;
    useEffect(() => {
        if (!flatListRef.current || !people.length) return;

        let offset = 0;
        const interval = setInterval(() => {
            offset += 1;
            flatListRef.current?.scrollToOffset({ offset, animated: false });

            if (offset >= people.length * ITEM_WIDTH) {
                offset = 0;
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            }
        }, 25);

        return () => clearInterval(interval);
    }, [people.length]);

    if (!people.length) return null;

    return (
        <ScrollContainer>
            <FlatList
                ref={flatListRef}
                data={loopData}
                keyExtractor={(item, idx) => `${item.id}-${idx}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <PersonCard person={item} />}
                scrollEnabled={false}
                contentContainerStyle={{ paddingRight: 24 }}
            />
        </ScrollContainer>
    );
}

const ScrollContainer = styled.View`
    margin: 24px 0 32px 16px;
`;

const Card = styled.View`
  width: 100px;
  margin-right: 12px;
  align-items: center;
`;

const Photo = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background: #444;
`;

const NoPhoto = styled.View`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background-color: #666;
    align-items: center;
    justify-content: center;
`;

const Name = styled.Text`
    font-size: 13px;
    color: #784831;
    font-weight: bold;
    text-align: center;
    margin-top: 6px;
`;

const Role = styled.Text`
    font-size: 11px;
    color: #784831;
    text-align: center;
`;

const PersonCard = ({ person }: { person: Person }) => {
    const imgUri = person.profile_path
        ? `${TmdbImagesUrl.TMDB_IMAGES_URL}${person.profile_path}`
        : null;

    return (
        <Card>
            {imgUri ? (
                <Photo source={{ uri: imgUri }} />
            ) : (
                <NoPhoto>
                    <Feather name="user" size={28} color="#ccc" />
                </NoPhoto>
            )}
            <Name numberOfLines={2}>{person.name}</Name>
            <Role numberOfLines={1}>{person.role}</Role>
        </Card>
    );
};
