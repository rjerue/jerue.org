import React from "react";
import { Box, Text, BoxProps } from "rebass";
import { Header } from "./Header";
import { Blog } from "../types/Blog";

export type TitleTextProps = Pick<Blog, "title" | "date"> & BoxProps;

const TitleText: React.FC<TitleTextProps> = ({ title, date, ...props }) => {
  return (
    <Box overflow="hidden" {...props}>
      <Header display="inline">{title} </Header>
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
