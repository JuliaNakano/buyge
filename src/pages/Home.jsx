import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import RodaPe from '../components/RodaPe';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    'https://via.placeholder.com/1200x400/772583/ffffff?text=Promoção+1',
    'https://via.placeholder.com/1200x400/9d3dac/ffffff?text=Promoção+2',
    'https://via.placeholder.com/1200x400/772583/ffffff?text=Promoção+3'
  ];

  const products = [
    { id: 1, name: 'Produto 01', price: 'R$ 99,90', image: '/funkoPop.jpg' },
    { id: 2, name: 'Produto 02', price: 'R$ 99,90', image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Produto 03', price: 'R$ 99,90', image: 'https://via.placeholder.com/200' },
    { id: 4, name: 'Produto 04', price: 'R$ 99,90', image: 'https://via.placeholder.com/200' },
    { id: 5, name: 'Produto 05', price: 'R$ 99,90', image: 'https://via.placeholder.com/200' },
    { id: 6, name: 'Produto 06', price: 'R$ 99,90', image: 'https://via.placeholder.com/200' }
  ];

  const [ofertasIndex, setOfertasIndex] = useState(0);
  const [produtosIndex, setProdutosIndex] = useState(0);
  const itemsPerPage = 4;

  const nextOfertas = () => {
    setOfertasIndex((prev) => (prev + itemsPerPage) % products.length);
  };
  const prevOfertas = () => {
    setOfertasIndex((prev) => (prev - itemsPerPage + products.length) % products.length);
  };

  const nextProdutos = () => {
    setProdutosIndex((prev) => (prev + itemsPerPage) % products.length);
  };
  const prevProdutos = () => {
    setProdutosIndex((prev) => (prev - itemsPerPage + products.length) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentItems = (startIndex) => {
    const end = startIndex + itemsPerPage;
    return products.slice(startIndex, end).concat(
      end > products.length ? products.slice(0, end - products.length) : []
    );
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <div className="bg-gray-100 text-gray-800">
        <main>
          {/* Carrossel principal */}
          <section className="relative w-full h-96 overflow-hidden">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselImages.map((img, index) => (
                <div key={index} className="min-w-full h-full">
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? carouselImages.length - 1 : prev - 1
                )
              }
              className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-[#772583]/50 text-white p-4 rounded-full"
            >
              <FaChevronLeft size="1.5rem" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === carouselImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-[#772583]/50 text-white p-4 rounded-full"
            >
              <FaChevronRight size="1.5rem" />
            </button>
          </section>

          {/* Ofertas */}
          <section className="py-8 px-5 lg:px-20 relative">
            <h2 className="text-3xl text-[#772583] mb-8 font-bold">Ofertas</h2>
            <div className="flex items-center">
              <button onClick={prevOfertas} className="p-2">
                <FaChevronLeft size="1.5rem" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                {getCurrentItems(ofertasIndex).map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                  >
                    {/* Ícone de favorito no canto inferior direito */}
                    <button
                      className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                      aria-label="Favoritar"
                      type="button"
                    >
                      <FaHeart size={24} />
                    </button>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <h3 className="p-4 text-xl">{product.name}</h3>
                    <p className="px-4 pb-4 font-bold text-[#772583] text-xl">{product.price}</p>
                  </div>
                ))}
              </div>
              <button onClick={nextOfertas} className="p-2">
                <FaChevronRight size="1.5rem" />
              </button>
            </div>
          </section>

          {/* Produtos */}
          <section className="py-8 px-5 lg:px-20 relative">
            <h2 className="text-3xl text-[#772583] mb-8 font-bold">Produtos</h2>
            <div className="flex items-center">
              <button onClick={prevProdutos} className="p-2">
                <FaChevronLeft size="1.5rem" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                {getCurrentItems(produtosIndex).map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                  >
                    {/* Ícone de favorito no canto inferior direito */}
                    <button
                      className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                      aria-label="Favoritar"
                      type="button"
                    >
                      <FaHeart size={24} />
                    </button>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <h3 className="p-4 text-xl">{product.name}</h3>
                    <p className="px-4 pb-4 font-bold text-[#772583] text-xl">{product.price}</p>
                  </div>
                ))}
              </div>
              <button onClick={nextProdutos} className="p-2">
                <FaChevronRight size="1.5rem" />
              </button>
            </div>
          </section>
        </main>
      </div>
      <RodaPe />
    </div>
  );
};

export default Home;
