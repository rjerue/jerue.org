import React from "react";
import { NextPage } from "next";
import BlogList, { BlogListProps } from "../../components/BlogList";
import { posts } from "../../blogs.json";

const HomePage: NextPage<BlogListProps> = ({ blogs }) => {
  return <BlogList blogs={blogs} />;
};

export const getStaticProps = async () => {
  const blogs = await Promise.all(
    posts.map(async (post) => {
      const { intro, date, hidden } = await import(`./${post}.mdx`);
      return {
        intro: intro as string,
        slug: post,
        date: date as string,
        hidden: hidden || false,
      };
    })
  );
  return { props: { blogs } };
};

export default HomePage;
