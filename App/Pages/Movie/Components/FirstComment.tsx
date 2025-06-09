import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styled from 'styled-components/native';
import dayjs from 'dayjs';
import Feather from "react-native-vector-icons/Feather";

type Comment = {
    author: string;
    content: string;
    created_at: string;
    author_details: {
        avatar_path: string | null;
        name: string;
        username: string;
    };
    url: string;
};

export const FirstComment = ({ comment }: { comment: Comment }) => {
    const [showFullText, setShowFullText] = useState(false);
    const MAX_LENGTH = 500;

    let avatarUri = comment?.author_details?.avatar_path;
    if (avatarUri) {
        if (avatarUri.startsWith('/https')) {
            avatarUri = avatarUri.substring(1);
        } else {
            avatarUri = `https://www.themoviedb.org/t/p/w64_and_h64_face${avatarUri}`;
        }
    }

    const handleOpenURL = () => {
        if (comment.url) {
            Linking.openURL(comment?.url);
        }
    };

    const isTextLong = comment?.content.length > MAX_LENGTH;
    const displayedText = showFullText ? comment?.content : comment?.content.slice(0, MAX_LENGTH) + (isTextLong ? '...' : '');

    return (
        <CommentContainer>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {
                    avatarUri ? (
                        <Avatar source={{ uri: avatarUri }} />
                    ) : (
                        <NoPhoto>
                            <Feather name="user" size={28} color="#ccc" />
                        </NoPhoto>
                    )
                }
                <View>
                    <AuthorName>{comment?.author_details.name || comment?.author_details.username || comment?.author}</AuthorName>
                    <CommentDate>{dayjs(comment?.created_at).format('DD/MM/YYYY HH:mm')}</CommentDate>
                </View>
            </View>
            <CommentInfo>
                <CommentText>{displayedText}</CommentText>
                {isTextLong && !showFullText && (
                    <TouchableOpacity onPress={handleOpenURL}>
                        <SeeMoreText>Ver mais</SeeMoreText>
                    </TouchableOpacity>
                )}
            </CommentInfo>
        </CommentContainer>
    );
};

const CommentContainer = styled.View`
    flex-direction: column;
    margin: 20px 16px 0 16px;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: #666;
`;

const CommentInfo = styled.View`
    margin-left: 12px;
`;

const AuthorName = styled.Text`
    font-weight: bold;
    font-size: 14px;
    color: #333;
`;

const CommentDate = styled.Text`
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
`;

const CommentText = styled.Text`
    font-size: 14px;
    color: #444;
`;

const SeeMoreText = styled.Text`
    color: #1e90ff;
    margin-top: 6px;
    font-weight: bold;
`;

const NoPhoto = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #666;
  align-items: center;
  justify-content: center;
`;
