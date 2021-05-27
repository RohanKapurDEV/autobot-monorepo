import "../styles/globals.scss";
import styled from "styled-components";
import Link from "next/link";

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 16px;
  overflow-x: auto;
`;

const FooterCell = styled.a`
  color: black;
  font-family: "DM Sans", sans-serif;
  text-decoration: underline;
  min-width: fit-content;
  cursor: pointer;
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer>
        <div style={{ width: "5px" }}></div>
        <FooterCell href="https://twitter.com/0xrohan">By @0xrohan</FooterCell>
        <FooterCell href="https://discord.com/api/oauth2/authorize?client_id=845273238778937374&permissions=75776&scope=bot">
          🤖 Invite to Discord server
        </FooterCell>
        <Link href="/discordguide">
          <FooterCell>🤔 Discord Guide</FooterCell>
        </Link>
        <FooterCell href="https://github.com/RohanKapurDEV/autobot-monorepo">🤓 Github</FooterCell>
        <div style={{ width: "5px" }}></div>
      </Footer>
    </>
  );
}

export default MyApp;
