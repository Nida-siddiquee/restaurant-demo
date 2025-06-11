import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  margin-top: 3rem;
  text-align: center;
  padding: 1rem;

  @media (max-width: 600px) {
    min-height: 200px;
    margin-top: 1.2rem;
    padding: 0.7rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0 0.7rem 0;
  color: #23292e;

  @media (max-width: 600px) {
    font-size: 1.08rem;
    margin: 0.25rem 0 0.45rem 0;
  }
`;

export const Message = styled.div`
  font-size: 1.08rem;
  color: #484f56;
  margin-bottom: 2.2rem;
  max-width: 420px;

  @media (max-width: 600px) {
    font-size: 0.98rem;
    margin-bottom: 1.1rem;
    max-width: 90vw;
  }
`;

export const Icon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;

  @media (max-width: 600px) {
    width: 38px;
    height: 38px;
  }
`;