import React from 'react';
import { motion } from 'framer-motion';
import { Apple, CheckCircle, ArrowRight } from 'lucide-react';

export const Nutrition: React.FC = () => {
  const benefits = [
    "Plans alimentaires personnalisés",
    "Suivi par nutritionniste certifié",
    "Suppléments premium disponibles",
    "Recettes saines et délicieuses",
    "Analyses de composition corporelle"
  ];

  return (
    <section id="nutrition" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop" 
                alt="Nutrition" 
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 rounded-2xl z-20 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Apple className="w-6 h-6 text-accent" />
                </div>
                <div className="text-xs font-bold text-white/60">Conseil Nutrition</div>
              </div>
              <p className="text-xs font-medium text-white/80 leading-relaxed">
                "Une bonne alimentation représente 70% de vos résultats."
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-6">
              NUTRITION & SANTÉ
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none mb-6">
              MANGEZ POUR <br />
              <span className="text-gradient">PERFORMER</span>
            </h2>
            
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              La nutrition est le carburant de votre transformation. Nos experts vous accompagnent avec des programmes sur mesure pour maximiser vos gains et votre énergie.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-white/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary">
              Découvrir nos plans nutrition
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
