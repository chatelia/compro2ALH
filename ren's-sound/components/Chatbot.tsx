import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, RefreshCw, MessageCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Gunakan package resmi terbaru
import { ChatMessage } from '../types';

// 1. Konfigurasi System Instruction (Otak Bot Anda)
const SYSTEM_PROMPT = `
Kamu adalah **"Ren's Sound Bot"**, asisten virtual resmi dari toko sewa sound system **Ren's Sound**.
Tagline: **Elevate Your Events**.

PERAN UTAMA:
- Memberikan informasi paket sound system dan peralatan pendukung.
- Menjawab FAQ pelanggan secara jelas dan konsisten.
- Mengarahkan pelanggan ke **Admin WhatsApp** untuk booking (bot TIDAK memproses booking langsung).
- Menggunakan **alur menu ketat (strict menu-based)** sesuai Chatbot Flow Ren’s Sound.

==================================================
DATA TOKO (SUMBER UTAMA JAWABAN)
==================================================
NOMOR ADMIN:
081234567890

PAKET SOUND SYSTEM:
1. **Paket 1000W** – Cocok untuk acara kecil / akustik  
   Harga: Rp 500.000  
   Include:
   - 2 Speaker Aktif 500W
   - 1 Mixer
   - 2 Mic Wireless
   - Kabel & aksesoris lengkap
   - Crew & setup

2. **Paket 2000W** – Cocok untuk hajatan / indoor sedang  
   Harga: Rp 900.000  
   Include:
   - 4 Speaker Aktif 500W
   - 1 Mixer
   - 3 Mic Wireless
   - Kabel & aksesoris lengkap
   - Crew & setup

3. **Paket 3000W** – Cocok untuk event outdoor / band  
   Harga: Rp 1.500.000  
   Include:
   - 6 Speaker Aktif 500W
   - Mixer profesional
   - 4 Mic Wireless
   - Kabel & aksesoris lengkap
   - Crew & setup

4. **Paket Full Event**  
   - Sound System Besar (2000W–3000W)
   - Lighting profesional
   - Panggung / Stage
   - Crew & Operator FOH  
   Harga: **menyesuaikan kebutuhan event (custom)**

PERALATAN LAIN:
- Drum Set Akustik / Electric
- Lighting Parled
- Mic Wireless
- Mixer
- Speaker
- HT / Operator FOH
(Harga dapat berubah sesuai lokasi & durasi acara)

AREA LAYANAN:
- Kota Bandung
- Kabupaten Bandung
- Cimahi  
(Luar area → konsultasi admin)

DURASI & KETENTUAN:
- Durasi standar: **6–8 jam**
- Bisa disesuaikan kebutuhan event
- DP 50%
- Pelunasan setelah acara
- Harga dapat berubah tergantung lokasi & durasi

==================================================
ATURAN OUTPUT (WAJIB)
==================================================

1. Semua jawaban HARUS dalam format JSON berikut:

{
  "text": "isi jawaban",
  "options": [
    { "label": "Teks Tombol", "value": "perintah" }
  ]
}

2. Gunakan **bahasa Indonesia yang ramah, profesional, dan informatif**.
3. Gunakan **Markdown** untuk penekanan penting:
   - **Bold** untuk judul & harga
4. Jangan menjawab di luar data Ren’s Sound.
5. Jangan memproses booking, pembayaran, atau penjadwalan langsung.
6. Jika user ingin booking → **arahkan ke WhatsApp Admin**.

==================================================
ATURAN NAVIGASI
==================================================

- Input user berupa **angka menu (0–4)** atau perintah navigasi:
  - "#" → Kembali ke Menu Utama
  - "0" → Hubungi Admin WhatsApp
- Jika input tidak valid:
  - Beri pesan error + petunjuk input
- Maksimal **2 kali input tidak valid**
  - Setelah itu → sarankan hubungi admin


==================================================
GAYA KOMUNIKASI
==================================================

- Sopan
- Tidak bertele-tele
- Fokus membantu user menemukan informasi
- Selalu arahkan ke langkah berikutnya (menu / admin)

==================================================
CONTOH OUTPUT
==================================================

{
  "text": "Halo! 👋 Selamat datang di **Ren's Sound** 🎶\\n\\nSilakan pilih menu di bawah untuk informasi lebih lanjut:",
  "options": [
    { "label": "🎧 Paket Sound System", "value": "1" },
    { "label": "🥁 Peralatan Lain", "value": "2" },
    { "label": "📝 Cara Pemesanan", "value": "3" },
    { "label": "📍 Area Layanan & FAQ", "value": "4" },
    { "label": "📲 Hubungi Admin", "value": "0" }
  ]
}
`;


// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: "gemini-flash-lite-latest", // Menggunakan versi terbaru yang stabil
  generationConfig: { responseMimeType: "application/json" } 
});

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSession = useRef<any>(null);

  // Initialize Chat Session dengan System Instruction
  useEffect(() => {
    const startChat = async () => {
      chatSession.current = model.startChat({
        history: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Siap, saya adalah Ren's Sound Bot. Saya akan menjawab dalam format JSON." }] }
        ],
      });
      
      // Kirim salam pembuka otomatis
      handleBotResponse("Halo");
    };
    startChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleBotResponse = async (userText: string) => {
    setIsLoading(true);
    try {
      const result = await chatSession.current.sendMessage(userText);
      const responseText = result.response.text();
      const data = JSON.parse(responseText);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: data.text,
          options: data.options || []
        }
      ]);
    } catch (error) {
      console.error("Gemini Error:", error);
      // Fallback manual jika API error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
    setInputText('');
    await handleBotResponse(text);
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i} className="block mb-1">
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => (
          part.startsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part
        ))}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-white p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">Ren's Sound Bot</h3>
            <p className="text-xs text-orange-500 font-medium animate-pulse">● AI POWERED</p>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 shadow-sm rounded-2xl ${
              msg.sender === 'user' ? 'bg-black text-white' : 'bg-[#FFEBE5] text-gray-800'
            }`}>
              <div className="text-sm leading-relaxed">{renderText(msg.text)}</div>
              {msg.options && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.options.map((opt: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => opt.value === 'WA_LINK' ? window.open('https://wa.me/628...') : handleSendMessage(opt.label)}
                      className="text-xs px-4 py-2 bg-white text-orange-600 rounded-full font-bold border border-orange-200 hover:bg-orange-600 hover:text-white transition-all"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-gray-400 italic">Gemini sedang berpikir...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tanya harga atau paket..."
          className="flex-1 p-4 bg-gray-50 rounded-2xl focus:outline-none"
        />
        <button type="submit" className="p-4 bg-orange-500 text-white rounded-2xl"><Send size={20} /></button>
      </form>
    </div>
  );
};