import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, RefreshCw, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { chatFlow } from '../data/chatFlow';
import { ChatMessage } from '../types';

const INITIAL_STEP = 'main';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStepId, setCurrentStepId] = useState<string>(INITIAL_STEP);
  const [inputText, setInputText] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial message
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(INITIAL_STEP);
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  const addBotMessage = (stepId: string) => {
    const step = chatFlow[stepId];
    if (!step) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: step.message,
        options: step.actions,
        isHtml: true
      }
    ]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // 1. Add User Message to UI
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: text }
    ]);
    setInputText('');
    setIsLoading(true);

    // 2. Process Input
    await processInput(text);
  };

  const processInput = async (input: string) => {
    const normalizedInput = input.trim().toLowerCase();

    // Universal "Back" / "Menu" commands (local override for speed)
    if (normalizedInput === '#' || normalizedInput.includes('menu utama') || normalizedInput.includes('kembali')) {
      setCurrentStepId(INITIAL_STEP);
      addBotMessage(INITIAL_STEP);
      setErrorCount(0);
      setIsLoading(false);
      return;
    }

    // WA Link Handler
    if (input === 'WA_LINK') {
      window.open('https://wa.me/6281234567890?text=Halo%20Ren\'s%20Sound,%20saya%20ingin%20konsultasi', '_blank');
      setIsLoading(false);
      return;
    }

    // 3. "Dialogflow" Implementation using Gemini
    // We send the current state context and user input to Gemini to determine the next strict step.
    const currentStepData = chatFlow[currentStepId];

    try {
      const systemInstruction = `
        You are the NLU (Natural Language Understanding) engine for Ren's Sound chatbot.
        Your job is to map User Input to a strictly defined "Next Step ID".

        CURRENT STATE ID: ${currentStepId}

        AVAILABLE TRANSITIONS FROM CURRENT STATE:
        ${JSON.stringify(currentStepData.options || {})}

        GLOBAL INTENTS (Always available):
        - "main": "menu utama", "kembali", "awal", "hi", "halo"
        - "whatsapp_cta": "admin", "hubungi", "wa", "whatsapp", "0", "chat admin"

        CONTEXT KNOWLEDGE:
        - "1" usually implies Sound System or the first option.
        - "2" usually implies Peralatan Lain or second option.
        - "3" implies Cara Pesan.
        - "4" implies FAQ.
        - "1000w" -> detail_1_1
        - "2000w" -> detail_1_2
        - "3000w" -> detail_1_3
        - "full event" -> detail_1_4
        - "drum" -> detail_2_1
        - "lighting" -> detail_2_2
        - "mic" or "audio" -> detail_2_3

        INSTRUCTION:
        Analyze the USER INPUT. Return a JSON object with a single key "nextStepId".
        If the input matches an option key (e.g. "1") or the semantic meaning of an option (e.g. "saya mau sound system" matches option "1"), return that option's target ID.
        If NO match is found, return "nextStepId": "INVALID".

        Example 1:
        Input: "info paket sound dong"
        Output: {"nextStepId": "menu_1"}

        Example 2:
        Input: "mau tanya harga lighting"
        Output: {"nextStepId": "detail_2_2"}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.1 // Low temperature for strict classification
        }
      });

      const result = JSON.parse(response.text || '{}');
      const nextStepId = result.nextStepId;

      if (nextStepId && nextStepId !== 'INVALID' && chatFlow[nextStepId]) {
        // Valid Intent Detected
        setCurrentStepId(nextStepId);
        addBotMessage(nextStepId);
        setErrorCount(0);
      } else {
        // Fallback / Invalid
        handleInvalidInput();
      }

    } catch (error) {
      console.error("NLU Error:", error);
      // Fallback logic if AI fails (simple key match)
      const strictMatch = currentStepData.options?.[input];
      if (strictMatch) {
        setCurrentStepId(strictMatch);
        addBotMessage(strictMatch);
        setErrorCount(0);
      } else {
        handleInvalidInput();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvalidInput = () => {
    const newErrorCount = errorCount + 1;
    setErrorCount(newErrorCount);

    if (newErrorCount >= 2) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: "Sepertinya Anda memerlukan bantuan lebih lanjut.\nSilakan hubungi admin kami langsung.",
          options: [{ label: 'Chat via WhatsApp', value: 'WA_LINK' }, { label: '# Menu Utama', value: '#' }]
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: "Maaf, saya tidak mengerti. Silakan pilih opsi yang tersedia atau ketik:\n- 'Admin' untuk bantuan manusia\n- 'Menu' untuk kembali ke awal"
        }
      ]);
    }
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i} className="block min-h-[1.2em] mb-1">
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
           if (part.startsWith('**') && part.endsWith('**')) {
             return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
           }
           return part;
        })}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 font-sans">
      
      {/* Chat Header */}
      <div className="bg-white p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">Ren's Sound Bot</h3>
            <p className="text-xs text-[#FF5722] font-medium flex items-center gap-1 uppercase tracking-wide">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online • Automated
            </p>
          </div>
        </div>
        <button 
          onClick={() => {
            setMessages([]);
            setCurrentStepId(INITIAL_STEP);
            addBotMessage(INITIAL_STEP);
            setErrorCount(0);
          }}
          className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          title="Reset Chat"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-5 shadow-sm animate-in fade-in zoom-in duration-300 ${
                msg.sender === 'user'
                  ? 'bg-black text-white rounded-2xl rounded-tr-none'
                  : 'bg-[#FFEBE5] text-gray-800 rounded-2xl rounded-tl-none border border-[#FFCCBC]'
              }`}
            >
              <div className="text-sm leading-relaxed">
                {renderText(msg.text)}
              </div>
              
              {/* Quick Actions / Buttons */}
              {msg.sender === 'bot' && msg.options && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (opt.value === 'WA_LINK') {
                           window.open('https://wa.me/6281234567890?text=Halo%20Ren\'s%20Sound,%20saya%20ingin%20konsultasi', '_blank');
                        } else {
                           handleSendMessage(opt.value);
                        }
                      }}
                      className={`text-xs px-4 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-sm ${
                         opt.value === 'WA_LINK' 
                         ? 'bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center gap-1'
                         : 'bg-white text-[#FF5722] hover:bg-[#FF5722] hover:text-white border border-[#FF5722]'
                      }`}
                    >
                      {opt.value === 'WA_LINK' && <MessageCircle size={14} />}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "Sedang memproses..." : "Tulis pesan Anda..."}
            className="flex-1 p-4 bg-gray-50 text-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 transition-all placeholder-gray-400 font-medium"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-4 bg-[#FF5722] text-white rounded-2xl hover:bg-[#F4511E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-orange-500/30"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};