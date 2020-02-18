import React from "react";
import { Text, Heading, Box } from "rebass";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <Box as="section" mt={2}>
      <Heading>About me:</Heading>
      <ul>
        <Text as="li">
          Previously worked at NAVSEA, Charles River Development, and with the
          RIPPLES group at my alma mater, the University of Massachusetts
          Amherst.
        </Text>
        <Text as="li">
          Enjoy working with JavaScript, React, Node, NoSQL Databases, Data
          Visualization, User Experience, Java, Scala, and much more.
        </Text>
        <Text as="li">
          I love photography; hiking and camping; cheering on Liverpool, Red
          Sox, Patriots; and playing soccer.
        </Text>
      </ul>
    </Box>
  );
};

export default HomePage;
