import React from "react";
import { Flex, Box } from "rebass";
import Navbar from "../components/navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        color: "text",
        maxWidth: [512, 768],
        mx: "auto",
        px: 4,
      }}
      pb="20vh"
    >
      <Flex flexDirection="column">
        <Navbar />
        <Box>
          <div>
            My name is Ryan Jerue. I am a Software Engineer at Viasat Inc. in
            Carlsbad, California. Most of the time, you can find me working with
            JavaScript, TypeScript, React, React Native, Scala, Java, SQL, and
            more.
          </div>
        </Box>

        <Box>{children}</Box>
      </Flex>
    </Box>
  );
};

export default Layout;
