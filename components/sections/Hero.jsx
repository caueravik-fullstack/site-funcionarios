import Container from "../UI/Container";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/imagens/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 opacity-95"></div>

      <Container>
        <div className="relative text-center max-w-3xl mx-auto">

          <span className="inline-block bg-blue-700 text-blue-100 text-sm font-medium px-4 py-1 rounded-full mb-6 tracking-wide">
            Sistema de Gestão de Funcionários
          </span>

          <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Gerencie sua equipe{" "}
            <span className="text-blue-500">com simplicidade</span>
          </h1>

          <p className="mb-10 text-lg text-blue-200 leading-relaxed">
            Cadastre, organize e acompanhe seus funcionários em um só lugar.
            Simples, rápido e eficiente.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/cadastro">
              <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-lg hover:bg-blue-100 transition shadow-lg">
                Cadastrar Funcionário
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition">
                Ver Dashboard
              </button>
            </Link>
          </div>

        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-300 text-2xl">
        ↓
      </div>
    </section>
  );
}