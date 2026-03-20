import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8"
            >
              CONTACTEZ <span className="text-gradient">NOUS</span>
            </motion.h2>
            <p className="text-white/60 mb-12 max-w-md">
              Prêt à commencer votre transformation ? Notre équipe est là pour répondre à toutes vos questions.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-black italic text-white uppercase tracking-tighter">Notre Adresse</h4>
                  <p className="text-white/40">Avenue Habib Bourguiba, Tunis, Tunisie</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Phone className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-black italic text-white uppercase tracking-tighter">Téléphone</h4>
                  <p className="text-white/40">+216 71 000 000</p>
                  <p className="text-white/40">+216 20 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Mail className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-black italic text-white uppercase tracking-tighter">Email</h4>
                  <p className="text-white/40">contact@bigfit.tn</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Clock className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-black italic text-white uppercase tracking-tighter">Horaires d'ouverture</h4>
                  <p className="text-white/40">Lundi - Vendredi: 06:00 - 22:00</p>
                  <p className="text-white/40">Samedi - Dimanche: 08:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-white/10"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Nom Complet</label>
                  <input 
                    type="text" 
                    placeholder="Ahmed Mansour"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="ahmed@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Sujet</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option className="bg-secondary">Demande d'information</option>
                  <option className="bg-secondary">Coaching Personnel</option>
                  <option className="bg-secondary">Nutrition</option>
                  <option className="bg-secondary">Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button className="btn-primary w-full py-5 flex items-center justify-center gap-3 group">
                ENVOYER LE MESSAGE
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
