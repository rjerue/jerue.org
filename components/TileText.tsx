import React from "react";
import { Box, Text, BoxProps } from "rebass";
import humanize from "humanize-string";
import { Header } from "./Header";
import { Blog } from "../types/Blog";

export interface TitleTextProps extends Pick<Blog, "slug" | "date">, BoxProps {
  title?: string;
}

const TitleText: React.FC<TitleTextProps> = ({
  title,
  slug,
  date,
  ...props
}) => {
  return (
    <Box overflow="hidden" {...props}>
      <Header display="inline">{title || humanize(slug)} </Header>
      <Text
        display="inline"
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
    </Box>
  );
};

export default TitleText;
