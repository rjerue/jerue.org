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
            My name is Ryan Jerue. I am a Software Engineer at Viasat Inc in
            Carlsbad, California. My focus in creating scalable web systems. I
            can be contacted over ryan at jerue dot org.
          </div>
        </Box>

        <Box>{children}</Box>
      </Flex>
    </Box>
  );
};

export default Layout;
