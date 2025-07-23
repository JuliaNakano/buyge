import { FaHeart, FaShoppingCart, FaUser, FaBars, FaSearch } from 'react-icons/fa';
import { useState } from "react";



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [clickedIcon1, setClickedIcon1] = useState(false);
  const [clickedIcon2, setClickedIcon2] = useState(false);
  const [clickedIcon3, setClickedIcon3] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);

  const handleSearchClick = () => {
    setSearch('');
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

  const handleLogoClick = () => {
    setLogoClicked(true);
    setTimeout(() => {
      setLogoClicked(false);
      window.location.href = "/"; // Redireciona para a página inicial
    }, 300);
  };

  const handleIcon1Click = () => {
    setClickedIcon1(true);
    setTimeout(() => {
      setClickedIcon1(false);
      window.location.href = "/favoritos"; // Redireciona para a página de favoritos
      }, 300);
  };

    const handleIcon2Click = () => {
    setClickedIcon2(true);
    setTimeout(() => {
      setClickedIcon2(false);
      window.location.href = "/carrinho"; // Redireciona para a página do carrinho
      }, 300);
  };
    const handleIcon3Click = () => {
    setClickedIcon3(true);
    setTimeout(() => {
      setClickedIcon3(false);
      window.location.href = "/usuario"; // Redireciona para a página do usuário
      }, 300);
  };
      
      // Redireciona para a rota correta
    /**
      const handleIconClick = (path) => {
      if (isUserLoggedIn()) {
        window.location.href = path;  // Usuário logado, vai para a rota correta
      } else {
        window.location.href = "/login"; // Não está logado, vai para login
      }
    };
    */
 

  return (
    <nav className="bg-[#772583] text-white px-6 py-3">
      {/* Linha superior: Logo + busca + ícones */}
      <div className="flex items-center justify-between gap-4">
        <img
          src="/logo.png"
          alt="BuyGe Logo"
          onClick={handleLogoClick}
          className={`h-10 w-auto cursor-pointer transition-transform duration-300 
          ${logoClicked ? 'scale-110' : 'scale-100'}`}
        />

        <div className="flex-1 mx-6 relative">
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-2 rounded-md bg-purple-100 text-purple-900 focus:outline-none"
          />
          <FaSearch
            onClick={handleSearchClick}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-[#772583] cursor-pointer transition-transform duration-150 ${clicked ? 'scale-75' : 'scale-100'}`}
          />
        </div>

              {/* Ícones */}
        <div className="flex items-center gap-6 text-xl">
          <FaHeart
            onClick={() => handleIcon1Click("/favoritos")}
            className={`cursor-pointer transition-transform duration-200 hover:text-purple-300 ${
              clickedIcon1 ? "scale-90" : "scale-100"
            }`}
          />
          <FaShoppingCart
            onClick={() => handleIcon2Click("/carrinho")}
            className={`cursor-pointer transition-transform duration-200 hover:text-purple-300 ${
              clickedIcon2 ? "scale-90" : "scale-100"
            }`}
          />
          <FaUser
            onClick={() => handleIcon3Click("/usuario")}
            className={`cursor-pointer transition-transform duration-200 hover:text-purple-300 ${
              clickedIcon3 ? "scale-90" : "scale-100"
            }`}
          />
        </div>
      </div>

      {/* Linha inferior: menu de categorias */}
      <div className="mt-3 flex items-center gap-6 text-sm relative">
        <div className="relative">
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
            <span className="font-semibold">Todas as categorias</span>
          </button>

          {menuOpen && (
            <div className="absolute top-8 left-0 bg-[#772583] shadow-md rounded-md p-2 flex flex-col gap-2 w-56 z-50">
              <a href="#" className="flex justify-between hover:text-purple-300">eletrônicos <span>&gt;</span></a>
              <a href="#" className="flex justify-between hover:text-purple-300">cosplays <span>&gt;</span></a>
              <a href="#" className="flex justify-between hover:text-purple-300">canecas <span>&gt;</span></a>
              <a href="#" className="flex justify-between hover:text-purple-300">capinhas para celular <span>&gt;</span></a>
              <a href="#" className="flex justify-between hover:text-purple-300">lentes de contato <span>&gt;</span></a>
            </div>
          )}
        </div>
        <span className="cursor-pointer hover:text-purple-300">One Piece</span>
        <span className="cursor-pointer hover:text-purple-300">Solo Leveling</span>
        <span className="cursor-pointer hover:text-purple-300">Dandandan</span>
        <span className="cursor-pointer hover:text-purple-300">To be hero x</span>
        <span className="cursor-pointer hover:text-purple-300">Naruto</span>
      </div>
    </nav>
  );
};

export default Navbar;
