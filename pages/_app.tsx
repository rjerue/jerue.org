import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "emotion-theming";
import { MDXProvider } from "@mdx-js/react";
import preset from "@rebass/preset";
import Layout from "../layouts/default";
import CodeBlock from "../components/CodeBlock";

interface Colors {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  muted: string;
  gray: string;
  highlight: string; // hsla(205, 100%, 40%, 0.125)
}

type RGBColor = [number, number, number];
function makeColor([r, g, b]: RGBColor, a = 1): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

async function refreshThemeColorsFromColormind(): Promise<Partial<Colors>> {
  // niNcEMl95H8DZeqlAfi4b62lapJ56j2N79lpinSe
  const color = await fetch(
    "https://oycz17dpn0.execute-api.us-east-1.amazonaws.com/production",
    {
      method: "post",
      body: JSON.stringify({
        model: "ui",
      }),
      headers: {
        "x-api-key": "niNcEMl95H8DZeqlAfi4b62lapJ56j2N79lpinSe",
      },
    }
  )
    .then(result => result.json())
    .then(
      data => data.result as [RGBColor, RGBColor, RGBColor, RGBColor, RGBColor]
    );
  return {
    text: makeColor(color[0]),
    background: makeColor(color[4]),
    primary: makeColor(color[2]),
    muted: makeColor(color[3]),
    highlight: makeColor(color[1]),
  };
}

const ThemeRefresher = React.createContext({
  refreshTheme: async () => {
    console.error("No Theme to refresh!");
  },
});

export function useRefreshTheme(): () => Promise<void> {
  const { refreshTheme } = React.useContext(ThemeRefresher);
  return refreshTheme;
}

const components = {
  code: CodeBlock,
};

class MyApp extends App {
  state = {
    theme: preset,
  };

  refreshThemeColors = async (): Promise<void> => {
    this.setState({
      theme: {
        ...preset,
        colors: {
          ...this.state.theme.colors,
          ...(await refreshThemeColorsFromColormind()),
        },
      },
    });
  };

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const { theme } = this.state;
    // console.log(theme);
    return (
      <>
        <Head>
          <title>Ryan Jerue</title>
          <meta name="theme-color" content={`${theme.colors.primary}`} />
        </Head>
        <ThemeRefresher.Provider
          value={{ refreshTheme: this.refreshThemeColors }}
        >
          <ThemeProvider theme={this.state.theme}>
            <MDXProvider components={components}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MDXProvider>
            <style jsx global>{`
              body {
                background-color: ${theme.colors.background};
              }
              h1,
              h2,
              h3 {
                color: ${theme.colors.primary};
              }
              h2:first-of-type {
                margin-bottom: 2px;
              }
              h3,
              h4,
              h5,
              h6 {
                margin: 0;
              }
              a {
                color: ${theme.colors.primary};
              }
            `}</style>
          </ThemeProvider>
        </ThemeRefresher.Provider>
      </>
    );
  }
}

export default MyApp;
