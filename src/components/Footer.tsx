import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-secondary pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Logo />
            <p className="text-white/40 text-sm leading-relaxed">
              BIGFIT GYM & NUTRITION est la destination ultime pour le fitness et la nutrition en Tunisie. Rejoignez l'élite et transformez votre vie.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#10B981' }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black italic mb-6 text-white uppercase tracking-wider">Liens Rapides</h4>
            <ul className="space-y-4">
              {['Accueil', 'Programmes', 'Nutrition', 'Tarifs', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black italic mb-6 text-white uppercase tracking-wider">Contactez-nous</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Avenue Habib Bourguiba, <br />Tunis, Tunisie 🇹🇳</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+216 71 000 000</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>contact@bigfit.tn</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black italic mb-6 text-white uppercase tracking-wider">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              Inscrivez-vous pour recevoir des conseils fitness et des offres exclusives.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors flex-grow"
              />
              <button className="p-3 bg-primary text-black rounded-xl hover:scale-105 transition-transform active:scale-95">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-xs font-medium">
            © 2026 BIGFIT GYM & NUTRITION. Tous droits réservés. Développé avec ❤️ en Tunisie.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-medium">Mentions Légales</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-medium">Confidentialité</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-medium">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
