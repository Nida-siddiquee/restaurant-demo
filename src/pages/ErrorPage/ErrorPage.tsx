import React from 'react';
import { Wrapper, ErrorIcon, Title, Message, StyledLink } from './ErrorPage.styled';

const ErrorPage: React.FC = () => (
  <Wrapper>
    <ErrorIcon>😕</ErrorIcon>
    <Title>Something Went Wrong</Title>
    <Message>
      Oops! We couldn't find the page you’re looking for, or something broke. <br />
      Please check the URL or head back to the home page.
    </Message>
    <StyledLink to="/">← Go Home</StyledLink>
  </Wrapper>
);

export default ErrorPage;
