"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/sections/Header";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

          <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
            Entrar como:
          </h1>
        <div className="flex">
          <div className="bg-white 4 rounded-xl shadow-lg w-full max-w-md text-2xl text-white text-center">Atleta</div>
            <div className="bg-white 4 rounded-xl shadow-lg w-full max-w-md text-2xl text-white text-center">Tecnico</div>
          <div className="bg-white 4  rounded-xl shadow-lg w-full max-w-md text-2xl text-white text-center">Administrador</div>

          </div>

                      <button className="bg-blue-900 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
              Entrar
            </button>
            


          <p className="text-center text-gray-500 text-sm mt-4">
            Não tem conta?{" "}
            <a href="/cadastro" className="text-blue-900 font-semibold hover:underline">
              Cadastre-se
            </a>
          </p>

        </div>
      </div>
    </>
  );
}