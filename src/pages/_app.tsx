import type { AppProps, AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout;
};

type PagePropsWithSession = {
  session: Session | null;
};

const MyApp: AppType<PagePropsWithSession> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<PagePropsWithSession>) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return <SessionProvider session={session}>{layout}</SessionProvider>;
};

export default api.withTRPC(MyApp);
