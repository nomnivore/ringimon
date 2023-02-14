import Head from "next/head";
import HeaderNav from "./HeaderNav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>RiNGimon</title>
        <meta
          name="description"
          content="Featuring over 48 billion unique creatures"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        id="app"
        className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-slate-100"
      >
        <HeaderNav />

        <main className="container mx-auto max-w-7xl px-2">{children}</main>

        <footer className="flex justify-center bg-slate-200 px-4 py-1">
          <small>featuring 48709447200 unique combinations</small>
        </footer>
      </div>
    </>
  );
}
