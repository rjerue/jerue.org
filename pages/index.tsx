import React from "react";
import { Text, Box } from "rebass";
import { NextPage } from "next";
import BlogList, { BlogListProps } from "../components/BlogList";
import { Header } from "../components/Header";
import { posts } from "../blogs.json";

const HomePage: NextPage<BlogListProps> = ({ blogs }) => {
  return (
    <>
      <Box as="section" mt={2}>
        <Header>About me:</Header>
        <Box as="ul" px={4}>
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
        </Box>
      </Box>
      <BlogList blogs={blogs} />
    </>
  );
};

HomePage.getInitialProps = async () => {
  const blogs = await Promise.all(
    posts.map(async post => {
      const { intro } = await import(`./blog/${post}.mdx`);
      return {
        intro: intro as string,
        slug: post,
      };
    })
  );
  return { blogs };
};

export default HomePage;
