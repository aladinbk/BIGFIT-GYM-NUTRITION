import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: { name: string; price: string; duration: string } | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan, onOpenAuth }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      setError("Vous devez être connecté pour effectuer un paiement.");
      return;
    }

    setStep('processing');
    setError(null);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Calculate end date based on duration
      const startDate = new Date();
      const endDate = new Date();
      if (plan?.duration.includes('Mois')) {
        const months = parseInt(plan.duration);
        endDate.setMonth(startDate.getMonth() + months);
      } else if (plan?.duration.includes('An')) {
        endDate.setFullYear(startDate.getFullYear() + 1);
      }

      // Save subscription to Firestore
      await addDoc(collection(db, 'subscriptions'), {
        userId: auth.currentUser.uid,
        planName: plan?.name,
        price: plan?.price,
        duration: plan?.duration,
        startDate: serverTimestamp(),
        endDate: endDate,
        status: 'active',
        paymentId: 'sim_' + Math.random().toString(36).substr(2, 9)
      });

      setStep('success');
    } catch (err: any) {
      console.error('Payment error:', err);
      setError("Une erreur est survenue lors du traitement du paiement.");
      setStep('form');
    }
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass rounded-3xl overflow-hidden shadow-2xl border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {step === 'form' && (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black italic mb-2">Paiement Sécurisé</h3>
                    <p className="text-white/40 text-sm">Abonnement {plan.name} - {plan.price} TND</p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col gap-3 text-red-500 text-sm">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                      </div>
                      {!auth.currentUser && (
                        <button 
                          onClick={() => {
                            onClose();
                            onOpenAuth('login');
                          }}
                          className="text-primary font-bold hover:underline text-left"
                        >
                          Se connecter maintenant
                        </button>
                      )}
                    </div>
                  )}

                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Nom sur la carte</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Mohamed Ben Ali"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Numéro de carte</label>
                      <div className="relative">
                        <input 
                          required
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Expiration</label>
                        <input 
                          required
                          type="text" 
                          placeholder="MM/YY"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">CVV</label>
                        <input 
                          required
                          type="text" 
                          placeholder="123"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-white/40 font-medium">
                      <Lock className="w-3 h-3" />
                      Paiement crypté SSL 256-bit via serveurs sécurisés
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 text-lg">
                      Payer {plan.price} TND
                    </button>
                  </form>
                </>
              )}

              {step === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                  <h3 className="text-xl font-black italic mb-2">Traitement en cours...</h3>
                  <p className="text-white/40 text-sm">Veuillez ne pas fermer cette fenêtre.</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-black italic mb-2">Félicitations !</h3>
                  <p className="text-white/40 text-sm mb-8">Votre abonnement {plan.name} est maintenant actif. Bienvenue dans la famille BIGFIT !</p>
                  <button onClick={onClose} className="btn-primary w-full">
                    Accéder à mon espace
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
