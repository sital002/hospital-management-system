import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-3 bg-white py-3 text-black">
      <Link href={"/"} legacyBehavior>
        <a>Home</a>
      </Link>
      <Link href={"/sign-up"} legacyBehavior>
        <a>Sign Up</a>
      </Link>
      <Link href={"/sign-in"} legacyBehavior>
        <a>Sign In</a>
      </Link>
      <Link href={"/dashboard"} legacyBehavior>
        <a>Dashboard</a>
      </Link>
    </nav>
  );
}
