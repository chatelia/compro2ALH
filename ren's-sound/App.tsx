import React, { useState } from 'react';
import { Menu, X, Instagram, Facebook, Twitter, Mail, Youtube, Music, Phone, ArrowRight, Star } from 'lucide-react';
import { products } from './data/products';
import { Chatbot } from './components/Chatbot';

type ViewState = 'home' | 'products' | 'about' | 'chat';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'Sound System' | 'Lighting' | 'Music'>('Sound System');

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#FF5722] selection:text-white flex flex-col">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex flex-col leading-none cursor-pointer group" 
            onClick={() => navigateTo('home')}
          >
            <h1 className="font-black text-3xl tracking-tighter group-hover:text-[#FF5722] transition-colors font-['Oswald',sans-serif]">
              REN'S
            </h1>
            <span className="font-bold text-lg tracking-[0.2em] text-gray-800">SOUND</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 font-medium text-gray-800 text-sm tracking-wide">
            <button 
              onClick={() => navigateTo('home')}
              className={`hover:text-[#FF5722] transition-colors ${currentView === 'home' ? 'text-[#FF5722] font-bold' : ''}`}
            >
              Beranda
            </button>
            <button 
              onClick={() => navigateTo('products')}
              className={`hover:text-[#FF5722] transition-colors ${currentView === 'products' ? 'text-[#FF5722] font-bold' : ''}`}
            >
              Produk
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className={`hover:text-[#FF5722] transition-colors ${currentView === 'about' ? 'text-[#FF5722] font-bold' : ''}`}
            >
              Tentang Kami
            </button>
          </div>

          <button 
            onClick={() => navigateTo('chat')}
            className="hidden md:flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-[#FF5722] transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <Phone size={18} />
            <span>Konsultasi</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-white border-b border-gray-100 p-6 shadow-2xl flex flex-col gap-6 animate-in slide-in-from-top-2 z-40">
            <button onClick={() => navigateTo('home')} className="text-left text-lg font-medium hover:text-[#FF5722]">Beranda</button>
            <button onClick={() => navigateTo('products')} className="text-left text-lg font-medium hover:text-[#FF5722]">Produk</button>
            <button onClick={() => navigateTo('about')} className="text-left text-lg font-medium hover:text-[#FF5722]">Tentang Kami</button>
            <button 
              onClick={() => navigateTo('chat')} 
              className="bg-[#FF5722] text-white p-4 rounded-full text-center font-bold"
            >
              Konsultasi
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 animate-in slide-in-from-left duration-700 order-2 md:order-1">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                  Power Up Your Event <br/>
                  with <span className="text-[#FF5722]">Premium Sound Experience</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                  Layanan sewa sound system profesional untuk semua acara. <br/>
                  Suara jernih, tim ahli, harga fleksibel.
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <button 
                    onClick={() => navigateTo('chat')}
                    className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#FF5722] transition-colors"
                  >
                    <Phone size={18} />
                    Konsultasi
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-800 pt-4">
                  Event Type : <span className="font-normal text-gray-600">Wedding | Music Concert | Corporate | Outdoor</span>
                </p>
              </div>
              <div className="flex-1 relative order-1 md:order-2 flex justify-center">
                 <div className="relative w-full max-w-[500px]">
                    <div className="absolute inset-0 bg-[#FF5722] rounded-full blur-[80px] opacity-20 transform translate-x-10 translate-y-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
                      alt="Premium Headphones" 
                      className="relative z-10 w-full object-contain transform -rotate-12 hover:rotate-0 transition-all duration-700 drop-shadow-2xl"
                    />
                 </div>
              </div>
            </section>

            {/* Why Ren's Sound */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16">
                  <div className="flex-1 flex justify-center md:justify-start">
                    <div className="relative">
                      <Music size={180} className="text-[#B2EBF2] fill-[#E0F7FA] transform -rotate-12" />
                      <Music size={100} className="text-[#80DEEA] fill-[#B2EBF2] absolute -bottom-4 -right-8 transform rotate-12" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-8 text-right md:text-right">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Ren's Sound?</h2>
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg">High Quality Equipment — <span className="font-normal text-gray-600">Peralatan sound system berkualitas profesional.</span></h3>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg">Expert Crew — <span className="font-normal text-gray-600">Tim teknisi berpengalaman dan siap mendukung event kamu.</span></h3>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg">Affordable Packages — <span className="font-normal text-gray-600">Harga fleksibel sesuai kebutuhan acara.</span></h3>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg">Fast Setup & Support — <span className="font-normal text-gray-600">Instalasi cepat dan layanan standby di lokasi.</span></h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Popular Services */}
            <section className="container mx-auto px-4 md:px-8 py-20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Services</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group bg-[#FF5722] rounded-[30px] p-8 text-center text-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/40 relative overflow-hidden flex flex-col items-center">
                    <div className="mb-6 bg-white/10 p-4 rounded-full">
                       <img 
                        src="https://images.unsplash.com/photo-1519508234439-4f23643125c1?auto=format&fit=crop&q=80&w=300&h=300" 
                        alt="Set"
                        className="w-40 h-40 object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">Grand Set | 2000 Watt</h3>
                    
                    <div className="flex gap-4 mt-auto justify-center">
                       <div className="w-12 h-8 bg-black/20 rounded-full flex items-center justify-center"><Music size={16}/></div>
                       <div className="w-12 h-8 bg-black/20 rounded-full flex items-center justify-center"><Star size={16}/></div>
                       <div className="w-12 h-8 bg-black/20 rounded-full flex items-center justify-center"><Phone size={16}/></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* VIEW: PRODUCTS */}
        {currentView === 'products' && (
          <div className="container mx-auto px-4 md:px-8 py-12 animate-in fade-in duration-500">
            <div className="mb-12">
               <h2 className="text-3xl font-bold mb-2">Categories</h2>
               <div className="flex flex-col gap-2">
                 <button onClick={() => setActiveCategory('Sound System')} className={`text-left text-lg font-medium ${activeCategory === 'Sound System' ? 'text-black font-bold' : 'text-gray-500'}`}>Sound System</button>
                 <button onClick={() => setActiveCategory('Lighting')} className={`text-left text-lg font-medium ${activeCategory === 'Lighting' ? 'text-black font-bold' : 'text-gray-500'}`}>Lighting</button>
                 <button onClick={() => setActiveCategory('Music')} className={`text-left text-lg font-medium ${activeCategory === 'Music' ? 'text-black font-bold' : 'text-gray-500'}`}>Music</button>
               </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 border-b-2 border-black pb-2 inline-block">{activeCategory}</h2>
            
            {/* Product Grid - Orange Cards Style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-[#FF5722] rounded-[30px] p-6 text-center text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center">
                  <div className="mb-6 bg-white p-2 rounded-2xl w-full aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-4">{product.name}</h3>
                  
                  <ul className="text-sm text-white/90 space-y-1 mb-6 flex-grow">
                    {product.specs.map((spec, idx) => (
                      <li key={idx} className="leading-tight">
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto w-full">
                    <div className="bg-white text-black font-bold py-2 px-4 rounded-full mb-4 inline-block shadow-sm">
                      {product.price}
                    </div>
                    <button 
                      onClick={() => navigateTo('chat')}
                      className="w-full bg-transparent border-2 border-white text-white py-2 rounded-full font-medium hover:bg-white hover:text-[#FF5722] transition-colors"
                    >
                      Cek Ketersediaan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: ABOUT */}
        {currentView === 'about' && (
          <div className="container mx-auto px-4 md:px-8 py-12 animate-in fade-in duration-500">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-bold mb-8">Tentang Kami</h2>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    Di Ren's Sound, kami percaya bahwa suara bukan sekadar bunyi—melainkan denyut yang 
                    menghidupkan setiap momen berharga. Sejak berdiri pada 15 Desember 2023, Ren's Sound hadir 
                    sebagai penyedia layanan sound system profesional yang berkomitmen menghadirkan kualitas 
                    suara jernih untuk menjadikan setiap acara terasa istimewa.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    Mulai dari acara kecil hingga produksi berskala besar, kami bangga menjadi mitra terpercaya 
                    yang membantu mewujudkan kesempurnaan acara Anda melalui suara berkualitas tinggi dan 
                    pelayanan terbaik.
                  </p>
                </div>
                <div className="flex-1 relative flex justify-center">
                   <div className="relative">
                      {/* Stylized Headphones Graphic similar to PDF */}
                      <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 transform translate-y-10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600" 
                        alt="About Ren's Sound" 
                        className="relative z-10 w-full max-w-md rounded-[40px] shadow-2xl transform rotate-6 border-8 border-white"
                      />
                   </div>
                </div>
              </div>
          </div>
        )}

        {/* VIEW: CHAT */}
        {currentView === 'chat' && (
          <div className="container mx-auto px-4 md:px-8 py-12 animate-in fade-in duration-500 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4">Konsultasi</h2>
            <Chatbot />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#E5E5E5] pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12 text-gray-500">
            <div>
              <h3 className="font-bold text-xl mb-6 text-gray-600">Product</h3>
              <ul className="space-y-4">
                <li onClick={() => {navigateTo('products'); setActiveCategory('Sound System')}} className="cursor-pointer hover:text-[#FF5722]">Sound System</li>
                <li onClick={() => {navigateTo('products'); setActiveCategory('Lighting')}} className="cursor-pointer hover:text-[#FF5722]">Lighting</li>
                <li onClick={() => {navigateTo('products'); setActiveCategory('Music')}} className="cursor-pointer hover:text-[#FF5722]">Music</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-6 text-gray-600">Support</h3>
              <ul className="space-y-4">
                <li onClick={() => navigateTo('chat')} className="cursor-pointer hover:text-[#FF5722]">FAQ</li>
                <li onClick={() => navigateTo('chat')} className="cursor-pointer hover:text-[#FF5722]">Contact Us</li>
                <li className="cursor-pointer hover:text-[#FF5722]">Privacy Policy</li>
                <li className="cursor-pointer hover:text-[#FF5722]">Terms of Service</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-bold text-xl mb-6 text-gray-600">Social Media</h3>
              <p className="mb-6">Untuk info terkini hubungi sosial media kami</p>
              <div className="flex gap-4">
                {[Youtube, Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center text-white hover:bg-[#FF5722] transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#FF5722] text-white py-4 px-8 text-center text-sm w-full -mx-4 md:-mx-8 md:w-[calc(100%+4rem)]">
            Copyright © Ren's Sound
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;