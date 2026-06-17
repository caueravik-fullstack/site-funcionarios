"use client";

import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function Mensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarMensagens() {
    try {
      const response = await fetch("/api/mensagens");
      const data = await response.json();
      setMensagens(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarMensagens();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen pt-28 px-8 bg-[#f8f8f8]">
        <div className="max-w-4xl mx-auto">

          <div className="mb-8">

            <h1 className="text-3xl font-black text-[#1a1a2e]">Mensagens Recebidas</h1>
          </div>

        <Breadcrumb />

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
                  <div className="h-3 w-48 bg-gray-100 rounded mb-4" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : mensagens.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center">
              <p className="text-gray-400 text-sm">Nenhuma mensagem recebida ainda.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mensagens.map((msg) => (
                <div key={msg.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-black text-[#1a1a2e] text-base">{msg.nome}</h2>
                    <span className="text-gray-400 text-xs">
                      {new Date(msg.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-yellow-600 text-xs font-semibold mb-3">{msg.email}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{msg.mensagem}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}