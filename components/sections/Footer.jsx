import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white pt-16 pb-8 border-t border-yellow-400/10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-3 gap-10 mb-12">

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image src="/logobrasil.png" alt="CBF" width={40} height={40} />
              <h2 className="font-black text-xl text-white">CBF</h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Confederação Brasileira de Futebol — gestão oficial de atletas
              e comissão técnica da Seleção Brasileira.
            </p>
            <p className="text-white/40 text-sm mt-3">Rio de Janeiro, RJ</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-yellow-400 text-sm tracking-widest uppercase">Links Úteis</h3>
            <ul className="flex flex-col gap-3 text-white/50 text-sm">
              <li>
                <Link href="#sobre" className="hover:text-yellow-400 transition">Sobre a CBF</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-yellow-400 transition">Acessar Sistema</Link>
              </li>
              <li>
                <Link href="/cadastro" className="hover:text-yellow-400 transition">Cadastrar-se</Link>
              </li>
              <li>
                <Link href="#contato" className="hover:text-yellow-400 transition">Contato</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-yellow-400 text-sm tracking-widest uppercase">Contato</h3>
            <div className="flex flex-col gap-3 text-white/50 text-sm">
              <p>(21) 3398-3000</p>
              <p>contato@cbf.com.br</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 flex justify-between items-center text-white/40 text-sm">
          <div className="gap-2.5">
            <a href="https://www.cbf.com.br/termos-de-uso" className="ml-3 mr-3 hover:color-white transition">Termos de Uso</a>
            <a href="https://www.cbf.com.br/politica-de-privacidade" className="ml-3 mr-3 hover:color-white transition">Política de Privacidade</a>
            <a href="https://www.cbf.com.br/politica-de-cookies" className="ml-3 mr-3 hover:color-white transition">Política de Cookies</a>
          </div>
          <p>Confederação Brasileira de Futebol © Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}