"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function DashboardAdministrador() {
  const [stats, setStats] = useState(null);



  useEffect(() => {
    async function carregarStats() {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    }
    carregarStats();
  }, []);

  if (!stats) {
    return (
      <div className="p-8 space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (

    
    

    <div className="p-8 space-y-8">

      <div>
        <h1 className="text-3xl font-black text-[#1a1a2e]">Dashboard Administrativo</h1>
        <p className="text-gray-400 mt-1 text-sm">Gerencie usuários, monitore auditorias e acompanhe as atividades do sistema.</p>
      </div>
      <Breadcrumb pagina="Dashboard" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Usuários</p>
          <p className="text-4xl font-black text-[#1a1a2e]">{stats.usuarios}</p>
          <p className="text-xs text-gray-400 mt-1">Total cadastrados</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Atletas</p>
          <p className="text-4xl font-black text-green-600">{stats.atletas}</p>
          <p className="text-xs text-gray-400 mt-1">Registrados</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Técnicos</p>
          <p className="text-4xl font-black text-yellow-500">{stats.tecnicos}</p>
          <p className="text-xs text-gray-400 mt-1">Registrados</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Admins</p>
          <p className="text-4xl font-black text-blue-600">{stats.administradores}</p>
          <p className="text-xs text-gray-400 mt-1">Acesso total</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Auditorias</p>
          <p className="text-4xl font-black text-purple-600">{stats.auditorias}</p>
          <p className="text-xs text-gray-400 mt-1">Eventos</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">Acesso Rápido</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/administrador/cadastro"
            className="bg-[#1a1a2e] text-white p-4 rounded-xl text-center text-sm font-semibold hover:bg-[#252544] transition"
          >
            Novo Cadastro
          </Link>
          <Link
            href="/dashboard/administrador/usuarios"
            className="bg-[#1a1a2e] text-white p-4 rounded-xl text-center text-sm font-semibold hover:bg-[#252544] transition"
          >
            Usuários
          </Link>
          <Link
            href="/dashboard/administrador/auditoria"
            className="bg-[#1a1a2e] text-white p-4 rounded-xl text-center text-sm font-semibold hover:bg-[#252544] transition"
          >
            Auditoria
          </Link>
          <Link
            href="/dashboard/administrador/configuracoes"
            className="bg-yellow-400 text-[#1a1a2e] p-4 rounded-xl text-center text-sm font-semibold hover:bg-yellow-300 transition"
          >
            Configurações
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">Recentes</p>
          <h2 className="text-lg font-black text-[#1a1a2e] mb-4">Últimos Cadastros</h2>
          <div className="space-y-3">
            {stats.ultimosUsuarios?.length ? (
              stats.ultimosUsuarios.map((usuario, index) => (
                <div key={index} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-yellow-400/10 rounded-full flex items-center justify-center text-yellow-600 font-black text-sm">
                    {usuario.nome?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a1a2e] text-sm">{usuario.nome}</p>
                    <p className="text-xs text-gray-400">{usuario.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Nenhum cadastro encontrado.</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">Histórico</p>
          <h2 className="text-lg font-black text-[#1a1a2e] mb-4">Últimas Atividades</h2>
          <div className="space-y-3">
            {stats.ultimasAuditorias?.length ? (
              stats.ultimasAuditorias.map((item, index) => (
                <div key={index} className="flex gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-1 rounded-full bg-yellow-400 self-stretch" />
                  <div>
                    <p className="font-semibold text-[#1a1a2e] text-sm">{item.descricao}</p>
                    <p className="text-xs text-gray-400">{new Date(item.data_hora).toLocaleString("pt-BR")}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Nenhuma atividade registrada.</p>
            )}
          </div>
            </div>



      </div>
              <div className="text-right">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("usuario");
                      window.location.href = "/login";
                    }}
                    className="text-sm text-gray-400 hover:text-red-500 transition font-semibold"
                  >
                    Sair da conta
                  </button>
              </div>

    </div>
  );
}