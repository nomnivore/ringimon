import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>RiNGimon</title>
        <meta name="description" content="Featuring over 48 billion unique creatures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="app" className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <header className="flex-shink-0 w-screen flex justify-between bg-slate-100 shadow-md px-4">
          <Link href="/" className="px-2 py-2 text-lg font-semibold tracking-tighter hover:bg-slate-300 rounded-sm">RiNGimon</Link>
          <nav className="flex items-center justify-center">Generate | Inventory</nav>

          <nav className="flex items-center">
            {sessionData ? (
              <>
                <button 
                  className="tracking-tight hover:bg-slate-300 rounded-lg px-2 py-1"
                  onClick={() => void signOut()}
                >
                  Logout
                </button>
                <div className="mx-3" />
                <div className="rounded-full overflow-clip border-2 border-slate-600">
                  <Image src={sessionData.user?.image || ""} alt="your avatar" width="36" height="36" />
                </div>
              </>
              ) : (
              <button 
                className="rounded-md bg-blue-600 text-slate-200 tracking-tight py-2 px-4"
                onClick={() => void signIn()}
              >
                Login
              </button>
            )}
          </nav>
        </header>
        
        <main className="">{children}</main>

        <footer className="px-4 py-1 bg-slate-200 flex justify-center">
          <small>featuring 48709447200 unique combinations</small>
        </footer>
      </div>
    </>
  )
}
