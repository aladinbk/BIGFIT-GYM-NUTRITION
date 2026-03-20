import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sami Kallel",
      role: "Membre depuis 2 ans",
      content: "Une transformation incroyable ! L'ambiance est motivante et les coachs sont vraiment à l'écoute. C'est plus qu'une salle, c'est une famille.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
    },
    {
      name: "Ines Gharbi",
      role: "Membre depuis 6 mois",
      content: "Le programme de nutrition personnalisé a changé ma vie. J'ai perdu 10kg tout en gardant mon énergie. Merci BIGFIT !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
    },
    {
      name: "Mohamed Ali",
      role: "Athlète de haut niveau",
      content: "Les équipements sont de dernière génération. Idéal pour ceux qui cherchent la performance pure. Le meilleur gym de Tunis.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1887&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4"
          >
            ILS NOUS <span className="text-gradient">FONT CONFIANCE</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Découvrez les histoires de réussite de nos membres.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/10 relative group hover:border-primary/30 transition-colors duration-500"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors duration-500" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg text-white/80 italic mb-8 leading-relaxed">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-black italic text-white uppercase tracking-tighter">{t.name}</h4>
                  <p className="text-xs text-white/40 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
