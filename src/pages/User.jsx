import { FaUser } from "react-icons/fa";
import RodaPe from "../components/RodaPe";
import Navbar from "../components/Navbar";

export default function PerfilUsuario() {
  return (
    <div>
      <Navbar />

      <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
        <main className="flex justify-between p-10 bg-white flex-1">
          {/* Lateral do usuário */}
          <section className="w-1/3 flex flex-col items-center">
            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center text-5xl mb-3">
              <FaUser />
            </div>
            <h2 className="mb-7  font-bold text-2xl">João Silva</h2>
            <button className="bg-[#772583] text-white py-2 px-4 m-1 rounded shadow-md w-4/5 hover:bg-[#AD7CB5]">
              SUA LISTA DE DESEJOS
            </button>
            <button className="bg-[#772583] text-white py-2 px-4 m-1 rounded shadow-md w-4/5 hover:bg-[#AD7CB5]">
              SEUS PEDIDOS
            </button>
            <button className="bg- text-white py-2 px-4 m-1 rounded shadow-md w-4/5 hover:bg-[#AD7CB5]">
              ALTERAR DADOS PESSOAIS
            </button>
          </section>

          {/* Dados do usuário em "tabela" */}
          <section className="w-3/5 flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-5 text-[#772583] ">DADOS PESSOAIS</h3>
            <div className="border border-gray-300 rounded-md divide-y divide-gray-300 bg-white">
              <div className="flex justify-between p-3">
                <span className="font-bold text-gray-600">Nome Completo:</span>
                <span className="text-gray-800">João Silva</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="font-bold text-gray-600 text">E-mail:</span>
                <span className="text-gray-800">joao.silva@email.com</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="font-bold text-gray-600">Telefone:</span>
                <span className="text-gray-800">(11) 98765-4321</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="font-bold text-gray-600">Nacionalidade:</span>
                <span className="text-gray-800">Brasileira</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="font-bold text-gray-600">Documento:</span>
                <span className="text-gray-800">123.456.789-00</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      <RodaPe />
    </div>
  );
}
