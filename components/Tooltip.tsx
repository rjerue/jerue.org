import React from "react";

interface TooltipProps {
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return content ? (
    <>
      <style jsx>{`
        .tooltip {
          position: relative;
          cursor: pointer;
        }

        .tooltip .tooltiptext {
          visibility: hidden;
          text-align: center;
          border-radius: 6px;
          padding: 5px 0;
          // min-width: 80px;
          /* Position the tooltip */
          position: absolute;
          z-index: 1;
          bottom: 100%;
          left: 50%;
          margin-left: -60px;
        }

        .tooltip:hover .tooltiptext {
          visibility: visible;
        }
        @media only screen and (max-width: 768px) {
          .tooltip:hover .tooltiptext {
            visibility: hidden;
          }
        }
      `}</style>
      <span className="tooltip">
        {children}
        <span className="tooltiptext">{content}</span>
      </span>
    </>
  ) : (
    <>{children}</>
  );
};
