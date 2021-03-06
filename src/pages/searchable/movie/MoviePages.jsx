import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Layout from "layout/Layout";
import UpperPart from "./components/UpperPart";
import LowerPart from "./components/LowerPart";
import CommentPart from "./components/CommentPart";
import Loading from "pages/public/Loading";

import useGetMovie from "hooks/movieService/useGetMovie";
import useGetMovieComments from "hooks/movieService/useGetMovieComments";

export default function MoviePages() {
  const [isCommentsChanged, setIsCommentsChanged] = useState(0);
  const { movieId } = useParams();

  const { isLoading: isMovieLoading, isError: isMovieError, error: movieError, data: movie } = useGetMovie({ movieId });
  const {
    isLoading: isCommentsLoading,
    isError: isCommentError,
    error: commentsError,
    data: comments
  } = useGetMovieComments({ movieId });

  const handleChanged = () => {
    setIsCommentsChanged((prevValue) => prevValue + 1);
  };

  if (isMovieLoading) {
    return <Loading />;
  }

  if (isMovieError || isCommentError) {
    return (
      <Layout>
        <Container>
          <h1>Doslo je do greske</h1>
        </Container>
      </Layout>
    );
  }

  if (!movie) {
    return (
      <Layout>
        <Container>
          <h1>Film ne postoji</h1>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Content>
          <Wrapper>
            <UpperPart movie={movie} />
          </Wrapper>
        </Content>
        <BottomWrapper>
          <LowerPart movie={movie} />
        </BottomWrapper>
        <BottomWrapperReviews>
          <h3>Recenzije</h3>
        </BottomWrapperReviews>
        <BottomWrapperReviews>
          <CommentPart comments={comments} handleChanged={handleChanged} />
        </BottomWrapperReviews>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  background-color: var(--primary-dark-color);
  width: 100%;
  padding: 5em 2em 0 2em;
  @media only screen and (max-width: 650px) {
    padding-top: 2rem;
  }
`;
const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 4em;
  @media only screen and (max-width: 768px) {
    gap: 2rem;
  }
`;
const BottomWrapper = styled(Wrapper)`
  flex-direction: row;
  padding: 6rem 12px 3rem;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const BottomWrapperReviews = styled(Wrapper)`
  flex-direction: row;
  padding: 0px 12px;
`;
