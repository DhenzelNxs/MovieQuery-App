import styled from 'styled-components/native';

interface ListMoviesTitleProps {
    title: string;
}

export const ListMoviesTitle = ({
    title
                                }: ListMoviesTitleProps) => {
    return (
        <Container>
            <TitleMarker />
            <Title>{title}</Title>
        </Container>
    )
}

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding-left: 12px;
    padding-top: 12px;
`

const TitleMarker = styled.View`
    background-color: #784831;
    width: 10px;
    height: 40px;
`

const Title = styled.Text`
    color: #784831;
`
