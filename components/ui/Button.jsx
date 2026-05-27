//BOTÃO PADRÃO REUTILIZÁVEL
export default function Button ({children}){
    return (
        <button className="bg-green-800 text-white px-6 py-3 rounded-x1 font-semibold hover:scale-105 transition">
            {children}
        </button>
    );
}
