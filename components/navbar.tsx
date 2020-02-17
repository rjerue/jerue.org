import React from "react";
import { Flex, Box, Text, Link, LinkProps, Button } from "rebass";
import { useRefreshTheme } from "../pages/_app";

const NavbarItem: React.FunctionComponent<LinkProps> = ({
  children,
  href = "#",
  ...props
}) => (
  <Link ml={4} href={href} {...props}>
    {children}
  </Link>
);

const Layout: React.FC = ({ children }) => {
  const refreshTheme = useRefreshTheme();
  return (
    <Box
      sx={{
        color: "text",
        maxWidth: [512, 768],
        mx: "auto",
        px: 4
      }}
    >
      <Flex flexDirection="column">
        <Flex alignItems="center" as="nav" py={4}>
          <Link
            p={0}
            sx={{
              textDecoration: "none",
              ":hover": {
                color: "highlight"
              }
            }}
            href="/"
          >
            <Text fontWeight="bolder" fontSize={[3, 4, 5]}>
              Ryan Jerue
            </Text>
          </Link>
          <Box mx="auto" />
          <NavbarItem
            href="https://github.com/rjerue"
            target="_blank"
            rel="noreferrer"
          >
            <Text
              as="i"
              sx={{
                ":hover": {
                  color: "highlight"
                }
              }}
              fontSize={[3, 4, 5]}
              className="fab fa-github"
            ></Text>
          </NavbarItem>
          <Button
            variant="transparent"
            sx={{
              width: [20, 24, 32],
              height: [20, 24, 32],
              p: 1,
              borderRadius: 99999,
              outline: "none",
              color: "background",
              ":hover": {
                cursor: "pointer",
                backgroundColor: "highlight"
              },
              ":focus": {
                cursor: "pointer",
                backgroundColor: "muted",
                boxShadow: "0 0 0 2pt rgba(0, 0, 0, .125)"
              }
            }}
            ml={4}
            onClick={e => {
              e.preventDefault();
              refreshTheme();
            }}
          >
            <Flex justifyContent="center">
              <Text
                px={{ color: "background" }}
                as="i"
                pt={[0, "1px", "2px"]}
                fontSize={["12px", "15px", "19px"]}
                className="fas fa-fill-drip"
              />
            </Flex>
          </Button>
        </Flex>
        <Box>
          <div>
            My name is Ryan Jerue. I am a Software Engineer at Viasat Inc. in
            Carlsbad, California. Most of the time, you can find me working with
            JavaScript, TypeScript, React, React Native, Scala, Java, SQL, and
            more.
          </div>
        </Box>
        <Box>{children}</Box>
      </Flex>
    </Box>
  );
};

export default Layout;
