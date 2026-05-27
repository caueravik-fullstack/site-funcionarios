import Container from "../UI/Container";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-3 gap-10 mb-12">

          <div>
            <h2 className="font-bold text-xl mb-3 text-white">WorkSync</h2>
            <p className="text-blue-300 text-sm leading-relaxed">
              Sistema de gestão de funcionários simples, rápido e eficiente.
            </p>
            <p className="text-blue-400 text-sm mt-3">📍 Limoeiro do Norte - CE</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Links Úteis</h3>
            <ul className="flex flex-col gap-3 text-blue-300 text-sm">
              <li>
                <Link href="#sobre" className="hover:text-white transition">Nossa Empresa</Link>
              </li>
              <li>
                <Link href="/cadastro" className="hover:text-white transition">Cadastrar Funcionário</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Contato</h3>
            <div className="flex flex-col gap-3 text-blue-300 text-sm">
              <p>📞 (88) 9900-4321</p>
              <p>📧 wsync@yahoo.com</p>
            </div>


          </div>

        </div>

        <div className="border-t border-blue-800 pt-6 flex justify-between items-center text-blue-400 text-sm">
          <p>© 2025 WorkSync. Todos os direitos reservados.</p>
          <p></p>
        </div>
      </Container>
    </footer>
  );
}