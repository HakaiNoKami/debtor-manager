import type { AppProps } from "next/app";
import { UsersProvider, DebtsProvider } from "@providers";

import "@styles/globals.scss";
import "@styles/collapse.scss";
import "antd/dist/antd.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UsersProvider>
      <DebtsProvider>
        <Component {...pageProps} />
      </DebtsProvider>
    </UsersProvider>
  );
};

export default App;
