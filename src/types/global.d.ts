import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export {};

declare global {
  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
