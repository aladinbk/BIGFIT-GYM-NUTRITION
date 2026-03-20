import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Loader2, Phone, Video, MoreVertical } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { db, auth } from '../firebase.ts';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';

interface Message {
  id?: string;
  role: 'user' | 'model';
  content: string;
  timestamp: any;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !isOpen) return;

    const q = query(
      collection(db, 'chats'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    try {
      // 1. Save user message to Firestore
      await addDoc(collection(db, 'chats'), {
        userId: user.uid,
        role: 'user',
        content: userMessage,
        timestamp: serverTimestamp()
      });

      // 2. Call Gemini AI
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      
      console.log("Attempting AI call with key starting with:", apiKey?.substring(0, 5));

      if (!apiKey) {
        throw new Error("Clé API Gemini manquante. Veuillez configurer VITE_GEMINI_API_KEY dans votre fichier .env");
      }
      const ai = new GoogleGenAI({ apiKey });
      const model = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ],
        config: {
          systemInstruction: "Tu es le Coach IA officiel de BIGFIT GYM & NUTRITION en Tunisie. Tu es expert en fitness, musculation et nutrition. Ton ton est encourageant, professionnel et motivant. Tu aides les utilisateurs avec des programmes d'entraînement, des conseils nutritionnels et des informations sur la salle de sport BIGFIT. Réponds toujours en français (ou en arabe tunisien si l'utilisateur le demande). Garde tes réponses concises et structurées comme des messages WhatsApp."
        }
      });

      const aiResponse = model.text;
      console.log("AI Response received:", aiResponse?.substring(0, 20) + "...");

      if (!aiResponse) {
        throw new Error("L'IA n'a pas renvoyé de réponse.");
      }

      // 3. Save AI response to Firestore
      await addDoc(collection(db, 'chats'), {
        userId: user.uid,
        role: 'model',
        content: aiResponse,
        timestamp: serverTimestamp()
      });

    } catch (error: any) {
      console.error("Chat error details:", error);
      // Add a temporary error message to the chat for the user to see
      await addDoc(collection(db, 'chats'), {
        userId: user.uid,
        role: 'model',
        content: `Désolé, j'ai rencontré une erreur : ${error.message || "Erreur inconnue"}. Vérifiez votre console (F12) pour plus de détails.`,
        timestamp: serverTimestamp()
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#128C7E] transition-colors"
        id="chat-toggle-btn"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] bg-[#E5DDD5] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-black/10"
            id="chat-window"
          >
            {/* WhatsApp Style Header */}
            <div className="bg-[#075E54] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Coach IA BIGFIT</h3>
                  <p className="text-[10px] opacity-80">En ligne</p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-80">
                <Video size={18} />
                <Phone size={18} />
                <MoreVertical size={18} />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {!user ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#075E54]">
                    <User size={32} />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Connectez-vous pour discuter avec votre Coach IA et sauvegarder vos conseils personnalisés.
                  </p>
                </div>
              ) : (
                <>
                  {messages.length === 0 && (
                    <div className="bg-[#DCF8C6] p-3 rounded-lg shadow-sm text-sm max-w-[85%] mx-auto text-center text-gray-700">
                      Bienvenue chez BIGFIT ! Je suis votre coach personnel. Comment puis-je vous aider aujourd'hui ?
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg shadow-sm text-sm relative ${
                          msg.role === 'user'
                            ? 'bg-[#DCF8C6] text-gray-800 rounded-tr-none'
                            : 'bg-white text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                        <div className="text-[9px] text-gray-500 text-right mt-1">
                          {msg.timestamp instanceof Timestamp 
                            ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : '...'}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-lg shadow-sm rounded-tl-none flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-[#075E54]" />
                        <span className="text-xs text-gray-500">Le coach réfléchit...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

           
{/* Input Area */}
<form onSubmit={handleSendMessage} className="p-3 bg-[#F0F2F5] flex items-center gap-2">
  <input
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder={user ? "Tapez un message..." : "Connectez-vous d'abord"}
    disabled={!user || isLoading}
    className="flex-1 bg-white p-3 rounded-full text-sm outline-none border-none shadow-sm disabled:opacity-50 text-gray-800"
  />
  <button
    type="submit"
    disabled={!user || !message.trim() || isLoading}
    className="w-10 h-10 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#128C7E] transition-colors disabled:opacity-50"
  >
    <Send size={18} />
  </button>
</form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
