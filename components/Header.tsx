import React from "react";
import { Heading } from "rebass";

export const Header: React.FC = ({ children }) => (
  <Heading paddingY={1}>{children}</Heading>
);
