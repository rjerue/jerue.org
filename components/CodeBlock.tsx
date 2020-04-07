import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

interface CodeBlockProps {
  children: string;
  className: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className.replace(/language-/, "");
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
