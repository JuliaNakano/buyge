import { useState, useEffect } from 'react';
import { FiMail, FiLock, FiUser, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }, []);

  const validateRegister = () => {
    const errors = {};
    if (!registerData.name) errors.name = 'Nome é obrigatório';
    if (!registerData.email) errors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) errors.email = 'Email inválido';
    if (!registerData.password) errors.password = 'Senha é obrigatória';
    else if (registerData.password.length < 6) errors.password = 'Senha deve ter pelo menos 6 caracteres';
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mockRegister = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.some(u => u.email === userData.email)) {
          reject(new Error('Email já cadastrado'));
        } else {
          users.push(userData);
          localStorage.setItem('users', JSON.stringify(users));
          resolve({ success: true });
        }
      }, 1500);
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsRegistering(true);
    setRegisterErrors({});
    
    try {
      await mockRegister({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      });
      setRegisterSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setRegisterErrors({ apiError: error.message });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="font-sans flex justify-center items-center min-h-screen bg-gradient-to-br from-[#ffcbff] to-[#d8a0ff] p-4">
      <div className="w-[800px] flex shadow-xl rounded-xl overflow-hidden bg-white p-8">
        {registerSuccess ? (
          <div className="flex flex-col items-center justify-center w-full text-center py-10">
            <FiCheckCircle className="text-6xl text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-[#772583] mb-2">Registro Concluído!</h1>
            <p className="text-gray-600 mb-8">Redirecionando para login...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="w-full">
            <h1 className="text-3xl font-bold text-[#772583] mb-2">Criar Conta</h1>
            <p className="text-gray-600 mb-8">Preencha seus dados para se registrar</p>

            {registerErrors.apiError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{registerErrors.apiError}</div>
            )}

            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Nome Completo</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    registerErrors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'
                  }`}
                  placeholder="Seu nome completo"
                />
              </div>
              {registerErrors.name && <p className="mt-1 text-sm text-red-600">{registerErrors.name}</p>}
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    registerErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>
              {registerErrors.email && <p className="mt-1 text-sm text-red-600">{registerErrors.email}</p>}
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    registerErrors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {registerErrors.password && <p className="mt-1 text-sm text-red-600">{registerErrors.password}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirmar Senha</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    registerErrors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {registerErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{registerErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isRegistering}
              className="w-full py-3 px-4 bg-[#772583] text-white rounded-lg font-medium hover:bg-[#5e1d6a] transition-colors"
            >
              {isRegistering ? 'Registrando...' : 'Registrar'}
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <a href="/login" className="text-[#772583] font-medium hover:underline">
                  Fazer login
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cadastro;
