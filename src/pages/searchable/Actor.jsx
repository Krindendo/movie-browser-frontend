import styled from "styled-components";
import useGetActor from "hooks/actorService/useGetActor";
import Layout from "layout/Layout";
import { useParams } from "react-router-dom";
import ListOfMovies from "components/ListOfMovies";
import Loading from "pages/public/Loading";

export default function Actor() {
  const { actorId } = useParams();
  const { isLoading, error, data: actor, isFetching } = useGetActor({ actorId });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container>
        <Content>
          <TopSection>
            <div style={{ marginLeft: "20px" }}>
              <Name>{actor.name}</Name>
              <Date>Rodjen: {actor.dateFormated}</Date>
              <Wrapper>
                <p>Zanimanje:</p>
                <List>
                  {actor.professions.map((profession, i) => (
                    <li key={i}>
                      <p>{profession}</p>
                    </li>
                  ))}
                </List>
              </Wrapper>
            </div>
          </TopSection>

          <MiddleSection>
            <ImageBiography src={actor.image} alt={actor.name} height="280px" />
            <Biography>{actor.biography}</Biography>
          </MiddleSection>

          <BottomSection>
            <h4>Uloge u filmovima: </h4>
            <FilmContainer>
              <ListOfMovies movies={actor.movies} />
            </FilmContainer>
          </BottomSection>
        </Content>
      </Container>
    </Layout>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;
const Content = styled.div`
  max-width: 1000px;
`;
const TopSection = styled.div`
  display: flex;
  justify-content: center;
`;
const MiddleSection = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  gap: 5em;

  @media only screen and (max-width: 830px) {
    flex-direction: column;
  }
`;
const BottomSection = styled.div`
  margin-top: 4rem;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 2.3rem;
  @media only screen and (max-width: 425px) {
    font-size: 2rem;
  }
`;
const Date = styled.h4`
  margin: 0;
  color: var(--secundary-text-color);
  font-weight: 400;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;

  p {
    font-weight: 400;
    margin: 0;
    color: var(--secundary-text-color);
  }
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  gap: 5px;
`;

const ImageBiography = styled.img`
  height: 280px;

  @media only screen and (max-width: 464px) {
    width: 100%;
    height: auto;
  }
`;
const Biography = styled.p`
  width: min(100%, 75ch);
`;

const FilmContainer = styled.section`
  display: grid;
  grid-template-columns: 275px 275px 275px;
  grid-template-rows: auto;
  justify-content: space-around;
  max-width: 1600px;
  margin: 0 auto 3rem auto;
  row-gap: 2rem;

  @media only screen and (max-width: 940px) {
    grid-template-columns: 275px 275px;
  }
  @media only screen and (max-width: 650px) {
    grid-template-columns: 275px;
  }
`;
