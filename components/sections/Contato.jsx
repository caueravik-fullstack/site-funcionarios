"use client";
import { useState } from "react";
import Container from "../UI/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/mensagens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Mensagem enviada com sucesso!");
      setForm({ nome: "",
                email: "",
                mensagem: "" });
    } else {
      alert("Erro ao enviar mensagem.");
    }
  }

  return (
    <section id="contato" className="py-24 bg-blue-950 text-white">
      <Container>
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-14">
            <span className="inline-block bg-blue-800 text-blue-200 text-sm font-medium px-4 py-1 rounded-full mb-4">
              Fale Conosco
            </span>
            <h2 className="text-4xl font-extrabold mb-4">Entre em Contato</h2>
            <p className="text-blue-300">Estamos prontos para te atender.</p>
          </div>

          {/* Cards de contato */}
          <div className="grid grid-cols-3 gap-6 mb-14">
            <div className="bg-blue-900 rounded-2xl p-6 text-center hover:bg-blue-800 transition">
              <div className="mb-4 flex justify-center">
                <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-blue-300 text-sm">wsync@yahoo.com</p>
            </div>

            <div className="bg-blue-900 rounded-2xl p-6 text-center hover:bg-blue-800 transition">
              <div className="mb-4 flex justify-center">
                <FontAwesomeIcon icon={faPhone} className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Telefone</h3>
              <p className="text-blue-300 text-sm">(88) 9900-4321</p>
            </div>

            <div className="bg-blue-900 rounded-2xl p-6 text-center hover:bg-blue-800 transition">
              <div className="mb-4 flex justify-center">
                <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instagram</h3>
              <p className="text-blue-300 text-sm">@WorkSync-ofc</p>
            </div>
          </div>

          <div className="bg-blue-900 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Fale Conosco</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full bg-blue-800 border border-blue-700 p-3 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Seu email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-blue-800 border border-blue-700 p-3 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                required
                name="mensagem"
                placeholder="Sua mensagem"
                value={form.mensagem}
                onChange={handleChange}
                rows={4}
                className="w-full bg-blue-800 border border-blue-700 p-3 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
              <button className="bg-white text-blue-900 font-bold py-3 rounded-lg hover:bg-blue-100 transition">
                Enviar Mensagem
              </button>
            </form>
          </div>

        </div>
      </Container>
    </section>
  );
}