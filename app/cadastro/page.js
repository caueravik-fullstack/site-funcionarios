"use client";

import { useState } from "react";
import Header from "@/components/sections/Header";

export default function Cadastro() 
{
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
    senha: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Cadastrado com sucesso!");
      setForm({ nome: "", cargo: "", email: "", telefone: "", senha: "" });
    } else {
      alert("Erro ao cadastrar");
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center pt-24 px-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

          <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">
            Cadastrar Funcionário
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              required
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              required
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

<div>
  <label className="block mb-2 text-gray-700 font-medium">
    Cadastrar como
  </label>

  <select
    required
    name="tipoUsuario"
    value={form.tipoUsuario}
    onChange={handleChange}
    className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
  >
    <option value="atleta">Atleta</option>
    <option value="tecnico">Técnico</option>
    <option value="administrador">Administrador</option>
  </select>
</div>
            <button className="bg-blue-900 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
              Cadastrar

            </button>
          </form>

        </div>
      </div>
   </> 
  );
}