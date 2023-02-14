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
      <div id="app" className="min-h-screen bg-slate-100">
        <HeaderNav />

        <main className="container mx-auto max-w-7xl px-2 pt-12 pb-8">
          {children}
        </main>

        <footer className="fixed bottom-0 flex w-screen justify-center bg-slate-200 px-4 py-1">
          <small>featuring 48709447200 unique combinations</small>
        </footer>
      </div>
    </>
  );
}
