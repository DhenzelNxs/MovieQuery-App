import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StarRating } from './StarRating';
import {convertRate10to5} from "../../../../Utils/Converters";

dayjs.extend(relativeTime);

type Comment = {
    id: string | number;
    user: {
        name: string;
        avatar_url: string;
    };
    rating: number;
    created_at: string;
    comment: string;
};

type CommentItemProps = {
    comment: Comment;
};

export const CommentItem = ({ comment }: CommentItemProps) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: comment.user?.avatar_url }} style={styles.avatar} />

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <StarRating rating={convertRate10to5(comment?.rating)} size={16} />
                    <Text style={styles.userName}>{comment.user?.name}</Text>
                    <Text style={styles.timeAgo}>{dayjs(comment?.created_at).fromNow()}</Text>
                </View>

                <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 10,
        backgroundColor: '#ccc',
    },
    content: {
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    userName: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    timeAgo: {
        color: '#666',
        fontSize: 12,
    },
    commentText: {
        fontSize: 14,
        color: '#333',
    },
});
