import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Programs } from './components/Programs';
import { Nutrition } from './components/Nutrition';
import { Pricing } from './components/Pricing';
import { Coaches } from './components/Coaches';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/AuthModal';
import ChatBot from './components/ChatBot';
import { motion } from 'framer-motion';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; duration: string } | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectPlan = (plan: { name: string; price: string; duration: string }) => {
    setSelectedPlan(plan);
    setIsPaymentOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-primary selection:text-black">
      <Navbar onOpenAuth={handleOpenAuth} user={user} />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Programs />
          <Nutrition />
          <Pricing onSelectPlan={handleSelectPlan} />
          <Gallery />
          <Testimonials />
          <Coaches />
          <Contact />
        </motion.div>
      </main>

      <Footer />

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        plan={selectedPlan} 
        onOpenAuth={handleOpenAuth}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />

      <ChatBot />

      {/* Custom Cursor Effect (Optional but cool for 3D vibe) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
        <motion.div 
          className="w-8 h-8 rounded-full border border-primary/30 absolute -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}



