"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/login">login</Link>
    </nav>
  );
}
