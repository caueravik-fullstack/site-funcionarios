"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const [linkAtivo, setLinkAtivo] = useState("inicio");

  const isHomePage = pathname === "/";

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center py-4">

          <Link href="/" className="flex items-center gap-3">
            <img src="imagens/logow.png" alt="Logo" width={90} height={40} className="rounded-full" />
            <h1 className="font-bold text-blue-900 text-lg">WorkSync</h1>
          </Link>

          <nav className="flex gap-4 font-medium items-center">

            <div className="relative">
              <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="text-gray-600 hover:text-blue-900 transition flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Menu
                <span className={`inline-block transition-transform duration-200 ${menuAberto ? "rotate-180" : ""}`}>▾</span>
              </button>

              {menuAberto && (
                <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl w-48 py-2 border border-gray-100">

                  {isHomePage ? (
                    <>
                      <a href="#inicio" onClick={() => { setLinkAtivo("inicio"); setMenuAberto(false); }}
                        className={`block px-4 py-2 transition ${linkAtivo === "inicio" ? "text-blue-900 font-bold bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}`}>
                        Início
                      </a>
                      <a href="#sobre" onClick={() => { setLinkAtivo("sobre"); setMenuAberto(false); }}
                        className={`block px-4 py-2 transition ${linkAtivo === "sobre" ? "text-blue-900 font-bold bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}`}>
                        Sobre
                      </a>
                      <a href="#contato" onClick={() => { setLinkAtivo("contato"); setMenuAberto(false); }}
                        className={`block px-4 py-2 transition ${linkAtivo === "contato" ? "text-blue-900 font-bold bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}`}>
                        Contato
                      </a>
                      <hr className="my-1 border-gray-100" />
                      <Link href="/login" onClick={() => setMenuAberto(false)}
                        className="block px-4 py-2 transition text-gray-700 hover:bg-blue-50 hover:text-blue-900">
                        Login
                      </Link>
                      <Link href="/cadastro" onClick={() => setMenuAberto(false)}
                        className="block px-4 py-2 transition text-gray-700 hover:bg-blue-50 hover:text-blue-900">
                        Cadastre-se
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/" onClick={() => setMenuAberto(false)}
                        className={`block px-4 py-2 transition ${pathname === "/" ? "text-blue-900 font-bold bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}`}>
                        Início
                      </Link>
                      <Link href="/cadastro" onClick={() => setMenuAberto(false)}
                        className={`block px-4 py-2 transition ${pathname === "/cadastro" ? "text-blue-900 font-bold bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}`}>
                        Cadastro
                      </Link>
                      <Link href="/dashboard" onClick={() => setMenuAberto(false)}
                        className={`block px-4 py-2 transition ${pathname === "/dashboard" ? "text-blue-900 font-bold bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}`}>
                        Dashboard
                      </Link>
                      <Link href="/mensagens" onClick={() => setMenuAberto(false)}
                        className={`block px-4 py-2 transition ${pathname === "/mensagens" ? "text-blue-900 font-bold bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"}`}>
                        Mensagens
                      </Link>
                    </>
                  )}

                </div>
              )}
            </div>

            <Link href="/login" className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition font-semibold">
              Login
            </Link>

          </nav>
        </div>
      </div>
    </header>
  );
}