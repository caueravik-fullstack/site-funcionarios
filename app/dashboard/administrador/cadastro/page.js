"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useState } from "react";

export default function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoUsuario: "atleta",
    peso: "",
    altura: "",
    posicao: "",
  });

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMensagem({ texto: "Usuário cadastrado com sucesso!", tipo: "sucesso" });
      setFormData({ nome: "", email: "", senha: "", tipoUsuario: "atleta", peso: "", altura: "", posicao: "" });
    } catch (error) {
      setMensagem({ texto: error.message, tipo: "erro" });
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition";
  const labelClass = "block mb-1.5 text-sm font-semibold text-gray-600";

  return (
    <div className="p-8 max-w-2xl mx-auto">

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-[2px] bg-yellow-400" />
          <span className="text-yellow-600 text-xs font-semibold tracking-widest uppercase">Administração</span>
        </div>
        <h1 className="text-3xl font-black text-[#1a1a2e]">Novo Cadastro</h1>
      </div>

      <Breadcrumb pagina="Cadastrar" />

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 space-y-5">

        <div>
          <label className={labelClass}>Tipo de Usuário</label>
          <select
            name="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="atleta">Atleta</option>
            <option value="tecnico">Técnico</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        {formData.tipoUsuario === "atleta" && (
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-100">
            <div>
              <label className={labelClass}>Peso (kg)</label>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Altura (m)</label>
              <input
                type="number"
                step="0.01"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Posição</label>
              <input
                type="text"
                name="posicao"
                value={formData.posicao}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1a1a2e] text-white py-3 rounded-lg font-semibold hover:bg-[#252544] transition disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {mensagem.texto && (
          <p className={`text-center text-sm font-semibold py-2 px-4 rounded-lg ${
            mensagem.tipo === "sucesso"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}>
            {mensagem.texto}
          </p>
        )}

      </form>
    </div>
  );
}