import React from "react";
import { Text, Box } from "rebass";
import { Tooltip } from "./Tooltip";

const TooltipContent: React.FC<{ copied: boolean }> = ({ copied }) => (
  <Box
    sx={{
      backgroundColor: "background",
      borderRadius: "4px",
      overflow: "hidden",
      outline: "1px solid black",
      minWidth: "100px",
    }}
  >
    <Text
      sx={{
        backgroundColor: "highlight",
        color: "text",
        padding: "4px",
        fontSize: "0.8rem",
      }}
    >
      {copied ? "Copied!" : "Click to copy"}
    </Text>
  </Box>
);

export const InlineCode: React.FC = ({ children }) => {
  const [copied, setCopied] = React.useState(false);

  return (
    <Tooltip content={<TooltipContent copied={copied} />}>
      <code
        onMouseEnter={() => setCopied(false)}
        onMouseLeave={() => setCopied(false)}
        onClick={() => {
          if (typeof children === "string") {
            window.navigator.clipboard.writeText(children);
          }
          setCopied(true);
        }}
      >
        {children}
      </code>
    </Tooltip>
  );
};
