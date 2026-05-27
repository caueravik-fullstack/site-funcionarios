"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");

  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
  }, []);
  

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase()) ||
    u.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  async function carregarUsuarios() {
    const response = await fetch("/api/usuarios");
    const data = await response.json();
    setUsuarios(data);
  }

  async function excluirUsuario(id) {
    await fetch("/api/usuarios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    carregarUsuarios();
  }

  async function editarUsuario(usuario) {
    await fetch("/api/usuarios", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    carregarUsuarios();
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-24 px-8 max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900">
            Dashboard de Funcionários
          </h1>
          <input
            type="text"
            placeholder="Buscar por nome ou cargo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 w-72"
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Cargo</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Telefone</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    Nenhum funcionário encontrado.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">{usuario.nome}</td>
                    <td className="p-4">{usuario.cargo}</td>
                    <td className="p-4">{usuario.email}</td>
                    <td className="p-4">{usuario.telefone}</td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">

                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                              Editar
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-96">
                              <h2 className="text-blue-900 text-xl font-bold mb-4">Editar Funcionário</h2>
                              <div className="flex flex-col gap-3">
                                <input
                                  className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                  defaultValue={usuario.nome}
                                  onChange={(e) => usuario.nome = e.target.value}
                                  placeholder="Nome"
                                />
                                <input
                                  className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                  defaultValue={usuario.cargo}
                                  onChange={(e) => usuario.cargo = e.target.value}
                                  placeholder="Cargo"
                                />
                                <input
                                  className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                  defaultValue={usuario.email}
                                  onChange={(e) => usuario.email = e.target.value}
                                  placeholder="Email"
                                />
                                <input
                                  className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                  defaultValue={usuario.telefone}
                                  onChange={(e) => usuario.telefone = e.target.value}
                                  placeholder="Telefone"
                                />
                                <div className="flex gap-3 mt-2">
                                  <Dialog.Close asChild>
                                    <button
                                      onClick={() => editarUsuario(usuario)}
                                      className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition flex-1"
                                    >
                                      Salvar
                                    </button>
                                  </Dialog.Close>
                                  <Dialog.Close asChild>
                                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex-1">
                                      Cancelar
                                    </button>
                                  </Dialog.Close>
                                </div>
                              </div>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>

                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                              Excluir
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
                              <h2 className="text-gray-800 text-xl font-bold mb-2">Deseja excluir?</h2>
                              <p className="text-gray-500 mb-4">Essa ação não pode ser desfeita.</p>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => excluirUsuario(usuario.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex-1"
                                >
                                  Confirmar
                                </button>
                                <Dialog.Close asChild>
                                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex-1">
                                    Cancelar
                                  </button>
                                </Dialog.Close>
                              </div>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}