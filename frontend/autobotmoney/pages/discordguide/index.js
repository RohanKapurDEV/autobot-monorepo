import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1.5rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

const HeaderTitle = styled.h1`
  font-family: "politetype";
  font-weight: 300;
  margin: 0;
  padding: 0;
`;

const Subtext = styled.p`
  font-family: "DM Sans", sans-serif;
  font-weight: 300;
  margin-left: 1rem;
`;

const InfoBox = styled.div`
  margin-right: 30%;
  margin-left: 1rem;
  /* background-color: red; */

  @media (max-width: 700px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const ImageContainer = styled.div`
  height: 45px;
  width: 45px;

  @media (max-width: 700px) {
    height: 40px;
    width: 40px;
  }
`;

export default function index() {
  return (
    <>
      <Header>
        <ImageContainer>
          <Image src="/images/gradient.png" height="50px" width="50px" layout="responsive" priority="true"></Image>
        </ImageContainer>
        <HeaderTitle>Discord guide</HeaderTitle>
      </Header>

      <div style={{ height: "1rem" }}></div>

      <InfoBox>
        <p>
          To add the bot to your discord server, you can either click on the `Invite to Discord server` link in the
          bottom menu or install it via top.gg using this link.
        </p>

        <p>
          One thing to note is that the bot does not give anyone on the server any sort of privileged authority over
          anyone else's wallet. The admins/mods/whatever of any server with the bot installed cannot manipulate your
          wallet. Another thing to keep in mind is that your wallet across all Discord servers and channels is the same.
        </p>

        <h2>Commands</h2>

        <p>
          <code>!autobot address</code> - Displays your wallet address
        </p>
        <p>
          <code>!autobot balance [denomination]?</code> - Displays your SOL balance in [denomination]
        </p>
        <p>
          <code>!autobot tip [amount] [denomination] [@user] </code> - Tip [amount] of SOL in [denomination] to [@user]
        </p>
        <p>
          <code>!autobot transfer [amount] [denomination] [address] </code> - Transfer [amount] of SOL in [denomination]
          to [address]
        </p>
        <p>
          <code>!autobot donate [amount] [denomination] </code> - Donate [amount] of SOL in [denomination] to feed me
        </p>
        <p>
          <code>!autobot help </code> - Display help text
        </p>

        <h2>Notes</h2>

        <p>
          <code>[denomination]</code> can either be "SOL" or "lamports", <code>[amount]</code> would be adjusted
          accordingly of course
        </p>

        <p>All wallets run on mainnet-beta</p>
      </InfoBox>

      {/* <Link href="/">
        <Subtext>&lt; Back to home</Subtext>
      </Link> */}
    </>
  );
}
