"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nomes = {
  dashboard: "Dashboard",
  administrador: "Administrador",
  atleta: "Atleta",
  tecnico: "Técnico",
  auditoria: "Auditoria",
  cadastro: "Cadastro",
  usuarios: "Usuários",
  configuracoes: "Configurações",
  mensagens: "Mensagens",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segmentos = pathname.split("/").filter(Boolean).filter(seg => nomes[seg] !== null);

  return (
    <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap">
      <Link href="/" className="text-gray-400 hover:text-[#1a1a2e] font-medium transition">
        Início
      </Link>

      {segmentos.map((seg, index) => {
        const href = "/" + segmentos.slice(0, index + 1).join("/");
        const isUltimo = index === segmentos.length - 1;
        const nome = nomes[seg] || seg;

        return (
          <span key={href} className="flex items-center gap-1.5">
            <span className="text-gray-300">/</span>
            {isUltimo ? (
              <span className="text-yellow-600 font-semibold">{nome}</span>
            ) : (
              <Link href={href} className="text-gray-400 hover:text-[#1a1a2e] font-medium transition">
                {nome}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}