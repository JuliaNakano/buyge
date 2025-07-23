import  { useState, useEffect } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';

// dentro do componente LoginPage

const LoginPage = () => {
  const navigate = useNavigate();

// dentro do handleLogin, substitua esta parte:
  setTimeout(() => {
    alert(`Login bem-sucedido como ${loginData.email}`);
    setLoginSuccess(false);
    navigate('/'); // redireciona para a Home
  }, 2000);
  // Estados para o formulário de login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Estados para o formulário de registro
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Mock de "banco de dados" no localStorage
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([
        { email: 'admin@example.com', password: 'admin123', name: 'Admin' }
      ]));
    }
  }, []);

  // Validação do formulário de login
  const validateLogin = () => {
    const errors = {};
    if (!loginData.email) errors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) errors.email = 'Email inválido';
    
    if (!loginData.password) errors.password = 'Senha é obrigatória';
    else if (loginData.password.length < 6) errors.password = 'Senha deve ter pelo menos 6 caracteres';

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validação do formulário de registro
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

  // Mock de login
  const mockLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          resolve({ success: true, user });
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1500);
    });
  };

  // Mock de registro
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

  // Manipulador de login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoggingIn(true);
    setLoginErrors({});
    
    try {
      await mockLogin(loginData.email, loginData.password);
      setLoginSuccess(true);
      // Simula redirecionamento após 2 segundos
      setTimeout(() => {
        alert(`Login bem-sucedido como ${loginData.email}`);
        setLoginSuccess(false);
      }, 2000);
    } catch (error) {
      setLoginErrors({ apiError: error.message });
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Manipulador de registro
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsRegistering(true);
    setRegisterErrors({});
    
    try {
      const userData = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      };
      
      await mockRegister(userData);
      setRegisterSuccess(true);
      
      // Limpa o formulário e volta para login após 2 segundos
      setTimeout(() => {
        setRegisterSuccess(false);
        setShowRegister(false);
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        alert('Registro bem-sucedido! Faça login com suas credenciais.');
      }, 2000);
    } catch (error) {
      setRegisterErrors({ apiError: error.message });
    } finally {
      setIsRegistering(false);
    }
  };

  // Atualiza os dados de login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Atualiza os dados de registro
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="font-sans flex justify-center items-center min-h-screen bg-gradient-to-br from-[#ffcbff] to-[#d8a0ff] p-4">
      <div className={`transition-all duration-300 ease-in-out ${showRegister ? 'w-[900px]' : 'w-[800px]'}`}>
        <div className="flex shadow-xl rounded-xl overflow-hidden bg-white">
          {/* Painel Esquerdo (Login/Register Info) */}
          <div className={`hidden md:block ${showRegister ? 'w-2/5 bg-[#772583]' : 'w-1/2 bg-[#772583]'} p-10 text-white flex flex-col`}>
            {showRegister ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Já tem uma conta?</h2>
                <p className="mb-8 text-white/90">
                  Faça login para acessar todos os recursos e sua área pessoal.
                </p>
                <button
                  onClick={() => setShowRegister(false)}
                  className="mt-auto w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-white text-[#772583] hover:bg-gray-100 transition-colors"
                >
                  <FiArrowLeft /> Fazer Login
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Olá, Bem-vindo!</h2>
                <p className="mb-8 text-white/90">
                  Crie uma conta para desfrutar de todos os nossos serviços e benefícios exclusivos.
                </p>
                <button
                  onClick={() => setShowRegister(true)}
                  className="mt-auto w-full py-3 rounded-lg font-medium bg-white text-[#772583] hover:bg-gray-100 transition-colors"
                >
                  Criar Conta
                </button>
              </>
            )}
          </div>

          {/* Painel Direito (Formulário) */}
          <div className={`w-full md:${showRegister ? 'w-3/5' : 'w-1/2'} p-8 md:p-10`}>
            {showRegister ? (
              <>
                {registerSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <FiCheckCircle className="text-6xl text-green-500 mb-4" />
                    <h1 className="text-3xl font-bold text-[#772583] mb-2">Registro Concluído!</h1>
                    <p className="text-gray-600 mb-8">Você será redirecionado para a página de login</p>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-[#772583] mb-2">Criar Conta</h1>
                    <p className="text-gray-600 mb-8">Preencha seus dados para se registrar</p>

                    {registerErrors.apiError && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {registerErrors.apiError}
                      </div>
                    )}

                    <form onSubmit={handleRegister}>
                      <div className="mb-5">
                        <label className="block text-gray-700 mb-2">Nome Completo</label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={registerData.name}
                            onChange={handleRegisterChange}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${registerErrors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'}`}
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
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${registerErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'}`}
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
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${registerErrors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'}`}
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
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${registerErrors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'}`}
                            placeholder="••••••••"
                          />
                        </div>
                        {registerErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{registerErrors.confirmPassword}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isRegistering}
                        className="w-full py-3 px-4 bg-[#772583] text-white rounded-lg font-medium hover:bg-[#5e1d6a] transition-colors flex items-center justify-center"
                      >
                        {isRegistering ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Registrando...
                          </>
                        ) : 'Registrar'}
                      </button>
                    </form>
                  </>
                )}
              </>
            ) : (
              <>
                {loginSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <FiCheckCircle className="text-6xl text-green-500 mb-4" />
                    <h1 className="text-3xl font-bold text-[#772583] mb-2">Login Bem-sucedido!</h1>
                    <p className="text-gray-600 mb-8">Você será redirecionado para a aplicação</p>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-[#772583] mb-2">Bem-vindo de Volta</h1>
                    <p className="text-gray-600 mb-8">Faça login para continuar</p>

                    {loginErrors.apiError && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {loginErrors.apiError}
                      </div>
                    )}

                    <form onSubmit={handleLogin}>
                      <div className="mb-5">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${loginErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'}`}
                            placeholder="seu@email.com"
                          />
                        </div>
                        {loginErrors.email && <p className="mt-1 text-sm text-red-600">{loginErrors.email}</p>}
                      </div>

                      <div className="mb-1">
                        <label className="block text-gray-700 mb-2">Senha</label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${loginErrors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-purple-200'}`}
                            placeholder="••••••••"
                          />
                        </div>
                        {loginErrors.password && <p className="mt-1 text-sm text-red-600">{loginErrors.password}</p>}
                      </div>

                      <div className="flex justify-end mb-6">
                        <button type="button" className="text-sm text-[#772583] hover:underline">Esqueceu a senha?</button>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full py-3 px-4 bg-[#772583] text-white rounded-lg font-medium hover:bg-[#5e1d6a] transition-colors flex items-center justify-center"
                      >
                        {isLoggingIn ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Entrando...
                          </>
                        ) : 'Entrar'}
                      </button>

                      <div className="mt-6 text-center">
                        <p className="text-gray-600">Não tem uma conta?{' '}
                          <button
                            type="button"
                            onClick={() => setShowRegister(true)}
                            className="text-[#772583] font-medium hover:underline"
                          >
                            Registrar-se
                          </button>
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;