import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "emotion-theming";
import { MDXProvider } from "@mdx-js/react";
import preset from "@rebass/preset";
import Layout from "../layouts/default";
import CodeBlock from "../components/CodeBlock";
import TitleText from "../components/TileText";

interface Colors {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  muted: string;
  gray: string;
  highlight: string; // hsla(205, 100%, 40%, 0.125)
}

/**
 * Min and max are inclusive
 * @returns random number
 */
function getRandomInt(floor: number, ceil: number) {
  const min = Math.ceil(floor);
  const max = Math.floor(ceil + 1);
  return Math.floor(Math.random() * (max - min) + min);
}

export const ThemeRefresher = React.createContext({
  canRefreshTheme: false,
  refreshTheme: async () => {
    console.error("No Theme to refresh!");
  },
  resetTheme: async () => {
    console.error("No Theme to refresh!");
  },
});

export function useRefreshTheme() {
  return React.useContext(ThemeRefresher);
}

const components = {
  code: CodeBlock,
  TitleText,
};

class MyApp extends App {
  state = {
    themes: [] as (typeof preset)[],
    theme: preset,
  };

  setThemesFromColormindSet = async () => {
    const themes = await fetch("/static/colors.json").then((r) => r.json());
    this.setState({  themes  });;
  };;

  refreshThemeColors = async (): Promise<void> => {
    this.setState({
      theme: {
        ...preset,
        colors: {
          ...this.state.theme.colors,
          ...this.state.themes[getRandomInt(0, 99)],
        },
      },
    });
  };

  resetThemeColors = async (): Promise<void> => {
    this.setState({
      theme: {
        ...preset,
        colors: {
          ...preset.colors,
        },
      },
    });
  };

  componentDidMount() {
    this.setThemesFromColormindSet()
  }

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
          value={{
            canRefreshTheme: this.state.themes.length > 0,
            refreshTheme: this.refreshThemeColors,
            resetTheme: this.resetThemeColors,
          }}
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
                font-family: "verdana";
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
