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
            I am Ryan Jerue, a Software Engineer working remotely at
            Reify Health in Charleston, South Carolina. My focus is
            in creating scalable web systems. I can be contacted by
            email over ryan at jerue dot org.
          </div>
        </Box>

        <Box>{children}</Box>
      </Flex>
    </Box>
  );
};

export default Layout;
