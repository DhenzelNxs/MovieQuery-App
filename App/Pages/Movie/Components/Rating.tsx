import React from "react";
import styled from "styled-components/native";
import { convertRate10to5 } from "../../../../Utils/Converters";
import { StarRating } from "./StarRating";
import {RatingProgress} from "../../../../Components/ProgressCircle";

interface RatingProps {
    rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
    const ratingInFiveStars = Number(convertRate10to5(rating || 0).toFixed(2));

    return (
        <Container>
            <RatingProgress value={ratingInFiveStars} max={5} />
            <StarRating rating={ratingInFiveStars} size={30} />
        </Container>
    );
};

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 20px 20px 20px 20px;
    padding: 10px;
    border-radius: 20px;
    background-color: #ECDEC3;
    border: 1px;
    border-color: rgba(200, 174, 58, 0.5);
    elevation: 4;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
`;

const RatingNumber = styled.Text`
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: #333;
`;
