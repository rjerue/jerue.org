import React from "react";
import { NextPage } from "next";
import BlogList, { BlogListProps } from "../../components/BlogList";
import { getBlogs } from "../../utils/blogs";

const HomePage: NextPage<BlogListProps> = ({ blogs }) => {
  return <BlogList blogs={blogs} />;
};

export const getStaticProps = async () => {
  return { props: { blogs: await getBlogs() } };
};

export default HomePage;
