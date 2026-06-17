"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const response = await fetch("/api/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  }

  function abrirEdicao(usuario) {
    setEditando(usuario.id);
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      posicao: usuario.posicao || "",
      altura: usuario.altura || "",
      peso: usuario.peso || "",
      funcao: usuario.funcao,
    });
  }

  async function salvarEdicao() {
    setSalvando(true);
    const token = localStorage.getItem("token");

    const rotas = {
      atleta: "/api/atleta",
      tecnico: "/api/tecnico",
      administrador: "/api/adminstrador",
    };

    const rota = rotas[form.funcao];

    const response = await fetch(rota, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: editando, ...form }),
    });

    setSalvando(false);

    if (response.ok) {
      setEditando(null);
      carregarUsuarios();
    } else {
      alert("Erro ao salvar.");
    }
  }

  async function excluirUsuario(usuario) {
    const confirmar = confirm("Deseja realmente excluir este usuário?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    const rotas = {
      atleta: "/api/atleta",
      tecnico: "/api/tecnico",
      administrador: "/api/adminstrador",
    };

    const rota = rotas[usuario.funcao];

    try {
      const response = await fetch(rota, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: usuario.id }),
      });
      if (response.ok) carregarUsuarios();
    } catch (error) {
      console.error(error);
    }
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nomeMatch = usuario.nome?.toLowerCase().includes(busca.toLowerCase());
    const funcaoMatch = filtro === "" ? true : usuario.funcao === filtro;
    return nomeMatch && funcaoMatch;
  });

  const atletas = usuarios.filter((u) => u.funcao === "atleta").length;
  const tecnicos = usuarios.filter((u) => u.funcao === "tecnico").length;
  const administradores = usuarios.filter((u) => u.funcao === "administrador").length;

  function corFuncao(funcao) {
    switch (funcao) {
      case "atleta": return "bg-green-100 text-green-700 border border-green-200";
      case "tecnico": return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "administrador": return "bg-blue-100 text-blue-700 border border-blue-200";
      default: return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition";

  return (
    <div className="p-8 space-y-8">

      <div>
        <h1 className="text-3xl font-black text-[#1a1a2e]">Gerenciar Usuários</h1>
        <p className="text-gray-400 mt-1 text-sm">Visualize, filtre e gerencie os usuários do sistema.</p>
      </div>

      <Breadcrumb />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Total</p>
          <p className="text-4xl font-black text-[#1a1a2e]">{usuarios.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Atletas</p>
          <p className="text-4xl font-black text-green-600">{atletas}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Técnicos</p>
          <p className="text-4xl font-black text-yellow-500">{tecnicos}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Admins</p>
          <p className="text-4xl font-black text-blue-600">{administradores}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Pesquisar usuário..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition"
        >
          <option value="" className="rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50">Filtrar por:</option>
          <option value="atleta" className="rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50">Atletas</option>
          <option value="tecnico" className="rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50">Técnicos</option>
          <option value="administrador" className="rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50">Administradores</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Nome</th>
              <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Email</th>
              <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Função</th>
              <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <>
                <tr key={usuario.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-[#1a1a2e]">{usuario.nome}</td>
                  <td className="p-4 text-gray-500 text-sm">{usuario.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${corFuncao(usuario.funcao)}`}>
                      {usuario.funcao}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => abrirEdicao(usuario)}
                      className="bg-[#1a1a2e] text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#252544] transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirUsuario(usuario)}
                      className="bg-red-50 border border-red-200 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-red-100 transition"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>

                {editando === usuario.id && (
                  <tr key={`edit-${usuario.id}`} className="bg-yellow-50 border-t border-yellow-100">
                    <td colSpan={4} className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div>
                          <label className="text-xs text-gray-500 font-semibold mb-1 block">Nome</label>
                          <input className={inputClass} value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 font-semibold mb-1 block">Email</label>
                          <input className={inputClass} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        </div>
                        {form.funcao === "atleta" && (
                          <>
                            <div>
                              <label className="text-xs text-gray-500 font-semibold mb-1 block">Posição</label>
                              <input className={inputClass} value={form.posicao} onChange={e => setForm({...form, posicao: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 font-semibold mb-1 block">Altura (m)</label>
                              <input type="number" step="0.01" className={inputClass} value={form.altura} onChange={e => setForm({...form, altura: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 font-semibold mb-1 block">Peso (kg)</label>
                              <input type="number" className={inputClass} value={form.peso} onChange={e => setForm({...form, peso: e.target.value})} />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={salvarEdicao}
                          disabled={salvando}
                          className="bg-green-600 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-green-700 transition disabled:opacity-50"
                        >
                          {salvando ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                          onClick={() => setEditando(null)}
                          className="bg-gray-100 text-gray-500 px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition"
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}