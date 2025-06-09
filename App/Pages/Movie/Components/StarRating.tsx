import React from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type StarRatingProps = {
    rating: number;
    size?: number;
};

export const StarRating = ({ rating, size = 50 }: StarRatingProps) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 }}>
            {[1, 2, 3, 4, 5].map((i) => {
                if (i <= Math.floor(rating)) {
                    return <MaterialIcons key={i} name="star" size={size} color="#C8AE3A" />;
                }
                if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
                    return <MaterialIcons key={i} name="star-half" size={size} color="#C8AE3A" />;
                }
                return <MaterialIcons key={i} name="star-border" size={size} color="#ccc" />;
            })}
        </View>
    );
};
