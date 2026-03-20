import React from 'react';
import { motion } from 'framer-motion';

export const Gallery: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      title: "Zone Musculation",
      size: "large"
    },
    {
      url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop",
      title: "Espace Cardio",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop",
      title: "Studio Yoga",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
      title: "CrossFit Box",
      size: "medium"
    },
    {
      url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop",
      title: "Espace Nutrition",
      size: "medium"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black italic tracking-tighter"
            >
              NOS <span className="text-gradient">INSTALLATIONS</span>
            </motion.h2>
            <p className="text-white/60 mt-4 max-w-md">
              Découvrez un espace de 1500m² dédié à votre transformation physique et mentale.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="flex gap-8 text-sm font-bold tracking-widest text-white/40">
              <div className="flex flex-col">
                <span className="text-primary">1500m²</span>
                <span>ESPACE TOTAL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary">24/7</span>
                <span>ACCÈS LIBRE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary">TUNIS</span>
                <span>LOCATION</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {images.map((img, index) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-3xl border border-white/10 ${
                img.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                img.size === 'medium' ? 'md:col-span-1 md:row-span-2' : ''
              }`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-8 left-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">{img.title}</h3>
                <div className="w-12 h-1 bg-primary mt-2" />
              </div>
              
              {/* 3D Glass Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none border border-white/0 group-hover:border-white/20 transition-colors duration-500 rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
