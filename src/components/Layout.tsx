import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import HeaderNav from "./HeaderNav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>RiNGimon</title>
        <meta name="description" content="Featuring over 48 billion unique creatures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="app" className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <HeaderNav />
        
        <main className="">{children}</main>

        <footer className="px-4 py-1 bg-slate-200 flex justify-center">
          <small>featuring 48709447200 unique combinations</small>
        </footer>
      </div>
    </>
  )
}
