import React from "react";
import { Text, Box } from "rebass";
import { NextPage } from "next";
import BlogList, { BlogListProps } from "../components/BlogList";
import { Header } from "../components/Header";
import { getBlogs } from "../utils/blogs";

const HomePage: NextPage<BlogListProps> = ({ blogs }) => {
  return (
    <>
      <Box as="section" mt={2}>
        <Header>About me:</Header>
        <Box as="ul" px={[2, 4]}>
          <Text as="li">
            Previously worked at Viasat, Charles River Development, NAVSEA, and
            with the RIPPLES group at my alma mater, the University of
            Massachusetts Amherst.
          </Text>
          <Text as="li">
            Enjoy working with JavaScript, TypeScript, Clojure(Script), React,
            React Native, Java, REST, GraphQL, APIs, SQL, MongoDB, and more.
          </Text>
          <Text as="li">
            I love photography; hiking and camping; cheering on Liverpool, Red
            Sox, Patriots; and playing soccer.
          </Text>
        </Box>
      </Box>
      <BlogList blogs={blogs} />
    </>
  );
};

export const getStaticProps = async () => {
  return { props: { blogs: await getBlogs() } };
};

export default HomePage;
