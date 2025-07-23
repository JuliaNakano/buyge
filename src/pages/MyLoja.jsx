import { useState, useEffect } from 'react';
import { FaBox, FaShoppingCart, FaCommentDots, FaDollarSign, FaCheck, FaSpinner } from 'react-icons/fa';
import NavBar from '../components/Navbar';
import RodaPe from '../components/RodaPe';

const MyStorePage = () => {
  const [formData, setFormData] = useState({
    nature: '',
    cpf: '',
    cnpj: '',
    birthDate: '',
    country: 'Brasil', // Valor padrão
    cep: '',
    state: '',
    city: '',
    address: '',
    number: '',
    complement: '',
    district: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('dados');

  // Simular estados da API
  const [isLoading, setIsLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);

  // Simular carregamento inicial de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mock data - em uma aplicação real isso viria de uma API
      setStoreData({
        name: "Minha Loja",
        nature: "pj",
        cnpj: "12345678000195",
        cep: "01001000",
        state: "SP",
        city: "São Paulo",
        address: "Praça da Sé",
        number: "100",
        complement: "Loja 1",
        district: "Sé"
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Preencher formulário quando os dados carregarem
  useEffect(() => {
    if (storeData) {
      setFormData({
        nature: storeData.nature || '',
        cpf: '',
        cnpj: storeData.cnpj || '',
        birthDate: '',
        country: 'Brasil',
        cep: storeData.cep || '',
        state: storeData.state || '',
        city: storeData.city || '',
        address: storeData.address || '',
        number: storeData.number || '',
        complement: storeData.complement || '',
        district: storeData.district || ''
      });
    }
  }, [storeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Aplicar máscaras
    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'cnpj') {
      formattedValue = formatCNPJ(value);
    } else if (name === 'cep') {
      formattedValue = formatCEP(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Funções de formatação
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCNPJ = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nature) {
      newErrors.nature = 'Selecione a natureza';
    }
    
    if (formData.nature === 'pf' && !formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (formData.nature === 'pf' && formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF inválido';
    }
    
    if (formData.nature === 'pj' && !formData.cnpj) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (formData.nature === 'pj' && formData.cnpj.replace(/\D/g, '').length !== 14) {
      newErrors.cnpj = 'CNPJ inválido';
    }
    
    if (!formData.cep) {
      newErrors.cep = 'CEP é obrigatório';
    } else if (formData.cep.replace(/\D/g, '').length !== 8) {
      newErrors.cep = 'CEP inválido';
    }
    
    if (!formData.state) newErrors.state = 'Estado é obrigatório';
    if (!formData.city) newErrors.city = 'Cidade é obrigatória';
    if (!formData.address) newErrors.address = 'Endereço é obrigatório';
    if (!formData.number) newErrors.number = 'Número é obrigatório';
    if (!formData.district) newErrors.district = 'Bairro é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simular envio para API
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Resetar mensagem de sucesso após 3 segundos
        setTimeout(() => setSubmitSuccess(false), 3000);
        
        // Aqui você normalmente redirecionaria ou atualizaria o estado
        console.log('Dados enviados:', formData);
      }, 2000);
    }
  };

  // Buscar endereço via API de CEP (simulação)
  const fetchAddressByCEP = () => {
    if (formData.cep.replace(/\D/g, '').length === 8) {
      // Simulação de API ViaCEP
      const mockAddress = {
        '01001000': {
          state: 'SP',
          city: 'São Paulo',
          address: 'Praça da Sé',
          district: 'Sé'
        },
        '20040000': {
          state: 'RJ',
          city: 'Rio de Janeiro',
          address: 'Praça Mauá',
          district: 'Centro'
        }
      };
      
      const addressData = mockAddress[formData.cep.replace('-', '')];
      if (addressData) {
        setFormData(prev => ({
          ...prev,
          state: addressData.state,
          city: addressData.city,
          address: addressData.address,
          district: addressData.district
        }));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#772583] mb-4 mx-auto" />
          <p>Carregando dados da loja...</p>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 text-gray-800">
    <div>
        <NavBar/>

    </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-purple-200 p-4">
          <div className="store-info mb-6">
            <p className="font-bold">Olá, {storeData?.name || 'Minha Loja'}!</p>
            <small className="text-sm text-[#772583] ">Minha loja</small>
          </div>
          
          <ul className="menu space-y-4">
            <li className="flex items-center gap-2 text-[#772583] hover:text-[#AD7CB5] cursor-pointer font-bold">
              <FaBox /> Produtos
            </li>
            <li className="flex items-center gap-2 text-[#772583] hover:text-[#AD7CB5]cursor-pointer font-bold">
              <FaShoppingCart /> Venda
            </li>
            <li className="flex items-center gap-2 text-[#772583] hover:text-[#AD7CB5] cursor-pointer font-bold">
              <FaCommentDots /> Mensagens
            </li>
            <li className="flex items-center gap-2 text-[#772583] hover:text-[#AD7CB5] cursor-pointer font-bold">
              <FaDollarSign /> Saldo
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-white">
          <h1 className="text-2xl font-bold mb-4">Minha Loja</h1>
          
          <div className="tabs flex gap-4 md:gap-8 mb-6 pb-2 border-b border-gray-300 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('perfil')}
              className={`pb-1 ${activeTab === 'perfil' ? 'font-bold text-[#772583] border-b-2 border-purple-800' : 'text-gray-600 hover:text-[#772583]'}`}
            >
              Perfil da loja
            </button>
            <button 
              onClick={() => setActiveTab('dados')}
              className={`pb-1 ${activeTab === 'dados' ? 'font-bold text-[#772583] border-b-2 border-[#772583]' : 'text-gray-600 hover:text-[#772583]'}`}
            >
              Dados da Loja
            </button>
            <button 
              onClick={() => setActiveTab('documentos')}
              className={`pb-1 ${activeTab === 'documentos' ? 'font-bold text-[#772583] border-b-2 border[#772583]' : 'text-gray-600 hover:text-[#772583]'}`}
            >
              Documentos
            </button>
            <button 
              onClick={() => setActiveTab('financeiro')}
              className={`pb-1 ${activeTab === 'financeiro' ? 'font-bold text-[#772583] border-b-2 border-[#772583]' : 'text-gray-600 hover:text-[#772583]'}`}
            >
              Dados Financeiros
            </button>
            <button 
              onClick={() => setActiveTab('gamificacao')}
              className={`pb-1 ${activeTab === 'gamificacao' ? 'font-bold text-[#772583] border-b-2 border-[#772583]' : 'text-gray-600 hover:text-[#772583]'}`}
            >
              Gamificação
            </button>
          </div>

          {activeTab === 'dados' && (
            <section className="form-section">
              <h2 className="text-xl font-semibold mb-4">Dados da Loja</h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
                  <FaCheck className="text-green-600" />
                  Dados salvos com sucesso!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="radio-group flex flex-col sm:flex-row gap-4 mb-6">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="nature" 
                      value="pf"
                      checked={formData.nature === 'pf'}
                      onChange={handleInputChange}
                      className="text-[#772583]"
                    />
                    Sou pessoa física (CPF)
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="nature" 
                      value="pj"
                      checked={formData.nature === 'pj'}
                      onChange={handleInputChange}
                      className="text-[#772583]"
                    />
                    Sou pessoa jurídica (CNPJ)
                  </label>
                </div>
                {errors.nature && <p className="text-red-500 text-sm mb-4">{errors.nature}</p>}

                <div className="form-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {formData.nature === 'pf' && (
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-1">CPF</label>
                      <input 
                        type="text" 
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className={`w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.cpf ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                      />
                      {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                    </div>
                  )}

                  {formData.nature === 'pj' && (
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-1">CNPJ</label>
                      <input 
                        type="text" 
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                        className={`w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.cnpj ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                      />
                      {errors.cnpj && <p className="text-red-500 text-xs mt-1">{errors.cnpj}</p>}
                    </div>
                  )}

                  {formData.nature === 'pf' && (
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                      <input 
                        type="date" 
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">País de Residência</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Brasil">Brasil</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Portugal">Portugal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">CEP</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        name="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                        onBlur={fetchAddressByCEP}
                        placeholder="00000-000"
                        maxLength={9}
                        className={`flex-1 p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.cep ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                      />
                      <button 
                        type="button" 
                        onClick={fetchAddressByCEP}
                        className="px-3 bg-[#772583] text-white rounded hover:bg-[#AD7CB5]"
                      >
                        Buscar
                      </button>
                    </div>
                    {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep}</p>}
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.state ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">Cidade / Município</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.city ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">Endereço</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.address ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">Número</label>
                    <input 
                      type="text" 
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      className={`w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.number ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                    />
                    {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">Complemento</label>
                    <input 
                      type="text" 
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium mb-1">Bairro</label>
                    <input 
                      type="text" 
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={`w-full p-2 bg-purple-100 rounded focus:outline-none focus:ring-2 ${errors.district ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-purple-500'}`}
                    />
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>
                </div>

                <div className="clear-both">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="float-right bg-[#772583] text-white px-6 py-3 rounded-lg hover:bg-[#AD7CB5] transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Salvando...
                      </>
                    ) : 'Salvar Alterações'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab !== 'dados' && (
            <div className="py-12 text-center text-gray-500">
              Conteúdo da aba {activeTab} será exibido aqui
            </div>
          )}
        </main>
      </div>

      <div>
        <RodaPe/>
      </div>
    </div>
  );
};

export default MyStorePage;