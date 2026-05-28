"use client";
import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";

export default function Mensagens() {
  const [mensagens, setMensagens] = useState([]);

async function carregarMensagens() {
  const response = await fetch("/api/mensagens");
  const data = await response.json();
  console.log(data);
  setMensagens(Array.isArray(data) ? data : []);
}

  useEffect(() => {
    carregarMensagens();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          Mensagens Recebidas
        </h1>

        <div className="grid gap-4">
          {mensagens.length === 0 ? (
            <p className="text-gray-500">Nenhuma mensagem recebida ainda.</p>
          ) : (
            mensagens.map((msg) => (
              <div key={msg.msg} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-blue-900 text-lg">{msg.nome}</h2>
                  <span className="text-gray-400 text-sm">
                    {new Date(msg.data).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3">{msg.email}</p>
                <p className="text-gray-700">{msg.mensagem}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}