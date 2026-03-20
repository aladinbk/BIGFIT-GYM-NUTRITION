import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

export const Coaches: React.FC = () => {
  const coaches = [
    {
      name: "Ahmed Mansour",
      role: "Head Coach & Founder",
      image: "https://images.unsplash.com/photo-1597347343908-2937e7dcc560?q=80&w=1887&auto=format&fit=crop",
      specialty: "Bodybuilding & Strength"
    },
    {
      name: "Sarra Ben Ali",
      role: "Nutrition Specialist",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop",
      specialty: "Weight Loss & Diet"
    },
    {
      name: "Yassine Dridi",
      role: "HIIT & CrossFit Coach",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1887&auto=format&fit=crop",
      specialty: "Endurance & Agility"
    },
    {
      name: "Leila Trabelsi",
      role: "Yoga & Pilates Instructor",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1887&auto=format&fit=crop",
      specialty: "Flexibility & Mindset"
    }
  ];

  return (
    <section id="coaches" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4"
          >
            NOS <span className="text-gradient">COACHS D'ÉLITE</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Une équipe passionnée et certifiée pour vous accompagner vers l'excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src={coach.image} 
                  alt={coach.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80" />
                
                {/* Social Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-3">
                    <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors">
                      <Instagram className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{coach.specialty}</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-xl font-black italic text-white">{coach.name}</h3>
                <p className="text-sm text-white/40 font-medium">{coach.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
