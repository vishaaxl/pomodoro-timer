import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "../data/theme";
import { ContextProvider } from "../context/Timer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ContextProvider>
  );
}
