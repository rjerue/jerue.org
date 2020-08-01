import React from "react";
import { Heading } from "rebass";

export const Header: React.FC = ({ children }) => (
  <Heading fontSize={[3, 4]} paddingY={1}>
    {children}
  </Heading>
);
