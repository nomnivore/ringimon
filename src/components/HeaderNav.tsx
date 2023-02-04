import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const HeaderNav = () => {

  const { data: sessionData } = useSession();


  return (
    <header className="w-screen flex justify-between bg-slate-100 shadow-md px-4">
      <Link href="/" className="px-2 py-2 text-lg font-semibold tracking-tighter hover:bg-slate-300 rounded-sm">RiNGimon</Link>
      <nav className="flex items-center justify-center gap-1">
        <Link href="/generate" className="tracking-tight hover:bg-slate-300 rounded-md px-2 py-1">Generate</Link>
        <Link href="/inventory" className="tracking-tight hover:bg-slate-300 rounded-md px-2 py-1">Inventory</Link>
      </nav>

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
  )
}

export default HeaderNav
