import React from "react";
import Link from "next/link";
import { Box, Text, Link as RLink } from "rebass";
import { Header } from "./Header";
import { Blog } from "../types/Blog";
import TitleText from "./TileText";

export interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <Box as="section" mt={2}>
      <Header>Blog Posts:</Header>
      <Box paddingTop={1} paddingX={[0, 4]}>
        {blogs.map(({ intro, slug, date, hidden, title }) => {
          const href = `/blog/${slug}`;
          return (
            !hidden && (
              <Link href={href} key={slug} scroll>
                <Box
                  mb={3}
                  sx={{
                    cursor: "pointer",
                    ":hover h2": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <RLink
                    href={href}
                    sx={{ textDecoration: "none" }}
                    width="100%"
                  >
                    <TitleText date={date} title={title} />
                  </RLink>
                  <Text marginTop={"4px"}>{intro}</Text>
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
