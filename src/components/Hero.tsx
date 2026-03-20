import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with 3D-like depth */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/80 to-secondary z-10" />
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Animated Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full z-0" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full z-0" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6"
            >
              #1 GYM EN TUNISIE 🇹🇳
            </motion.span>
            
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6">
              TRANSFORMEZ <br />
              <span className="text-gradient">VOTRE CORPS</span>
            </h1>
            
            <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
              Rejoignez la communauté BIGFIT. Coaching d'élite, équipements de pointe et nutrition personnalisée pour des résultats garantis.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="btn-primary text-lg px-8 py-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                Commencer Maintenant
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-3 px-6 py-4 text-white font-bold hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                Voir la Vidéo
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-black text-white">2.5k+</div>
                <div className="text-sm text-white/40 font-medium">Membres Actifs</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-black text-white">15+</div>
                <div className="text-sm text-white/40 font-medium">Coachs Certifiés</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-black text-white">4.9/5</div>
                <div className="text-sm text-white/40 font-medium">Avis Clients</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" 
                alt="Athlete" 
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl z-20 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-white/60">Objectif Atteint</div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-primary" 
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Progrès</span>
                  <span className="text-primary">85%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
