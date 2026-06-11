"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  const cadastro = [
    { nome: "Cadastrar", href: "/cadastro" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-8xl mx-auto px-8">
        <div className="flex justify-between items-center py-4">

          <Link href="/" className="flex items-center gap-3">
            <h1 className="font-bold text-blue-900 text-lg">
              Time de futebol
            </h1>
          </Link>

          <nav className="flex gap-4 font-medium items-center">

                       <Link
              href="/cadastro"
              className={`px-5 py-2 rounded-lg transition font-semibold ${
                pathname === "/cadastro"
                  ? "bg-blue-800 text-white"
                  : "bg-gray-400 text-white hover:bg-gray-400"
              }`}
            >
              Cadastrar-se
            </Link>

            <Link
              href="/login"
              className={`px-5 py-2 rounded-lg transition font-semibold ${
                pathname === "/login"
                  ? "bg-blue-800 text-white"
                  : "bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              Login
            </Link>

          </nav>
        </div>
      </div>
    </header>
  );
}