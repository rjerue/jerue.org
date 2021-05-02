import React from "react";
import NextLink from "next/link";
import { Flex, Box, Text, Link, LinkProps, BoxProps } from "rebass";
import { useRefreshTheme } from "../pages/_app";

const NavbarItem: React.FC<LinkProps | BoxProps> = ({
  children,
  href,
  ...props
}) => {
  const { disabled } = props;
  const Wrapper: React.FC<LinkProps | BoxProps> = (props) => {
    if (href) {
      return <Link href={href} {...(props as LinkProps)} />;
    }
    const { onClick, ...rest } = props as BoxProps;
    const buildHandleEnterKeyPress = (onClick: (() => void) | undefined) => ({
      key,
    }: {
      key: string;
    }) => {
      if (key === "Enter" && !disabled) {
        onClick?.();
      }
    };
    return (
      <Box
        sx={{
          cursor: "pointer",
        }}
        onKeyPress={buildHandleEnterKeyPress(onClick as () => void)}
        onClick={(e) => {
          if (disabled) {
            return;
          }
          e.preventDefault();
          onClick?.(e);
        }}
        {...(rest as BoxProps)}
      />
    );
  };
  return (
    <Wrapper ml={3} {...props}>
      <Box
        as="i"
        sx={{
          fill: "primary",
          ":hover": {
            fill: "highlight",
            cursor: disabled ? "not-allowed" : "unset",
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          {children}
        </svg>
      </Box>
    </Wrapper>
  );
};

const Navbar: React.FC = () => {
  const { refreshTheme, resetTheme, canRefreshTheme } = useRefreshTheme();
  return (
    <Flex alignItems="center" as="nav" py={4}>
      <NextLink href="/">
        <Link
          onClick={() => {
            resetTheme();
          }}
          p={0}
          sx={{
            textDecoration: "none",
            ":hover": {
              color: "highlight",
            },
          }}
          href=""
        >
          <Text fontWeight="bolder" fontSize={[3, 4, 5]}>
            Ryan Jerue
          </Text>
        </Link>
      </NextLink>
      <Box mx="auto" />
      <NavbarItem
        href="https://twitter.com/rjerue"
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter Link"
      >
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </NavbarItem>
      <NavbarItem
        href="https://www.linkedin.com/in/rjerue"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn Link"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </NavbarItem>
      <NavbarItem
        href="https://github.com/rjerue"
        target="_blank"
        rel="noreferrer"
        aria-label="Github Link"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </NavbarItem>
      <NavbarItem
        disabled={!canRefreshTheme}
        tabIndex={0}
        onClick={() => {
          refreshTheme();
        }}
        role="button"
        aria-pressed="false"
        aria-label="change theme colors"
      >
        <path d="M24 19.007c0-3.167-1.409-6.771-2.835-9.301l-.006-.01-.014-.026c-.732-1.392-1.914-3.052-3.619-4.757-2.976-2.976-5.476-3.912-6.785-3.913-.413 0-.708.094-.859.245l-.654.654c-1.898-.236-3.42.105-4.294.982-.876.875-1.164 2.159-.792 3.524.242.893.807 1.891 1.752 2.836.867.867 2.062 1.684 3.615 2.327.488-.839 1.654-1.019 2.359-.315.586.586.584 1.533-.002 2.119s-1.533.589-2.121 0c-.229-.229-.366-.515-.416-.812-1.646-.657-3.066-1.534-4.144-2.612-.728-.728-1.289-1.528-1.664-2.349l-2.835 2.832c-.445.447-.685 1.064-.686 1.82.001 1.635 1.122 3.915 3.714 6.506 2.764 2.764 5.58 4.243 7.431 4.243.649 0 1.181-.195 1.548-.562l8.086-8.079c.911.875-.777 3.541-.777 4.65 0 1.104.896 1.999 2 1.998 1.104 0 1.998-.895 1.998-2zm-18.912-12.974c-.236-.978-.05-1.845.554-2.444.526-.53 1.471-.791 2.656-.761l-3.21 3.205zm9.138 2.341l-.03-.029c-1.29-1.291-3.802-4.354-3.095-5.062.715-.715 3.488 1.521 5.062 3.095.862.863 2.088 2.248 2.938 3.459-1.718-1.073-3.493-1.469-4.875-1.463zm-3.875 12.348c-.547-.082-1.5-.547-1.9-.928l7.086-7.086c.351.37 1.264.931 1.753 1.075l-6.939 6.939z" />{" "}
      </NavbarItem>
    </Flex>
  );
};

export default Navbar;
