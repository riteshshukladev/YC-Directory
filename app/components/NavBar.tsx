import Link from "next/link";
import React from "react";
import Image from "next/image";
import logoImage from "../../public/logo.png";
import { auth, signOut, signIn } from "@/auth";
const NavBar = async () => {
  const session = await auth();
  return (
    <>
      <header className="px-5 py-3 shadow-sm font-work-sans bg-white">
        <nav className="flex justify-between items-center">
          <Link href={"/"} className="">
            <Image src={logoImage} alt="logo" width={144} height={30}></Image>
          </Link>

          <div className="flex items-center gap-5 cursor-pointer text-black">
            {session && session.user ? (
              <>
                <Link href={"/startup/create"}>
                  <span>Create</span>
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ options: { redirect: "/",} });
                  }}
                >
                  <button type="submit">Logout</button>
                </form>
                <Link href={`/user/${session?.id}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit" className="cursor-pointer">
                  Login
                </button>
              </form>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
