import React from "react";
import Link from "next/link";
import { Box, Text, Link as RLink, Flex } from "rebass";
import humanize from "humanize-string";
import titleize from "titleize";
import { Header } from "./Header";

export interface BlogListProps {
  blogs: {
    intro: string;
    slug: string;
    date: string;
    hidden: boolean;
  }[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <Box as="section" mt={2}>
      <Header>Blog Posts</Header>
      <Box paddingX={3} pt={1}>
        {blogs.map(({ intro, slug, date, hidden }) => {
          return (
            !hidden && (
              <Link href={`/blog/${slug}`} key={slug}>
                <Box
                  mb={3}
                  sx={{
                    cursor: "pointer",
                    ":hover h2": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <RLink href="" sx={{ textDecoration: "none" }}>
                      <Header>{titleize(humanize(slug))}</Header>
                    </RLink>
                    <Text
                      sx={{
                        paddingLeft: 1,
                        color: "primary",
                        fontWeight: "bold",
                      }}
                    >
                      {date}
                    </Text>
                  </Flex>
                  <Text>{intro}</Text>
                </Box>
              </Link>
            )
          );
        })}
      </Box>
    </Box>
  );
};

export default BlogList;
