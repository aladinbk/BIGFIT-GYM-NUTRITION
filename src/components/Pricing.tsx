import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: { name: string; price: string; duration: string }) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: "Mensuel",
      price: "80",
      duration: "1 Mois",
      icon: <Star className="w-6 h-6 text-primary" />,
      features: [
        "Accès Illimité 24/7",
        "Espace Musculation & Cardio",
        "Vestiaires & Douches",
        "1 Séance Coaching Offerte",
        "Application Mobile BIGFIT"
      ],
      recommended: false
    },
    {
      name: "Trimestriel",
      price: "210",
      duration: "3 Mois",
      icon: <Zap className="w-6 h-6 text-accent" />,
      features: [
        "Tout du Plan Mensuel",
        "Accès aux Cours Collectifs",
        "Bilan Nutritionnel Initial",
        "Suivi de Progression Mensuel",
        "Réduction 10% sur Suppléments"
      ],
      recommended: true
    },
    {
      name: "Annuel",
      price: "750",
      duration: "12 Mois",
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      features: [
        "Tout du Plan Trimestriel",
        "Coaching Privé (2/mois)",
        "Accès VIP Lounge",
        "Serviettes & Boissons Offertes",
        "Réduction 20% sur Suppléments"
      ],
      recommended: false
    }
  ];

  return (
    <section id="tarifs" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4"
          >
            CHOISISSEZ VOTRE <span className="text-gradient">PLAN</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Des tarifs adaptés à vos objectifs. Pas de frais d'inscription cachés. Réservation 100% en ligne sécurisée.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass p-8 rounded-3xl flex flex-col ${
                plan.recommended ? 'border-primary/50 shadow-[0_0_40px_rgba(16,185,129,0.1)] scale-105 z-10' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                  Le Plus Populaire
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  {plan.icon}
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white italic">{plan.price} <span className="text-sm font-bold text-white/40 not-italic">TND</span></div>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{plan.duration}</div>
                </div>
              </div>

              <h3 className="text-2xl font-black italic mb-6">{plan.name}</h3>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-white/70 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-4 rounded-2xl font-black italic transition-all active:scale-95 ${
                plan.recommended 
                ? 'bg-primary text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                RÉSERVER MAINTENANT
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
