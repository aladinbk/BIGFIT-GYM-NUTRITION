import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Zap, Apple, Users, Trophy } from 'lucide-react';

export const Programs: React.FC = () => {
  const programs = [
    {
      title: "Musculation",
      desc: "Prise de masse, force et définition musculaire avec nos coachs experts.",
      icon: <Dumbbell className="w-8 h-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Cardio & HIIT",
      desc: "Brûlez un maximum de calories et améliorez votre endurance cardiovasculaire.",
      icon: <Zap className="w-8 h-8 text-accent" />,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Nutrition",
      desc: "Plans alimentaires personnalisés adaptés à vos objectifs et votre métabolisme.",
      icon: <Apple className="w-8 h-8 text-emerald-400" />,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Cours Collectifs",
      desc: "Yoga, Zumba, CrossFit et plus encore. L'énergie du groupe pour se dépasser.",
      icon: <Users className="w-8 h-8 text-blue-400" />,
      image: "https://images.unsplash.com/photo-1518611012118-29617b0ccd0a?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="programmes" className="py-24 bg-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4"
            >
              NOS <span className="text-gradient">PROGRAMMES</span>
            </motion.h2>
            <p className="text-white/60">
              Découvrez une large gamme de services conçus pour vous aider à atteindre vos objectifs de fitness et de bien-être.
            </p>
          </div>
          <button className="btn-outline">Voir tous les programmes</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={program.image} 
                alt={program.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-90" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 w-fit group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                  {program.icon}
                </div>
                <h3 className="text-2xl font-black italic mb-2 text-white">{program.title}</h3>
                <p className="text-sm text-white/60 line-clamp-2 group-hover:line-clamp-none transition-all">
                  {program.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
