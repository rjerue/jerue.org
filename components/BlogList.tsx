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
      <Header>Blog Posts:</Header>
      <Box paddingTop={1} paddingX={[0, 4]}>
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
                    <RLink href="" sx={{ textDecoration: "none" }} width="100%">
                      <Header display="inline">
                        {titleize(humanize(slug))}{" "}
                      </Header>
                      <Text
                        display="inline-block"
                        sx={{
                          paddingLeft: 1,
                          color: "primary",
                          fontWeight: "bold",
                          float: "right",
                        }}
                        marginTop={["6px", "8px"]}
                        paddingRight={"8px"}
                        fontSize={["12px", "13px"]}
                      >
                        {date}
                      </Text>
                    </RLink>
                  </Flex>
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
