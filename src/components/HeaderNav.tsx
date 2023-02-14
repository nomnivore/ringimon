import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const HeaderNav = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="flex w-screen justify-between bg-slate-200 px-4 shadow-md">
      <Link
        href="/"
        className="rounded-sm px-2 py-2 text-lg font-semibold tracking-tighter hover:bg-slate-300"
      >
        RiNGimon
      </Link>
      <nav className="flex items-center justify-center gap-1">
        <Link
          href="/generate"
          className="rounded-md px-2 py-1 tracking-tight hover:bg-slate-300"
        >
          Generate
        </Link>
        <Link
          href="/inventory"
          className="rounded-md px-2 py-1 tracking-tight hover:bg-slate-300"
        >
          Inventory
        </Link>
      </nav>

      <nav className="flex items-center">
        {sessionData ? (
          <>
            <button
              className="rounded-lg px-2 py-1 tracking-tight hover:bg-slate-300"
              onClick={() => void signOut()}
            >
              Logout
            </button>
            <div className="mx-3" />
            <div className="w-9 overflow-clip rounded-full border-2 border-slate-600">
              <Image
                src={sessionData.user?.image || ""}
                alt="your avatar"
                width="36"
                height="36"
              />
            </div>
          </>
        ) : (
          <button
            className="rounded-md bg-blue-600 py-2 px-4 tracking-tight text-slate-200"
            onClick={() => void signIn()}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;
