import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => {
  return (
    <motion.div 
      className={`relative flex items-center gap-3 group cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* 3D BF Logo Icon */}
      <div className="relative w-12 h-12 perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ 
            rotateY: [-5, 5, -5],
            rotateX: [2, -2, 2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* The "BF" stylized icon using SVG for precision */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              {/* Background Shape */}
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              
              {/* Stylized B & F overlap (simplified representation of the image) */}
              <path 
                d="M20 20 L80 20 L80 35 L45 35 L45 50 L70 50 L70 65 L45 65 L45 80 L20 80 Z" 
                fill="url(#logoGrad)"
                className="opacity-90"
              />
              <path 
                d="M35 10 L35 90 L50 90 L50 10 Z" 
                fill="white"
                className="mix-blend-overlay opacity-50"
              />
              
              {/* Sharp accents like in the image */}
              <path d="M15 15 L30 5 L30 25 Z" fill="#10B981" />
            </svg>
          </div>
          
          {/* Depth layers for 3D feel */}
          <div className="absolute inset-0 translate-z-[-2px] opacity-30 blur-[1px]">
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20 20 L80 20 L80 35 L45 35 L45 50 L70 50 L70 65 L45 65 L45 80 L20 80 Z" fill="#064e3b" />
             </svg>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black tracking-tighter text-white italic">
            BIG<span className="text-primary">FIT</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-4 bg-accent/50" />
          <span className="text-[9px] font-bold tracking-[0.3em] text-accent uppercase whitespace-nowrap">
            Gym & Nutrition
          </span>
        </div>
      </div>
    </motion.div>
  );
};
