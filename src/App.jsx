import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Carrinho from './pages/Carrinho';
import Favorito from './pages/Favorito';
import MyLoja from './pages/MyLoja';
import PerfilUsuario from './pages/User';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/favoritos" element={<Favorito />} />
            <Route path="/myloja" element={<MyLoja />} />
            <Route path="/usuario" element={<PerfilUsuario />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
