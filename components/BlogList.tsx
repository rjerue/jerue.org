import React from "react";
import Link from "next/link";
import { Box, Text, Link as RLink } from "rebass";
import humanize from "humanize-string";
import titleize from "titleize";
import { Header } from "./Header";

export interface BlogListProps {
  blogs: {
    intro: string;
    slug: string;
  }[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <Box as="section" mt={2}>
      <Header>Blog Posts</Header>
      <Box paddingX={3} pt={1}>
        {blogs.map(({ intro, slug }) => {
          return (
            <Link aria-role="button" href={`/blog/${slug}`} key={slug}>
              <Box
                mb={3}
                sx={{
                  cursor: "pointer",
                  ":hover h2": {
                    textDecoration: "underline",
                  },
                }}
              >
                <RLink href="" sx={{ textDecoration: "none" }}>
                  <Header>{titleize(humanize(slug))}</Header>
                </RLink>
                <Text>{intro}</Text>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default BlogList;
