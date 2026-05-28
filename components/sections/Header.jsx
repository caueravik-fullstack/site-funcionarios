"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  const menuItems = [
    { nome: "Início", href: "/" },
    { nome: "Mensagens", href: "/mensagens" },
    { nome: "Dashboard", href: "/dashboard" },
    { nome: "Cadastrar", href: "/cadastro" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-8xl mx-auto px-8">
        <div className="flex justify-between items-center py-4">

          <Link href="/" className="flex items-center gap-3">
            <img
              src="/imagens/logow.png"
              alt="Logo"
              width={90}
              height={40}
              className="rounded-full"
            />
            <h1 className="font-bold text-blue-900 text-lg">
              WorkSync
            </h1>
          </Link>

          <nav className="flex gap-4 font-medium items-center">

            <div className="relative">
              <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="text-gray-600 hover:text-blue-900 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Menu
                <span
                  className={`inline-block transition-transform duration-300 ${
                    menuAberto ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {menuAberto && (
                <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl w-52 py-2 border border-gray-100 animate-in fade-in zoom-in duration-200">

                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuAberto(false)}
                      className={`block px-4 py-3 transition-all duration-200 ${
                        pathname === item.href
                          ? "text-blue-900 font-bold bg-blue-50"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                      }`}
                    >
                      {item.nome}
                    </Link>
                  ))}

                </div>
              )}
            </div>

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