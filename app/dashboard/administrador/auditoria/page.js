"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
export default function AuditoriaPage() {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registroSelecionado, setRegistroSelecionado] = useState(null);

  useEffect(() => {
    buscarAuditoria();
  }, []);

  async function buscarAuditoria() {
    try {
      const response = await fetch("/api/auditoria");
      const data = await response.json();
      setAuditorias(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function corOperacao(operacao) {
    switch (operacao) {
      case "INSERT": return "bg-green-100 text-green-700 border border-green-200";
      case "UPDATE": return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "DELETE": return "bg-red-100 text-red-700 border border-red-200";
      default: return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-[2px] bg-yellow-400" />
          <span className="text-yellow-600 text-xs font-semibold tracking-widest uppercase">Sistema</span>
        </div>
        <h1 className="text-3xl font-black text-[#1a1a2e]">Histórico de Auditoria</h1>
      </div>

      <Breadcrumb pagina="Auditoria" />

      <div className="bg-white border border-gray-100 rounded-2xl overflow-x-auto shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-4 text-left text-gray-400 text-xs font-semibold tracking-widest uppercase">ID</th>
              <th className="p-4 text-left text-gray-400 text-xs font-semibold tracking-widest uppercase">Tabela</th>
              <th className="p-4 text-left text-gray-400 text-xs font-semibold tracking-widest uppercase">Operação</th>
              <th className="p-4 text-left text-gray-400 text-xs font-semibold tracking-widest uppercase">Usuário</th>
              <th className="p-4 text-left text-gray-400 text-xs font-semibold tracking-widest uppercase">Data</th>
              <th className="p-4 text-center text-gray-400 text-xs font-semibold tracking-widest uppercase">Detalhes</th>
            </tr>
          </thead>

          <tbody>
            {auditorias.map((item) => (
              <tr key={item.id_auditoria} className="border-t border-gray-50 hover:bg-gray-50 transition">
                <td className="p-4 text-gray-400 text-sm">#{item.id_auditoria}</td>
                <td className="p-4 text-[#1a1a2e] font-medium">{item.tabela}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${corOperacao(item.operacao)}`}>
                    {item.operacao}
                  </span>
                </td>
                <td className="p-4 text-gray-600 text-sm">{item.usuario}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {new Date(item.data_hora).toLocaleString("pt-BR")}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setRegistroSelecionado(item)}
                    className="bg-[#1a1a2e] text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#252544] transition"
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {registroSelecionado && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white border border-gray-100 w-full max-w-4xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto shadow-xl">

            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-[2px] bg-yellow-400" />
                  <span className="text-yellow-600 text-xs font-semibold tracking-widest uppercase">Auditoria</span>
                </div>
                <h2 className="text-xl font-black text-[#1a1a2e]">Detalhes do Registro</h2>
              </div>
              <button
                onClick={() => setRegistroSelecionado(null)}
                className="bg-gray-100 text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-full text-sm transition"
              >
                Fechar
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">Dados Antigos</p>
                <pre className="bg-gray-50 border border-gray-100 p-4 rounded-xl overflow-auto text-sm text-gray-600 font-mono">
                  {JSON.stringify(registroSelecionado.dados_antigos, null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">Dados Novos</p>
                <pre className="bg-gray-50 border border-gray-100 p-4 rounded-xl overflow-auto text-sm text-gray-600 font-mono">
                  {JSON.stringify(registroSelecionado.dados_novos, null, 2)}
                </pre>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}