import Container from "../UI/Container";

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <span className="inline-block bg-blue-100 text-blue-900 text-sm font-medium px-4 py-1 rounded-full mb-4">
              Quem Somos
            </span>
            <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
              Sobre a Empresa
            </h2>
            <div className="w-16 h-1 bg-blue-900 rounded mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Somos uma empresa dedicada à formação e desenvolvimento de profissionais,
                conectando talentos às melhores oportunidades do mercado.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Nosso sistema foi criado para simplificar a gestão de equipes,
                permitindo cadastrar, organizar e acompanhar funcionários de forma
                rápida e eficiente.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-extrabold text-blue-900 mb-2">+100</p>
                <p className="text-gray-500 text-sm">Funcionários Cadastrados</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-extrabold text-blue-900 mb-2">+10</p>
                <p className="text-gray-500 text-sm">Anos de Experiência</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-extrabold text-blue-900 mb-2">+50</p>
                <p className="text-gray-500 text-sm">Projetos Realizados</p>
              </div>
              <div className="bg-blue-900 rounded-2xl p-6 text-center">
                <p className="text-4xl font-extrabold text-white mb-2">100%</p>
                <p className="text-blue-200 text-sm">Satisfação dos Clientes</p>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}