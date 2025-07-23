import { useState } from 'react';
import { FaTruck, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import RodaPe from '../components/RodaPe';

const CartPage = () => {
  // Estado inicial do carrinho
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Caneca Personalizada',
      price: 50.99,
      quantity: 1,
      image: ''
    },
    {
      id: 2,
      name: 'Cosplay Naruto',
      price: 750.00,
      quantity: 2,
      image: ''
    }

  ]);

  const [cep, setCep] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [showCouponField, setShowCouponField] = useState(false);

  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calcular total com desconto e frete
  const total = subtotal - discount + shipping;

  // Manipular quantidade
  const handleQuantityChange = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity >= 1 ? newQuantity : 1
        };
      }
      return item;
    }));
  };

  // Remover item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Aplicar cupom
  const applyCoupon = () => {
    // Lógica de validação do cupom
    if (coupon === 'DESCONTO10') {
      setDiscount(subtotal * 0.1); // 10% de desconto
    } else if (coupon === 'DESCONTO20') {
      setDiscount(subtotal * 0.2); // 20% de desconto
    } else {
      alert('Cupom inválido');
    }
  };

  // Calcular frete
  const calculateShipping = () => {
    // Simulação de cálculo de frete
    if (cep.length === 8) {
      const randomShipping = Math.random() > 0.5 ? 15.99 : 0;
      setShipping(randomShipping);
      alert(randomShipping === 0 ? 
        'Parabéns! Frete grátis para sua região!' : 
        `Frete calculado: R$ ${randomShipping.toFixed(2)}`
      );
    } else {
      alert('CEP inválido');
    }
  };

  return (
    <div >
        <div>
            <Navbar />
        </div>
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <main className="py-12 px-5 lg:px-16">
        <section className="bg-purple-50 p-6 md:p-8 rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Meu Carrinho</h1>
          
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Left side - Products */}
            <div className="lg:w-2/3">
              <div className="hidden md:flex justify-between font-bold pb-4 border-b border-gray-400">
                <span className="w-2/5">Produto</span>
                <span className="text-center w-1/5">Quantidade</span>
                <span className="text-center w-1/5">Valor</span>
                <span className="text-center w-1/5">Subtotal</span>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  Seu carrinho está vazio
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-200">
                    <div className="flex items-center mb-3 md:mb-0 md:w-2/5">
                      <div 
                        className="w-16 h-16 bg-white rounded-md bg-cover bg-no-repeat bg-center mr-4"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <span className="text-sm md:text-base">{item.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-center md:w-1/5 mb-3 md:mb-0">
                      <div className="flex items-center bg-[#AD7CB5] rounded-md overflow-hidden">
                        <button 
                          className="px-3 py-1 bg-[#772583] text-white"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-3 py-1 bg-purple-200 text-white text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          className="px-3 py-1 bg-[#772583] text-white"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between md:block md:text-center md:w-1/5 text-sm mb-3 md:mb-0">
                      <span className="md:hidden text-gray-600">Valor:</span>
                      <span>R$ {item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between md:block md:text-center md:w-1/5 text-sm mb-3 md:mb-0">
                      <span className="md:hidden text-gray-600">Subtotal:</span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <button 
                      className="self-end md:self-center text-gray-500 hover:text-gray-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Right side - Summary */}
            <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
              <div className="frete">
                <p className="font-bold flex items-center gap-2 text-[#772583]">
                  <FaTruck /> Calcular o Frete e o Prazo
                </p>
                <input 
                  type="text" 
                  placeholder="Digite o CEP aqui" 
                  className="w-full p-2 mt-2 bg-purple-100 border-none rounded-md"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                  maxLength={8}
                />

                <button 
                  className="w-full mt-2 p-2 bg-[#772583] text-white rounded-md hover:bg-[#AD7CB5] transition"
                  onClick={calculateShipping}
                >
                  Calcular
                </button>

              </div>
              
              <div className="resumo">
                <p className="flex justify-between my-1 text-sm md:text-base">
                  Valor da Compra <span>R$ {subtotal.toFixed(2)}</span>
                </p>
                <p className="flex justify-between my-1 text-sm md:text-base">
                  Desconto <span className="text-red-500">-R$ {discount.toFixed(2)}</span>
                </p>
                <p className="flex justify-between my-1 text-sm md:text-base">
                  Entrega <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </p>
                <hr className="my-2" />
                <p className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300">
                  Total <span>R$ {total.toFixed(2)}</span>
                </p>
              </div>
              
              <div className="cupom">
                <button 
                  className="w-full flex justify-between items-center text-[#772583]"
                  onClick={() => setShowCouponField(!showCouponField)}
                >
                  <span>Possui cupom de desconto?</span>
                  <span className={`text-lg transition-transform ${showCouponField ? 'rotate-180' : ''}`}>︿</span>
                </button>
                
                {showCouponField && (
                  <div className="mt-2">
                    <input 
                      type="text" 
                      placeholder="Digite ou Cole o Código" 
                      className="w-full p-2 bg-purple-100 border-none rounded-md"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button 
                      className="w-full mt-2 p-2 bg-[#772583] text-white rounded-md hover:bg-[#AD7CB5] transition"
                      onClick={applyCoupon}
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>
              
              <button 
                className="w-full mt-4 p-3 bg-[#772583] text-white rounded-lg font-medium hover:bg-[#AD7CB5] transition disabled:opacity-50"
                disabled={cartItems.length === 0}
              >
                {cartItems.length === 0 ? 'Carrinho vazio' : 'Continuar a Compra'}
              </button>
            </div>
          </div>
          
          {cartItems.length > 0 && (
            <p className="text-right mt-4 text-gray-600 text-sm hover:text-[#AD7CB5] cursor-pointer">
              Adicionar outros produtos
            </p>
          )}
        </section>
      </main>

    </div>
          <div>
            <RodaPe/>
          </div>

      
    </div>
  );
};

export default CartPage;