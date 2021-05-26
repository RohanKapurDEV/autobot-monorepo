import styled from "styled-components";
import Image from "next/image";

const Background = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: black;
  font-size: 5rem;
  font-family: "politetype";
  margin: 0;
  padding: 0;
  font-weight: 300;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 2rem;
  }
`;

const Subtext = styled.p`
  padding: 0;
  margin: 0;
  margin-top: 20px;
  font-family: "DM Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 1rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const Row = styled.div`
  height: min-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div`
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled.div`
  width: 2.5rem;

  @media (max-width: 700px) {
    width: 1rem;
  }
`;

export default function Home() {
  return (
    <>
      <Background>
        <Column>
          <Row>
            <div>
              <Image src="/images/gradient.png" height="60px" width="60px" layout="intrinsic" priority="true"></Image>
            </div>
            <Spacer></Spacer>
            <Title>autobot.money</Title>
          </Row>
          <Subtext>A Solana tipping service for Discord & Telegram</Subtext>
        </Column>
      </Background>
    </>
  );
}
