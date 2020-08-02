import React from "react";
import { Heading, HeadingProps } from "rebass";

export const Header: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading fontSize={[3, 4]} paddingY={1} {...props}>
    {children}
  </Heading>
);
