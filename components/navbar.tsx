import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { Button } from "./ui/button";
import { BadgePlus, LogOut, Plus } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                   <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className="flex items-center gap-2">
                <span className="max-sm:hidden cursor-pointer">
                  {session?.user?.name || session?.user?.email}
                </span>
                <Image
                  src={session?.user?.image || "/avatar.png"}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer"
                />
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit" className="cursor-pointer">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;