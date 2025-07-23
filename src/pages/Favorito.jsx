import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import RodaPe from '../components/RodaPe';
import { useNavigate } from 'react-router-dom'; 

const Favorito = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      category: 'One Piece',
      name: 'Camiseta Luffy Gear 5',
      seller: 'AnimeStore',
      price: 'R$ 79,90',
      img: '/funkoPop.jpg'
    },
    {
      id: 2,
      category: 'Solo Leveling',
      name: 'Poster Jin-Woo',
      seller: 'PostersInc',
      price: 'R$ 29,90',
      img: '/images/poster-jinwoo.jpg'
    },
    {
      id: 3,
      category: 'Dandadan',
      name: 'Action Figure Momo',
      seller: 'Figurines',
      price: 'R$ 149,90',
      img: '/images/figure-momo.jpg'
    },
    {
      id: 4,
      category: 'To be hero x',
      name: 'Caneca Exclusiva',
      seller: 'MugShop',
      price: 'R$ 39,90',
      img: '/images/caneca-hero.jpg'
    },
  ]);

  const removeFavorite = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="flex flex-col min-h-screen">
       <Navbar />

        {/* Sidebar */}
       <div className="flex flex-1">
        <aside className="w-64 bg-[#AD7CB5] p-5 text-white">
          <div className="mb-6 text-xl font-semibold">Olá, Batata!</div>
          <ul className="space-y-3">
            <li className="flex items-center hover:bg-[#772583] p-2 rounded cursor-pointer"
            onClick={() => navigate('/usuario')} >
              <span className="mr-2">👤</span> Meus Dados
            </li>
            <li className="flex items-center hover:bg-[#772583] p-2 rounded cursor-pointer">
              <span className="mr-2">📍</span> Endereço
            </li>
            <li className="flex items-center hover:bg-[#772583] p-2 rounded cursor-pointer">
              <span className="mr-2">💳</span> Cartões
            </li>
            <li className="flex items-center hover:bg-[#772583] p-2 rounded cursor-pointer">
              <span className="mr-2">🛍️</span> Minhas Compras
            </li>
            <li className="flex items-center hover:bg-[#772583] p-2 rounded cursor-pointer">
              <span className="mr-2">🔒</span> Segurança
            </li>
            <li
              className="flex items-center hover:bg-[#772583] p-2 rounded cursor-pointer"
              onClick={() => navigate('/myloja')} // REDIRECIONA PARA /minha-loja
            >
              <span className="mr-2">🏬</span> Minha Loja Virtual
            </li>
          </ul>
        </aside>
       
        {/* Conteúdo principal */}
        <main className="flex-1 p-6 bg-purple-50 flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-[#772583]">Meus Favoritos</h1>

          {/* Grid de produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                  <FaTimes />
                </button>

                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />

                <div className="p-4">
                  <p className="text-sm">{product.category}</p>
                  <p className="font-semibold mt-1">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.seller}</p>
                  <p className="font-bold mt-2">{product.price}</p>

                  <button className="w-full mt-3 bg-[#AD7CB5] hover:bg-[#772583] text-white py-2 rounded-md transition-colors">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <RodaPe />
    </div>
  );
};

export default Favorito;
