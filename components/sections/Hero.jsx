import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen flex items-end justify-start text-white"
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mb-12 ml-14 flex gap-4">
        <Link
          href="/login"
          className="bg-yellow-400 text-[#1a1a2e] font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition shadow-lg"
        >
          Acessar Sistema
        </Link>
        <Link
          href="/cadastro"
          className="border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition"
        >
          Cadastrar-se
        </Link>
      </div>

    </section>
  );
}